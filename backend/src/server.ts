import { loadConfig } from './config';
import { createDb } from './db';
import { migrate } from './db/migrate';
import { seed } from './db/seed';
import { createApp } from './app';
import { createLogger } from './middleware/logger';
import { createQueue } from './services/queue';

function main() {
  const config = loadConfig();
  const logger = createLogger(config);

  const db = createDb(config.DATABASE_PATH);
  migrate(db);
  seed(db);

  const queue = createQueue(db, logger);
  const stopWorker = queue.start(250);

  const app = createApp({ db, config, queue });
  const server = app.listen(config.PORT, () => {
    logger.info({ port: config.PORT, env: config.NODE_ENV }, 'API listening');
  });

  const shutdown = (signal: string) => {
    logger.info({ signal }, 'Shutting down');
    stopWorker();
    server.close(() => {
      db.close();
      process.exit(0);
    });
  };
  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

main();
