import { Hono } from 'hono';
import { handle } from 'hono/vercel';

import auth from './auth';

export const runtime = 'nodejs';

const app = new Hono().basePath('/api');
export const routes = app.route('/auth', auth);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;