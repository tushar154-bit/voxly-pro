import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { BRANDS, COMPETITOR_GROUPS } from './seed/reference.js';
import {
  generateMentionsForBrand,
  generateKeywordsForBrand,
  generateInfluencerPool,
  linkInfluencersToBrand,
  generateJourneyStages,
  generateAlerts,
} from './seed/generators.js';

const prisma = new PrismaClient();

const MENTIONS_PER_BRAND = 500;   // ~5,000 mentions total across 10 brands
const SEED_BASE = 1_000_000;

const demoUsers = [
  { email: 'demo@voxly.pro',  password: 'demo1234',  name: 'Demo User',  role: 'user' },
  { email: 'admin@voxly.pro', password: 'admin1234', name: 'Admin User', role: 'admin' },
];

async function wipeDomainData() {
  // Delete in dependency order so FKs don't block us.
  console.log('Clearing existing domain data...');
  await prisma.pinnedInfluencer.deleteMany();
  await prisma.report.deleteMany();
  await prisma.alert.deleteMany();
  await prisma.journeyStage.deleteMany();
  await prisma.competitorRelation.deleteMany();
  await prisma.brandInfluencer.deleteMany();
  await prisma.mention.deleteMany();
  await prisma.keyword.deleteMany();
  await prisma.influencer.deleteMany();
  await prisma.brand.deleteMany();
}

async function seedUsers() {
  console.log('Seeding demo users...');
  for (const u of demoUsers) {
    const passwordHash = await bcrypt.hash(u.password, 10);
    await prisma.user.upsert({
      where: { email: u.email },
      update: { name: u.name, role: u.role },
      create: { email: u.email, passwordHash, name: u.name, role: u.role },
    });
    console.log(`  ✔ ${u.email}  (password: ${u.password})`);
  }
}

async function seedBrands() {
  console.log('Seeding brands...');
  const created = [];
  for (const b of BRANDS) {
    const brand = await prisma.brand.create({ data: b });
    created.push(brand);
  }
  console.log(`  ✔ ${created.length} brands`);
  return created;
}

async function seedCompetitors(brandsBySlug) {
  console.log('Seeding competitor relations...');
  const data = [];
  for (const [slug, competitors] of Object.entries(COMPETITOR_GROUPS)) {
    const brand = brandsBySlug[slug];
    if (!brand) continue;
    for (const compSlug of competitors) {
      const comp = brandsBySlug[compSlug];
      if (!comp || comp.id === brand.id) continue;
      data.push({ brandId: brand.id, competitorBrandId: comp.id });
    }
  }
  const res = await prisma.competitorRelation.createMany({ data, skipDuplicates: true });
  console.log(`  ✔ ${res.count} competitor relations`);
}

async function seedInfluencers() {
  console.log('Seeding influencer pool...');
  const pool = generateInfluencerPool(SEED_BASE + 77);
  // createMany doesn't return rows; insert one-by-one so we can collect IDs.
  const created = [];
  for (const inf of pool) {
    const row = await prisma.influencer.create({ data: inf });
    created.push(row);
  }
  console.log(`  ✔ ${created.length} influencers`);
  return created;
}

async function seedBrandInfluencerLinks(brands, influencers) {
  console.log('Linking influencers to brands...');
  const data = [];
  brands.forEach((brand, idx) => {
    data.push(...linkInfluencersToBrand(brand, influencers, SEED_BASE + 200 + idx));
  });
  const res = await prisma.brandInfluencer.createMany({ data, skipDuplicates: true });
  console.log(`  ✔ ${res.count} brand–influencer links`);
}

async function seedMentionsAndKeywords(brands) {
  console.log('Seeding mentions + keywords...');
  let totalMentions = 0;
  let totalKeywords = 0;

  for (let i = 0; i < brands.length; i++) {
    const brand = brands[i];
    const mentions = generateMentionsForBrand(brand, MENTIONS_PER_BRAND, SEED_BASE + 1000 + i);
    const keywords = generateKeywordsForBrand(brand, SEED_BASE + 5000 + i);

    const [mRes, kRes] = await Promise.all([
      prisma.mention.createMany({ data: mentions }),
      prisma.keyword.createMany({ data: keywords }),
    ]);
    totalMentions += mRes.count;
    totalKeywords += kRes.count;
    process.stdout.write(`  ${brand.name}: ${mRes.count} mentions, ${kRes.count} keywords\n`);
  }
  console.log(`  ✔ ${totalMentions} mentions, ${totalKeywords} keywords`);
}

async function seedJourneyAndAlerts(brands) {
  console.log('Seeding journey stages + alerts...');
  let stages = 0;
  let alerts = 0;
  for (let i = 0; i < brands.length; i++) {
    const brand = brands[i];
    const j = generateJourneyStages(brand, SEED_BASE + 9000 + i);
    const a = generateAlerts(brand, SEED_BASE + 12_000 + i);
    const [jRes, aRes] = await Promise.all([
      prisma.journeyStage.createMany({ data: j }),
      prisma.alert.createMany({ data: a }),
    ]);
    stages += jRes.count;
    alerts += aRes.count;
  }
  console.log(`  ✔ ${stages} journey stages, ${alerts} alerts`);
}

async function main() {
  const started = Date.now();
  console.log('=== Voxly Pro — Seeding ===');

  await wipeDomainData();
  await seedUsers();

  const brands = await seedBrands();
  const brandsBySlug = Object.fromEntries(brands.map((b) => [b.slug, b]));

  await seedCompetitors(brandsBySlug);

  const influencers = await seedInfluencers();
  await seedBrandInfluencerLinks(brands, influencers);

  await seedMentionsAndKeywords(brands);
  await seedJourneyAndAlerts(brands);

  const elapsed = ((Date.now() - started) / 1000).toFixed(1);
  console.log(`=== Done in ${elapsed}s ===`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
