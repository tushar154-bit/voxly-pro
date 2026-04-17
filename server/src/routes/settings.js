import { Router } from 'express';
import { getSettings, updateSettings, settingsPatchSchema } from '../controllers/settingsController.js';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.use(requireAuth);

router.get('/',   asyncHandler(getSettings));
router.patch('/', validate(settingsPatchSchema), asyncHandler(updateSettings));

export default router;
