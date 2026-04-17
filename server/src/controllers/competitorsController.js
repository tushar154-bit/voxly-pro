import { prisma } from '../db/prisma.js';
import { parsePeriod, pctChange } from '../utils/period.js';

const aggregateForBrand = async (brandId, from, to) => {
  const [agg, count, authors] = await Promise.all([
    prisma.mention.aggregate({
      where: { brandId, postedAt: { gte: from, lte: to } },
      _avg: { sentiment: true, engagement: true },
      _sum: { reach: true, likes: true, shares: true, comments: true },
    }),
    prisma.mention.count({ where: { brandId, postedAt: { gte: from, lte: to } } }),
    prisma.mention.findMany({
      where: { brandId, postedAt: { gte: from, lte: to } },
      distinct: ['authorHandle'],
      select: { authorHandle: true },
    }),
  ]);
  return {
    mentions: count,
    sentiment: Math.round((agg._avg.sentiment || 0) * 10) / 10,
    engagement: Math.round((agg._avg.engagement || 0) * 100) / 100,
    reach: agg._sum.reach || 0,
    likes: agg._sum.likes || 0,
    shares: agg._sum.shares || 0,
    comments: agg._sum.comments || 0,
    authors: authors.length,
  };
};

// -----------------------------------------------------------------
// GET /api/competitors/:brandSlug
// Returns the focus brand + its competitors, each with period metrics.
// -----------------------------------------------------------------
export const listCompetitors = async (req, res) => {
  const { id: brandId, slug, name, industry, color, logoUrl, baseFollowers } = req.brand;
  const period = parsePeriod(req.query);

  const relations = await prisma.competitorRelation.findMany({
    where: { brandId },
    include: { competitorBrand: true },
  });

  const focus = {
    id: brandId,
    slug, name, industry, color, logoUrl, baseFollowers,
    metrics: await aggregateForBrand(brandId, period.from, period.to),
    prevMetrics: await aggregateForBrand(brandId, period.prevFrom, period.prevTo),
  };

  const competitors = await Promise.all(
    relations.map(async (r) => {
      const c = r.competitorBrand;
      const [curr, prev] = await Promise.all([
        aggregateForBrand(c.id, period.from, period.to),
        aggregateForBrand(c.id, period.prevFrom, period.prevTo),
      ]);
      return {
        id: c.id,
        slug: c.slug,
        name: c.name,
        industry: c.industry,
        color: c.color,
        logoUrl: c.logoUrl,
        baseFollowers: c.baseFollowers,
        metrics: curr,
        prevMetrics: prev,
        mentionsChange: pctChange(curr.mentions, prev.mentions),
        sentimentChange: pctChange(curr.sentiment, prev.sentiment),
      };
    })
  );

  res.json({
    period: { from: period.from, to: period.to, label: period.label, days: period.days },
    focus,
    competitors,
  });
};

// -----------------------------------------------------------------
// GET /api/competitors/:brandSlug/compare?metric=mentions|sentiment|engagement|reach
// Side-by-side metric for focus brand + competitors (single value per brand).
// -----------------------------------------------------------------
export const compareMetric = async (req, res) => {
  const { id: brandId, slug, name } = req.brand;
  const metric = ['mentions', 'sentiment', 'engagement', 'reach'].includes(req.query.metric)
    ? req.query.metric
    : 'mentions';
  const period = parsePeriod(req.query);

  const relations = await prisma.competitorRelation.findMany({
    where: { brandId },
    include: { competitorBrand: { select: { id: true, slug: true, name: true, color: true } } },
  });

  const brands = [
    { id: brandId, slug, name },
    ...relations.map((r) => r.competitorBrand),
  ];

  const rows = await Promise.all(
    brands.map(async (b) => {
      const m = await aggregateForBrand(b.id, period.from, period.to);
      return { brandId: b.id, slug: b.slug, name: b.name, color: b.color ?? null, value: m[metric] };
    })
  );

  rows.sort((a, b) => b.value - a.value);
  res.json({
    metric,
    period: { from: period.from, to: period.to, label: period.label },
    rows,
  });
};
