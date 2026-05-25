create table if not exists public.advertisements (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  description text not null,
  company_link text not null,
  logo_url text not null,
  active boolean not null default true,
  starts_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '1 month'),
  created_at timestamptz not null default now()
);

create index if not exists advertisements_active_window_idx
  on public.advertisements (active, starts_at, expires_at, created_at);

alter table public.advertisements enable row level security;

drop policy if exists "Public can read active advertisements" on public.advertisements;
create policy "Public can read active advertisements"
  on public.advertisements
  for select
  using (
    active = true
    and starts_at <= now()
    and expires_at > now()
  );
