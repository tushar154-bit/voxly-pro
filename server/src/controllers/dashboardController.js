import { prisma } from '../db/prisma.js';
import { parsePeriod, pctChange } from '../utils/period.js';

// -----------------------------------------------------------------
// GET /api/dashboard/:brandSlug/stats
// -----------------------------------------------------------------
export const getStats = async (req, res) => {
  const { id: brandId, baseFollowers } = req.brand;
  const period = parsePeriod(req.query);

  const baseWhere = { brandId };

  const [
    currAgg,
    prevAgg,
    currCount,
    prevCount,
    authorsCurr,
    authorsPrev,
  ] = await Promise.all([
    prisma.mention.aggregate({
      where: { ...baseWhere, postedAt: { gte: period.from, lte: period.to } },
      _sum: { likes: true, shares: true, comments: true, reach: true },
      _avg: { sentiment: true, engagement: true },
    }),
    prisma.mention.aggregate({
      where: { ...baseWhere, postedAt: { gte: period.prevFrom, lte: period.prevTo } },
      _sum: { likes: true, shares: true, comments: true, reach: true },
      _avg: { sentiment: true, engagement: true },
    }),
    prisma.mention.count({ where: { ...baseWhere, postedAt: { gte: period.from, lte: period.to } } }),
    prisma.mention.count({ where: { ...baseWhere, postedAt: { gte: period.prevFrom, lte: period.prevTo } } }),
    prisma.mention.findMany({
      where: { ...baseWhere, postedAt: { gte: period.from, lte: period.to } },
      distinct: ['authorHandle'],
      select: { authorHandle: true },
    }),
    prisma.mention.findMany({
      where: { ...baseWhere, postedAt: { gte: period.prevFrom, lte: period.prevTo } },
      distinct: ['authorHandle'],
      select: { authorHandle: true },
    }),
  ]);

  const reach = currAgg._sum.reach || 0;
  const prevReach = prevAgg._sum.reach || 0;
  const likes = currAgg._sum.likes || 0;
  const comments = currAgg._sum.comments || 0;

  res.json({
    period: { from: period.from, to: period.to, label: period.label, days: period.days },
    metrics: {
      mentions: {
        value: currCount,
        change: pctChange(currCount, prevCount),
      },
      sentiment: {
        value: Math.round((currAgg._avg.sentiment || 0) * 10) / 10,
        change: pctChange(currAgg._avg.sentiment || 0, prevAgg._avg.sentiment || 0),
      },
      engagement: {
        value: Math.round((currAgg._avg.engagement || 0) * 100) / 100,
        change: pctChange(currAgg._avg.engagement || 0, prevAgg._avg.engagement || 0),
      },
      reach: {
        value: reach,
        change: pctChange(reach, prevReach),
      },
      authors: {
        value: authorsCurr.length,
        change: pctChange(authorsCurr.length, authorsPrev.length),
      },
      followers: {
        value: baseFollowers,
        change: 0,
      },
      likes,
      comments,
    },
  });
};

// -----------------------------------------------------------------
// GET /api/dashboard/:brandSlug/posts?platform=&limit=
// -----------------------------------------------------------------
export const getTopPosts = async (req, res) => {
  const { id: brandId } = req.brand;
  const period = parsePeriod(req.query);
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit || '10', 10)));
  const platform = req.query.platform && req.query.platform !== 'all' ? req.query.platform : undefined;

  const posts = await prisma.mention.findMany({
    where: {
      brandId,
      postedAt: { gte: period.from, lte: period.to },
      ...(platform ? { platform } : {}),
    },
    orderBy: [{ reach: 'desc' }, { likes: 'desc' }],
    take: limit,
    select: {
      id: true,
      platform: true,
      authorName: true,
      authorHandle: true,
      authorAvatar: true,
      content: true,
      sentiment: true,
      sentimentLabel: true,
      likes: true,
      shares: true,
      comments: true,
      reach: true,
      engagement: true,
      postedAt: true,
    },
  });

  res.json({ posts });
};

// -----------------------------------------------------------------
// GET /api/dashboard/:brandSlug/activity?limit=
// -----------------------------------------------------------------
export const getActivity = async (req, res) => {
  const { id: brandId } = req.brand;
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit || '20', 10)));

  const [recent, alerts] = await Promise.all([
    prisma.mention.findMany({
      where: { brandId },
      orderBy: { postedAt: 'desc' },
      take: limit,
      select: {
        id: true,
        platform: true,
        authorName: true,
        authorHandle: true,
        authorAvatar: true,
        content: true,
        sentimentLabel: true,
        postedAt: true,
        likes: true,
        comments: true,
      },
    }),
    prisma.alert.findMany({
      where: { brandId },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
  ]);

  res.json({ recent, alerts });
};

// -----------------------------------------------------------------
// GET /api/dashboard/:brandSlug/hourly?hours=24
// 24 (or N) hourly buckets ending now + peak/avg/total summary.
// -----------------------------------------------------------------
export const getHourlyVolume = async (req, res) => {
  const { id: brandId } = req.brand;
  const hours = Math.min(72, Math.max(6, parseInt(req.query.hours || '24', 10)));

  // Anchor the window to the most recent mention rather than wall-clock now,
  // so the chart stays meaningful regardless of seed freshness.
  const latest = await prisma.mention.findFirst({
    where: { brandId },
    orderBy: { postedAt: 'desc' },
    select: { postedAt: true },
  });
  const now = latest?.postedAt || new Date();
  const from = new Date(now.getTime() - hours * 60 * 60 * 1000);

  const rows = await prisma.mention.findMany({
    where: { brandId, postedAt: { gte: from, lte: now } },
    select: { postedAt: true },
  });

  // Build N buckets of 1 hour each
  const buckets = Array.from({ length: hours }, (_, i) => {
    const bucketStart = new Date(from.getTime() + i * 60 * 60 * 1000);
    return { bucketStart, count: 0 };
  });

  for (const r of rows) {
    const idx = Math.min(
      buckets.length - 1,
      Math.max(0, Math.floor((r.postedAt.getTime() - from.getTime()) / 3600000))
    );
    buckets[idx].count++;
  }

  const total = rows.length;
  const peak = buckets.reduce((p, b) => (b.count > p.count ? b : p), buckets[0]);
  const avg = hours > 0 ? Math.round((total / hours) * 10) / 10 : 0;
  const hourLabel = (d) =>
    d.toLocaleTimeString(undefined, { hour: 'numeric', hour12: true }).replace(' ', '');

  res.json({
    buckets,
    summary: {
      total,
      avgPerHour: avg,
      peak: { hourStart: peak.bucketStart, count: peak.count, hourLabel: hourLabel(peak.bucketStart) },
    },
  });
};

// -----------------------------------------------------------------
// GET /api/dashboard/:brandSlug/emotions
// 8-emotion mix derived from sentiment distribution.
// -----------------------------------------------------------------
export const getEmotionMix = async (req, res) => {
  const { id: brandId } = req.brand;
  const period = parsePeriod(req.query);

  const rows = await prisma.mention.groupBy({
    by: ['sentimentLabel'],
    where: { brandId, postedAt: { gte: period.from, lte: period.to } },
    _count: { _all: true },
  });

  const counts = { positive: 0, neutral: 0, negative: 0 };
  for (const r of rows) counts[r.sentimentLabel] = r._count._all;
  const total = counts.positive + counts.neutral + counts.negative || 1;

  // Convert to percentages
  const pPos = counts.positive / total;
  const pNeu = counts.neutral / total;
  const pNeg = counts.negative / total;

  // Map 3-way sentiment → 8 emotions (Plutchik-ish)
  const mix = {
    Joy:          Math.round(pPos * 0.45 * 100),
    Trust:        Math.round(pPos * 0.35 * 100),
    Anticipation: Math.round((pPos * 0.20 + pNeu * 0.5) * 100),
    Surprise:     Math.round(pNeu * 0.5 * 100),
    Fear:         Math.round(pNeg * 0.25 * 100),
    Sadness:      Math.round(pNeg * 0.30 * 100),
    Disgust:      Math.round(pNeg * 0.20 * 100),
    Anger:        Math.round(pNeg * 0.25 * 100),
  };

  res.json({
    period: { from: period.from, to: period.to, label: period.label },
    totals: counts,
    emotions: Object.entries(mix).map(([label, value]) => ({ label, value })),
  });
};

// -----------------------------------------------------------------
// GET /api/dashboard/:brandSlug/platforms
// -----------------------------------------------------------------
export const getPlatformBreakdown = async (req, res) => {
  const { id: brandId } = req.brand;
  const period = parsePeriod(req.query);

  const grouped = await prisma.mention.groupBy({
    by: ['platform'],
    where: { brandId, postedAt: { gte: period.from, lte: period.to } },
    _count: { _all: true },
    _avg: { sentiment: true, engagement: true },
    _sum: { reach: true, likes: true, shares: true, comments: true },
  });

  const total = grouped.reduce((s, g) => s + g._count._all, 0) || 1;

  res.json({
    period: { from: period.from, to: period.to, label: period.label },
    total,
    platforms: grouped
      .map((g) => ({
        platform: g.platform,
        mentions: g._count._all,
        share: Math.round((g._count._all / total) * 1000) / 10,
        sentiment: Math.round((g._avg.sentiment || 0) * 10) / 10,
        engagement: Math.round((g._avg.engagement || 0) * 100) / 100,
        reach: g._sum.reach || 0,
        likes: g._sum.likes || 0,
        shares: g._sum.shares || 0,
        comments: g._sum.comments || 0,
      }))
      .sort((a, b) => b.mentions - a.mentions),
  });
};
