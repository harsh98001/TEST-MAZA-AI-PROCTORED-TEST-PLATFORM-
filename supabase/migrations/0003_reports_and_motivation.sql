-- ============================================================================
-- TEST MAZA v3.2.0 — STUDENT EXAM REPORTS, SCREEN SHARING & TEACHER ACTIONS
-- ============================================================================

-- 1. Student Exam Reports Table (Permanent server-side report repository)
create table if not exists public.exam_reports (
  id uuid primary key default gen_random_uuid(),
  session_id text,
  student_id text not null,
  student_name text default 'Candidate',
  student_email text,
  track_id text not null,
  track_title text,
  phase int default 1,
  total_questions int default 0,
  answered_count int default 0,
  correct_count int default 0,
  score numeric default 0,
  accuracy numeric default 0,
  duration_ms numeric default 0,
  elapsed_label text,
  unit_stats jsonb default '{}'::jsonb,
  answers jsonb default '{}'::jsonb,
  infractions_count int default 0,
  is_flagged_for_cheating boolean default false,
  flag_reasons text[] default '{}',
  evidence_snapshots jsonb default '[]'::jsonb,
  created_at timestamptz default now()
);

-- 2. Extend exam_sessions with screen sharing and live motivation columns
alter table public.exam_sessions 
  add column if not exists screen_share_active boolean default false,
  add column if not exists screen_thumbnail text,
  add column if not exists latest_teacher_motivation text,
  add column if not exists motivation_timestamp timestamptz;

-- 3. Teacher Interventions & Motivation Log Table
create table if not exists public.teacher_actions (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  teacher_id text not null,
  teacher_name text default 'Faculty Proctor',
  action_type text not null, -- 'MOTIVATE' | 'DISQUALIFY' | 'WARNING'
  message text not null,
  created_at timestamptz default now()
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
alter table public.exam_reports enable row level security;
alter table public.teacher_actions enable row level security;

-- Exam Reports Policies
create policy "Allow students to insert own report"
  on public.exam_reports for insert
  with check (true);

create policy "Allow users to read exam reports"
  on public.exam_reports for select
  using (true);

-- Teacher Actions Policies
create policy "Allow insert teacher actions"
  on public.teacher_actions for insert
  with check (true);

create policy "Allow read teacher actions"
  on public.teacher_actions for select
  using (true);

-- ============================================================================
-- REALTIME PUBLICATION SETUP
-- ============================================================================
alter publication supabase_realtime add table public.exam_reports;
alter publication supabase_realtime add table public.teacher_actions;
