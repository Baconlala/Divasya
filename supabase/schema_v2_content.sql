-- Adds blog, gallery, testimonials, site settings, and contact messages.
-- Run this once in the Supabase SQL Editor, after schema.sql.

create type post_status as enum ('draft', 'published');
create type message_status as enum ('new', 'read');

create table blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text not null, -- paragraphs separated by a blank line, like campaigns.story
  cover_image text not null,
  author text not null,
  category text not null,
  status post_status not null default 'draft',
  created_at timestamptz not null default now()
);

create table gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category campaign_type not null,
  image text not null,
  before_image text,
  caption text not null,
  created_at timestamptz not null default now()
);

create table testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  location text not null,
  quote text not null,
  created_at timestamptz not null default now()
);

-- Single-row table holding the four homepage stat strings.
create table site_settings (
  id boolean primary key default true,
  stat_raised text not null default '₹3.2 Cr+',
  stat_temples text not null default '58',
  stat_donors text not null default '12,400+',
  stat_funds_percent text not null default '96%',
  constraint site_settings_singleton check (id)
);

create table contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  status message_status not null default 'new',
  created_at timestamptz not null default now()
);

insert into site_settings (id) values (true);

alter table blog_posts enable row level security;
alter table gallery_items enable row level security;
alter table testimonials enable row level security;
alter table site_settings enable row level security;
alter table contact_messages enable row level security;

create policy "Public can view published posts"
  on blog_posts for select
  using (status = 'published');
create policy "Authenticated users manage posts"
  on blog_posts for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Public can view gallery"
  on gallery_items for select
  using (true);
create policy "Authenticated users manage gallery"
  on gallery_items for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Public can view testimonials"
  on testimonials for select
  using (true);
create policy "Authenticated users manage testimonials"
  on testimonials for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Public can view site settings"
  on site_settings for select
  using (true);
create policy "Authenticated users update site settings"
  on site_settings for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Anyone can submit the contact form, but only signed-in admins can read
-- messages back — this is a write-only mailbox from the public's side.
create policy "Anyone can submit a contact message"
  on contact_messages for insert
  with check (true);
create policy "Authenticated users manage contact messages"
  on contact_messages for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Reuses the campaign-images bucket's public-read policy; gallery/blog
-- images are uploaded into the same bucket under their own path prefixes.
