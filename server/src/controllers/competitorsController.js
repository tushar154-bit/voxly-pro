import { prisma } from '../db/prisma.js';
import { parsePeriod, pctChange, DAY_MS } from '../utils/period.js';

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
// GET /api/competitors/:brandSlug/timeseries?period=&granularity=week|day
// Weekly (or daily) Share-of-Voice for focus + competitors, ready for a
// multi-line Chart.js dataset.
// -----------------------------------------------------------------
export const getTimeseries = async (req, res) => {
  const { id: brandId, slug, name, color } = req.brand;
  const period = parsePeriod(req.query);
  const granularity = req.query.granularity === 'day' ? 'day' : 'week';
  const bucketMs = granularity === 'day' ? DAY_MS : 7 * DAY_MS;

  // Anchor to the most recent mention across ANY of the tracked brands so the
  // chart stays meaningful regardless of seed freshness.
  const relations = await prisma.competitorRelation.findMany({
    where: { brandId },
    include: { competitorBrand: { select: { id: true, slug: true, name: true, color: true } } },
  });
  const brandList = [
    { id: brandId, slug, name, color },
    ...relations.map((r) => r.competitorBrand),
  ];
  const brandIds = brandList.map((b) => b.id);

  const latest = await prisma.mention.findFirst({
    where: { brandId: { in: brandIds } },
    orderBy: { postedAt: 'desc' },
    select: { postedAt: true },
  });
  const anchor = latest?.postedAt || period.to;
  const to = anchor;
  const from = new Date(to.getTime() - period.days * DAY_MS);

  // One query for the whole window, then bucket in JS.
  const rows = await prisma.mention.findMany({
    where: { brandId: { in: brandIds }, postedAt: { gte: from, lte: to } },
    select: { brandId: true, postedAt: true },
  });

  const bucketCount = Math.max(1, Math.ceil((to.getTime() - from.getTime()) / bucketMs));
  const buckets = Array.from({ length: bucketCount }, (_, i) => ({
    bucketStart: new Date(from.getTime() + i * bucketMs),
    perBrand: Object.fromEntries(brandIds.map((id) => [id, 0])),
  }));

  for (const r of rows) {
    const idx = Math.min(
      buckets.length - 1,
      Math.max(0, Math.floor((r.postedAt.getTime() - from.getTime()) / bucketMs))
    );
    buckets[idx].perBrand[r.brandId]++;
  }

  // Build per-brand sov time series (percentage of bucket total).
  const labelForBucket = (start, idx) => {
    if (granularity === 'week') return `Week ${idx + 1}`;
    return start.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  const brands = brandList.map((b) => ({
    id: b.id,
    slug: b.slug,
    name: b.name,
    color: b.color ?? null,
    mentions: buckets.map((bk) => bk.perBrand[b.id] || 0),
    sov: buckets.map((bk) => {
      const total = Object.values(bk.perBrand).reduce((s, n) => s + n, 0);
      if (!total) return 0;
      return Math.round(((bk.perBrand[b.id] || 0) / total) * 1000) / 10;
    }),
  }));

  res.json({
    period: { from, to, days: period.days, label: period.label },
    granularity,
    labels: buckets.map((bk, i) => labelForBucket(bk.bucketStart, i)),
    bucketStarts: buckets.map((bk) => bk.bucketStart),
    brands,
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
