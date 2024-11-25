import { ENV } from '~/config/env';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import { categoriesSchema, categoryRelations } from './schemas/categories';
import { stores } from './schemas/stores';

const schema = {
  stores,
  categories: categoriesSchema,
  categoryRelations,
};

export const client = postgres(ENV.DATABASE_URL!, { prepare: false });
export const db = drizzle(client, { schema });
