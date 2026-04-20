// Reference data pools used by the seed generators.

export const BRANDS = [
  { slug: 'apple',     name: 'Apple',     industry: 'Technology', country: 'USA',         color: '#1a1a1a', baseFollowers: 28_000_000, description: 'Consumer electronics, software & services.' },
  { slug: 'google',    name: 'Google',    industry: 'Technology', country: 'USA',         color: '#4285f4', baseFollowers: 32_000_000, description: 'Search, advertising & cloud services.' },
  { slug: 'microsoft', name: 'Microsoft', industry: 'Technology', country: 'USA',         color: '#0078d4', baseFollowers: 18_000_000, description: 'Software, cloud & enterprise services.' },
  { slug: 'nvidia',    name: 'Nvidia',    industry: 'Technology', country: 'USA',         color: '#76b900', baseFollowers:  9_500_000, description: 'GPU & AI compute hardware.' },
  { slug: 'samsung',   name: 'Samsung',   industry: 'Technology', country: 'South Korea', color: '#1428a0', baseFollowers: 22_000_000, description: 'Consumer electronics & semiconductors.' },
  { slug: 'amazon',    name: 'Amazon',    industry: 'Retail',     country: 'USA',         color: '#ff9900', baseFollowers: 30_000_000, description: 'E-commerce, cloud & logistics.' },
  { slug: 'tesla',     name: 'Tesla',     industry: 'Automotive', country: 'USA',         color: '#cc0000', baseFollowers: 20_000_000, description: 'Electric vehicles & energy.' },
  { slug: 'ford',      name: 'Ford',      industry: 'Automotive', country: 'USA',         color: '#003478', baseFollowers:  4_800_000, description: 'Automotive manufacturer.' },
  { slug: 'bmw',       name: 'BMW',       industry: 'Automotive', country: 'Germany',     color: '#0066b1', baseFollowers:  7_200_000, description: 'Premium automotive brand.' },
  { slug: 'mercedes',  name: 'Mercedes',  industry: 'Automotive', country: 'Germany',     color: '#00adef', baseFollowers:  8_100_000, description: 'Luxury automobile manufacturer.' },
];

export const COMPETITOR_GROUPS = {
  apple:     ['google', 'microsoft', 'samsung', 'amazon'],
  google:    ['apple', 'microsoft', 'amazon', 'samsung'],
  microsoft: ['google', 'apple', 'amazon', 'nvidia'],
  nvidia:    ['microsoft', 'apple', 'samsung', 'amazon'],
  samsung:   ['apple', 'google', 'nvidia', 'amazon'],
  amazon:    ['google', 'apple', 'microsoft', 'samsung'],
  tesla:     ['ford', 'bmw', 'mercedes'],
  ford:      ['tesla', 'bmw', 'mercedes'],
  bmw:       ['tesla', 'mercedes', 'ford'],
  mercedes:  ['tesla', 'bmw', 'ford'],
};

export const PLATFORMS = [
  { key: 'twitter',   weight: 0.28 },
  { key: 'instagram', weight: 0.22 },
  { key: 'reddit',    weight: 0.15 },
  { key: 'youtube',   weight: 0.12 },
  { key: 'linkedin',  weight: 0.10 },
  { key: 'facebook',  weight: 0.08 },
  { key: 'tiktok',    weight: 0.05 },
];

export const INFLUENCER_TEMPLATES = [
  { name: 'Sarah Johnson',    handle: 'sarahjtech',     image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face' },
  { name: 'Emma Rodriguez',   handle: 'emmar_digital',  image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
  { name: 'Lisa Anderson',    handle: 'lisaanderson',   image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face' },
  { name: 'Jennifer Lee',     handle: 'jenniferlee',    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face' },
  { name: 'Maria Garcia',     handle: 'mariagarcia',    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=face' },
  { name: 'Rachel Green',     handle: 'rachelgreen',    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face' },
  { name: 'Amanda White',     handle: 'amandawhite',    image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&h=150&fit=crop&crop=face' },
  { name: 'Nicole Brown',     handle: 'nicolebrown',    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face' },
  { name: 'Jessica Taylor',   handle: 'jesstaylor',     image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face' },
  { name: 'Sophia Martinez',  handle: 'sophiamtz',      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face' },
  { name: 'Mike Chen',        handle: 'mikechendev',    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
  { name: 'David Kim',        handle: 'davidkim_tech',  image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' },
  { name: 'Alex Thompson',    handle: 'alexthompson',   image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
  { name: 'James Wilson',     handle: 'jameswilson',    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face' },
  { name: 'Brian Lee',        handle: 'brianlee',       image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face' },
  { name: 'Ryan Garcia',      handle: 'ryangarcia',     image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop&crop=face' },
  { name: 'Chris Johnson',    handle: 'chrisjohnson',   image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop&crop=face' },
  { name: 'Kevin Park',       handle: 'kevinpark',      image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop&crop=face' },
  { name: 'Daniel Brown',     handle: 'danielbrown',    image: 'https://images.unsplash.com/photo-1495216875107-c6c043eb703f?w=150&h=150&fit=crop&crop=face' },
  { name: 'Matthew Davis',    handle: 'matthewdavis',   image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop&crop=face' },
  { name: 'Priya Kapoor',     handle: 'priyakapoor',    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face' },
  { name: 'Olivia Bennett',   handle: 'oliviabennett',  image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop&crop=face' },
  { name: 'Hannah Carter',    handle: 'hannahcarter',   image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=150&h=150&fit=crop&crop=face' },
  { name: 'Isabella Moreno',  handle: 'isabellamoreno', image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150&h=150&fit=crop&crop=face' },
  { name: 'Chloe Sullivan',   handle: 'chloesullivan',  image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face' },
  { name: 'Arjun Mehta',      handle: 'arjunmehta',     image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
  { name: 'Noah Williams',    handle: 'noahwilliams',   image: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?w=150&h=150&fit=crop&crop=face' },
  { name: 'Liam O\'Connor',   handle: 'liamoconnor',    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=face' },
  { name: 'Ethan Patel',      handle: 'ethanpatel',     image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face' },
  { name: 'Lucas Martinez',   handle: 'lucasmartinez',  image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face' },
];

export const TOPIC_POOL = [
  'Technology', 'Innovation', 'AI', 'Cloud', 'Startups', 'Mobile', 'Gaming',
  'Hardware', 'Software', 'Automotive', 'Electric Vehicles', 'Design',
  'Sustainability', 'Finance', 'Business', 'Marketing', 'Leadership',
  'Productivity', 'Remote Work', 'Developer Tools', 'Open Source', 'Security',
  'Data Science', 'Machine Learning', 'Consumer Tech', 'Future Tech',
];

// Lightweight content templates — placeholders are filled per brand.
export const MENTION_TEMPLATES = {
  positive: [
    'Loving the new {brand} update — this is a huge improvement!',
    'Just switched to {brand} and honestly, best decision I\'ve made all year.',
    'The {brand} team absolutely nailed it with this release.',
    '{brand} customer support was amazing today — 10/10.',
    'Incredible how fast {brand} has been iterating lately.',
    'Another reason why I keep recommending {brand} to my team.',
    'The build quality on the latest {brand} product is top-tier.',
    'Finally a company that listens to its users. Thanks {brand}!',
    '{brand} is setting a new standard in the industry.',
    'Three months in with {brand} and I have zero regrets.',
  ],
  neutral: [
    'Anyone else testing the new {brand} beta? Curious what you think.',
    '{brand} announced some updates today — still reading through them.',
    'Watching the {brand} keynote right now.',
    'Not sure how I feel about the latest {brand} direction yet.',
    '{brand} pricing changes took effect this month.',
    'Comparing {brand} and competitors for a project — any recs?',
    'Is {brand} worth the hype in 2026? Genuine question.',
    'Heard {brand} is hiring again — anyone have insight?',
  ],
  negative: [
    'Another outage with {brand} today. This is getting frustrating.',
    '{brand} customer service has really gone downhill.',
    'Disappointed with the latest {brand} pricing changes.',
    'Been a {brand} user for years but thinking of switching.',
    'The {brand} UI redesign is a step backwards in my opinion.',
    '{brand} still hasn\'t fixed the bug I reported three weeks ago.',
    'Why is {brand} removing features people actually use?',
    'Battery life on the new {brand} device is disappointing.',
  ],
};

export const KEYWORD_POOL = [
  'innovation', 'quality', 'support', 'features', 'price', 'service',
  'update', 'design', 'performance', 'reliability', 'security', 'speed',
  'value', 'customer', 'experience', 'launch', 'ecosystem', 'roadmap',
  'integration', 'workflow',
];

export const HASHTAG_POOL_BY_INDUSTRY = {
  Technology: ['#tech', '#innovation', '#ai', '#cloud', '#developers', '#softwareengineering'],
  Automotive: ['#ev', '#cars', '#auto', '#electricvehicles', '#futureofdriving', '#carreview'],
  Retail:     ['#ecommerce', '#retail', '#shopping', '#deals', '#logistics', '#supplychain'],
};
