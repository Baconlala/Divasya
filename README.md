# Divasya

Campaign-based donation platform for temple restoration, sadhu seva, gurukul
education, and animal welfare causes.

**Status: Phase 2 — Supabase-backed campaigns + admin panel.** Campaigns now
live in a real database and are managed from `/admin`. Donations are still a
UI-only preview (no payments yet — that's Phase 3). Blog and gallery content
are still static placeholders in `src/lib/data/`.

**The site will not run until you connect a Supabase project** — see setup
below. Images are still curated stock photos from Unsplash; swap them for
real photos whenever you have them.

## One-time Supabase setup

1. Create a free project at [supabase.com](https://supabase.com).
2. In the Supabase dashboard, open the **SQL Editor** and run
   [`supabase/schema.sql`](./supabase/schema.sql), then
   [`supabase/seed.sql`](./supabase/seed.sql). This creates the `campaigns`
   table (plus `donations`/`subscriptions`, unused until Phase 3/4) and seeds
   it with the same 8 placeholder campaigns the site already had.
3. Go to **Authentication → Providers** and turn **off** "Allow new users to
   sign up". This site has exactly one kind of account — the admin — and
   nobody should be able to create one but you.
4. Go to **Authentication → Users → Add user** and create your own admin
   login (an email + a password you choose). That's the account you'll use
   to sign in at `/admin`. There is no separate signup page by design.
5. Go to **Project Settings → API** and copy the **Project URL** and the
   **anon public key**.

## Local environment

Copy `.env.example` to `.env.local` and fill in the two Supabase values from
step 5 above:

```bash
cp .env.example .env.local
```

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the public site, and
[http://localhost:3000/admin](http://localhost:3000/admin) to log in and
manage campaigns.

## Deploying (Vercel)

Add the same two variables from `.env.local` to the project in **Vercel →
Settings → Environment Variables**, then redeploy. Until they're set, every
page that reads campaigns (home, `/campaigns`, `/admin`, etc.) will show a
server error — that's expected, not a bug.

If you're deploying by running `vercel` from your terminal each time, ask to
set up GitHub + Vercel's Git integration instead so every change deploys
automatically on push — no manual `vercel` command needed.

## What's here

- `src/app/(site)/` — the public site: home, campaigns listing + detail, a
  donation flow preview, gallery, blog, about, contact, privacy, terms.
- `src/app/admin/` — the admin panel: login, campaign list, create/edit
  forms. Protected by `src/proxy.ts`, which redirects signed-out visitors to
  `/admin/login`.
- `src/lib/campaigns.ts` — all campaign reads, backed by Supabase. Row Level
  Security (defined in `supabase/schema.sql`) is what actually enforces that
  anonymous visitors only ever see `status = 'live'` campaigns — the app
  code doesn't need to re-check that itself.
- `src/app/admin/actions.ts` — Server Actions for create/update/delete,
  including image upload to Supabase Storage.
- `src/lib/data/` — blog posts, gallery items, and testimonials. Still
  static placeholder content; not part of this migration.

## Who can do what

- **Donors** never need an account. Name and email are collected per-donation
  once Phase 3 lands — same as the current UI preview.
- **The admin** (you) is the only login on the whole site. There's no
  separate `admin_users`/roles table — with public signup disabled, "signed
  in" and "admin" mean the same thing. If you ever want a second admin, add
  them from Supabase's dashboard the same way you added yourself.

## Known limitations at this stage

- Deleting a campaign in `/admin` does not delete its images from Supabase
  Storage — they're just orphaned (free tier is 1GB, so this is a non-issue
  until the site has real scale).
- `raised_amount` and `donor_count` are manually edited in the admin form for
  now. Once Phase 3/4 wires up real donations, these should be computed from
  the `donations`/`subscriptions` tables instead.

## About the donation flow

`/donate/[slug]` and `/donate/thank-you` are a clickable **preview** of the
donation UI only — amount selection, a one-time/monthly toggle, a donor
details form, and a confirmation page. Submitting the form does not charge
anyone or store anything; it just simulates the flow so the site feels
complete to click through. Real Razorpay checkout comes in Phase 3.

## Next steps (per the build plan)

1. ~~**Phase 2** — Supabase for real campaign data + an admin panel to manage
   campaigns.~~ Done.
2. **Phase 3** — Razorpay one-time checkout, wired to the database.
3. **Phase 4** — Razorpay subscriptions + webhooks for recurring donations.
4. **Phase 5** — go-live checklist, swap test keys for live keys.

