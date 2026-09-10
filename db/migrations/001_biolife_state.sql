CREATE TABLE IF NOT EXISTS biolife_state (
  id text PRIMARY KEY,
  document jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS biolife_state_updated_at_idx ON biolife_state(updated_at);
