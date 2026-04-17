import { z } from 'zod';
import { prisma } from '../db/prisma.js';
import { parsePeriod } from '../utils/period.js';

export const createReportSchema = z.object({
  name: z.string().min(1).max(200),
  type: z.enum(['weekly', 'monthly', 'custom']).default('custom'),
  format: z.enum(['json', 'csv']).default('csv'),
  brandSlug: z.string().min(1).optional(),
  period: z.string().optional(),
});

// GET /api/reports
export const listReports = async (req, res) => {
  const reports = await prisma.report.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: 'desc' },
    include: { brand: { select: { id: true, slug: true, name: true } } },
  });
  res.json({ reports });
};

// GET /api/reports/:id
export const getReport = async (req, res) => {
  const report = await prisma.report.findFirst({
    where: { id: req.params.id, userId: req.user.id },
    include: { brand: { select: { id: true, slug: true, name: true } } },
  });
  if (!report) return res.status(404).json({ error: 'Report not found' });
  res.json({ report });
};

// POST /api/reports
export const createReport = async (req, res) => {
  const { name, type, format, brandSlug } = req.body;

  let brandId = null;
  if (brandSlug) {
    const brand = await prisma.brand.findFirst({
      where: { OR: [{ id: brandSlug }, { slug: brandSlug }] },
      select: { id: true },
    });
    if (!brand) return res.status(404).json({ error: 'Brand not found' });
    brandId = brand.id;
  }

  const report = await prisma.report.create({
    data: {
      userId: req.user.id,
      brandId,
      name,
      type,
      format,
      status: 'ready',
      url: null, // downloaded on-demand via /download
    },
    include: { brand: { select: { id: true, slug: true, name: true } } },
  });

  res.status(201).json({ report });
};

// DELETE /api/reports/:id
export const deleteReport = async (req, res) => {
  const r = await prisma.report.findFirst({
    where: { id: req.params.id, userId: req.user.id },
    select: { id: true },
  });
  if (!r) return res.status(404).json({ error: 'Report not found' });
  await prisma.report.delete({ where: { id: r.id } });
  res.json({ ok: true });
};

// GET /api/reports/:id/download
// Streams a CSV (or JSON) generated on the fly from the brand's recent mentions + keywords.
export const downloadReport = async (req, res) => {
  const report = await prisma.report.findFirst({
    where: { id: req.params.id, userId: req.user.id },
    include: { brand: true },
  });
  if (!report) return res.status(404).json({ error: 'Report not found' });

  const period = parsePeriod({ period: '30d' });
  const brandFilter = report.brandId ? { brandId: report.brandId } : {};

  const [mentions, keywords] = await Promise.all([
    prisma.mention.findMany({
      where: { ...brandFilter, postedAt: { gte: period.from, lte: period.to } },
      orderBy: { postedAt: 'desc' },
      take: 500,
      select: {
        platform: true,
        authorName: true,
        authorHandle: true,
        content: true,
        sentiment: true,
        sentimentLabel: true,
        likes: true,
        shares: true,
        comments: true,
        reach: true,
        postedAt: true,
      },
    }),
    prisma.keyword.findMany({
      where: brandFilter,
      orderBy: { count: 'desc' },
      take: 50,
      select: { term: true, kind: true, count: true, sentiment: true, growth: true },
    }),
  ]);

  const filename = `${report.name.replace(/[^a-z0-9_-]+/gi, '_')}.${report.format}`;
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

  if (report.format === 'json') {
    res.setHeader('Content-Type', 'application/json');
    res.json({
      report: { id: report.id, name: report.name, brand: report.brand?.name, createdAt: report.createdAt },
      period: { from: period.from, to: period.to },
      keywords,
      mentions,
    });
    return;
  }

  // CSV
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  const esc = (v) => {
    if (v === null || v === undefined) return '';
    const s = String(v).replace(/"/g, '""');
    return /[",\n\r]/.test(s) ? `"${s}"` : s;
  };
  const lines = [];
  lines.push(`# Report: ${report.name}`);
  if (report.brand) lines.push(`# Brand: ${report.brand.name}`);
  lines.push(`# Period: ${period.from.toISOString()} to ${period.to.toISOString()}`);
  lines.push('');
  lines.push('## Top Keywords');
  lines.push(['term', 'kind', 'count', 'sentiment', 'growth'].join(','));
  for (const k of keywords) {
    lines.push([esc(k.term), esc(k.kind), esc(k.count), esc(k.sentiment), esc(k.growth)].join(','));
  }
  lines.push('');
  lines.push('## Recent Mentions');
  lines.push(['postedAt','platform','author','handle','sentiment','sentimentLabel','likes','shares','comments','reach','content'].join(','));
  for (const m of mentions) {
    lines.push([
      esc(m.postedAt.toISOString()),
      esc(m.platform),
      esc(m.authorName),
      esc(m.authorHandle),
      esc(m.sentiment),
      esc(m.sentimentLabel),
      esc(m.likes),
      esc(m.shares),
      esc(m.comments),
      esc(m.reach),
      esc(m.content),
    ].join(','));
  }
  res.send(lines.join('\n'));
};
