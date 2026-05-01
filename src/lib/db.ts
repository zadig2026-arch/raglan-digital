import { neon } from '@neondatabase/serverless';

const url = process.env.DATABASE_URL;

if (!url && process.env.NODE_ENV === 'production') {
  throw new Error('DATABASE_URL is not set');
}

export const sql = url ? neon(url) : (createMockSql() as ReturnType<typeof neon>);

function createMockSql() {
  const err = () => {
    throw new Error(
      'DATABASE_URL is not set. Install Neon via Vercel Marketplace and pull env vars (`vercel env pull`) before using the database.',
    );
  };
  const fn = (() => err()) as unknown as ReturnType<typeof neon>;
  return new Proxy(fn, { get: () => err, apply: () => err() });
}
