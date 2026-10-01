import { Router } from 'express';
import {
  createDemoBooking,
  getDemoBookings,
} from '../controllers/demoBookingController.js';

const router = Router();

router.post('/', createDemoBooking);
router.get('/', getDemoBookings);

export default router;
