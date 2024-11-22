import { hc } from "hono/client";

import { AppType } from "~/app/api/[[...route]]/route";
import { ENV } from "~/config/env";

export const honoClient = hc<AppType>(ENV.DATABASE_URL || 'http://localhost:3000/');