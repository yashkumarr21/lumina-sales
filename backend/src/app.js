import express from 'express';
import cors from 'cors';
import { config } from './config/index.js';
import { requestLogger } from './middleware/requestLogger.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';
import apiRouter from './routes/index.js';

const app = express();

// Allowed origins list from CORS_ORIGIN environment variable
const allowedOrigins = (config.corsOrigin || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

// Enable Cross-Origin Resource Sharing
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or server-to-server)
      if (!origin) return callback(null, true);

      // In development or when wildcard is set, allow all origins
      if (config.nodeEnv === 'development' || config.corsOrigin === '*') {
        return callback(null, true);
      }

      // Check against configured production origins or localhost
      if (
        allowedOrigins.includes(origin) ||
        origin.includes('localhost') ||
        origin.includes('127.0.0.1')
      ) {
        return callback(null, true);
      }

      return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTTP Request logging
app.use(requestLogger);

// Base route
app.get('/', (req, res) => {
  res.json({
    name: 'Lumina Glassmorphism Enterprise Sales API',
    status: 'online',
    documentation: '/api/health',
    version: '1.0.0',
  });
});

// API Routes
app.use('/api', apiRouter);

// Catch 404s
app.use(notFoundHandler);

// Centralized error handler
app.use(errorHandler);

export default app;
