import { Router } from 'express';
import { listCompetitors, compareMetric, getTimeseries } from '../controllers/competitorsController.js';
import { requireAuth } from '../middleware/auth.js';
import { loadBrand } from '../services/brandLookup.js';

const router = Router();

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.use(requireAuth);

router.get('/:brandSlug',            loadBrand, asyncHandler(listCompetitors));
router.get('/:brandSlug/compare',    loadBrand, asyncHandler(compareMetric));
router.get('/:brandSlug/timeseries', loadBrand, asyncHandler(getTimeseries));

export default router;
