import { z } from 'zod';
import { prisma } from '../db/prisma.js';

const SORT_FIELDS = {
  followers:  { followers: 'desc' },
  engagement: { engagement: 'desc' },
  influence:  { influence: 'desc' },
  mentions:   { mentions: 'desc' },
  sentiment:  { sentiment: 'desc' },
};

// GET /api/influencers?brand=slug&tier=tier1|2|3&platform=&sort=&limit=
export const listInfluencers = async (req, res) => {
  const brandSlug = req.query.brand;
  const tier = req.query.tier && ['tier1', 'tier2', 'tier3'].includes(req.query.tier)
    ? req.query.tier : undefined;
  const platform = req.query.platform && req.query.platform !== 'all' ? req.query.platform : undefined;
  const sort = SORT_FIELDS[req.query.sort] || SORT_FIELDS.influence;
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit || '30', 10)));

  // If brand filter is provided, constrain to that brand's linked influencers.
  let influencerIdFilter;
  if (brandSlug) {
    const brand = await prisma.brand.findFirst({
      where: { OR: [{ id: brandSlug }, { slug: brandSlug }] },
      select: { id: true },
    });
    if (!brand) return res.status(404).json({ error: 'Brand not found' });
    const links = await prisma.brandInfluencer.findMany({
      where: { brandId: brand.id },
      select: { influencerId: true },
    });
    influencerIdFilter = links.map((l) => l.influencerId);
    if (influencerIdFilter.length === 0) return res.json({ influencers: [] });
  }

  const influencers = await prisma.influencer.findMany({
    where: {
      ...(influencerIdFilter ? { id: { in: influencerIdFilter } } : {}),
      ...(tier ? { tier } : {}),
      ...(platform ? { platform } : {}),
    },
    orderBy: sort,
    take: limit,
  });

  // Attach isPinned flag for current user.
  const pinnedRows = await prisma.pinnedInfluencer.findMany({
    where: { userId: req.user.id, influencerId: { in: influencers.map((i) => i.id) } },
    select: { influencerId: true },
  });
  const pinnedSet = new Set(pinnedRows.map((p) => p.influencerId));

  res.json({
    influencers: influencers.map((i) => ({ ...i, isPinned: pinnedSet.has(i.id) })),
  });
};

// GET /api/influencers/:id
export const getInfluencer = async (req, res) => {
  const influencer = await prisma.influencer.findUnique({
    where: { id: req.params.id },
    include: {
      brandLinks: { include: { brand: { select: { id: true, slug: true, name: true } } } },
    },
  });
  if (!influencer) return res.status(404).json({ error: 'Influencer not found' });

  const pinned = await prisma.pinnedInfluencer.findUnique({
    where: { userId_influencerId: { userId: req.user.id, influencerId: influencer.id } },
  });

  res.json({
    influencer: {
      ...influencer,
      brands: influencer.brandLinks.map((b) => b.brand),
      isPinned: !!pinned,
    },
  });
};

// GET /api/influencers/pinned — list current user's pinned influencers
export const listPinned = async (req, res) => {
  const rows = await prisma.pinnedInfluencer.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: 'desc' },
    include: { influencer: true },
  });
  res.json({
    pinned: rows.map((p) => ({
      ...p.influencer,
      isPinned: true,
      pinnedAt: p.createdAt,
    })),
  });
};

// POST /api/influencers/:id/pin
export const pinInfluencer = async (req, res) => {
  const influencer = await prisma.influencer.findUnique({ where: { id: req.params.id } });
  if (!influencer) return res.status(404).json({ error: 'Influencer not found' });

  const row = await prisma.pinnedInfluencer.upsert({
    where: { userId_influencerId: { userId: req.user.id, influencerId: influencer.id } },
    update: {},
    create: { userId: req.user.id, influencerId: influencer.id },
  });

  res.status(201).json({ pinned: true, pinnedAt: row.createdAt });
};

// DELETE /api/influencers/:id/pin
export const unpinInfluencer = async (req, res) => {
  await prisma.pinnedInfluencer.deleteMany({
    where: { userId: req.user.id, influencerId: req.params.id },
  });
  res.json({ pinned: false });
};
