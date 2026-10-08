import { Router } from 'express';
import { getFaqs } from '../controllers/planController.js';

const router = Router();

// GET /api/faqs
router.get('/', getFaqs);

export default router;
