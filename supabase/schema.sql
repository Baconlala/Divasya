-- Divasya database schema (Phase 2).
-- Run this once in the Supabase SQL Editor for a new project.

create type campaign_type as enum ('temple', 'seva', 'gurukul', 'animal_welfare');
create type campaign_status as enum ('draft', 'live', 'paused');
create type donation_type as enum ('one_time', 'monthly');
create type donation_status as enum ('pending', 'completed', 'failed', 'refunded');
create type subscription_status as enum ('active', 'failed', 'cancelled');

create table campaigns (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  type campaign_type not null,
  location text not null,
  short_description text not null,
  story text not null, -- paragraphs separated by a blank line
  cover_image text not null,
  gallery text[] not null default '{}',
  goal_amount numeric,
  raised_amount numeric not null default 0,
  donor_count integer not null default 0,
  status campaign_status not null default 'draft',
  created_at timestamptz not null default now()
);

-- Donations and subscriptions are created now so the schema matches the full
-- product spec, but nothing writes to them until the Razorpay integration
-- (Phase 3/4) lands. The admin panel does not read these tables yet.
create table donations (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references campaigns(id) on delete restrict,
  donor_name text not null,
  donor_email text not null,
  amount numeric not null,
  type donation_type not null,
  razorpay_payment_id text,
  status donation_status not null default 'pending',
  created_at timestamptz not null default now()
);

create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references campaigns(id) on delete restrict,
  donor_email text not null,
  razorpay_subscription_id text,
  amount numeric not null,
  status subscription_status not null default 'active',
  created_at timestamptz not null default now(),
  last_charged_at timestamptz
);

alter table campaigns enable row level security;
alter table donations enable row level security;
alter table subscriptions enable row level security;

-- Public site can read only campaigns that are live.
create policy "Public can view live campaigns"
  on campaigns for select
  using (status = 'live');

-- Any signed-in user can manage campaigns. Public signup must stay disabled
-- in Supabase Auth settings so "signed in" only ever means "admin" (see
-- README) — there is no separate admin_users/role table.
create policy "Authenticated users manage campaigns"
  on campaigns for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Authenticated users manage donations"
  on donations for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Authenticated users manage subscriptions"
  on subscriptions for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Storage bucket for campaign cover + gallery images.
insert into storage.buckets (id, name, public)
values ('campaign-images', 'campaign-images', true)
on conflict (id) do nothing;

create policy "Public can view campaign images"
  on storage.objects for select
  using (bucket_id = 'campaign-images');

create policy "Authenticated users upload campaign images"
  on storage.objects for insert
  with check (bucket_id = 'campaign-images' and auth.role() = 'authenticated');

create policy "Authenticated users update campaign images"
  on storage.objects for update
  using (bucket_id = 'campaign-images' and auth.role() = 'authenticated');

create policy "Authenticated users delete campaign images"
  on storage.objects for delete
  using (bucket_id = 'campaign-images' and auth.role() = 'authenticated');
