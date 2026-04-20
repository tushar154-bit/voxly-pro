import { Router } from 'express';
import {
  listReports,
  getReport,
  createReport,
  deleteReport,
  downloadReport,
  previewReport,
  previewForBrand,
  createReportSchema,
} from '../controllers/reportsController.js';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.use(requireAuth);

router.get('/',                  asyncHandler(listReports));
router.get('/preview',           asyncHandler(previewForBrand));
router.post('/',                 validate(createReportSchema), asyncHandler(createReport));
router.get('/:id',               asyncHandler(getReport));
router.delete('/:id',            asyncHandler(deleteReport));
router.get('/:id/preview',       asyncHandler(previewReport));
router.get('/:id/download',      asyncHandler(downloadReport));

export default router;
