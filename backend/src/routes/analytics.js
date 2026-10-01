import { Router } from 'express';
import { getAnalytics, getOverview } from '../controllers/analyticsController.js';

const router = Router();

router.get('/', getAnalytics);
router.get('/overview', getOverview);

export default router;
