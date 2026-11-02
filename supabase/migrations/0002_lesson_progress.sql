-- Lesson-level progress, owned by exactly one Supabase Auth user.
-- Stores progress metadata only. Lesson content stays in the app (content-as-code);
-- lesson_id is the stable content id from the frontend lesson registry.

create table if not exists public.lesson_progress (
  id           uuid primary key default gen_random_uuid(),
  -- Defaults to the caller, so the client never has to (and cannot usefully) choose an owner.
  user_id      uuid not null default auth.uid() references auth.users (id) on delete cascade,
  lesson_id    text not null,
  last_page    integer not null default 1,
  completed    boolean not null default false,
  completed_at timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  constraint lesson_progress_user_lesson_key unique (user_id, lesson_id),
  constraint lesson_progress_last_page_check check (last_page >= 1),
  constraint lesson_progress_lesson_id_check check (char_length(lesson_id) between 1 and 200),
  constraint lesson_progress_completed_at_check check (completed = (completed_at is not null))
);
-- Lookups by (user_id, lesson_id) are served by the unique constraint's index; no extra index is needed yet.

-- Keep server-owned columns server-owned: timestamps, completed_at consistency, immutable id/owner/created_at.
create or replace function public.lesson_progress_before_write() returns trigger
language plpgsql set search_path = '' as $$
begin
  if tg_op = 'UPDATE' then
    new.id := old.id;
    new.user_id := old.user_id;
    new.created_at := old.created_at;
  end if;

  if new.completed then
    -- Keep the original completion time when re-saving an already completed lesson.
    if tg_op = 'UPDATE' and old.completed and old.completed_at is not null then
      new.completed_at := old.completed_at;
    else
      new.completed_at := now();
    end if;
  else
    new.completed_at := null;
  end if;

  new.updated_at := now();
  return new;
end $$;

do $$
begin
  if not exists (select 1 from pg_trigger where tgname = 'lesson_progress_before_write' and tgrelid = 'public.lesson_progress'::regclass) then
    create trigger lesson_progress_before_write
      before insert or update on public.lesson_progress
      for each row execute function public.lesson_progress_before_write();
  end if;
end $$;

alter table public.lesson_progress enable row level security;

-- Anonymous users get nothing; signed-in users are limited to their own rows by the policies below.
revoke all on public.lesson_progress from anon;
grant select, insert, update, delete on public.lesson_progress to authenticated;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'lesson_progress' and policyname = 'lesson_progress_select_own') then
    create policy lesson_progress_select_own on public.lesson_progress
      for select to authenticated using ((select auth.uid()) = user_id);
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'lesson_progress' and policyname = 'lesson_progress_insert_own') then
    create policy lesson_progress_insert_own on public.lesson_progress
      for insert to authenticated with check ((select auth.uid()) = user_id);
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'lesson_progress' and policyname = 'lesson_progress_update_own') then
    create policy lesson_progress_update_own on public.lesson_progress
      for update to authenticated
      using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'lesson_progress' and policyname = 'lesson_progress_delete_own') then
    create policy lesson_progress_delete_own on public.lesson_progress
      for delete to authenticated using ((select auth.uid()) = user_id);
  end if;
end $$;
