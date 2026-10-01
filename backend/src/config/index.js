import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Check for atlas-credentials.env in candidate paths
const atlasCandidates = [
  path.resolve(process.cwd(), 'atlas-credentials.env'),
  path.resolve(process.cwd(), '../atlas-credentials.env'),
  path.resolve(__dirname, '../../atlas-credentials.env'),
  path.resolve(__dirname, '../../../atlas-credentials.env'),
];

for (const candidate of atlasCandidates) {
  if (fs.existsSync(candidate)) {
    dotenv.config({ path: candidate });
    break;
  }
}

// 2. Load standard backend/.env for other settings (e.g. PORT, CORS_ORIGIN)
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  mongoUri: process.env.MONGODB_URI || '',
  mongoUser: process.env.MONGODB_USERNAME || '',
  mongoPassword: process.env.MONGODB_PASSWORD || '',
  mongoDirectUri: process.env.MONGODB_DIRECT_URI || '',
};

