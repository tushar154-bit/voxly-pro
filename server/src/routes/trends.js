import { Router } from 'express';
import {
  getTrends,
  getTrendingHashtags,
  getCrossBrandTopics,
  getRisingTrends,
} from '../controllers/trendsController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.use(requireAuth);

// Specific paths before the root handler so they aren't shadowed.
router.get('/hashtags', asyncHandler(getTrendingHashtags));
router.get('/topics',   asyncHandler(getCrossBrandTopics));
router.get('/rising',   asyncHandler(getRisingTrends));
router.get('/',         asyncHandler(getTrends));

export default router;
