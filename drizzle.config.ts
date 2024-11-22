import { defineConfig } from 'drizzle-kit';

import { ENV } from '~/config/env';

export default defineConfig({
  out: './drizzle/migrations',
  schema: './src/lib/drizzle/schemas/*',
  dialect: 'postgresql',
  dbCredentials: {
    url: ENV.DATABASE_URL!,
  },
});
