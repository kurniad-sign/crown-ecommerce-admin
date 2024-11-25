import { Hono } from 'hono';
import { handle } from 'hono/vercel';

import auth from './auth';
import categories from './categories';
import stores from './stores';

export const runtime = 'nodejs';

const app = new Hono().basePath('/api');

export const routes = app
  .route('/auth', auth)
  .route('/stores', stores)
  .route('/category', categories);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
