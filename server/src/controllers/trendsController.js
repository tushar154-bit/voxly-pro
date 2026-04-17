import { prisma } from '../db/prisma.js';

// GET /api/trends?brand=slug&kind=word|hashtag&sort=count|growth&limit=
export const getTrends = async (req, res) => {
  const brandSlug = req.query.brand;
  const kind = req.query.kind && ['word', 'hashtag'].includes(req.query.kind) ? req.query.kind : undefined;
  const sortField = req.query.sort === 'growth' ? 'growth' : 'count';
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit || '25', 10)));

  let brandId;
  if (brandSlug) {
    const brand = await prisma.brand.findFirst({
      where: { OR: [{ id: brandSlug }, { slug: brandSlug }] },
      select: { id: true },
    });
    if (!brand) return res.status(404).json({ error: 'Brand not found' });
    brandId = brand.id;
  }

  const keywords = await prisma.keyword.findMany({
    where: {
      ...(brandId ? { brandId } : {}),
      ...(kind ? { kind } : {}),
    },
    orderBy: { [sortField]: 'desc' },
    take: limit,
    include: { brand: { select: { id: true, slug: true, name: true, color: true } } },
  });

  res.json({ trends: keywords });
};

// GET /api/trends/hashtags?brand=&limit=
export const getTrendingHashtags = async (req, res) => {
  req.query.kind = 'hashtag';
  return getTrends(req, res);
};

// GET /api/trends/topics
// Cross-brand: aggregate same term across brands, ranked by total volume.
export const getCrossBrandTopics = async (req, res) => {
  const kind = req.query.kind && ['word', 'hashtag'].includes(req.query.kind) ? req.query.kind : 'word';
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit || '20', 10)));

  const grouped = await prisma.keyword.groupBy({
    by: ['term'],
    where: { kind },
    _sum: { count: true },
    _avg: { sentiment: true, growth: true },
    orderBy: { _sum: { count: 'desc' } },
    take: limit,
  });

  res.json({
    kind,
    topics: grouped.map((g) => ({
      term: g.term,
      totalCount: g._sum.count || 0,
      avgSentiment: Math.round((g._avg.sentiment || 0) * 10) / 10,
      avgGrowth: Math.round((g._avg.growth || 0) * 10) / 10,
    })),
  });
};

// GET /api/trends/rising?brand=&limit=
// Fastest-growing keywords (growth desc)
export const getRisingTrends = async (req, res) => {
  req.query.sort = 'growth';
  return getTrends(req, res);
};
