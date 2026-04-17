import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import pinoHttp from 'pino-http';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRoutes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/error.js';
import { config } from './config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDir = path.resolve(__dirname, '../../client');

export const createApp = () => {
  const app = express();

  app.disable('x-powered-by');

  // Security — CSP disabled since frontend loads Chart.js / Font Awesome from CDNs
  app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));

  app.use(cors({ origin: config.clientUrl, credentials: true }));
  app.use(express.json({ limit: '1mb' }));
  app.use(cookieParser());

  app.use(
    pinoHttp({
      transport: config.env === 'development' ? { target: 'pino-pretty' } : undefined,
      autoLogging: { ignore: (req) => req.url === '/api/health' },
    })
  );

  // API
  app.use('/api', apiRoutes);

  // Static client assets
  app.use(express.static(clientDir));

  // SPA fallback — serve index.html for any non-API, non-asset path
  app.get(/^(?!\/api).*/, (req, res, next) => {
    if (req.method !== 'GET') return next();
    res.sendFile(path.join(clientDir, 'index.html'));
  });

  // 404 for unhandled /api routes
  app.use('/api', notFoundHandler);

  app.use(errorHandler);

  return app;
};
