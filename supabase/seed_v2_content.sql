-- Migrates the existing static blog/gallery/testimonial placeholder content
-- into the new tables, so the site is unchanged right after this migration.
-- Run once, after schema_v2_content.sql.

insert into blog_posts (title, slug, excerpt, content, cover_image, author, category, status, created_at)
values
(
  'How We Verify Every Temple Before Listing It on Divasya',
  'how-we-verify-every-temple-before-listing',
  $$Transparency starts before a single rupee is raised. Here's the verification process every temple and trust goes through before their campaign goes live.$$,
  $$Every campaign on Divasya is tied to a registered trust or society, and we don't take that on faith. Before a campaign goes live, we request registration documents, PAN details, and — where relevant — 80G certification.

We also speak directly with the trust's managing trustee or a designated representative, and where feasible, arrange a site visit or video walkthrough to confirm the cause is real and the need is current.

This process takes time, which is why you won't find thousands of causes on Divasya. We'd rather list fewer campaigns we've verified thoroughly than scale quickly at the cost of donor trust.$$,
  'https://images.unsplash.com/photo-1529733772151-bab41484710a?q=80&w=1200&auto=format&fit=crop',
  'Divasya Team',
  'Transparency',
  'published',
  '2026-08-10T00:00:00Z'
),
(
  'Where Your Monthly Donation Actually Goes',
  'where-your-monthly-donation-actually-goes',
  $$Recurring donors ask us this often. Here's a plain breakdown of how a monthly contribution is allocated, tracked, and reported back to you.$$,
  $$When you set up a monthly donation, it's directed to the specific campaign you chose — not pooled into a general fund. That campaign's raised amount updates with your contribution just like a one-time gift would.

Each trust receiving funds submits a quarterly utilization update, which we publish on the campaign page. If a campaign closes before your subscription ends, we'll notify you and let you redirect it to an active cause.

We take a small platform fee to cover payment processing and operations — this is disclosed upfront, never hidden in the fine print.$$,
  'https://images.unsplash.com/photo-1753276489352-65513edc4d03?q=80&w=1200&auto=format&fit=crop',
  'Divasya Team',
  'Donor Guide',
  'published',
  '2026-07-22T00:00:00Z'
),
(
  'Life Inside a Himalayan Ashram in Winter',
  'life-inside-a-himalayan-ashram-in-winter',
  $$A field note from our team's visit to one of the ashrams supported by our Annadaan Seva campaign, high in the hills above Uttarkashi.$$,
  $$At 7,200 feet, the temperature drops below freezing well before sunset. The ashram we visited houses eleven sadhus, the youngest in his thirties and the eldest well past eighty.

Alms, which sustain most of them through the pilgrim season, all but disappear once the roads close for winter. What we saw firsthand was simple: without outside support, some of these residents would go without a proper meal for days at a stretch.

This is the reality our Annadaan Seva campaign exists to change, and why the trust's monthly distribution log matters as much as the fundraising itself.$$,
  'https://images.unsplash.com/photo-1650341278999-d1b5142cfe30?q=80&w=1200&auto=format&fit=crop',
  'Field Team',
  'Field Notes',
  'published',
  '2026-06-30T00:00:00Z'
);

insert into gallery_items (title, category, image, before_image, caption)
values
(
  'Ganga-facing Ghat Temple, Roof Restored',
  'temple',
  'https://images.unsplash.com/photo-1554554497-0095c34db3ec?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1529733772151-bab41484710a?q=80&w=1000&auto=format&fit=crop',
  'Completed in March 2026 after an 8-week restoration funded by 620 donors.'
),
(
  'Courtyard Repaving, Devi Mandir',
  'temple',
  'https://images.unsplash.com/photo-1538460120076-604b93a2ce88?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1601821139314-66a4d14cfc00?q=80&w=1000&auto=format&fit=crop',
  'New stone flooring replaced a cracked, waterlogged courtyard.'
),
(
  'Winter Blanket Distribution, Rishikesh',
  'seva',
  'https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?q=80&w=1000&auto=format&fit=crop',
  null,
  '412 blankets distributed across 6 ashrams in a single week.'
),
(
  'Annadaan in Progress, Uttarkashi',
  'seva',
  'https://images.unsplash.com/photo-1593113616828-6f22bca04804?q=80&w=1000&auto=format&fit=crop',
  null,
  'Volunteers preparing the monthly food distribution for hill ashrams.'
),
(
  'New Library Shelving, Haridwar Gurukul',
  'gurukul',
  'https://images.unsplash.com/photo-1692269726060-9c604e06f63b?q=80&w=1000&auto=format&fit=crop',
  null,
  'First dedicated library space for 90 students.'
),
(
  'Scholarship Recipients, Nashik',
  'gurukul',
  'https://images.unsplash.com/photo-1692269725976-2bebd4622fd4?q=80&w=1000&auto=format&fit=crop',
  null,
  $$12 of this year's 40 sponsored students at their morning Vedic recitation.$$
),
(
  'New Shelter Shed, Mathura Gaushala',
  'animal_welfare',
  'https://images.unsplash.com/photo-1598122738791-e6efd4b8e9a9?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1671886494502-f2e73eba2948?q=80&w=1000&auto=format&fit=crop',
  'Covered shelter for 60 additional cows, completed ahead of last winter.'
),
(
  'Mobile Vet Unit on Call',
  'animal_welfare',
  'https://images.unsplash.com/photo-1737931333795-16311e8a4224?q=80&w=1000&auto=format&fit=crop',
  null,
  'Emergency treatment delivered on-site in a village outside Jaipur.'
);

insert into testimonials (name, location, quote)
values
(
  'Radhika Sharma',
  'Pune, Maharashtra',
  $$I've supported temple restoration causes before without ever knowing if the work actually happened. Divasya sent photo updates at every stage — that's rare, and it's why I've kept my monthly donation running.$$
),
(
  'Amit Kulkarni',
  'Bengaluru, Karnataka',
  $$The transparency report on the gaushala campaign showed exactly how many cows were fed and treated. That level of detail is what got me to switch from a one-time gift to a monthly one.$$
),
(
  'Meera Iyer',
  'Chennai, Tamil Nadu',
  $$Sponsoring a gurukul student's full year felt overwhelming until I saw exactly what the scholarship covers. Now I get a short note from the gurukul every quarter.$$
);
