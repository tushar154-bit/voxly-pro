import { prisma } from '../db/prisma.js';
import { parsePeriod, pctChange, DAY_MS } from '../utils/period.js';

// -----------------------------------------------------------------
// GET /api/analytics/:brandSlug/overview
// -----------------------------------------------------------------
export const getOverview = async (req, res) => {
  const { id: brandId } = req.brand;
  const period = parsePeriod(req.query);

  const [currAgg, prevAgg, currCount, prevCount, authorsCurr] = await Promise.all([
    prisma.mention.aggregate({
      where: { brandId, postedAt: { gte: period.from, lte: period.to } },
      _sum: { reach: true, likes: true, shares: true, comments: true },
      _avg: { sentiment: true, engagement: true },
    }),
    prisma.mention.aggregate({
      where: { brandId, postedAt: { gte: period.prevFrom, lte: period.prevTo } },
      _sum: { reach: true, likes: true, shares: true, comments: true },
      _avg: { sentiment: true, engagement: true },
    }),
    prisma.mention.count({ where: { brandId, postedAt: { gte: period.from, lte: period.to } } }),
    prisma.mention.count({ where: { brandId, postedAt: { gte: period.prevFrom, lte: period.prevTo } } }),
    prisma.mention.findMany({
      where: { brandId, postedAt: { gte: period.from, lte: period.to } },
      distinct: ['authorHandle'],
      select: { authorHandle: true },
    }),
  ]);

  const sentiment = Math.round((currAgg._avg.sentiment || 0) * 10) / 10;
  const awarenessScore = Math.round((sentiment / 10) * 10) / 10;

  res.json({
    period: { from: period.from, to: period.to, label: period.label, days: period.days },
    totals: {
      mentions: { value: currCount, change: pctChange(currCount, prevCount) },
      sentiment: { value: sentiment, change: pctChange(sentiment, prevAgg._avg.sentiment || 0) },
      authors: { value: authorsCurr.length, change: 0 },
      engagement: {
        value: Math.round((currAgg._avg.engagement || 0) * 100) / 100,
        change: pctChange(currAgg._avg.engagement || 0, prevAgg._avg.engagement || 0),
      },
      reach: {
        value: currAgg._sum.reach || 0,
        change: pctChange(currAgg._sum.reach || 0, prevAgg._sum.reach || 0),
      },
      awarenessScore,
    },
  });
};

// -----------------------------------------------------------------
// GET /api/analytics/:brandSlug/keywords?kind=word|hashtag|all&limit=
// -----------------------------------------------------------------
export const getKeywords = async (req, res) => {
  const { id: brandId } = req.brand;
  const kind = req.query.kind && req.query.kind !== 'all' ? req.query.kind : undefined;
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit || '20', 10)));

  const keywords = await prisma.keyword.findMany({
    where: { brandId, ...(kind ? { kind } : {}) },
    orderBy: { count: 'desc' },
    take: limit,
  });

  res.json({ keywords });
};

// -----------------------------------------------------------------
// GET /api/analytics/:brandSlug/platforms
// Per-platform detailed metrics (for the metrics table / comparison charts)
// -----------------------------------------------------------------
export const getPlatforms = async (req, res) => {
  const { id: brandId } = req.brand;
  const period = parsePeriod(req.query);

  const [curr, prev] = await Promise.all([
    prisma.mention.groupBy({
      by: ['platform'],
      where: { brandId, postedAt: { gte: period.from, lte: period.to } },
      _count: { _all: true },
      _avg: { sentiment: true, engagement: true },
      _sum: { reach: true, likes: true, shares: true, comments: true },
    }),
    prisma.mention.groupBy({
      by: ['platform'],
      where: { brandId, postedAt: { gte: period.prevFrom, lte: period.prevTo } },
      _count: { _all: true },
    }),
  ]);

  const prevByPlatform = Object.fromEntries(prev.map((p) => [p.platform, p._count._all]));

  res.json({
    period: { from: period.from, to: period.to, label: period.label },
    platforms: curr
      .map((g) => ({
        platform: g.platform,
        mentions: g._count._all,
        sentiment: Math.round((g._avg.sentiment || 0) * 10) / 10,
        engagement: Math.round((g._avg.engagement || 0) * 100) / 100,
        reach: g._sum.reach || 0,
        likes: g._sum.likes || 0,
        shares: g._sum.shares || 0,
        comments: g._sum.comments || 0,
        growth: pctChange(g._count._all, prevByPlatform[g.platform] || 0),
      }))
      .sort((a, b) => b.mentions - a.mentions),
  });
};

// -----------------------------------------------------------------
// GET /api/analytics/:brandSlug/sentiment?granularity=day|week
// Sentiment time-series
// -----------------------------------------------------------------
export const getSentimentSeries = async (req, res) => {
  const { id: brandId } = req.brand;
  const period = parsePeriod(req.query);
  const granularity = req.query.granularity === 'week' ? 'week' : 'day';
  const bucketMs = granularity === 'week' ? 7 * DAY_MS : DAY_MS;

  // Pull mentions in period with just the fields we need — JS-side bucketing
  // keeps Prisma portable without raw SQL.
  const rows = await prisma.mention.findMany({
    where: { brandId, postedAt: { gte: period.from, lte: period.to } },
    select: { postedAt: true, sentiment: true, sentimentLabel: true },
  });

  const start = period.from.getTime();
  const bucketCount = Math.ceil((period.to.getTime() - start) / bucketMs);
  const buckets = Array.from({ length: bucketCount }, (_, i) => ({
    bucketStart: new Date(start + i * bucketMs),
    positive: 0,
    neutral: 0,
    negative: 0,
    total: 0,
    sentimentSum: 0,
  }));

  for (const r of rows) {
    const idx = Math.min(buckets.length - 1, Math.floor((r.postedAt.getTime() - start) / bucketMs));
    const b = buckets[idx];
    if (!b) continue;
    b.total++;
    b.sentimentSum += r.sentiment;
    if (r.sentimentLabel === 'positive') b.positive++;
    else if (r.sentimentLabel === 'negative') b.negative++;
    else b.neutral++;
  }

  res.json({
    granularity,
    series: buckets.map((b) => ({
      bucketStart: b.bucketStart,
      positive: b.positive,
      neutral: b.neutral,
      negative: b.negative,
      total: b.total,
      avgSentiment: b.total ? Math.round((b.sentimentSum / b.total) * 10) / 10 : 0,
    })),
  });
};

// -----------------------------------------------------------------
// GET /api/analytics/:brandSlug/swot
// Auto-generated SWOT derived from current metrics.
// -----------------------------------------------------------------
export const getSwot = async (req, res) => {
  const { id: brandId, name } = req.brand;
  const period = parsePeriod({ period: '30d' });

  const [agg, platforms] = await Promise.all([
    prisma.mention.aggregate({
      where: { brandId, postedAt: { gte: period.from, lte: period.to } },
      _avg: { sentiment: true, engagement: true },
      _sum: { reach: true },
    }),
    prisma.mention.groupBy({
      by: ['platform'],
      where: { brandId, postedAt: { gte: period.from, lte: period.to } },
      _count: { _all: true },
    }),
  ]);

  const avgSentiment = agg._avg.sentiment || 0;
  const avgEngagement = agg._avg.engagement || 0;
  const reach = agg._sum.reach || 0;
  const topPlatform = [...platforms].sort((a, b) => b._count._all - a._count._all)[0];

  const strengths = [];
  const weaknesses = [];
  const opportunities = [];
  const threats = [];

  if (avgSentiment >= 75) strengths.push(`Strong positive sentiment (${avgSentiment.toFixed(1)}/100)`);
  else if (avgSentiment < 55) weaknesses.push(`Sentiment is trailing at ${avgSentiment.toFixed(1)}/100`);
  if (avgEngagement >= 10) strengths.push(`High engagement rate (${avgEngagement.toFixed(1)}%)`);
  else if (avgEngagement < 5) weaknesses.push(`Engagement below benchmarks (${avgEngagement.toFixed(1)}%)`);
  if (reach > 10_000_000) strengths.push(`Broad reach — ${(reach / 1_000_000).toFixed(1)}M impressions`);
  if (topPlatform) {
    strengths.push(`Leading channel: ${topPlatform.platform}`);
    opportunities.push(`Scale winning content formats from ${topPlatform.platform} to other channels`);
  }
  opportunities.push('Partner with tier-1 influencers to amplify launches');
  opportunities.push('Repackage top-performing posts into weekly email digests');
  threats.push('Competitors may replicate viral formats within days');
  if (avgSentiment < 65) threats.push('Negative sentiment could snowball without intervention');

  res.json({
    brand: name,
    period: { from: period.from, to: period.to, label: '30d' },
    swot: {
      strengths: strengths.slice(0, 4),
      weaknesses: weaknesses.slice(0, 4),
      opportunities: opportunities.slice(0, 4),
      threats: threats.slice(0, 4),
    },
  });
};
