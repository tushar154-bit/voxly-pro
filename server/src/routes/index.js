import { Router } from 'express';
import authRoutes from './auth.js';
import brandRoutes from './brands.js';
import dashboardRoutes from './dashboard.js';
import analyticsRoutes from './analytics.js';
import realtimeRoutes from './realtime.js';
import competitorsRoutes from './competitors.js';
import influencersRoutes from './influencers.js';
import journeyRoutes from './journey.js';
import reportsRoutes from './reports.js';
import settingsRoutes from './settings.js';
import trendsRoutes from './trends.js';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ ok: true, ts: Date.now() });
});

router.use('/auth', authRoutes);
router.use('/brands', brandRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/realtime', realtimeRoutes);
router.use('/competitors', competitorsRoutes);
router.use('/influencers', influencersRoutes);
router.use('/journey', journeyRoutes);
router.use('/reports', reportsRoutes);
router.use('/settings', settingsRoutes);
router.use('/trends', trendsRoutes);

export default router;
