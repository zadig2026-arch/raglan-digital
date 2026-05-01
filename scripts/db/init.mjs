#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..', '..');
config({ path: resolve(root, '.env.local') });

const url = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
if (!url) {
  console.error('Missing DATABASE_URL / DATABASE_URL_UNPOOLED in .env.local');
  process.exit(1);
}

const sql = neon(url);
const schemaPath = resolve(root, 'src/lib/db/schema.sql');
const raw = readFileSync(schemaPath, 'utf8');

const statements = splitSqlStatements(raw);

console.log(`Applying ${statements.length} statement(s) from schema.sql…`);

for (const [i, stmt] of statements.entries()) {
  const head = stmt.replace(/\s+/g, ' ').slice(0, 80);
  try {
    await sql.query(stmt);
    console.log(`  [${i + 1}/${statements.length}] ✓ ${head}…`);
  } catch (err) {
    console.error(`  [${i + 1}/${statements.length}] ✗ ${head}…`);
    console.error(`     → ${err.message}`);
    process.exit(1);
  }
}

const [check] = await sql`SELECT now() AS now, current_database() AS db`;
console.log(`\nDB ready. now=${check.now} db=${check.db}`);

const [counts] = await sql`
  SELECT
    (SELECT COUNT(*) FROM leads)            AS leads,
    (SELECT COUNT(*) FROM lead_events)      AS events,
    (SELECT COUNT(*) FROM site_orders)      AS orders,
    (SELECT COUNT(*) FROM launch_spots)     AS spots
`;
console.log(`Row counts: leads=${counts.leads} events=${counts.events} orders=${counts.orders} spots=${counts.spots}`);

function splitSqlStatements(sqlText) {
  const lines = sqlText.split('\n').filter((l) => !/^\s*--/.test(l));
  const cleaned = lines.join('\n');
  return cleaned
    .split(/;\s*$/m)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}
