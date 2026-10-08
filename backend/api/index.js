import app from '../src/app.js';
import { connectDB } from '../src/config/db.js';

let isConnected = false;

export default async function handler(req, res) {
  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
    } catch (err) {
      console.warn('Database connection deferred or failed in serverless handler:', err);
    }
  }
  return app(req, res);
}
