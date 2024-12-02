import { Hono } from 'hono';

import {
  getCategory,
  insertCategory,
  patchCategory,
  removeCategory,
} from './category.handler';

const categoryRoute = new Hono()
  .get('/', ...getCategory)
  .post('/', ...insertCategory)
  .patch('/:id', ...patchCategory)
  .delete('/:id', ...removeCategory);

export default categoryRoute;
