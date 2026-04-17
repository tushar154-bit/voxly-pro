import { Router } from 'express';
import {
  getOverview,
  getKeywords,
  getPlatforms,
  getSentimentSeries,
  getSwot,
} from '../controllers/analyticsController.js';
import { requireAuth } from '../middleware/auth.js';
import { loadBrand } from '../services/brandLookup.js';

const router = Router();

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.use(requireAuth);

router.get('/:brandSlug/overview',  loadBrand, asyncHandler(getOverview));
router.get('/:brandSlug/keywords',  loadBrand, asyncHandler(getKeywords));
router.get('/:brandSlug/platforms', loadBrand, asyncHandler(getPlatforms));
router.get('/:brandSlug/sentiment', loadBrand, asyncHandler(getSentimentSeries));
router.get('/:brandSlug/swot',      loadBrand, asyncHandler(getSwot));

export default router;
