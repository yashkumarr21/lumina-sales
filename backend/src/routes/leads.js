import { Router } from 'express';
import { getLeads, createLead } from '../controllers/leadController.js';

const router = Router();

router.get('/', getLeads);
router.post('/', createLead);

export default router;
