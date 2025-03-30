import { loadEnvConfig } from '@next/env';
import { defineConfig } from 'drizzle-kit';

loadEnvConfig(process.cwd(), true);

export default defineConfig({
  out: './src/migrations',
  dialect: 'postgresql',
  schema: './src/db/schema',
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URL!,
  },
});
