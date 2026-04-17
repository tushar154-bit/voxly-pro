import { Router } from 'express';
import {
  listInfluencers,
  getInfluencer,
  listPinned,
  pinInfluencer,
  unpinInfluencer,
} from '../controllers/influencersController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.use(requireAuth);

// Specific paths first — "pinned" must not be matched as :id.
router.get('/pinned',         asyncHandler(listPinned));
router.get('/',               asyncHandler(listInfluencers));
router.get('/:id',            asyncHandler(getInfluencer));
router.post('/:id/pin',       asyncHandler(pinInfluencer));
router.delete('/:id/pin',     asyncHandler(unpinInfluencer));

export default router;
