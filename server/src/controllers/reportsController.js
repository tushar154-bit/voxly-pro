import { z } from 'zod';
import PDFDocument from 'pdfkit';
import { prisma } from '../db/prisma.js';
import { parsePeriod } from '../utils/period.js';

export const REPORT_SUBTYPES = [
  'summary', 'analytics', 'sentiment', 'competitors',
  'influencers', 'trends', 'comprehensive', 'custom',
];

// Valid section keys the `custom` subtype may include.
export const CUSTOM_SECTION_KEYS = [
  'summary', 'analytics', 'sentiment', 'competitors', 'influencers', 'trends',
];

export const createReportSchema = z.object({
  name: z.string().min(1).max(200),
  type: z.enum(['weekly', 'monthly', 'custom']).default('custom'),
  subtype: z.enum(REPORT_SUBTYPES).default('summary'),
  sections: z.array(z.enum(CUSTOM_SECTION_KEYS)).optional(),
  format: z.enum(['json', 'csv', 'pdf']).default('csv'),
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
  const { name, type, subtype, sections, format, brandSlug } = req.body;

  let brandId = null;
  if (brandSlug) {
    const brand = await prisma.brand.findFirst({
      where: { OR: [{ id: brandSlug }, { slug: brandSlug }] },
      select: { id: true },
    });
    if (!brand) return res.status(404).json({ error: 'Brand not found' });
    brandId = brand.id;
  }

  // Only store `sections` when the report is actually custom.
  const effectiveSubtype = subtype || 'summary';
  const storedSections = effectiveSubtype === 'custom' && Array.isArray(sections) && sections.length
    ? [...new Set(sections)]
    : [];

  const report = await prisma.report.create({
    data: {
      userId: req.user.id,
      brandId,
      name,
      type,
      subtype: effectiveSubtype,
      sections: storedSections,
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

// Shared aggregation used by both preview endpoints.
const buildReportPreviewPayload = async ({ brandId, period }) => {
  const brandFilter = brandId ? { brandId } : {};
  const mentionWhere = { ...brandFilter, postedAt: { gte: period.from, lte: period.to } };

  const [agg, sentimentBreakdown, keywords, mentions, authors] = await Promise.all([
    prisma.mention.aggregate({
      where: mentionWhere,
      _avg: { sentiment: true, engagement: true },
      _sum: { reach: true, likes: true, shares: true, comments: true },
      _count: { _all: true },
    }),
    prisma.mention.groupBy({
      by: ['sentimentLabel'],
      where: mentionWhere,
      _count: { _all: true },
    }),
    prisma.keyword.findMany({
      where: brandFilter,
      orderBy: { count: 'desc' },
      take: 10,
      select: { term: true, kind: true, count: true, sentiment: true, growth: true },
    }),
    prisma.mention.findMany({
      where: mentionWhere,
      orderBy: [{ reach: 'desc' }, { postedAt: 'desc' }],
      take: 15,
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
    prisma.mention.findMany({
      where: mentionWhere,
      distinct: ['authorHandle'],
      select: { authorHandle: true },
    }),
  ]);

  const sentiments = Object.fromEntries(sentimentBreakdown.map((s) => [s.sentimentLabel, s._count._all]));

  return {
    period: { from: period.from, to: period.to, label: period.label || '30d', days: period.days },
    summary: {
      totalMentions: agg._count._all,
      avgSentiment: Math.round((agg._avg.sentiment || 0) * 10) / 10,
      avgEngagement: Math.round((agg._avg.engagement || 0) * 100) / 100,
      totalReach: agg._sum.reach || 0,
      totalLikes: agg._sum.likes || 0,
      totalShares: agg._sum.shares || 0,
      totalComments: agg._sum.comments || 0,
      uniqueAuthors: authors.length,
      sentimentMix: {
        positive: sentiments.positive || 0,
        neutral:  sentiments.neutral  || 0,
        negative: sentiments.negative || 0,
      },
    },
    keywords,
    mentions,
  };
};

// GET /api/reports/preview?brandSlug=&period=
// Dry-run preview used by the Create Report tab before any report is saved.
export const previewForBrand = async (req, res) => {
  const period = parsePeriod(req.query);
  let brand = null;
  if (req.query.brandSlug) {
    brand = await prisma.brand.findFirst({
      where: { OR: [{ id: req.query.brandSlug }, { slug: req.query.brandSlug }] },
    });
    if (!brand) return res.status(404).json({ error: 'Brand not found' });
  }
  const data = await buildReportPreviewPayload({ brandId: brand?.id, period });
  res.json({
    brand: brand ? { id: brand.id, slug: brand.slug, name: brand.name } : null,
    ...data,
  });
};

// GET /api/reports/:id/preview
// Structured JSON for the UI preview modal of a saved report.
export const previewReport = async (req, res) => {
  const report = await prisma.report.findFirst({
    where: { id: req.params.id, userId: req.user.id },
    include: { brand: true },
  });
  if (!report) return res.status(404).json({ error: 'Report not found' });

  const period = parsePeriod({ period: '30d' });
  const data = await buildReportPreviewPayload({ brandId: report.brandId, period });

  res.json({
    report: {
      id: report.id,
      name: report.name,
      type: report.type,
      format: report.format,
      status: report.status,
      createdAt: report.createdAt,
      brand: report.brand ? { id: report.brand.id, slug: report.brand.slug, name: report.brand.name } : null,
    },
    ...data,
  });
};

// ---------------------------------------------------------------
// Subtype-specific data fetch. Returns { summary, ...subtypeData }.
// ---------------------------------------------------------------
async function fetchReportData(subtype, brandId, period, customSections = []) {
  const brandFilter = brandId ? { brandId } : {};
  const mentionWhere = { ...brandFilter, postedAt: { gte: period.from, lte: period.to } };
  const data = { subtype, sections: customSections };
  const isComp = subtype === 'comprehensive';
  const isCustom = subtype === 'custom';

  // Helper: when subtype is 'custom', gate sections by what the user picked.
  // Other subtypes have fixed sections.
  const want = (section) => {
    if (isComp) return true;
    if (isCustom) return customSections.includes(section);
    return subtype === section;
  };

  // Universal summary (every PDF shows this box)
  const [agg, breakdown, authors] = await Promise.all([
    prisma.mention.aggregate({
      where: mentionWhere,
      _avg: { sentiment: true, engagement: true },
      _sum: { reach: true, likes: true, shares: true, comments: true },
      _count: { _all: true },
    }),
    prisma.mention.groupBy({ by: ['sentimentLabel'], where: mentionWhere, _count: { _all: true } }),
    prisma.mention.findMany({ where: mentionWhere, distinct: ['authorHandle'], select: { authorHandle: true } }),
  ]);
  const mix = Object.fromEntries(breakdown.map((b) => [b.sentimentLabel, b._count._all]));
  data.summary = {
    totalMentions: agg._count._all,
    avgSentiment: Math.round((agg._avg.sentiment || 0) * 10) / 10,
    avgEngagement: Math.round((agg._avg.engagement || 0) * 100) / 100,
    totalReach: agg._sum.reach || 0,
    totalLikes: agg._sum.likes || 0,
    totalShares: agg._sum.shares || 0,
    totalComments: agg._sum.comments || 0,
    uniqueAuthors: authors.length,
    sentimentMix: { positive: mix.positive || 0, neutral: mix.neutral || 0, negative: mix.negative || 0 },
  };

  const mentionSelect = {
    platform: true, authorName: true, authorHandle: true, content: true,
    sentiment: true, sentimentLabel: true, likes: true, shares: true,
    comments: true, reach: true, postedAt: true,
  };

  // Summary subtype → top keywords + top mentions
  if (want('summary')) {
    const [keywords, mentions] = await Promise.all([
      prisma.keyword.findMany({ where: brandFilter, orderBy: { count: 'desc' }, take: 15 }),
      prisma.mention.findMany({ where: mentionWhere, orderBy: [{ reach: 'desc' }, { postedAt: 'desc' }], take: 10, select: mentionSelect }),
    ]);
    data.keywords = keywords;
    data.mentions = mentions;
  }

  // Analytics subtype → platform breakdown + cross-platform metrics
  if (want('analytics')) {
    const platformRows = await prisma.mention.groupBy({
      by: ['platform'],
      where: mentionWhere,
      _count: { _all: true },
      _avg: { sentiment: true, engagement: true },
      _sum: { reach: true, likes: true, shares: true, comments: true },
    });
    const total = platformRows.reduce((s, p) => s + p._count._all, 0) || 1;
    data.platforms = platformRows.map((p) => ({
      platform: p.platform,
      mentions: p._count._all,
      share: Math.round((p._count._all / total) * 1000) / 10,
      sentiment: Math.round((p._avg.sentiment || 0) * 10) / 10,
      engagement: Math.round((p._avg.engagement || 0) * 100) / 100,
      reach: p._sum.reach || 0,
    })).sort((a, b) => b.mentions - a.mentions);
  }

  // Sentiment subtype → per-platform sentiment + positive/negative samples
  if (want('sentiment')) {
    const [sentByPlatform, topPositive, topNegative] = await Promise.all([
      prisma.mention.groupBy({ by: ['platform', 'sentimentLabel'], where: mentionWhere, _count: { _all: true } }),
      prisma.mention.findMany({ where: { ...mentionWhere, sentimentLabel: 'positive' }, orderBy: { reach: 'desc' }, take: 3, select: mentionSelect }),
      prisma.mention.findMany({ where: { ...mentionWhere, sentimentLabel: 'negative' }, orderBy: { reach: 'desc' }, take: 3, select: mentionSelect }),
    ]);
    const byPlatform = {};
    for (const r of sentByPlatform) {
      byPlatform[r.platform] = byPlatform[r.platform] || { platform: r.platform, positive: 0, neutral: 0, negative: 0, total: 0 };
      byPlatform[r.platform][r.sentimentLabel] = r._count._all;
      byPlatform[r.platform].total += r._count._all;
    }
    data.sentimentByPlatform = Object.values(byPlatform).sort((a, b) => b.total - a.total);
    data.topPositive = topPositive;
    data.topNegative = topNegative;
  }

  // Competitor subtype → competitor list + per-brand metrics
  if (want('competitors') && brandId) {
    const relations = await prisma.competitorRelation.findMany({
      where: { brandId },
      include: { competitorBrand: true },
    });
    const focus = await prisma.brand.findUnique({ where: { id: brandId } });
    const all = [focus, ...relations.map((r) => r.competitorBrand)];
    const rows = await Promise.all(all.map(async (b) => {
      const [a, c] = await Promise.all([
        prisma.mention.aggregate({
          where: { brandId: b.id, postedAt: { gte: period.from, lte: period.to } },
          _avg: { sentiment: true, engagement: true },
          _sum: { reach: true },
          _count: { _all: true },
        }),
        prisma.mention.count({ where: { brandId: b.id, postedAt: { gte: period.from, lte: period.to } } }),
      ]);
      return {
        id: b.id,
        name: b.name,
        isFocus: b.id === brandId,
        mentions: c,
        sentiment: Math.round((a._avg.sentiment || 0) * 10) / 10,
        engagement: Math.round((a._avg.engagement || 0) * 100) / 100,
        reach: a._sum.reach || 0,
      };
    }));
    const totalMentions = rows.reduce((s, r) => s + r.mentions, 0) || 1;
    data.competitors = rows.map((r) => ({ ...r, sov: Math.round((r.mentions / totalMentions) * 1000) / 10 }))
                           .sort((a, b) => b.mentions - a.mentions);
  }

  // Influencer subtype → linked influencers sorted by influence
  if (want('influencers') && brandId) {
    const links = await prisma.brandInfluencer.findMany({
      where: { brandId },
      include: { influencer: true },
    });
    data.influencers = links
      .map((l) => l.influencer)
      .sort((a, b) => b.influence - a.influence)
      .slice(0, 15);
  }

  // Trends subtype → hashtags + fastest-growing keywords
  if (want('trends')) {
    const [hashtags, rising] = await Promise.all([
      prisma.keyword.findMany({ where: { ...brandFilter, kind: 'hashtag' }, orderBy: { count: 'desc' }, take: 15 }),
      prisma.keyword.findMany({ where: brandFilter, orderBy: { growth: 'desc' }, take: 15 }),
    ]);
    data.hashtags = hashtags;
    data.risingKeywords = rising;
  }

  return data;
}

// ---------------------------------------------------------------
// PDF renderers — each is a self-contained section appended to `doc`
// ---------------------------------------------------------------
const fmtNum = (n) => {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000)     return (n / 1_000).toFixed(1) + 'K';
  return String(Math.round(n));
};
const fmtDate = (d) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
const pageBreakIfNeeded = (doc, threshold = 720) => { if (doc.y > threshold) doc.addPage(); };

const SUBTYPE_LABEL = {
  summary: 'Brand Summary',
  analytics: 'Analytics Deep Dive',
  sentiment: 'Sentiment Analysis',
  competitors: 'Competitor Analysis',
  influencers: 'Influencer Report',
  trends: 'Trends Report',
  comprehensive: 'Comprehensive Report',
  custom: 'Custom Report',
};

// -------- Shared table helpers ----------
// Draw a single row at the current doc.y. Cells is an array of
// [text, x, width, opts] tuples. No auto-wrapping, ellipsis clamps overflow.
function tableRow(doc, cells, rowHeight = 18) {
  const y = doc.y;
  for (const cell of cells) {
    const [txt, x, width, opts = {}] = cell;
    doc.save();
    if (opts.color) doc.fillColor(opts.color);
    if (opts.font)  doc.font(opts.font);
    doc.text(String(txt ?? ''), x, y, {
      width,
      lineBreak: false,
      ellipsis: true,
      align: opts.align || 'left',
    });
    doc.restore();
  }
  doc.y = y + rowHeight;
}

function tableHeader(doc, cells) {
  const y = doc.y;
  doc.save().rect(50, y - 3, 495, 20).fillColor('#f8fafc').fill().restore();
  doc.font('Helvetica-Bold').fillColor('#475569').fontSize(9);
  for (const cell of cells) {
    const [txt, x, width, opts = {}] = cell;
    doc.text(String(txt).toUpperCase(), x, y, {
      width,
      lineBreak: false,
      ellipsis: true,
      align: opts.align || 'left',
    });
  }
  doc.y = y + 18;
  doc.strokeColor('#e5e7eb').lineWidth(0.5).moveTo(50, doc.y).lineTo(545, doc.y).stroke();
  doc.moveDown(0.15);
}

function sectionTitle(doc, title) {
  pageBreakIfNeeded(doc);
  doc.moveDown(0.5);
  doc.fillColor('#6366f1').fontSize(14).font('Helvetica-Bold').text(title);
  doc.moveDown(0.3);
}

// -------- Header / summary / footer ----------
function renderHeader(doc, report, period) {
  doc.fillColor('#6366f1').fontSize(26).font('Helvetica-Bold').text('Voxly Pro');
  doc.fillColor('#0f172a').fontSize(18).font('Helvetica-Bold').text(report.name);
  doc.moveDown(0.2);
  doc.fillColor('#6366f1').fontSize(11).font('Helvetica-Bold').text(SUBTYPE_LABEL[report.subtype] || 'Report');
  doc.moveDown(0.3);
  doc.fillColor('#64748b').fontSize(10).font('Helvetica');
  const metaParts = [];
  if (report.brand?.name) metaParts.push(`Brand: ${report.brand.name}`);
  metaParts.push(`Type: ${report.type}`);
  metaParts.push(`Generated: ${fmtDate(report.createdAt)}`);
  doc.text(metaParts.join('    '));
  doc.text(`Period: ${fmtDate(period.from)} to ${fmtDate(period.to)}`);
  doc.moveDown(0.6);
  doc.strokeColor('#e5e7eb').lineWidth(1).moveTo(50, doc.y).lineTo(545, doc.y).stroke();
  doc.moveDown(0.6);
}

function renderSummaryBox(doc, s) {
  sectionTitle(doc, 'Executive Summary');
  doc.font('Helvetica').fontSize(10).fillColor('#334155');

  // Two-column key/value grid
  const labels = [
    ['Total Mentions',    fmtNum(s.totalMentions)],
    ['Unique Authors',    fmtNum(s.uniqueAuthors)],
    ['Average Sentiment', `${s.avgSentiment} / 100`],
    ['Average Engagement',`${s.avgEngagement}%`],
    ['Total Reach',       fmtNum(s.totalReach)],
    ['Engagement Volume', fmtNum(s.totalLikes + s.totalShares + s.totalComments)],
  ];
  const colWidth = 245;
  for (let i = 0; i < labels.length; i += 2) {
    const rowY = doc.y;
    [0, 1].forEach((col) => {
      const pair = labels[i + col];
      if (!pair) return;
      const x = 50 + col * colWidth;
      doc.font('Helvetica').fillColor('#64748b').fontSize(9)
         .text(pair[0].toUpperCase(), x, rowY, { width: colWidth, lineBreak: false });
      doc.font('Helvetica-Bold').fillColor('#0f172a').fontSize(13)
         .text(pair[1], x, rowY + 11, { width: colWidth, lineBreak: false });
    });
    doc.y = rowY + 34;
  }

  // Sentiment mix strip
  doc.moveDown(0.3);
  doc.font('Helvetica').fontSize(9).fillColor('#475569').text('SENTIMENT MIX', 50, doc.y);
  doc.moveDown(0.2);
  const mix = s.sentimentMix;
  const mixTotal = Math.max(1, mix.positive + mix.neutral + mix.negative);
  const mixY = doc.y;
  const mixX = 50;
  const mixW = 495;
  let offset = 0;
  [
    { k: 'positive', color: '#10b981' },
    { k: 'neutral',  color: '#94a3b8' },
    { k: 'negative', color: '#ef4444' },
  ].forEach(({ k, color }) => {
    const width = (mix[k] / mixTotal) * mixW;
    doc.rect(mixX + offset, mixY, width, 8).fillColor(color).fill();
    offset += width;
  });
  doc.y = mixY + 14;
  doc.font('Helvetica').fontSize(9).fillColor('#475569');
  doc.text(
    `Positive ${mix.positive} (${Math.round((mix.positive / mixTotal) * 100)}%)    ` +
    `Neutral ${mix.neutral} (${Math.round((mix.neutral / mixTotal) * 100)}%)    ` +
    `Negative ${mix.negative} (${Math.round((mix.negative / mixTotal) * 100)}%)`,
    50, doc.y
  );
  doc.moveDown(0.8);
}

// -------- Table renderers (aligned columns, no wrapping) --------
function renderKeywordsTable(doc, keywords, title = 'Top Keywords') {
  if (!keywords?.length) return;
  sectionTitle(doc, title);
  tableHeader(doc, [
    ['Term',      50,  180],
    ['Kind',      230, 60],
    ['Count',     290, 60, { align: 'right' }],
    ['Sentiment', 360, 70, { align: 'right' }],
    ['Growth',    440, 90, { align: 'right' }],
  ]);
  doc.font('Helvetica').fontSize(10);
  keywords.forEach((k) => {
    pageBreakIfNeeded(doc);
    const growthStr = `${k.growth >= 0 ? '+' : ''}${k.growth}%`;
    tableRow(doc, [
      [k.term, 50, 180, { color: '#334155' }],
      [k.kind, 230, 60, { color: '#64748b' }],
      [fmtNum(k.count), 290, 60, { color: '#334155', align: 'right' }],
      [String(k.sentiment), 360, 70, { color: '#334155', align: 'right' }],
      [growthStr, 440, 90, { color: k.growth >= 0 ? '#10b981' : '#ef4444', align: 'right' }],
    ]);
  });
  doc.moveDown(0.3);
}

function renderMentionsList(doc, mentions, title = 'Recent Mentions') {
  if (!mentions?.length) return;
  sectionTitle(doc, title);
  mentions.forEach((m, idx) => {
    // Each mention needs ~60-90pt of vertical space. Break early to keep it intact.
    if (doc.y > 700) doc.addPage();
    const sentColor = m.sentimentLabel === 'positive' ? '#10b981'
                    : m.sentimentLabel === 'negative' ? '#ef4444' : '#64748b';

    // --- Line 1: author (bold, left)  |  handle-platform-date (grey, right) ---
    const y1 = doc.y;
    doc.font('Helvetica-Bold').fillColor('#0f172a').fontSize(10)
       .text(`${idx + 1}. ${m.authorName}`, 50, y1,
         { width: 200, lineBreak: false, ellipsis: true });
    doc.font('Helvetica').fillColor('#64748b').fontSize(9)
       .text(`${m.authorHandle}  |  ${m.platform}  |  ${fmtDate(m.postedAt)}`,
         260, y1, { width: 285, lineBreak: false, ellipsis: true, align: 'right' });
    doc.y = y1 + 14;

    // --- Line 2: sentiment tag  +  engagement stats ---
    const y2 = doc.y;
    doc.font('Helvetica-Bold').fillColor(sentColor).fontSize(9)
       .text(m.sentimentLabel.toUpperCase(), 50, y2, { width: 70, lineBreak: false });
    doc.font('Helvetica').fillColor('#64748b').fontSize(9)
       .text(`Likes ${fmtNum(m.likes)}   Shares ${fmtNum(m.shares)}   Comments ${fmtNum(m.comments)}   Reach ${fmtNum(m.reach)}`,
         125, y2, { width: 420, lineBreak: false, ellipsis: true });
    doc.y = y2 + 14;

    // --- Line 3: content (wraps across full width) ---
    doc.font('Helvetica').fillColor('#1f2937').fontSize(10)
       .text(m.content, 50, doc.y, { width: 495 });
    doc.moveDown(0.8);
  });
}

function renderPlatformTable(doc, platforms) {
  if (!platforms?.length) return;
  sectionTitle(doc, 'Platform Breakdown');
  tableHeader(doc, [
    ['Platform',   50,  100],
    ['Mentions',   160, 70,  { align: 'right' }],
    ['Share',      240, 60,  { align: 'right' }],
    ['Sentiment',  310, 70,  { align: 'right' }],
    ['Engagement', 390, 70,  { align: 'right' }],
    ['Reach',      470, 75,  { align: 'right' }],
  ]);
  doc.font('Helvetica').fontSize(10);
  platforms.forEach((p) => {
    pageBreakIfNeeded(doc);
    tableRow(doc, [
      [p.platform, 50, 100, { color: '#334155' }],
      [fmtNum(p.mentions), 160, 70, { color: '#334155', align: 'right' }],
      [`${p.share}%`, 240, 60, { color: '#334155', align: 'right' }],
      [String(p.sentiment), 310, 70, { color: '#334155', align: 'right' }],
      [`${p.engagement}%`, 390, 70, { color: '#334155', align: 'right' }],
      [fmtNum(p.reach), 470, 75, { color: '#334155', align: 'right' }],
    ]);
  });
  doc.moveDown(0.3);
}

function renderSentimentByPlatform(doc, rows) {
  if (!rows?.length) return;
  sectionTitle(doc, 'Sentiment by Platform');
  tableHeader(doc, [
    ['Platform', 50,  110],
    ['Positive', 170, 80, { align: 'right' }],
    ['Neutral',  260, 80, { align: 'right' }],
    ['Negative', 350, 80, { align: 'right' }],
    ['Total',    445, 100, { align: 'right' }],
  ]);
  doc.font('Helvetica').fontSize(10);
  rows.forEach((r) => {
    pageBreakIfNeeded(doc);
    tableRow(doc, [
      [r.platform, 50, 110, { color: '#334155' }],
      [String(r.positive), 170, 80, { color: '#10b981', align: 'right' }],
      [String(r.neutral),  260, 80, { color: '#64748b', align: 'right' }],
      [String(r.negative), 350, 80, { color: '#ef4444', align: 'right' }],
      [fmtNum(r.total),    445, 100, { color: '#334155', align: 'right', font: 'Helvetica-Bold' }],
    ]);
  });
  doc.moveDown(0.3);
}

function renderCompetitorTable(doc, rows) {
  if (!rows?.length) return;
  sectionTitle(doc, 'Competitor Comparison');
  tableHeader(doc, [
    ['Brand',      50,  125],
    ['Mentions',   180, 65, { align: 'right' }],
    ['SoV',        250, 55, { align: 'right' }],
    ['Sentiment',  310, 65, { align: 'right' }],
    ['Engagement', 380, 85, { align: 'right' }],
    ['Reach',      465, 80, { align: 'right' }],
  ]);
  doc.fontSize(10);
  rows.forEach((r) => {
    pageBreakIfNeeded(doc);
    const nameFont  = r.isFocus ? 'Helvetica-Bold' : 'Helvetica';
    const nameColor = r.isFocus ? '#6366f1' : '#334155';
    tableRow(doc, [
      [`${r.name}${r.isFocus ? ' (You)' : ''}`, 50, 125, { color: nameColor, font: nameFont }],
      [fmtNum(r.mentions), 180, 65, { color: '#334155', align: 'right' }],
      [`${r.sov}%`,        250, 55, { color: '#334155', align: 'right' }],
      [String(r.sentiment), 310, 65, { color: '#334155', align: 'right' }],
      [`${r.engagement}%`, 380, 85, { color: '#334155', align: 'right' }],
      [fmtNum(r.reach),    465, 80, { color: '#334155', align: 'right' }],
    ]);
  });
  doc.moveDown(0.3);
}

function renderInfluencerTable(doc, rows) {
  if (!rows?.length) return;
  sectionTitle(doc, 'Top Influencers');
  tableHeader(doc, [
    ['Name',       50,  130],
    ['Platform',   185, 70],
    ['Tier',       255, 45],
    ['Followers',  305, 70, { align: 'right' }],
    ['Engagement', 380, 85, { align: 'right' }],
    ['Influence',  470, 75, { align: 'right' }],
  ]);
  doc.font('Helvetica').fontSize(10);
  rows.forEach((r) => {
    pageBreakIfNeeded(doc);
    tableRow(doc, [
      [String(r.name), 50, 130, { color: '#334155' }],
      [r.platform, 185, 70, { color: '#64748b' }],
      [r.tier, 255, 45, { color: '#64748b' }],
      [fmtNum(r.followers), 305, 70, { color: '#334155', align: 'right' }],
      [`${r.engagement}%`, 380, 85, { color: '#334155', align: 'right' }],
      [`${(r.influence / 10).toFixed(1)}/10`, 470, 75, { color: '#6366f1', font: 'Helvetica-Bold', align: 'right' }],
    ]);
  });
  doc.moveDown(0.3);
}

function renderFooter(doc) {
  // Attach a footer to every page
  const range = doc.bufferedPageRange();
  for (let i = 0; i < range.count; i++) {
    doc.switchToPage(range.start + i);
    doc.font('Helvetica').fontSize(8).fillColor('#94a3b8')
       .text(
         `Voxly Pro   |   Page ${i + 1} of ${range.count}   |   Generated ${new Date().toLocaleString()}`,
         50, 800, { align: 'center', width: 495, lineBreak: false }
       );
  }
}

// ---------------------------------------------------------------
// GET /api/reports/:id/download
// ---------------------------------------------------------------
export const downloadReport = async (req, res) => {
  const report = await prisma.report.findFirst({
    where: { id: req.params.id, userId: req.user.id },
    include: { brand: true },
  });
  if (!report) return res.status(404).json({ error: 'Report not found' });

  const period = parsePeriod({ period: '30d' });
  const subtype = report.subtype || 'summary';
  const customSections = Array.isArray(report.sections) ? report.sections : [];
  const data = await fetchReportData(subtype, report.brandId, period, customSections);

  // Mirror the `want()` helper used by fetchReportData, for PDF/CSV branching.
  const isComp = subtype === 'comprehensive';
  const isCustom = subtype === 'custom';
  const want = (section) => {
    if (isComp) return true;
    if (isCustom) return customSections.includes(section);
    return subtype === section;
  };

  const filename = `${report.name.replace(/[^a-z0-9_-]+/gi, '_')}.${report.format}`;
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

  if (report.format === 'json') {
    res.setHeader('Content-Type', 'application/json');
    res.json({
      report: {
        id: report.id, name: report.name, brand: report.brand?.name,
        subtype, type: report.type, createdAt: report.createdAt,
      },
      period: { from: period.from, to: period.to },
      ...data,
    });
    return;
  }

  if (report.format === 'pdf') {
    res.setHeader('Content-Type', 'application/pdf');
    const doc = new PDFDocument({
      size: 'A4',
      margin: 50,
      bufferPages: true,
      info: { Title: report.name, Subject: SUBTYPE_LABEL[subtype], Author: 'Voxly Pro' },
    });
    doc.pipe(res);

    renderHeader(doc, report, period);
    renderSummaryBox(doc, data.summary);

    if (want('summary')) {
      renderKeywordsTable(doc, data.keywords, 'Top Keywords');
      renderMentionsList(doc, data.mentions, 'Top Mentions');
    }
    if (want('analytics')) {
      renderPlatformTable(doc, data.platforms);
    }
    if (want('sentiment')) {
      renderSentimentByPlatform(doc, data.sentimentByPlatform);
      renderMentionsList(doc, data.topPositive, 'Top Positive Mentions');
      renderMentionsList(doc, data.topNegative, 'Top Negative Mentions');
    }
    if (want('competitors')) {
      renderCompetitorTable(doc, data.competitors);
    }
    if (want('influencers')) {
      renderInfluencerTable(doc, data.influencers);
    }
    if (want('trends')) {
      renderKeywordsTable(doc, data.hashtags, 'Top Hashtags');
      renderKeywordsTable(doc, data.risingKeywords, 'Fastest-Growing Keywords');
    }

    renderFooter(doc);
    doc.end();
    return;
  }

  // CSV — dump all data sections flat
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  const esc = (v) => {
    if (v === null || v === undefined) return '';
    const s = String(v).replace(/"/g, '""');
    return /[",\n\r]/.test(s) ? `"${s}"` : s;
  };
  const lines = [];
  lines.push(`# Report: ${report.name}`);
  lines.push(`# Type: ${SUBTYPE_LABEL[subtype] || subtype}`);
  if (report.brand) lines.push(`# Brand: ${report.brand.name}`);
  lines.push(`# Period: ${period.from.toISOString()} to ${period.to.toISOString()}`);
  lines.push('');
  lines.push('## Summary');
  Object.entries(data.summary).forEach(([k, v]) => {
    lines.push(`${k},${esc(typeof v === 'object' ? JSON.stringify(v) : v)}`);
  });

  if (data.keywords) {
    lines.push('');
    lines.push('## Top Keywords');
    lines.push(['term','kind','count','sentiment','growth'].join(','));
    data.keywords.forEach((k) => lines.push([esc(k.term), esc(k.kind), esc(k.count), esc(k.sentiment), esc(k.growth)].join(',')));
  }
  if (data.platforms) {
    lines.push('');
    lines.push('## Platform Breakdown');
    lines.push(['platform','mentions','share%','sentiment','engagement%','reach'].join(','));
    data.platforms.forEach((p) => lines.push([esc(p.platform), esc(p.mentions), esc(p.share), esc(p.sentiment), esc(p.engagement), esc(p.reach)].join(',')));
  }
  if (data.sentimentByPlatform) {
    lines.push('');
    lines.push('## Sentiment by Platform');
    lines.push(['platform','positive','neutral','negative','total'].join(','));
    data.sentimentByPlatform.forEach((r) => lines.push([esc(r.platform), esc(r.positive), esc(r.neutral), esc(r.negative), esc(r.total)].join(',')));
  }
  if (data.competitors) {
    lines.push('');
    lines.push('## Competitor Comparison');
    lines.push(['brand','isFocus','mentions','sov%','sentiment','engagement%','reach'].join(','));
    data.competitors.forEach((r) => lines.push([esc(r.name), esc(r.isFocus), esc(r.mentions), esc(r.sov), esc(r.sentiment), esc(r.engagement), esc(r.reach)].join(',')));
  }
  if (data.influencers) {
    lines.push('');
    lines.push('## Top Influencers');
    lines.push(['name','platform','tier','followers','engagement%','influence','mentions'].join(','));
    data.influencers.forEach((r) => lines.push([esc(r.name), esc(r.platform), esc(r.tier), esc(r.followers), esc(r.engagement), esc(r.influence), esc(r.mentions)].join(',')));
  }
  if (data.hashtags) {
    lines.push('');
    lines.push('## Top Hashtags');
    lines.push(['term','count','sentiment','growth'].join(','));
    data.hashtags.forEach((k) => lines.push([esc(k.term), esc(k.count), esc(k.sentiment), esc(k.growth)].join(',')));
  }
  if (data.risingKeywords) {
    lines.push('');
    lines.push('## Fastest-Growing Keywords');
    lines.push(['term','kind','count','growth'].join(','));
    data.risingKeywords.forEach((k) => lines.push([esc(k.term), esc(k.kind), esc(k.count), esc(k.growth)].join(',')));
  }
  if (data.mentions) {
    lines.push('');
    lines.push('## Top Mentions');
    lines.push(['postedAt','platform','author','handle','sentiment','sentimentLabel','likes','shares','comments','reach','content'].join(','));
    data.mentions.forEach((m) => lines.push([
      esc(m.postedAt.toISOString()), esc(m.platform), esc(m.authorName), esc(m.authorHandle),
      esc(m.sentiment), esc(m.sentimentLabel), esc(m.likes), esc(m.shares),
      esc(m.comments), esc(m.reach), esc(m.content),
    ].join(',')));
  }
  res.send(lines.join('\n'));
};
