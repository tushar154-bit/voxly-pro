import { Router } from 'express';
import { getJourney } from '../controllers/journeyController.js';
import { requireAuth } from '../middleware/auth.js';
import { loadBrand } from '../services/brandLookup.js';

const router = Router();

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.use(requireAuth);
router.get('/:brandSlug', loadBrand, asyncHandler(getJourney));

export default router;
