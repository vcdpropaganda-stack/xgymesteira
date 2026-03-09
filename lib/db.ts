import { Pool } from "pg";

declare global {
  var __xgymPgPool: Pool | undefined;
}

export const pool =
  global.__xgymPgPool ||
  new Pool({
    connectionString: process.env.DATABASE_URL
  });

if (process.env.NODE_ENV !== "production") {
  global.__xgymPgPool = pool;
}

export async function ensureGtmTable() {
  await pool.query(`
    create table if not exists public.site_config (
      key text primary key,
      value text not null,
      updated_at timestamptz not null default now()
    )
  `);
}

export async function getStoredGtmId() {
  await ensureGtmTable();
  const result = await pool.query<{ value: string }>(
    "select value from public.site_config where key = $1 limit 1",
    ["gtm_id"]
  );

  return result.rows[0]?.value ?? "";
}

export async function setStoredGtmId(gtmId: string) {
  await ensureGtmTable();
  await pool.query(
    `
      insert into public.site_config (key, value, updated_at)
      values ($1, $2, now())
      on conflict (key)
      do update set value = excluded.value, updated_at = now()
    `,
    ["gtm_id", gtmId]
  );
}

export async function removeStoredGtmId() {
  await ensureGtmTable();
  await pool.query("delete from public.site_config where key = $1", ["gtm_id"]);
}
