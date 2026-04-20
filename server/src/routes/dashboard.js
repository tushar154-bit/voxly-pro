import { Router } from 'express';
import {
  getStats,
  getTopPosts,
  getActivity,
  getPlatformBreakdown,
  getHourlyVolume,
  getEmotionMix,
} from '../controllers/dashboardController.js';
import { requireAuth } from '../middleware/auth.js';
import { loadBrand } from '../services/brandLookup.js';

const router = Router();

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.use(requireAuth);

router.get('/:brandSlug/stats',     loadBrand, asyncHandler(getStats));
router.get('/:brandSlug/posts',     loadBrand, asyncHandler(getTopPosts));
router.get('/:brandSlug/activity',  loadBrand, asyncHandler(getActivity));
router.get('/:brandSlug/platforms', loadBrand, asyncHandler(getPlatformBreakdown));
router.get('/:brandSlug/hourly',    loadBrand, asyncHandler(getHourlyVolume));
router.get('/:brandSlug/emotions',  loadBrand, asyncHandler(getEmotionMix));

export default router;
