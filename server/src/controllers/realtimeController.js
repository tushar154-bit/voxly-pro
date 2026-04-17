import { prisma } from '../db/prisma.js';

// -----------------------------------------------------------------
// GET /api/realtime/:brandSlug/feed?since=<iso>&limit=
// Polling-based live feed. The client hits this every N seconds with
// `since` = the latest postedAt it has seen.
// -----------------------------------------------------------------
export const getLiveFeed = async (req, res) => {
  const { id: brandId } = req.brand;
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit || '25', 10)));
  const since = req.query.since ? new Date(req.query.since) : null;

  const where = { brandId };
  if (since && !Number.isNaN(since.getTime())) {
    where.postedAt = { gt: since };
  }

  const mentions = await prisma.mention.findMany({
    where,
    orderBy: { postedAt: 'desc' },
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

  res.json({
    serverTime: new Date(),
    latestAt: mentions[0]?.postedAt ?? null,
    count: mentions.length,
    mentions,
  });
};

// -----------------------------------------------------------------
// GET /api/realtime/:brandSlug/pulse
// Fast summary (mentions/min, current sentiment) for status badges.
// -----------------------------------------------------------------
export const getPulse = async (req, res) => {
  const { id: brandId } = req.brand;
  const now = new Date();
  const fiveMinAgo = new Date(now.getTime() - 5 * 60 * 1000);
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

  const [last5min, lastHour] = await Promise.all([
    prisma.mention.aggregate({
      where: { brandId, postedAt: { gte: fiveMinAgo } },
      _count: { _all: true },
      _avg: { sentiment: true },
    }),
    prisma.mention.aggregate({
      where: { brandId, postedAt: { gte: oneHourAgo } },
      _count: { _all: true },
      _avg: { sentiment: true },
    }),
  ]);

  res.json({
    serverTime: now,
    last5min: {
      mentions: last5min._count._all,
      perMinute: Math.round((last5min._count._all / 5) * 10) / 10,
      avgSentiment: Math.round((last5min._avg.sentiment || 0) * 10) / 10,
    },
    lastHour: {
      mentions: lastHour._count._all,
      perMinute: Math.round((lastHour._count._all / 60) * 10) / 10,
      avgSentiment: Math.round((lastHour._avg.sentiment || 0) * 10) / 10,
    },
  });
};
