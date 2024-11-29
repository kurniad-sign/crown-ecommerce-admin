import dotEnv from 'dotenv';
import { z } from 'zod';

dotEnv.config({
  path: '.env',
});

const createEnv = () => {
  const envSchema = z.object({
    SUPABASE_URL: z.string(),
    SUPABASE_ANON_KEY: z.string(),
    DATABASE_URL: z.string().min(1).optional(),
    APP_URL: z.string().optional().default('http://localhost:3000/'),
    API_URL: z.string().optional().default('http://localhost:3000/api/'),
  });

  const envVars = {
    SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
    APP_URL: process.env.NEXT_PUBLIC_URL,
    API_URL: process.env.API_URL,
  };

  const parsedEnv = envSchema.safeParse(envVars);

  if (!parsedEnv.success) {
    throw new Error(
      `Invalid env provided.
  The following variables are missing or invalid:
  ${Object.entries(parsedEnv.error.flatten().fieldErrors)
    .map(([k, v]) => `- ${k}: ${v}`)
    .join('\n')}
  `
    );
  }

  return parsedEnv.data ?? {};
};

export const ENV = createEnv();
