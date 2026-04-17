import { prisma } from '../db/prisma.js';

// Given an id or slug, return { id, slug, name, industry, color, baseFollowers, ... } or null.
export const findBrand = async (idOrSlug) => {
  if (!idOrSlug) return null;
  return prisma.brand.findFirst({
    where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] },
  });
};

// Express middleware: attaches req.brand. 404s if not found.
export const loadBrand = async (req, res, next) => {
  const brand = await findBrand(req.params.brandSlug || req.params.idOrSlug);
  if (!brand) return res.status(404).json({ error: 'Brand not found' });
  req.brand = brand;
  next();
};
