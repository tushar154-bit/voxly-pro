import { Router } from 'express';
import { listBrands, getBrand } from '../controllers/brandController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.use(requireAuth);
router.get('/', asyncHandler(listBrands));
router.get('/:idOrSlug', asyncHandler(getBrand));

export default router;
