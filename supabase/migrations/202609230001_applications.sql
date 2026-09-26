create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  role text not null,
  location text not null default '',
  link text not null default '',
  note text not null default ''
);

alter table public.applications enable row level security;

drop policy if exists "Public can submit applications" on public.applications;
create policy "Public can submit applications"
  on public.applications
  for insert
  to anon, authenticated
  with check (true);
