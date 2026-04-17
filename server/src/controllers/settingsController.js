import { z } from 'zod';
import { prisma } from '../db/prisma.js';

export const settingsPatchSchema = z.object({
  theme:          z.enum(['light', 'dark']).optional(),
  language:       z.string().min(2).max(5).optional(),
  timezone:       z.string().min(1).max(60).optional(),
  emailAlerts:    z.boolean().optional(),
  pushAlerts:     z.boolean().optional(),
  defaultBrandId: z.string().min(1).nullable().optional(),
});

const defaultsFor = (userId) => ({
  userId,
  theme: 'light',
  language: 'en',
  timezone: 'UTC',
  emailAlerts: true,
  pushAlerts: false,
  defaultBrandId: null,
});

// GET /api/settings — auto-provisions defaults on first hit.
export const getSettings = async (req, res) => {
  let settings = await prisma.userSettings.findUnique({ where: { userId: req.user.id } });
  if (!settings) {
    settings = await prisma.userSettings.create({ data: defaultsFor(req.user.id) });
  }
  res.json({ settings });
};

// PATCH /api/settings
export const updateSettings = async (req, res) => {
  // If the caller set a defaultBrandId, verify it actually exists.
  if (req.body.defaultBrandId) {
    const brand = await prisma.brand.findFirst({
      where: { OR: [{ id: req.body.defaultBrandId }, { slug: req.body.defaultBrandId }] },
      select: { id: true },
    });
    if (!brand) return res.status(400).json({ error: 'Unknown default brand' });
    req.body.defaultBrandId = brand.id;
  }

  const settings = await prisma.userSettings.upsert({
    where: { userId: req.user.id },
    update: req.body,
    create: { ...defaultsFor(req.user.id), ...req.body },
  });
  res.json({ settings });
};
