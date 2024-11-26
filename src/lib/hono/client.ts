import { ENV } from '~/config/env';
import { hc } from 'hono/client';

import { AppType } from '~/app/api/[[...route]]/route';

export const honoClient = hc<AppType>(
  ENV.DATABASE_URL || 'http://localhost:3000/'
);
