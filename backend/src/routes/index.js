import { Router } from 'express';
import activitiesRouter from './activities.js';
import leadsRouter from './leads.js';
import dealsRouter from './deals.js';
import analyticsRouter from './analytics.js';
import demoBookingsRouter from './demoBookings.js';
import plansRouter from './plans.js';
import faqsRouter from './faqs.js';
import capabilitiesRouter from './capabilities.js';
import aiRouter from './ai.js';
import authRouter from './auth.js';
import { getOverview } from '../controllers/analyticsController.js';

import mongoose from 'mongoose';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  res.json({
    status: 'healthy',
    service: 'lumina-sales-pilot-backend',
    version: '1.0.0',
    uptime: `${Math.floor(process.uptime())}s`,
    database: {
      provider: 'MongoDB Atlas',
      connected: isConnected,
      host: isConnected ? mongoose.connection.host : null,
      name: isConnected ? mongoose.connection.name : null,
      readyState: mongoose.connection.readyState,
    },
    timestamp: new Date().toISOString(),
  });
});

// Overview aggregated dashboard data
router.get('/overview', getOverview);

// Feature routes
router.use('/activities', activitiesRouter);
router.use('/leads', leadsRouter);
router.use('/deals', dealsRouter);
router.use('/analytics', analyticsRouter);
router.use('/demo-bookings', demoBookingsRouter);
router.use('/plans', plansRouter);
router.use('/faqs', faqsRouter);
router.use('/capabilities', capabilitiesRouter);
router.use('/ai', aiRouter);
router.use('/auth', authRouter);

export default router;
