import { Router } from 'express';
import { getLiveFeed, getPulse } from '../controllers/realtimeController.js';
import { requireAuth } from '../middleware/auth.js';
import { loadBrand } from '../services/brandLookup.js';

const router = Router();

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.use(requireAuth);

router.get('/:brandSlug/feed',  loadBrand, asyncHandler(getLiveFeed));
router.get('/:brandSlug/pulse', loadBrand, asyncHandler(getPulse));

export default router;
