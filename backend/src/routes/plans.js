import { Router } from 'express';
import { getPricingPlans, getFaqs } from '../controllers/planController.js';

const router = Router();

router.get('/', getPricingPlans);
router.get('/faqs', getFaqs);

export default router;
