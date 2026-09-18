-- Seeds the campaigns table with the same placeholder campaigns the static
-- Phase 1 site shipped with, so the live site looks unchanged right after
-- migrating to Supabase. Run once, after schema.sql, in the SQL Editor.

insert into campaigns (title, slug, type, location, short_description, story, cover_image, gallery, goal_amount, raised_amount, donor_count, status)
values
(
  'Restore the 300-Year-Old Shiv Mandir, Varanasi',
  'restore-shiv-mandir-varanasi',
  'temple',
  'Varanasi, Uttar Pradesh',
  'The sanctum roof and outer walls of this heritage temple are cracking after last year''s monsoon. Help us restore it without altering its original architecture.',
  $$Tucked away in a narrow lane near the ghats, this Shiv Mandir has stood for over three centuries, surviving floods, invasions, and the slow wear of time. But last year's monsoon was unusually severe, and water seepage has weakened the sanctum roof and the eastern outer wall.

Our restoration plan, reviewed by a heritage conservation architect, focuses on structural repair using traditional lime-mortar techniques rather than modern cement — preserving the temple's original character while making it safe for the thousands of devotees who visit every month.

Every rupee raised goes toward materials, skilled labor from local artisans trained in heritage restoration, and independent structural inspection. We publish photo updates at each stage so you can see exactly where your contribution went.$$,
  'https://images.unsplash.com/photo-1554554497-0095c34db3ec?q=80&w=1600&auto=format&fit=crop',
  array[
    'https://images.unsplash.com/photo-1538460120076-604b93a2ce88?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1601821139314-66a4d14cfc00?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1529733772151-bab41484710a?q=80&w=1000&auto=format&fit=crop'
  ],
  1800000, 1124500, 842, 'live'
),
(
  'Roof Repair for Hanuman Temple, Ayodhya Outskirts',
  'hanuman-temple-roof-repair-ayodhya',
  'temple',
  'Ayodhya, Uttar Pradesh',
  'A small but heavily-visited Hanuman temple needs urgent roof repair before the next monsoon season arrives.',
  $$This modest Hanuman temple serves nearly 2,000 devotees on Tuesdays and Saturdays alone, many of them daily wage workers and farmers from nearby villages who consider it their spiritual anchor.

The tin-and-concrete roof installed decades ago has begun to leak in multiple places, and monsoon is three months away. The local trust has neither the funds nor the scale to raise this alone.

This campaign funds a proper concrete roof with waterproofing, plus minor electrical rewiring flagged as unsafe during the inspection.$$,
  'https://images.unsplash.com/photo-1538460120076-604b93a2ce88?q=80&w=1600&auto=format&fit=crop',
  array[
    'https://images.unsplash.com/photo-1554554497-0095c34db3ec?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1529733772151-bab41484710a?q=80&w=1000&auto=format&fit=crop'
  ],
  450000, 268900, 391, 'live'
),
(
  'Annadaan Seva for Himalayan Sadhus',
  'annadaan-seva-himalayan-sadhus',
  'seva',
  'Rishikesh & Uttarkashi, Uttarakhand',
  'Daily meals and basic winter provisions for sadhus living in remote ashrams along the Himalayan pilgrim routes.',
  $$Hundreds of sadhus live in small ashrams and caves along the Himalayan routes to Gangotri and Yamunotri, sustaining themselves on alms that grow scarce once winter closes the pilgrim season.

This seva programme, run in partnership with three local trusts, provides daily annadaan (food offering), warm blankets, and basic medical supplies through the harsh winter months when footfall — and donations — dry up completely.

Your contribution is pooled and distributed monthly by trust volunteers, with a public log of quantities distributed at each ashram.$$,
  'https://images.unsplash.com/photo-1650341278999-d1b5142cfe30?q=80&w=1600&auto=format&fit=crop',
  array[
    'https://images.unsplash.com/photo-1783866707432-a9046402c46a?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1593113616828-6f22bca04804?q=80&w=1000&auto=format&fit=crop'
  ],
  600000, 512300, 1204, 'live'
),
(
  'Winter Blankets & Seva for Vrindavan''s Ashram Residents',
  'winter-blankets-vrindavan-widows-ashram',
  'seva',
  'Vrindavan, Uttar Pradesh',
  'Warm blankets, medicines, and daily seva support for elderly ashram residents through the winter months.',
  $$Vrindavan's ashrams house hundreds of elderly residents who have devoted their remaining years to bhajan and seva, many with no family support and limited means.

This campaign funds thick winter blankets, basic medicines for age-related ailments, and daily kitchen support so no resident goes without a hot meal during the cold months.

We work directly with two registered ashram trusts and publish distribution counts every fortnight.$$,
  'https://images.unsplash.com/photo-1783866707432-a9046402c46a?q=80&w=1600&auto=format&fit=crop',
  array[
    'https://images.unsplash.com/photo-1650341278999-d1b5142cfe30?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1593113616828-6f22bca04804?q=80&w=1000&auto=format&fit=crop'
  ],
  350000, 141200, 276, 'live'
),
(
  'Scholarships for 40 Vedic Gurukul Students',
  'gurukul-scholarship-vedic-students',
  'gurukul',
  'Nashik, Maharashtra',
  'Full-year scholarships covering food, books, and boarding for children studying Vedic scripture and traditional sciences at a residential gurukul.',
  $$This residential gurukul teaches Vedic chanting, Sanskrit grammar, and traditional sciences to 120 students, most from families who could not otherwise afford this education.

Forty of this year's incoming students remain without a sponsor, which means the gurukul is short on funds for their food, boarding, uniforms, and study materials for the full academic year.

A monthly contribution here sponsors a student's essentials on an ongoing basis; a one-time gift contributes to the shared scholarship pool.$$,
  'https://images.unsplash.com/photo-1692269725836-fbd72e98883f?q=80&w=1600&auto=format&fit=crop',
  array[
    'https://images.unsplash.com/photo-1692269725911-87697c558be1?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1692269726060-9c604e06f63b?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1692269725976-2bebd4622fd4?q=80&w=1000&auto=format&fit=crop'
  ],
  960000, 417600, 503, 'live'
),
(
  'New Library & Classroom Repair for a Girls'' Gurukul',
  'gurukul-library-and-classroom-repair',
  'gurukul',
  'Haridwar, Uttarakhand',
  'This girls'' gurukul needs classroom repairs and its first proper library — right now, students share a handful of tattered textbooks.',
  $$Ninety girls study Sanskrit, Vedic mathematics, and modern subjects side by side at this gurukul, but the classroom block hasn't seen repair in over a decade and there is no dedicated library.

This campaign funds classroom flooring and roof repair, plus 500 new books and shelving to build the gurukul's first library.

Progress photos will be shared as construction and the book drive complete.$$,
  'https://images.unsplash.com/photo-1692269725911-87697c558be1?q=80&w=1600&auto=format&fit=crop',
  array[
    'https://images.unsplash.com/photo-1692269725836-fbd72e98883f?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1692269726060-9c604e06f63b?q=80&w=1000&auto=format&fit=crop'
  ],
  520000, 96400, 118, 'live'
),
(
  'Fodder & Shelter Expansion for a Mathura Gaushala',
  'gaushala-fodder-and-shelter-mathura',
  'animal_welfare',
  'Mathura, Uttar Pradesh',
  'This gaushala shelters 340 rescued and abandoned cows but is short on fodder and covered shelter ahead of winter.',
  $$The gaushala currently houses 340 cows, many rescued from abandonment or injury, and takes in new arrivals every week.

Fodder costs have risen sharply this year, and roughly a third of the herd still lacks covered shelter for the winter months, leaving them exposed to cold and rain.

Funds raised go toward daily fodder, veterinary care, and constructing two additional covered shelter sheds before winter sets in.$$,
  'https://images.unsplash.com/photo-1598122738791-e6efd4b8e9a9?q=80&w=1600&auto=format&fit=crop',
  array[
    'https://images.unsplash.com/photo-1636319134802-2df8a01e6e33?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1671886494502-f2e73eba2948?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1737931333795-16311e8a4224?q=80&w=1000&auto=format&fit=crop'
  ],
  720000, 388100, 667, 'live'
),
(
  'Emergency Medical Fund for Injured & Sick Cattle',
  'injured-cattle-medical-fund',
  'animal_welfare',
  'Multiple locations, Rajasthan',
  'A rapid-response fund covering emergency veterinary treatment for injured and sick cattle brought in from surrounding villages.',
  $$This fund supports a mobile veterinary unit that responds to injured, sick, or abandoned cattle across a network of villages in rural Rajasthan.

Cases range from road accident injuries to untreated infections that, left unattended, are usually fatal. Rapid response and medicine cost are the two biggest constraints.

Your donation keeps the emergency fund stocked so no case is turned away for lack of funds.$$,
  'https://images.unsplash.com/photo-1636319134802-2df8a01e6e33?q=80&w=1600&auto=format&fit=crop',
  array[
    'https://images.unsplash.com/photo-1598122738791-e6efd4b8e9a9?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1737931333795-16311e8a4224?q=80&w=1000&auto=format&fit=crop'
  ],
  null, 214750, 445, 'live'
);
