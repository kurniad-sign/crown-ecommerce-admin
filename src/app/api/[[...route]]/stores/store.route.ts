import { Hono } from 'hono';

import { deleteStore, getStore, insertStore } from './store.handler';

const storeRoute = new Hono()
  .get('/', ...getStore)
  .post('/', ...insertStore)
  .delete('/:id', ...deleteStore);

export default storeRoute;
