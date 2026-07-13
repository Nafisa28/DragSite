-- ============================================================
-- DragSite Database Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- ─── Profiles (extends auth.users) ───────────────────────────
create table if not exists public.profiles (
  id          uuid references auth.users(id) on delete cascade primary key,
  name        text,
  avatar_url  text,
  created_at  timestamptz default now() not null
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ─── Templates ───────────────────────────────────────────────
create table if not exists public.templates (
  id            uuid default gen_random_uuid() primary key,
  name          text not null,
  category      text not null,
  description   text,
  thumbnail_url text,
  page_data     jsonb not null default '{}',
  is_active     boolean default true,
  sort_order    integer default 0,
  created_at    timestamptz default now() not null
);

alter table public.templates enable row level security;

-- Templates are readable by everyone (including anon)
create policy "Templates are publicly readable"
  on public.templates for select
  using (is_active = true);

-- ─── Sites ───────────────────────────────────────────────────
create table if not exists public.sites (
  id             uuid default gen_random_uuid() primary key,
  user_id        uuid references auth.users(id) on delete cascade not null,
  name           text not null,
  slug           text unique not null,
  template_id    uuid references public.templates(id) on delete set null,
  status         text default 'draft' check (status in ('draft', 'published')),
  page_data      jsonb not null default '{}',
  thumbnail_url  text,
  published_at   timestamptz,
  created_at     timestamptz default now() not null,
  updated_at     timestamptz default now() not null
);

alter table public.sites enable row level security;

create policy "Users can view own sites"
  on public.sites for select
  using (auth.uid() = user_id);

create policy "Users can insert own sites"
  on public.sites for insert
  with check (auth.uid() = user_id);

create policy "Users can update own sites"
  on public.sites for update
  using (auth.uid() = user_id);

create policy "Users can delete own sites"
  on public.sites for delete
  using (auth.uid() = user_id);

-- Published sites are publicly readable (for /s/[slug] route)
create policy "Published sites are publicly readable"
  on public.sites for select
  using (status = 'published');

-- Auto-update updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists on_sites_updated on public.sites;
create trigger on_sites_updated
  before update on public.sites
  for each row execute function public.handle_updated_at();

-- ─── Assets ──────────────────────────────────────────────────
create table if not exists public.assets (
  id          uuid default gen_random_uuid() primary key,
  site_id     uuid references public.sites(id) on delete cascade not null,
  user_id     uuid references auth.users(id) on delete cascade not null,
  url         text not null,
  filename    text not null,
  size        bigint default 0,
  type        text default 'image',
  uploaded_at timestamptz default now() not null
);

alter table public.assets enable row level security;

create policy "Users can view own assets"
  on public.assets for select
  using (auth.uid() = user_id);

create policy "Users can insert own assets"
  on public.assets for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own assets"
  on public.assets for delete
  using (auth.uid() = user_id);

-- ─── Storage Bucket ──────────────────────────────────────────
-- Run this separately in Supabase dashboard > Storage
-- Or uncomment and run here:
-- insert into storage.buckets (id, name, public) values ('assets', 'assets', true);
