import app from './app.js';
import { config } from './config/index.js';
import { connectDB } from './config/db.js';
import mongoose from 'mongoose';

// Connect to MongoDB Atlas before listening for incoming requests
await connectDB();

const server = app.listen(config.port, () => {
  console.log(`
=====================================================
  Lumina Enterprise Sales Intelligence API
  Port:        http://localhost:${config.port}
  Health:      http://localhost:${config.port}/api/health
  Environment: ${config.nodeEnv}
=====================================================
  `);
});

// Graceful shutdown handling
const handleShutdown = async (signal) => {
  console.log(`\nReceived ${signal}. Gracefully closing HTTP server...`);
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
  server.close(() => {
    console.log('HTTP server closed. Exiting process.');
    process.exit(0);
  });
};

process.on('SIGINT', () => handleShutdown('SIGINT'));
process.on('SIGTERM', () => handleShutdown('SIGTERM'));

export default server;
