import { Router } from 'express';
import { analyzeDeal } from '../controllers/aiController.js';

const router = Router();

router.post('/analyze-deal', analyzeDeal);

export default router;
