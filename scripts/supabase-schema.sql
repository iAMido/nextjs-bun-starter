-- Supabase SQL Schema for AI Running Coach
-- Run this in your Supabase SQL Editor to create all tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- RUNS TABLE - All running activities
-- ============================================
CREATE TABLE IF NOT EXISTS runs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  filename TEXT,
  date TIMESTAMPTZ NOT NULL,
  distance_km DECIMAL(6,2),
  duration_min DECIMAL(8,2),
  duration_sec INTEGER,
  avg_hr INTEGER,
  max_hr INTEGER,
  avg_pace_min_km DECIMAL(5,2),
  avg_pace_str TEXT,
  calories INTEGER,
  run_type TEXT,
  workout_name TEXT,
  coach_notes TEXT,
  trimp DECIMAL(8,2),
  data_source TEXT,
  pct_z1 DECIMAL(5,2),
  pct_z2 DECIMAL(5,2),
  pct_z3 DECIMAL(5,2),
  pct_z4 DECIMAL(5,2),
  pct_z5 DECIMAL(5,2),
  pct_z6 DECIMAL(5,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_runs_user_date ON runs(user_id, date DESC);
CREATE INDEX idx_runs_date ON runs(date DESC);

-- ============================================
-- LAPS TABLE - Lap-by-lap breakdown
-- ============================================
CREATE TABLE IF NOT EXISTS laps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  run_id UUID REFERENCES runs(id) ON DELETE CASCADE,
  lap_number INTEGER,
  distance_km DECIMAL(6,2),
  duration_sec INTEGER,
  avg_hr INTEGER,
  max_hr INTEGER,
  avg_pace_str TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_laps_run ON laps(run_id);

-- ============================================
-- ATHLETE PROFILE - User settings
-- ============================================
CREATE TABLE IF NOT EXISTS athlete_profile (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT UNIQUE NOT NULL,
  name TEXT,
  age INTEGER,
  weight_kg DECIMAL(5,2),
  resting_hr INTEGER,
  max_hr INTEGER,
  lactate_threshold_hr INTEGER,
  current_goal TEXT,
  training_days TEXT,
  injury_history TEXT,
  hr_zone_z1 TEXT,
  hr_zone_z2 TEXT,
  hr_zone_z3 TEXT,
  hr_zone_z4 TEXT,
  hr_zone_z5 TEXT,
  hr_zone_z6 TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TRAINING PLANS - AI-generated plans
-- ============================================
CREATE TABLE IF NOT EXISTS training_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  plan_type TEXT NOT NULL,
  plan_json JSONB NOT NULL,
  duration_weeks INTEGER,
  status TEXT DEFAULT 'active',
  start_date DATE,
  current_week_num INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_plans_user_status ON training_plans(user_id, status);

-- ============================================
-- RUN FEEDBACK - Post-run ratings
-- ============================================
CREATE TABLE IF NOT EXISTS run_feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  run_date DATE NOT NULL,
  rating INTEGER CHECK (rating BETWEEN 1 AND 10),
  effort_level INTEGER CHECK (effort_level BETWEEN 1 AND 10),
  feeling TEXT,
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_feedback_user_date ON run_feedback(user_id, run_date DESC);

-- ============================================
-- WEEKLY SUMMARIES - Weekly check-ins
-- ============================================
CREATE TABLE IF NOT EXISTS weekly_summaries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  week_start DATE NOT NULL,
  overall_feeling INTEGER,
  sleep_quality INTEGER,
  stress_level INTEGER,
  injury_notes TEXT,
  achievements TEXT,
  ai_analysis TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, week_start)
);

CREATE INDEX idx_summaries_user_week ON weekly_summaries(user_id, week_start DESC);

-- ============================================
-- WORKOUT LIBRARY - Historical workout types
-- ============================================
CREATE TABLE IF NOT EXISTS workout_library (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  workout_name TEXT NOT NULL,
  coach_notes TEXT,
  category TEXT,
  typical_distance_km DECIMAL(5,2),
  typical_duration_min INTEGER,
  target_zone TEXT,
  purpose TEXT,
  count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- STRAVA TOKENS - OAuth tokens
-- ============================================
CREATE TABLE IF NOT EXISTS strava_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT UNIQUE NOT NULL,
  access_token TEXT,
  refresh_token TEXT,
  expires_at TIMESTAMPTZ,
  athlete_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE laps ENABLE ROW LEVEL SECURITY;
ALTER TABLE athlete_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE run_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_summaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE strava_tokens ENABLE ROW LEVEL SECURITY;

-- For single-user app, allow all authenticated operations
-- You can make these more restrictive if needed
CREATE POLICY "Allow all for authenticated users" ON runs FOR ALL USING (true);
CREATE POLICY "Allow all for authenticated users" ON laps FOR ALL USING (true);
CREATE POLICY "Allow all for authenticated users" ON athlete_profile FOR ALL USING (true);
CREATE POLICY "Allow all for authenticated users" ON training_plans FOR ALL USING (true);
CREATE POLICY "Allow all for authenticated users" ON run_feedback FOR ALL USING (true);
CREATE POLICY "Allow all for authenticated users" ON weekly_summaries FOR ALL USING (true);
CREATE POLICY "Allow all for authenticated users" ON workout_library FOR ALL USING (true);
CREATE POLICY "Allow all for authenticated users" ON strava_tokens FOR ALL USING (true);
