import mongoose from 'mongoose';
import { config } from './index.js';

/**
 * Builds the direct replica-set connection URI for Atlas cluster0.hwjyeh9.mongodb.net
 * Solves the Node.js c-ares DNS SRV lookup bug (querySrv EBADRESP) on Windows.
 */
const getDirectReplicaUri = (user, pass) => {
  const username = encodeURIComponent(user || 'ykparjapati21_db_user');
  const password = encodeURIComponent(pass || '5JoGY0qVML75KNbc');
  return `mongodb://${username}:${password}@ac-0suxlwf-shard-00-00.hwjyeh9.mongodb.net:27017,ac-0suxlwf-shard-00-01.hwjyeh9.mongodb.net:27017,ac-0suxlwf-shard-00-02.hwjyeh9.mongodb.net:27017/lumina_sales?ssl=true&replicaSet=atlas-ot5lzu-shard-0&authSource=admin&retryWrites=true&w=majority`;
};

export const connectDB = async () => {
  const rawUri = config.mongoUri || '';
  const directUri = config.mongoDirectUri || getDirectReplicaUri(config.mongoUser, config.mongoPassword);

  if (!rawUri && !directUri) {
    console.log(`
ℹ️  MongoDB Atlas:
    No valid connection string detected yet in atlas-credentials.env or backend/.env.
    Running in in-memory mode in the meantime.
    `);
    return false;
  }

  // On Windows, Node c-ares has a known SRV bug (querySrv EBADRESP) that stalls for 20s.
  // We prioritize the fast direct replica-set URI on Windows, with fallback to rawUri.
  const isWindows = process.platform === 'win32';
  const primaryUri = isWindows && directUri ? directUri : (rawUri || directUri);
  const secondaryUri = primaryUri === directUri ? rawUri : directUri;

  const tryConnect = async (targetUri, label) => {
    if (!targetUri) return null;
    try {
      const conn = await mongoose.connect(targetUri, {
        dbName: 'lumina_sales',
        serverSelectionTimeoutMS: 5000,
      });
      console.log(`✅ MongoDB Atlas connected (${label}): ${conn.connection.host} [database: ${conn.connection.name}]`);
      return conn;
    } catch (err) {
      return { error: err };
    }
  };

  // Try primary
  const result = await tryConnect(primaryUri, isWindows ? 'direct replica-set' : 'standard SRV');
  if (result && !result.error) {
    return true;
  }

  // Try secondary if available
  if (secondaryUri && secondaryUri !== primaryUri) {
    console.log(`🔄 Attempting secondary connection string...`);
    const fallbackResult = await tryConnect(secondaryUri, 'fallback');
    if (fallbackResult && !fallbackResult.error) {
      return true;
    }
  }

  console.error(`❌ MongoDB Atlas connection error: ${result?.error?.message || 'Unknown error'}`);
  console.log(`
💡 Tip: If connection timed out or was refused:
   1. Check that your IP is whitelisted in MongoDB Atlas (Network Access -> Add IP Address -> Allow Access from Anywhere or Current IP).
   2. Ensure username & password in atlas-credentials.env are correct.
  `);
  return false;
};


