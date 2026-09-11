-- ============================================================================
-- TEST MAZA v3.1.0 — PROCTORING SESSIONS, EVENTS & USER ROLES MIGRATION
-- ============================================================================

-- 1. Candidate exam sessions (one row per active/completed attempt)
create table if not exists public.exam_sessions (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references auth.users(id) on delete cascade not null,
  student_name text,
  student_email text,
  track_id text not null,                      -- e.g. 'DSA', 'WEB_DEB', 'ADA'
  track_title text,                            -- Display title
  phase int not null default 1,
  status text not null default 'in_progress',   -- 'in_progress' | 'completed' | 'terminated' | 'flagged'
  progress_pct numeric default 0,
  risk_score numeric default 0,
  total_questions int default 0,
  answered_count int default 0,
  correct_count int default 0,
  started_at timestamptz default now(),
  ended_at timestamptz,
  terminated_by uuid references auth.users(id),-- faculty id, if faculty-terminated
  termination_reason text
);

-- 2. Individual proctoring violation events (append-only telemetry log)
create table if not exists public.proctoring_events (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references public.exam_sessions(id) on delete cascade not null,
  student_id uuid references auth.users(id) on delete cascade not null,
  event_type text not null,                    -- 'FACE_COUNT' | 'DEVICE_DETECTED' | 'AUDIO' | 'BLUR' | 'CLIPBOARD' | 'FULLSCREEN' | 'FACULTY_TERMINATE'
  severity text not null default 'warning',    -- 'info' | 'warning' | 'critical'
  detail jsonb,                                -- { count, confidence, label, reason, ... }
  snapshot_url text,                           -- storage path or data URI
  created_at timestamptz default now()
);

-- 3. Faculty / Admin role mapping
create table if not exists public.user_roles (
  user_id uuid references auth.users(id) on delete cascade primary key,
  role text not null check (role in ('student', 'faculty', 'administrator')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

alter table public.exam_sessions enable row level security;
alter table public.proctoring_events enable row level security;
alter table public.user_roles enable row level security;

-- Helper function to check if current user is faculty or admin
create or replace function public.is_faculty_or_admin()
returns boolean as $$
begin
  return exists (
    select 1 from public.user_roles
    where user_id = auth.uid()
      and role in ('faculty', 'administrator')
  );
end;
$$ language plpgsql security definer;

-- EXAM SESSIONS POLICIES
-- 1. Students can view, insert and update their own exam sessions
create policy "Students can view own sessions"
  on public.exam_sessions for select
  using (student_id = auth.uid() or public.is_faculty_or_admin());

create policy "Students can create own sessions"
  on public.exam_sessions for insert
  with check (student_id = auth.uid());

create policy "Students can update own active session"
  on public.exam_sessions for update
  using (student_id = auth.uid() or public.is_faculty_or_admin());

-- PROCTORING EVENTS POLICIES
-- 2. Anyone can insert their own events; faculty can view all events
create policy "Students can insert own proctoring events"
  on public.proctoring_events for insert
  with check (student_id = auth.uid());

create policy "Students view own events, faculty view all"
  on public.proctoring_events for select
  using (student_id = auth.uid() or public.is_faculty_or_admin());

-- USER ROLES POLICIES
create policy "Users can view their own role"
  on public.user_roles for select
  using (user_id = auth.uid() or public.is_faculty_or_admin());

create policy "Admins can manage user roles"
  on public.user_roles for all
  using (public.is_faculty_or_admin());

-- ============================================================================
-- REALTIME PUBLICATION SETUP
-- ============================================================================
-- Enable Supabase Realtime broadcast on exam_sessions and proctoring_events
alter publication supabase_realtime add table public.exam_sessions;
alter publication supabase_realtime add table public.proctoring_events;
