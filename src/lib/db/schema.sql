-- Raglan Digital — funnel infrastructure schema
-- Run on Neon Postgres. Idempotent: safe to re-run.

CREATE EXTENSION IF NOT EXISTS citext;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ============================================================
-- leads: single source of truth, one row per email
-- ============================================================
CREATE TABLE IF NOT EXISTS leads (
  id                 uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  email              citext        NOT NULL UNIQUE,
  name               text,
  business           text,
  city               text,
  current_website    text,
  phone              text,
  source             text          NOT NULL DEFAULT 'unknown',
  source_detail      jsonb         NOT NULL DEFAULT '{}'::jsonb,
  utm                jsonb         NOT NULL DEFAULT '{}'::jsonb,
  referrer           text,
  first_seen_at      timestamptz   NOT NULL DEFAULT now(),
  last_seen_at       timestamptz   NOT NULL DEFAULT now(),
  status             text          NOT NULL DEFAULT 'new',
  score              int           NOT NULL DEFAULT 0,
  consent_marketing  boolean       NOT NULL DEFAULT false,
  notes              text,
  CONSTRAINT leads_status_chk CHECK (
    status IN ('new','nurturing','qualified','hot','booked','won','lost','unsubscribed')
  ),
  CONSTRAINT leads_score_chk CHECK (score >= 0 AND score <= 100)
);

CREATE INDEX IF NOT EXISTS leads_status_idx       ON leads (status);
CREATE INDEX IF NOT EXISTS leads_score_idx        ON leads (score DESC);
CREATE INDEX IF NOT EXISTS leads_first_seen_idx   ON leads (first_seen_at DESC);
CREATE INDEX IF NOT EXISTS leads_source_idx       ON leads (source);

-- ============================================================
-- lead_events: append-only audit log of every interaction
-- ============================================================
CREATE TABLE IF NOT EXISTS lead_events (
  id          bigserial     PRIMARY KEY,
  lead_id     uuid          NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  event       text          NOT NULL,
  payload     jsonb         NOT NULL DEFAULT '{}'::jsonb,
  created_at  timestamptz   NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS lead_events_lead_idx     ON lead_events (lead_id, created_at DESC);
CREATE INDEX IF NOT EXISTS lead_events_event_idx    ON lead_events (event, created_at DESC);

-- ============================================================
-- sequences_state: per-lead workflow position
-- ============================================================
CREATE TABLE IF NOT EXISTS sequences_state (
  lead_id        uuid          NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  sequence       text          NOT NULL,
  step           int           NOT NULL DEFAULT 0,
  next_send_at   timestamptz,
  paused_at      timestamptz,
  completed_at   timestamptz,
  PRIMARY KEY (lead_id, sequence),
  CONSTRAINT sequences_state_sequence_chk CHECK (
    sequence IN ('welcome-tools','nurture-quiz','post-discovery','post-launch-care')
  )
);

CREATE INDEX IF NOT EXISTS sequences_due_idx
  ON sequences_state (next_send_at)
  WHERE paused_at IS NULL AND completed_at IS NULL AND next_send_at IS NOT NULL;

-- ============================================================
-- site_orders: Stripe-backed purchases
-- ============================================================
CREATE TABLE IF NOT EXISTS site_orders (
  id                  uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id             uuid          NOT NULL REFERENCES leads(id) ON DELETE RESTRICT,
  plan                text          NOT NULL,
  stripe_session_id   text          UNIQUE,
  stripe_status       text          NOT NULL DEFAULT 'pending',
  amount_nzd          int           NOT NULL,
  paid_at             timestamptz,
  delivery_due        timestamptz,
  created_at          timestamptz   NOT NULL DEFAULT now(),
  CONSTRAINT site_orders_plan_chk CHECK (
    plan IN ('roast-49','launch-399','growth-1490','care-129','seo-349','social-590')
  )
);

CREATE INDEX IF NOT EXISTS site_orders_lead_idx    ON site_orders (lead_id);
CREATE INDEX IF NOT EXISTS site_orders_status_idx  ON site_orders (stripe_status);
CREATE INDEX IF NOT EXISTS site_orders_paid_idx    ON site_orders (paid_at DESC) WHERE paid_at IS NOT NULL;

-- ============================================================
-- launch_spots: configurable monthly capacity for /launch scarcity
-- One row per (year, month). Cron resets / inserts on the 1st.
-- ============================================================
CREATE TABLE IF NOT EXISTS launch_spots (
  year           int           NOT NULL,
  month          int           NOT NULL,
  total_spots    int           NOT NULL DEFAULT 5,
  spots_taken    int           NOT NULL DEFAULT 0,
  PRIMARY KEY (year, month),
  CONSTRAINT launch_spots_month_chk CHECK (month BETWEEN 1 AND 12),
  CONSTRAINT launch_spots_taken_chk CHECK (spots_taken >= 0 AND spots_taken <= total_spots)
);

-- Seed current month if missing (idempotent)
INSERT INTO launch_spots (year, month, total_spots, spots_taken)
  VALUES (EXTRACT(YEAR FROM now())::int, EXTRACT(MONTH FROM now())::int, 5, 0)
  ON CONFLICT (year, month) DO NOTHING;
