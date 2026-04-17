import { prisma } from '../db/prisma.js';

// GET /api/journey/:brandSlug — customer journey stages for the brand
export const getJourney = async (req, res) => {
  const { id: brandId, slug, name } = req.brand;

  const stages = await prisma.journeyStage.findMany({
    where: { brandId },
    orderBy: { order: 'asc' },
  });

  // Derive funnel summary
  const first = stages[0];
  const last = stages[stages.length - 1];
  const overallConversion =
    first && last && first.customers > 0
      ? Math.round((last.customers / first.customers) * 1000) / 10
      : 0;
  const avgSentiment =
    stages.length > 0
      ? Math.round((stages.reduce((s, x) => s + x.sentiment, 0) / stages.length) * 10) / 10
      : 0;

  res.json({
    brand: { id: brandId, slug, name },
    summary: {
      totalCustomers: first?.customers || 0,
      endCustomers: last?.customers || 0,
      overallConversion,
      avgSentiment,
      stageCount: stages.length,
    },
    stages,
  });
};
