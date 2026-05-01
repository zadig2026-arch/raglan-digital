#!/usr/bin/env node
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..', '..');
config({ path: resolve(root, '.env.local') });

const sql = neon(process.env.DATABASE_URL);

const email = `smoke+${Date.now()}@example.com`;

const [lead] = await sql`
  INSERT INTO leads (email, name, business, city, source, source_detail, utm)
  VALUES (
    ${email}, 'Smoke Test', 'Smoke Co', 'Raglan',
    'tool-seo-audit',
    ${JSON.stringify({ tool_score: 42 })}::jsonb,
    ${JSON.stringify({ utm_source: 'smoke', utm_medium: 'cli' })}::jsonb
  )
  RETURNING id, email, status, score
`;
console.log('Inserted lead:', lead);

await sql`
  INSERT INTO lead_events (lead_id, event, payload)
  VALUES (${lead.id}, 'lead_captured', ${JSON.stringify({ source: 'smoke' })}::jsonb)
`;
console.log('Inserted event.');

const [{ left }] = await sql`
  SELECT (total_spots - spots_taken) AS left
    FROM launch_spots
   WHERE year = EXTRACT(YEAR FROM now())::int
     AND month = EXTRACT(MONTH FROM now())::int
`;
console.log(`Launch spots left this month: ${left}`);

await sql`DELETE FROM leads WHERE email = ${email}`;
console.log('Cleaned up smoke lead.');

console.log('\n✓ DB smoke test passed.');
