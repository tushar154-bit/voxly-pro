import {
  BRANDS,
  PLATFORMS,
  INFLUENCER_TEMPLATES,
  TOPIC_POOL,
  MENTION_TEMPLATES,
  KEYWORD_POOL,
  HASHTAG_POOL_BY_INDUSTRY,
} from './reference.js';

// Deterministic RNG (mulberry32) — same seed produces the same data each run.
export const createRng = (seed) => {
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
};

const pick = (rng, arr) => arr[Math.floor(rng() * arr.length)];
const pickWeighted = (rng, items) => {
  const total = items.reduce((s, i) => s + i.weight, 0);
  let r = rng() * total;
  for (const item of items) {
    r -= item.weight;
    if (r <= 0) return item.key ?? item;
  }
  return items[items.length - 1].key ?? items[items.length - 1];
};
const randInt = (rng, min, max) => Math.floor(min + rng() * (max - min + 1));
const randFloat = (rng, min, max, decimals = 1) =>
  parseFloat((min + rng() * (max - min)).toFixed(decimals));

// -----------------------------------------------------------------
// Mentions
// -----------------------------------------------------------------
export const generateMentionsForBrand = (brand, count, startingSeed) => {
  const rng = createRng(startingSeed);
  const mentions = [];
  const now = Date.now();
  const NINETY_DAYS = 90 * 24 * 60 * 60 * 1000;

  for (let i = 0; i < count; i++) {
    // Sentiment distribution: ~60% positive, ~25% neutral, ~15% negative
    const r = rng();
    const sentimentLabel = r < 0.6 ? 'positive' : r < 0.85 ? 'neutral' : 'negative';
    const sentimentScore =
      sentimentLabel === 'positive' ? randInt(rng, 68, 96)
        : sentimentLabel === 'neutral' ? randInt(rng, 45, 67)
        : randInt(rng, 20, 44);

    const template = pick(rng, MENTION_TEMPLATES[sentimentLabel]);
    const content = template.replace(/\{brand\}/g, brand.name);

    const platform = pickWeighted(rng, PLATFORMS);

    // Recency-biased date: ~60% in last 14 days, rest spread over 90 days
    const ageMs = rng() < 0.6
      ? Math.floor(rng() * 14 * 24 * 60 * 60 * 1000)
      : Math.floor(rng() * NINETY_DAYS);
    const postedAt = new Date(now - ageMs);

    const likes = randInt(rng, 0, 3500);
    const shares = Math.floor(likes * (0.05 + rng() * 0.2));
    const comments = Math.floor(likes * (0.08 + rng() * 0.25));
    const reach = likes * (4 + Math.floor(rng() * 8));
    const engagement = reach > 0
      ? parseFloat((((likes + shares + comments) / reach) * 100).toFixed(2))
      : 0;

    const authorIdx = randInt(rng, 0, INFLUENCER_TEMPLATES.length - 1);
    const author = INFLUENCER_TEMPLATES[authorIdx];

    mentions.push({
      brandId: brand.id,
      platform,
      authorName: author.name,
      authorHandle: '@' + author.handle,
      authorAvatar: author.image,
      content,
      sentiment: sentimentScore,
      sentimentLabel,
      likes,
      shares,
      comments,
      reach,
      engagement,
      url: null,
      postedAt,
    });
  }
  return mentions;
};

// -----------------------------------------------------------------
// Keywords (words + hashtags)
// -----------------------------------------------------------------
export const generateKeywordsForBrand = (brand, startingSeed) => {
  const rng = createRng(startingSeed);
  const periodAt = new Date();
  const keywords = [];

  // Words
  for (const term of KEYWORD_POOL) {
    keywords.push({
      brandId: brand.id,
      term,
      kind: 'word',
      count: randInt(rng, 120, 4200),
      sentiment: randInt(rng, 55, 92),
      growth: randFloat(rng, -20, 65, 1),
      periodAt,
    });
  }

  // Hashtags (brand-specific + industry pool)
  const industryHashtags = HASHTAG_POOL_BY_INDUSTRY[brand.industry] || [];
  const brandTag = `#${brand.name.replace(/\s+/g, '')}`;
  const hashtags = [brandTag, `${brandTag}Community`, `${brandTag}Fan`, ...industryHashtags];
  for (const term of hashtags) {
    keywords.push({
      brandId: brand.id,
      term,
      kind: 'hashtag',
      count: randInt(rng, 200, 12000),
      sentiment: randInt(rng, 58, 90),
      growth: randFloat(rng, -10, 120, 1),
      periodAt,
    });
  }

  return keywords;
};

// -----------------------------------------------------------------
// Influencers — shared pool, linked to brands via BrandInfluencer
// -----------------------------------------------------------------
export const generateInfluencerPool = (startingSeed) => {
  const rng = createRng(startingSeed);
  const pool = [];

  // 3 tier1, 7 tier2, 15 tier3 → 25 total influencers
  const counts = { tier1: 3, tier2: 7, tier3: 15 };
  let templateIdx = 0;

  for (const [tier, n] of Object.entries(counts)) {
    const range = tier === 'tier1'
      ? { min: 1_000_000,  max: 10_000_000 }
      : tier === 'tier2'
        ? { min: 100_000, max: 1_000_000 }
        : { min: 10_000, max: 100_000 };

    for (let i = 0; i < n; i++) {
      const tpl = INFLUENCER_TEMPLATES[templateIdx % INFLUENCER_TEMPLATES.length];
      templateIdx++;

      const followers = randInt(rng, range.min, range.max);
      const engagement = randFloat(rng, 3.5, 16.5, 1);
      const reach = Math.round(followers * (1.1 + rng() * 0.9));
      const mentions = randInt(rng, 8, 120) * (tier === 'tier1' ? 3 : tier === 'tier2' ? 2 : 1);
      const sentiment = randInt(rng, 62, 94);
      const influence = Math.min(
        99,
        Math.round(
          50 +
          rng() * 40 +
          (tier === 'tier1' ? 8 : tier === 'tier2' ? 3 : -3)
        )
      );
      const platforms = ['twitter', 'instagram', 'youtube', 'linkedin'];
      const platform = platforms[templateIdx % platforms.length];

      const topicsPool = [...TOPIC_POOL];
      const topics = [];
      for (let k = 0; k < 3; k++) {
        const idx = Math.floor(rng() * topicsPool.length);
        topics.push(topicsPool.splice(idx, 1)[0]);
      }

      pool.push({
        name: tpl.name,
        handle: '@' + tpl.handle + (i > 0 ? i : ''),
        platform,
        tier,
        followers,
        engagement,
        reach,
        mentions,
        sentiment,
        influence,
        avatarUrl: tpl.image,
        verified: tier === 'tier1' || (tier === 'tier2' && rng() > 0.4),
        topics,
        lastMentionAt: new Date(Date.now() - Math.floor(rng() * 3 * 24 * 60 * 60 * 1000)),
      });
    }
  }

  return pool;
};

// Links each brand to a mix of tier1/tier2/tier3 influencers.
export const linkInfluencersToBrand = (brand, influencers, startingSeed) => {
  const rng = createRng(startingSeed);
  const byTier = {
    tier1: influencers.filter((i) => i.tier === 'tier1'),
    tier2: influencers.filter((i) => i.tier === 'tier2'),
    tier3: influencers.filter((i) => i.tier === 'tier3'),
  };

  const sample = (arr, n) => {
    const copy = [...arr];
    const out = [];
    while (copy.length && out.length < n) {
      out.push(copy.splice(Math.floor(rng() * copy.length), 1)[0]);
    }
    return out;
  };

  return [
    ...sample(byTier.tier1, 2),
    ...sample(byTier.tier2, 4),
    ...sample(byTier.tier3, 6),
  ].map((inf) => ({
    brandId: brand.id,
    influencerId: inf.id,
  }));
};

// -----------------------------------------------------------------
// Journey stages (fixed 5 per brand)
// -----------------------------------------------------------------
export const generateJourneyStages = (brand, startingSeed) => {
  const rng = createRng(startingSeed);
  const stages = [
    { stage: 'awareness',     order: 1, conversionRate: randFloat(rng, 35, 55, 1), sentiment: randInt(rng, 70, 85), avgDays: randFloat(rng, 0.5, 2, 1) },
    { stage: 'consideration', order: 2, conversionRate: randFloat(rng, 25, 40, 1), sentiment: randInt(rng, 65, 82), avgDays: randFloat(rng, 3, 8, 1) },
    { stage: 'purchase',      order: 3, conversionRate: randFloat(rng, 18, 32, 1), sentiment: randInt(rng, 75, 90), avgDays: randFloat(rng, 1, 4, 1) },
    { stage: 'retention',     order: 4, conversionRate: randFloat(rng, 55, 78, 1), sentiment: randInt(rng, 70, 88), avgDays: randFloat(rng, 30, 120, 0) },
    { stage: 'advocacy',      order: 5, conversionRate: randFloat(rng, 20, 38, 1), sentiment: randInt(rng, 80, 95), avgDays: randFloat(rng, 60, 240, 0) },
  ];

  let customers = randInt(rng, 80_000, 160_000);
  return stages.map((s) => {
    const row = {
      brandId: brand.id,
      stage: s.stage,
      order: s.order,
      customers,
      conversionRate: s.conversionRate,
      dropoffRate: parseFloat((100 - s.conversionRate).toFixed(1)),
      sentiment: s.sentiment,
      avgDays: s.avgDays,
    };
    customers = Math.round(customers * (s.conversionRate / 100));
    return row;
  });
};

// -----------------------------------------------------------------
// Alerts
// -----------------------------------------------------------------
const ALERT_TEMPLATES = [
  { type: 'mention-spike',      severity: 'high',     titleFn: (b) => `Mention spike detected for ${b.name}` },
  { type: 'sentiment-drop',     severity: 'critical', titleFn: (b) => `Negative sentiment trending for ${b.name}` },
  { type: 'influencer-mention', severity: 'medium',   titleFn: (b) => `Top influencer mentioned ${b.name}` },
  { type: 'keyword-trend',      severity: 'low',      titleFn: (b) => `New keyword trending near ${b.name}` },
];

export const generateAlerts = (brand, startingSeed) => {
  const rng = createRng(startingSeed);
  const alerts = [];
  for (let i = 0; i < 8; i++) {
    const tpl = pick(rng, ALERT_TEMPLATES);
    const ageMinutes = randInt(rng, 5, 60 * 24 * 7); // last 7 days
    alerts.push({
      brandId: brand.id,
      type: tpl.type,
      severity: tpl.severity,
      title: tpl.titleFn(brand),
      description: `Auto-generated alert for demo purposes. Brand: ${brand.name}.`,
      isRead: rng() > 0.7,
      createdAt: new Date(Date.now() - ageMinutes * 60 * 1000),
    });
  }
  return alerts;
};

export { BRANDS };
