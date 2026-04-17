import { prisma } from '../db/prisma.js';

// GET /api/brands — lightweight list of all brands with aggregate counts
export const listBrands = async (req, res) => {
  const brands = await prisma.brand.findMany({
    orderBy: { name: 'asc' },
    select: {
      id: true,
      slug: true,
      name: true,
      industry: true,
      country: true,
      description: true,
      logoUrl: true,
      color: true,
      baseFollowers: true,
      _count: {
        select: {
          mentions: true,
          influencerLinks: true,
          competitorsOf: true,
        },
      },
    },
  });

  res.json({
    brands: brands.map((b) => ({
      id: b.id,
      slug: b.slug,
      name: b.name,
      industry: b.industry,
      country: b.country,
      description: b.description,
      logoUrl: b.logoUrl,
      color: b.color,
      baseFollowers: b.baseFollowers,
      mentionCount: b._count.mentions,
      influencerCount: b._count.influencerLinks,
      competitorCount: b._count.competitorsOf,
    })),
  });
};

// GET /api/brands/:idOrSlug — full detail (with competitors + journey stages)
export const getBrand = async (req, res) => {
  const { idOrSlug } = req.params;
  const brand = await prisma.brand.findFirst({
    where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] },
    include: {
      journeyStages: { orderBy: { order: 'asc' } },
      competitorsOf: {
        include: {
          competitorBrand: {
            select: { id: true, slug: true, name: true, industry: true, logoUrl: true, color: true },
          },
        },
      },
      _count: {
        select: { mentions: true, influencerLinks: true, keywords: true, alerts: true },
      },
    },
  });

  if (!brand) return res.status(404).json({ error: 'Brand not found' });

  res.json({
    brand: {
      id: brand.id,
      slug: brand.slug,
      name: brand.name,
      industry: brand.industry,
      country: brand.country,
      description: brand.description,
      logoUrl: brand.logoUrl,
      color: brand.color,
      baseFollowers: brand.baseFollowers,
      createdAt: brand.createdAt,
      stats: {
        mentions: brand._count.mentions,
        influencers: brand._count.influencerLinks,
        keywords: brand._count.keywords,
        alerts: brand._count.alerts,
      },
      competitors: brand.competitorsOf.map((c) => c.competitorBrand),
      journeyStages: brand.journeyStages,
    },
  });
};
