/**
 * Voxly Pro - Comprehensive Mock Data Generator
 * Generates realistic, platform-specific data for all pages
 */

const MockData = {
    // Platform configuration with detailed metrics
    platformConfig: {
        twitter: {
            id: 'twitter',
            name: 'X',
            icon: '𝕏',
            color: '#60A5FA', // Bright blue
            avgEngagement: 4.2,
            peakHours: [9, 12, 17, 20],
            sentimentBias: 0.65, // Slightly positive
            growthRate: 12
        },
        reddit: {
            id: 'reddit',
            name: 'Reddit',
            icon: '🤖',
            color: '#FF6B35', // Bright orange-red
            avgEngagement: 8.5,
            peakHours: [10, 14, 18, 22],
            sentimentBias: 0.55, // More balanced
            growthRate: 18
        },
        youtube: {
            id: 'youtube',
            name: 'YouTube',
            icon: '▶️',
            color: '#FF5757', // Bright red
            avgEngagement: 3.8,
            peakHours: [11, 15, 19, 21],
            sentimentBias: 0.70, // More positive
            growthRate: 8
        },
        linkedin: {
            id: 'linkedin',
            name: 'LinkedIn',
            icon: '💼',
            color: '#38BDF8', // Bright sky blue
            avgEngagement: 5.2,
            peakHours: [8, 10, 12, 17],
            sentimentBias: 0.75, // Professional/positive
            growthRate: 15
        },
        facebook: {
            id: 'facebook',
            name: 'Facebook',
            icon: '📘',
            color: '#3B82F6', // Bright blue
            avgEngagement: 2.8,
            peakHours: [9, 13, 18, 20],
            sentimentBias: 0.60,
            growthRate: 5
        },
        instagram: {
            id: 'instagram',
            name: 'Instagram',
            icon: '📸',
            color: '#F472B6', // Bright pink
            avgEngagement: 6.5,
            peakHours: [11, 14, 19, 21],
            sentimentBias: 0.72,
            growthRate: 22
        },
        news: {
            id: 'news',
            name: 'News',
            icon: '📰',
            color: '#A78BFA', // Bright purple
            avgEngagement: 1.5,
            peakHours: [6, 9, 12, 18],
            sentimentBias: 0.50, // Neutral
            growthRate: 3
        },
        reviews: {
            id: 'reviews',
            name: 'Reviews',
            icon: '⭐',
            color: '#FBBF24', // Bright yellow
            avgEngagement: 12.3,
            peakHours: [10, 14, 16, 20],
            sentimentBias: 0.58,
            growthRate: 10
        }
    },

    // Platform-specific usernames
    usernames: {
        twitter: [
            '@techreviewer', '@digitalmarketer', '@productgeek', '@startupfounder',
            '@saikiranJuly09', '@dev_enthusiast', '@airesearcher', '@cloudexpert',
            '@datadriven', '@growthacker', '@uxdesigner', '@cybersecpro',
            '@maboroshi_Ashi', '@codingwizard', '@futuretech', '@saborastudios',
            '@techmaverick', '@innovatelife', '@codepro_dev', '@aiethicist'
        ],
        reddit: [
            'u/TechEnthusiast42', 'u/ProductReviewer', 'u/StartupGuru',
            'u/DigitalNomad', 'u/GadgetLover', 'u/InnovationHub',
            'u/FutureTech', 'u/CodeMaster', 'u/DataScientist', 'u/AIExplorer',
            'u/SoftwareArchitect', 'u/CryptoAnalyst', 'u/MarketingPro',
            'u/UXResearcher', 'u/ProductManager2024'
        ],
        youtube: [
            'TechReview Pro', 'Digital Marketing Hub', 'Startup Stories',
            'Product Unboxed', 'Innovation Daily', 'Future Tech', 'AI Insights',
            'Cloud Academy', 'Code with Me', 'Tech Simplified', 'Gadget Zone',
            'Business Tech Talk', 'Developer Journey'
        ],
        linkedin: [
            'Sarah Johnson, CMO', 'Michael Chen, CTO', 'Emily Rodriguez, VP Marketing',
            'David Kim, Product Lead', 'Jennifer Lee, CEO', 'Robert Singh, Director',
            'Amanda Foster, Growth Lead', 'James Wilson, Engineering Manager',
            'Lisa Park, Data Science Lead', 'Thomas Brown, VP Sales'
        ],
        instagram: [
            '@tech.daily', '@startup.life', '@digital.trends', '@product.hunt',
            '@innovation.hub', '@ai.future', '@code.lifestyle', '@design.tech',
            '@entrepreneur.mindset', '@growth.hacking', '@techie.world'
        ],
        facebook: [
            'Tech Enthusiasts Group', 'Digital Marketing Pros', 'Startup Community',
            'Innovation Leaders', 'Product Managers Network', 'AI & ML Community',
            'Software Developers Hub', 'Business Growth Strategies', 'Tech News Daily'
        ],
        news: [
            'TechCrunch', 'The Verge', 'Wired', 'Forbes Tech', 'Bloomberg',
            'Reuters', 'CNBC', 'Business Insider', 'Ars Technica', 'Engadget',
            'VentureBeat', 'ZDNet', 'The Information', 'Protocol'
        ],
        reviews: [
            'TrustPilot User', 'G2 Reviewer', 'Capterra User', 'ProductHunt User',
            'App Store Review', 'Play Store Review', 'GetApp User', 'Software Advice',
            'Gartner Peer Insights', 'Verified Buyer'
        ]
    },

    // Platform-specific content templates
    contentTemplates: {
        twitter: {
            positive: [
                "Just tried {brand} and I'm absolutely impressed! The new features are game-changing. {hashtag} 🚀",
                "Honestly, {brand} has exceeded all my expectations. Best decision I've made! ⭐",
                "The customer support at {brand} is incredible! They resolved my issue in minutes. 👏",
                "{brand} just keeps getting better. The latest update is fantastic! 💯",
                "Switching to {brand} was the best move. Our team productivity is through the roof! 📈"
            ],
            neutral: [
                "Has anyone tried the new {brand} update? Wondering if it's worth upgrading. {hashtag}",
                "Comparing {brand} vs competitors. Any thoughts from current users? 🤔",
                "Just started my trial with {brand}. Will share my thoughts after a week.",
                "Reading reviews about {brand}. Mixed opinions so far. What's your experience?",
                "{brand} announced new features today. Interesting direction for the product."
            ],
            negative: [
                "Frustrated with {brand} lately. The latest update broke several features. 😤",
                "Customer support at {brand} has been unresponsive for 3 days now. Not acceptable!",
                "Considering switching from {brand}. Too many bugs and issues lately. 👎",
                "{brand}'s pricing increase is disappointing. May need to look elsewhere.",
                "The new {brand} UI is confusing. Why fix what wasn't broken? 🙄"
            ]
        },
        reddit: {
            positive: [
                "[Discussion] {brand} has completely transformed our workflow. Here's my detailed review after 6 months of use.",
                "PSA: {brand}'s new update actually delivers on promises. Rare to see these days.",
                "Coming from a skeptic - {brand} won me over. Here's why it's worth every penny.",
                "The {brand} team actually listens to feedback! They implemented my suggestion.",
                "Comprehensive comparison: {brand} vs the competition. Spoiler: {brand} wins."
            ],
            neutral: [
                "[Question] Is {brand} worth it for a small team? Looking for honest opinions.",
                "Thinking of switching to {brand}. What are the pros and cons?",
                "[Discussion] {brand} pricing comparison - is it competitive?",
                "Anyone using {brand} for enterprise? How does it scale?",
                "ELI5: What makes {brand} different from alternatives?"
            ],
            negative: [
                "[Rant] {brand} support has been terrible lately. Anyone else experiencing this?",
                "Warning: {brand}'s latest update has serious bugs. Avoid updating for now.",
                "[Help] {brand} integration broke our entire pipeline. Need alternatives ASAP.",
                "Disappointed with {brand}. The product doesn't match the marketing.",
                "[Discussion] {brand} keeps increasing prices without adding value. Time to switch?"
            ]
        },
        youtube: {
            positive: [
                "This is hands down the best {brand} tutorial I've ever watched! The explanation was crystal clear.",
                "After using {brand} for a year, I can confidently say it's worth every penny. Great video!",
                "Finally someone explained {brand} properly! This helped me understand everything.",
                "{brand} review: Why I think this is the best solution in 2024. Comprehensive breakdown.",
                "The {brand} team should see this video. Great honest review that highlights all the benefits!"
            ],
            neutral: [
                "Interesting video about {brand}. I'm still on the fence about trying it though.",
                "Good comparison between {brand} and alternatives. Helps make an informed decision.",
                "{brand} walkthrough - some features look useful, others seem unnecessary.",
                "Watching reviews before deciding on {brand}. This was helpful but need more info.",
                "Tutorial covers the basics of {brand}. Would love a more advanced follow-up."
            ],
            negative: [
                "Tried {brand} after watching this and had a completely different experience. Not recommended.",
                "This video doesn't mention {brand}'s major issues. Feels like sponsored content.",
                "The {brand} problems mentioned here are just the tip of the iceberg. So many more issues.",
                "Wasted money on {brand} based on positive reviews. Reality is very different.",
                "{brand} support is non-existent. This video should warn people about that."
            ]
        },
        linkedin: {
            positive: [
                "Excited to share that our team has achieved incredible results using {brand}. 30% productivity increase in just 2 months! #Innovation #Success",
                "Just completed {brand} certification. The platform's capabilities continue to impress me. Highly recommend for any professional looking to upskill.",
                "Our company's digital transformation journey with {brand} has been remarkable. Thank you to their amazing team for the support!",
                "Proud to announce our partnership with {brand}. Together, we're building the future of {industry}. #Partnership #Growth",
                "Attended {brand}'s webinar today. The insights on industry trends were invaluable. Looking forward to implementing these strategies."
            ],
            neutral: [
                "Exploring {brand} for our Q2 initiatives. Would love to connect with professionals who have experience with this platform.",
                "Interesting developments from {brand} announced at the conference. Curious to see how this impacts the market.",
                "Evaluating {brand} vs traditional solutions. The landscape is evolving rapidly. What are your thoughts?",
                "Started piloting {brand} this week. Early days but the potential is there. Will share updates on our journey.",
                "Reading the latest report on {brand}'s market position. Some interesting data points worth discussing."
            ],
            negative: [
                "Learned some important lessons from our {brand} implementation. Not all that glitters is gold. Here's what went wrong:",
                "Disappointed with {brand}'s enterprise support. Expected better from a company of this size. #CustomerExperience",
                "The ROI projections for {brand} didn't materialize for our organization. Here's our honest assessment:",
                "Six months with {brand} and I have mixed feelings. The promises vs reality gap is significant.",
                "Had to roll back our {brand} deployment. Sharing this to help others avoid similar challenges."
            ]
        },
        instagram: {
            positive: [
                "Day 30 of using {brand} and I'm obsessed! 😍 The results speak for themselves ✨ {hashtag}",
                "This {brand} setup is everything! 🔥 Can't believe I waited so long to try it",
                "POV: When {brand} actually delivers on its promises 💯 #NoFilter #RealResults",
                "My workspace transformation thanks to {brand} 🚀 Swipe for the before/after ➡️",
                "Not sponsored just genuinely love {brand}! Best investment I've made this year 💜"
            ],
            neutral: [
                "Testing out {brand} - what do you think? 🤔 Drop your thoughts below ⬇️",
                "First impressions of {brand}... interesting 👀 Will keep you posted!",
                "{brand} unboxing! Let's see if it lives up to the hype 📦 {hashtag}",
                "Week 1 with {brand} - too early to tell but here are initial thoughts 💭",
                "Honest review coming soon! Testing {brand} for the next 30 days 📝"
            ],
            negative: [
                "Expected more from {brand} honestly 😕 The reality vs ads is disappointing",
                "When {brand} doesn't work as advertised 🙃 Anyone else having issues?",
                "Returning my {brand} order. Here's why it didn't work for me 👎",
                "Day 14 with {brand} and I'm not impressed. Save your money 💸",
                "Plot twist: {brand} wasn't worth the hype. My honest experience 📝"
            ]
        },
        facebook: {
            positive: [
                "Just have to share this! {brand} has made such a difference for our family. Highly recommend to everyone! 👍❤️",
                "Posted in Tech Enthusiasts: After months of research, we chose {brand} and couldn't be happier. Here's our experience...",
                "Thank you {brand} for the amazing customer service! They went above and beyond to help us. This is how it should be done!",
                "Our small business has grown 50% since implementing {brand}. Sharing this to help other entrepreneurs! 🚀",
                "Finally found a solution that works! {brand} has solved problems we've had for years. Game changer!"
            ],
            neutral: [
                "Question for the group: Has anyone used {brand}? Looking for real user experiences before buying.",
                "Saw an ad for {brand} today. The features look interesting but the price is steep. Worth it?",
                "Comparing {brand} with other options this weekend. Any suggestions on what to look for?",
                "Started free trial of {brand}. Will post my review in a few weeks. What should I test first?",
                "Interesting article about {brand}'s new direction. Not sure how I feel about it yet."
            ],
            negative: [
                "Warning to everyone! Had a terrible experience with {brand}. Customer service was unhelpful and rude.",
                "Regret buying {brand}. The product stopped working after 2 weeks and they won't honor the warranty.",
                "Can't believe {brand} charges this much for such poor quality. Don't make the same mistake I did!",
                "Posted for visibility: {brand} has been ignoring my complaints for weeks. Avoid this company!",
                "The new {brand} update ruined everything that was working fine before. So frustrated right now! 😡"
            ]
        },
        news: {
            positive: [
                "{brand} Announces Record Quarter, Exceeding Analyst Expectations by 20%",
                "Industry Leaders Praise {brand}'s Innovative Approach to Sustainable Technology",
                "{brand} Named Top Workplace for Third Consecutive Year, Employee Satisfaction Soars",
                "Breaking: {brand} Secures Major Partnership Deal Worth $500M",
                "{brand}'s New Product Launch Receives Overwhelming Positive Response from Market"
            ],
            neutral: [
                "{brand} to Restructure Operations Amid Changing Market Conditions",
                "Analysts Divided on {brand}'s New Strategic Direction for 2024",
                "{brand} CEO Addresses Shareholders on Future Growth Plans",
                "Market Watch: {brand} Stock Shows Mixed Performance Following Earnings Report",
                "Industry Report: {brand} Maintains Market Position Despite Increased Competition"
            ],
            negative: [
                "{brand} Faces Backlash Over Privacy Concerns, Users Demand Answers",
                "Investigation: {brand}'s Customer Complaints Rise 40% Year-Over-Year",
                "{brand} Stock Tumbles After Disappointing Quarterly Results",
                "Former Employees Allege Toxic Culture at {brand}, Company Responds",
                "Regulatory Scrutiny Intensifies: {brand} Under Investigation for Market Practices"
            ]
        },
        reviews: {
            positive: [
                "★★★★★ Absolutely love {brand}! Been using it for 6 months and it's transformed how we work. Worth every penny!",
                "5/5 - Best in class. {brand} delivers on every promise. Customer support is responsive and helpful.",
                "★★★★★ Exceeded expectations! The onboarding was smooth and the features are exactly what we needed.",
                "After trying 5 competitors, {brand} is clearly the winner. Intuitive, powerful, and reliable.",
                "★★★★★ Our team's productivity doubled since adopting {brand}. Can't imagine going back to our old solution."
            ],
            neutral: [
                "★★★☆☆ Decent product with room for improvement. Does what it promises but nothing exceptional.",
                "3/5 - Good for the basics but lacking advanced features. Considering upgrade to enterprise plan.",
                "★★★☆☆ Mixed feelings after 3 months. Some features are great, others need work. Average overall.",
                "Neither impressed nor disappointed. {brand} is serviceable but competition might be catching up.",
                "★★★☆☆ Fair value for money. Works as advertised but support response times could be better."
            ],
            negative: [
                "★☆☆☆☆ Terrible experience. {brand} crashed constantly and support was useless. Requesting refund.",
                "1/5 - Avoid! Hidden fees, poor performance, and misleading marketing. Complete waste of money.",
                "★★☆☆☆ Started great but quality has declined significantly. Multiple bugs in recent updates.",
                "Disappointed. {brand} oversells and underdelivers. Switching to competitor next month.",
                "★☆☆☆☆ Worst customer service I've ever experienced. Product issues never resolved after 10+ tickets."
            ]
        }
    },

    // Trending topics with platform relevance
    trendingTopics: [
        { name: 'AI Integration', growth: 156, mentions: 45200, sentiment: 78, platforms: ['twitter', 'linkedin', 'news'] },
        { name: 'Customer Experience', growth: 89, mentions: 32100, sentiment: 72, platforms: ['twitter', 'reviews', 'facebook'] },
        { name: 'Product Launch', growth: 234, mentions: 67800, sentiment: 85, platforms: ['twitter', 'instagram', 'youtube'] },
        { name: 'Pricing Changes', growth: -12, mentions: 28400, sentiment: 45, platforms: ['reddit', 'twitter', 'reviews'] },
        { name: 'Mobile App', growth: 67, mentions: 41200, sentiment: 68, platforms: ['reviews', 'twitter', 'reddit'] },
        { name: 'Security Updates', growth: 45, mentions: 19800, sentiment: 82, platforms: ['news', 'linkedin', 'twitter'] },
        { name: 'API Features', growth: 123, mentions: 15600, sentiment: 75, platforms: ['reddit', 'twitter', 'youtube'] },
        { name: 'Enterprise Solutions', growth: 56, mentions: 22300, sentiment: 71, platforms: ['linkedin', 'news', 'reviews'] },
        { name: 'User Onboarding', growth: 34, mentions: 18700, sentiment: 69, platforms: ['reviews', 'youtube', 'twitter'] },
        { name: 'Performance Issues', growth: 78, mentions: 24500, sentiment: 38, platforms: ['reddit', 'twitter', 'reviews'] },
        { name: 'New Features', growth: 145, mentions: 38900, sentiment: 80, platforms: ['twitter', 'youtube', 'instagram'] },
        { name: 'Integration Options', growth: 67, mentions: 21400, sentiment: 73, platforms: ['reddit', 'linkedin', 'reviews'] }
    ],

    // Enhanced hashtags
    hashtags: [
        { tag: '#TechInnovation', count: 128500, velocity: 'rising', platforms: ['twitter', 'instagram', 'linkedin'] },
        { tag: '#DigitalTransformation', count: 98200, velocity: 'rising', platforms: ['linkedin', 'twitter'] },
        { tag: '#CustomerSuccess', count: 76400, velocity: 'stable', platforms: ['twitter', 'linkedin'] },
        { tag: '#ProductUpdate', count: 65300, velocity: 'rising', platforms: ['twitter', 'instagram'] },
        { tag: '#AI', count: 245000, velocity: 'rising', platforms: ['twitter', 'linkedin', 'youtube'] },
        { tag: '#SaaS', count: 87600, velocity: 'stable', platforms: ['twitter', 'linkedin', 'reddit'] },
        { tag: '#StartupLife', count: 54300, velocity: 'declining', platforms: ['instagram', 'twitter'] },
        { tag: '#Innovation', count: 134500, velocity: 'rising', platforms: ['linkedin', 'twitter', 'instagram'] },
        { tag: '#TechNews', count: 189000, velocity: 'stable', platforms: ['twitter', 'news'] },
        { tag: '#FutureOfWork', count: 67800, velocity: 'rising', platforms: ['linkedin', 'twitter'] },
        { tag: '#ProductivityHacks', count: 45600, velocity: 'rising', platforms: ['instagram', 'twitter', 'youtube'] },
        { tag: '#DataDriven', count: 38900, velocity: 'stable', platforms: ['linkedin', 'twitter'] }
    ],

    // Competitors with detailed metrics - dynamically updated based on selected brand
    getCompetitors() {
        // Use APIData if available for brand-specific competitors
        if (typeof APIData !== 'undefined' && APIData.currentBrand) {
            const brand = APIData.brands[APIData.currentBrand];
            if (brand) {
                const competitors = [
                    {
                        name: brand.name,
                        color: brand.color,
                        shareOfVoice: 35 + Math.floor(Math.random() * 10),
                        sentiment: brand.metrics.avgSentiment,
                        mentions: brand.metrics.avgMentions,
                        growth: Math.round(brand.metrics.growthRate),
                        platformBreakdown: { twitter: 32, reddit: 18, youtube: 15, linkedin: 20, facebook: 8, instagram: 5, news: 2 }
                    }
                ];

                // Add competitors from APIData
                const competitorColors = ['#ef4444', '#10b981', '#f59e0b'];
                brand.competitors.forEach((compId, idx) => {
                    const comp = APIData.brands[compId];
                    if (comp) {
                        competitors.push({
                            name: comp.name,
                            color: comp.color || competitorColors[idx % competitorColors.length],
                            shareOfVoice: 15 + Math.floor(Math.random() * 20),
                            sentiment: Math.round(comp.metrics.avgSentiment * (0.85 + Math.random() * 0.3)),
                            mentions: Math.round(comp.metrics.avgMentions * (0.6 + Math.random() * 0.8)),
                            growth: Math.round(comp.metrics.growthRate * (0.5 + Math.random())),
                            platformBreakdown: { twitter: 28 + Math.floor(Math.random() * 15), reddit: 15 + Math.floor(Math.random() * 10), youtube: 10 + Math.floor(Math.random() * 10), linkedin: 15 + Math.floor(Math.random() * 10), facebook: 8 + Math.floor(Math.random() * 8), instagram: 5 + Math.floor(Math.random() * 5), news: 2 + Math.floor(Math.random() * 3) }
                        });
                    }
                });

                return competitors;
            }
        }

        // Fallback to default competitors
        return [
            {
                name: 'Your Brand',
                color: '#6366f1',
                shareOfVoice: 35,
                sentiment: 78,
                mentions: 156800,
                growth: 23,
                platformBreakdown: { twitter: 32, reddit: 18, youtube: 15, linkedin: 20, facebook: 8, instagram: 5, news: 2 }
            },
            {
                name: 'Competitor A',
                color: '#ef4444',
                shareOfVoice: 28,
                sentiment: 65,
                mentions: 125400,
                growth: 15,
                platformBreakdown: { twitter: 35, reddit: 15, youtube: 12, linkedin: 18, facebook: 12, instagram: 6, news: 2 }
            },
            {
                name: 'Competitor B',
                color: '#10b981',
                shareOfVoice: 22,
                sentiment: 72,
                mentions: 98700,
                growth: -5,
                platformBreakdown: { twitter: 28, reddit: 22, youtube: 18, linkedin: 15, facebook: 10, instagram: 5, news: 2 }
            },
            {
                name: 'Competitor C',
                color: '#f59e0b',
                shareOfVoice: 15,
                sentiment: 58,
                mentions: 67200,
                growth: 8,
                platformBreakdown: { twitter: 40, reddit: 12, youtube: 10, linkedin: 22, facebook: 8, instagram: 6, news: 2 }
            }
        ];
    },

    // Backward compatibility property
    get competitors() {
        return this.getCompetitors();
    },

    // Enhanced influencers
    influencers: [
        {
            id: 1,
            name: 'Sarah Mitchell',
            handle: '@sarahmtech',
            platform: 'twitter',
            avatar: 'SM',
            avatarColor: '#6366f1',
            verified: true,
            tier: 'tier1',
            followers: 524000,
            engagement: 4.8,
            reach: 2100000,
            sentiment: 85,
            relevance: 92,
            authority: 88,
            topics: ['Tech Reviews', 'AI', 'SaaS'],
            lastMention: new Date(Date.now() - 3600000),
            totalMentions: 47,
            avgLikes: 12500,
            avgComments: 890,
            recentPosts: 156
        },
        {
            id: 2,
            name: 'Alex Chen',
            handle: '@alexchentech',
            platform: 'youtube',
            avatar: 'AC',
            avatarColor: '#ef4444',
            verified: true,
            tier: 'tier1',
            followers: 1200000,
            engagement: 6.2,
            reach: 5400000,
            sentiment: 72,
            relevance: 88,
            authority: 94,
            topics: ['Product Reviews', 'Startups', 'Innovation'],
            lastMention: new Date(Date.now() - 86400000),
            totalMentions: 23,
            avgLikes: 45000,
            avgComments: 3200,
            recentPosts: 48
        },
        {
            id: 3,
            name: 'Emily Rodriguez',
            handle: '@emilyrod_digital',
            platform: 'linkedin',
            avatar: 'ER',
            avatarColor: '#0077b5',
            verified: true,
            tier: 'tier2',
            followers: 89000,
            engagement: 8.5,
            reach: 450000,
            sentiment: 91,
            relevance: 95,
            authority: 82,
            topics: ['Digital Marketing', 'Growth', 'B2B'],
            lastMention: new Date(Date.now() - 7200000),
            totalMentions: 156,
            avgLikes: 2800,
            avgComments: 245,
            recentPosts: 89
        },
        {
            id: 4,
            name: 'Marcus Johnson',
            handle: '@marcusj_reviews',
            platform: 'twitter',
            avatar: 'MJ',
            avatarColor: '#10b981',
            verified: false,
            tier: 'tier2',
            followers: 156000,
            engagement: 5.4,
            reach: 780000,
            sentiment: 68,
            relevance: 78,
            authority: 72,
            topics: ['Software Reviews', 'Productivity', 'Tools'],
            lastMention: new Date(Date.now() - 14400000),
            totalMentions: 89,
            avgLikes: 4200,
            avgComments: 380,
            recentPosts: 234
        },
        {
            id: 5,
            name: 'Priya Sharma',
            handle: '@priyatech',
            platform: 'instagram',
            avatar: 'PS',
            avatarColor: '#ec4899',
            verified: true,
            tier: 'tier1',
            followers: 890000,
            engagement: 7.1,
            reach: 3200000,
            sentiment: 82,
            relevance: 86,
            authority: 79,
            topics: ['Tech Lifestyle', 'Gadgets', 'Innovation'],
            lastMention: new Date(Date.now() - 28800000),
            totalMentions: 34,
            avgLikes: 67000,
            avgComments: 4500,
            recentPosts: 67
        },
        {
            id: 6,
            name: 'David Kim',
            handle: 'u/davidkim_tech',
            platform: 'reddit',
            avatar: 'DK',
            avatarColor: '#ff4500',
            verified: false,
            tier: 'tier3',
            followers: 45000,
            engagement: 12.3,
            reach: 180000,
            sentiment: 75,
            relevance: 91,
            authority: 85,
            topics: ['Deep Dives', 'Comparisons', 'Analysis'],
            lastMention: new Date(Date.now() - 43200000),
            totalMentions: 234,
            avgLikes: 1800,
            avgComments: 456,
            recentPosts: 312
        }
    ],

    // Platform-specific statistics generator
    getPlatformData(platform = 'all') {
        const allPlatforms = Object.keys(this.platformConfig);
        const platforms = platform === 'all' ? allPlatforms : [platform];

        const data = {
            mentions: 0,
            sentiment: 0,
            engagement: 0,
            reach: 0,
            growth: 0,
            positive: 0,
            neutral: 0,
            negative: 0,
            topAuthors: [],
            peakHours: [],
            dailyData: [],
            hourlyData: []
        };

        platforms.forEach(p => {
            const config = this.platformConfig[p];
            if (!config) return;

            const baseMentions = this.getBaseMentions(p);
            const variance = 0.2;

            data.mentions += baseMentions;
            data.sentiment += config.sentimentBias * 100;
            data.engagement += config.avgEngagement;
            data.growth += config.growthRate;
            data.reach += baseMentions * (50 + Math.random() * 100);

            // Sentiment distribution based on platform bias
            const positive = Math.round(baseMentions * config.sentimentBias);
            const negative = Math.round(baseMentions * (1 - config.sentimentBias) * 0.6);
            const neutral = baseMentions - positive - negative;

            data.positive += positive;
            data.neutral += neutral;
            data.negative += negative;
        });

        // Average sentiment and engagement across selected platforms
        data.sentiment = Math.round(data.sentiment / platforms.length);
        data.engagement = (data.engagement / platforms.length).toFixed(1);
        data.growth = Math.round(data.growth / platforms.length);

        // Generate time series data
        data.dailyData = this.generateDailyData(30, platform);
        data.hourlyData = this.generateHourlyData(24, platform);

        return data;
    },

    getBaseMentions(platform) {
        const baseMentions = {
            twitter: 52340,
            reddit: 38120,
            youtube: 28450,
            linkedin: 22180,
            facebook: 18920,
            instagram: 15670,
            news: 8540,
            reviews: 6230
        };
        const variance = 0.15;
        const base = baseMentions[platform] || 10000;
        return Math.round(base * (1 + (Math.random() - 0.5) * variance));
    },

    // Generate daily trend data for specific platform with realistic non-stationary fluctuations
    generateDailyData(days = 30, platform = 'all') {
        const data = [];
        const platforms = platform === 'all' ? Object.keys(this.platformConfig) : [platform];

        // Create random walk seeds for more realistic non-stationary data
        let positiveWalk = 60 + Math.random() * 10; // Start between 60-70
        let negativeWalk = 15 + Math.random() * 5;  // Start between 15-20

        // Add some "events" that cause spikes/dips
        const eventDays = [
            Math.floor(Math.random() * days),
            Math.floor(Math.random() * days),
            Math.floor(Math.random() * days)
        ];
        const eventTypes = ['positive_spike', 'negative_spike', 'viral_moment'];

        for (let i = days; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);

            let mentions = 0;

            platforms.forEach(p => {
                const config = this.platformConfig[p];
                if (!config) return;

                const baseMentions = this.getBaseMentions(p) / 30;
                const dayVariance = Math.sin(i / 7) * 0.2 + (Math.random() - 0.5) * 0.3;
                const dayMentions = Math.round(baseMentions * (1 + dayVariance));
                mentions += dayMentions;
            });

            // Random walk for sentiment (non-stationary behavior)
            positiveWalk += (Math.random() - 0.48) * 8; // Slight upward bias
            negativeWalk += (Math.random() - 0.52) * 5; // Slight downward bias

            // Add weekly cyclical pattern
            const weeklyEffect = Math.sin((days - i) * Math.PI / 3.5) * 5;

            // Check for event days
            const dayFromEnd = days - i;
            let eventBoost = { positive: 0, negative: 0 };
            eventDays.forEach((eventDay, idx) => {
                const distance = Math.abs(dayFromEnd - eventDay);
                if (distance <= 2) {
                    const intensity = (3 - distance) / 3;
                    if (eventTypes[idx] === 'positive_spike') {
                        eventBoost.positive += 15 * intensity;
                    } else if (eventTypes[idx] === 'negative_spike') {
                        eventBoost.negative += 12 * intensity;
                    } else {
                        eventBoost.positive += 10 * intensity;
                        eventBoost.negative += 5 * intensity;
                    }
                }
            });

            // Clamp values to realistic ranges
            let positive = Math.min(85, Math.max(40, positiveWalk + weeklyEffect + eventBoost.positive));
            let negative = Math.min(35, Math.max(5, negativeWalk + eventBoost.negative));

            // Ensure they don't exceed 100% together
            if (positive + negative > 95) {
                const excess = (positive + negative - 95) / 2;
                positive -= excess;
                negative -= excess;
            }

            let neutral = 100 - positive - negative;
            neutral = Math.max(5, neutral); // Ensure at least 5% neutral

            // Normalize to exactly 100%
            const total = positive + neutral + negative;
            positive = Math.round((positive / total) * 100);
            negative = Math.round((negative / total) * 100);
            neutral = 100 - positive - negative;

            data.push({
                date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                fullDate: date,
                mentions,
                positive,
                neutral,
                negative,
                engagement: Math.round(mentions * (3 + Math.random() * 5))
            });
        }

        return data;
    },

    // Generate hourly data for specific platform
    generateHourlyData(hours = 24, platform = 'all') {
        const data = [];
        const platforms = platform === 'all' ? Object.keys(this.platformConfig) : [platform];

        for (let i = hours; i >= 0; i--) {
            const date = new Date();
            date.setHours(date.getHours() - i);
            const hour = date.getHours();

            let mentions = 0, sentiment = 0;

            platforms.forEach(p => {
                const config = this.platformConfig[p];
                if (!config) return;

                // Higher activity during peak hours
                const isPeakHour = config.peakHours.includes(hour);
                const multiplier = isPeakHour ? 1.8 : (hour >= 6 && hour <= 22) ? 1 : 0.4;

                const baseMentions = (this.getBaseMentions(p) / 24) * multiplier;
                mentions += Math.round(baseMentions * (0.8 + Math.random() * 0.4));
                sentiment += config.sentimentBias * 100;
            });

            data.push({
                hour: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                fullDate: date,
                mentions,
                sentiment: Math.round(sentiment / platforms.length)
            });
        }

        return data;
    },

    // Generate mention with platform-specific content
    generateMention(platform = null, sentiment = null) {
        const platforms = Object.keys(this.platformConfig);
        const sentiments = ['positive', 'neutral', 'negative'];

        const selectedPlatform = platform || platforms[Math.floor(Math.random() * platforms.length)];
        const config = this.platformConfig[selectedPlatform];

        // Weight sentiment based on platform bias
        let selectedSentiment = sentiment;
        if (!selectedSentiment) {
            const rand = Math.random();
            if (rand < config.sentimentBias) {
                selectedSentiment = 'positive';
            } else if (rand < config.sentimentBias + ((1 - config.sentimentBias) * 0.5)) {
                selectedSentiment = 'neutral';
            } else {
                selectedSentiment = 'negative';
            }
        }

        const userList = this.usernames[selectedPlatform];
        const author = userList[Math.floor(Math.random() * userList.length)];

        const templates = this.contentTemplates[selectedPlatform]?.[selectedSentiment] ||
                         this.contentTemplates.twitter[selectedSentiment];
        let content = templates[Math.floor(Math.random() * templates.length)];

        // Replace placeholders - use current brand from APIData if available
        let brandName = 'VoxlyPro';
        let brandProducts = ['product', 'feature', 'service'];
        if (typeof APIData !== 'undefined' && APIData.currentBrand) {
            const brand = APIData.brands[APIData.currentBrand];
            if (brand) {
                brandName = brand.name;
                brandProducts = brand.products || brandProducts;
            }
        }
        content = content.replace(/{brand}/g, brandName);
        content = content.replace(/{product}/g, brandProducts[Math.floor(Math.random() * brandProducts.length)]);
        content = content.replace(/{hashtag}/g, this.hashtags[Math.floor(Math.random() * this.hashtags.length)].tag);
        content = content.replace(/{industry}/g, ['tech', 'marketing', 'business', 'analytics'][Math.floor(Math.random() * 4)]);

        const sentimentScores = {
            positive: 70 + Math.random() * 30,
            neutral: 45 + Math.random() * 25,
            negative: 10 + Math.random() * 35
        };

        // Platform-specific engagement ranges
        const engagementMultipliers = {
            twitter: { likes: 1, comments: 0.15, shares: 0.3 },
            reddit: { likes: 2, comments: 0.8, shares: 0.1 },
            youtube: { likes: 5, comments: 0.3, shares: 0.2 },
            linkedin: { likes: 0.5, comments: 0.2, shares: 0.15 },
            facebook: { likes: 0.8, comments: 0.25, shares: 0.4 },
            instagram: { likes: 3, comments: 0.15, shares: 0.05 },
            news: { likes: 0.1, comments: 0.05, shares: 0.5 },
            reviews: { likes: 0.3, comments: 0.1, shares: 0.02 }
        };

        const mult = engagementMultipliers[selectedPlatform] || engagementMultipliers.twitter;
        const baseEngagement = 100 + Math.random() * 900;

        return {
            id: Math.random().toString(36).substr(2, 12),
            platform: selectedPlatform,
            platformName: config.name,
            platformIcon: config.icon,
            platformColor: config.color,
            author: author,
            content: content,
            sentiment: selectedSentiment,
            sentimentScore: Math.round(sentimentScores[selectedSentiment]),
            likes: Math.round(baseEngagement * mult.likes),
            comments: Math.round(baseEngagement * mult.comments),
            shares: Math.round(baseEngagement * mult.shares),
            reach: Math.round((baseEngagement * 10) * (1 + Math.random())),
            timestamp: new Date(Date.now() - Math.random() * 86400000 * 7),
            isNew: Math.random() > 0.7,
            verified: Math.random() > 0.8
        };
    },

    // Generate multiple mentions for specific platform
    generateMentions(count = 20, platform = null) {
        const mentions = [];
        for (let i = 0; i < count; i++) {
            mentions.push(this.generateMention(platform));
        }
        return mentions.sort((a, b) => b.timestamp - a.timestamp);
    },

    // Get platform statistics
    getPlatformStats(platform = 'all') {
        if (platform === 'all') {
            return Object.entries(this.platformConfig).map(([id, config]) => ({
                platform: id,
                name: config.name,
                icon: config.icon,
                color: config.color,
                mentions: this.getBaseMentions(id),
                sentiment: Math.round(config.sentimentBias * 100),
                engagement: config.avgEngagement,
                growth: config.growthRate
            }));
        }

        const config = this.platformConfig[platform];
        return {
            platform: platform,
            name: config.name,
            icon: config.icon,
            color: config.color,
            mentions: this.getBaseMentions(platform),
            sentiment: Math.round(config.sentimentBias * 100),
            engagement: config.avgEngagement,
            growth: config.growthRate
        };
    },

    // Generate sentiment data for charts
    getSentimentChartData(platform = 'all', days = 7) {
        const dailyData = this.generateDailyData(days, platform);

        return {
            labels: dailyData.map(d => d.date),
            datasets: [
                {
                    label: 'Positive',
                    data: dailyData.map(d => d.positive),
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Neutral',
                    data: dailyData.map(d => d.neutral),
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Negative',
                    data: dailyData.map(d => d.negative),
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        };
    },

    // Generate mentions volume chart data
    getMentionsChartData(platform = 'all', hours = 24) {
        const hourlyData = this.generateHourlyData(hours, platform);
        const config = platform !== 'all' ? this.platformConfig[platform] : null;
        const color = config ? config.color : '#8b5cf6';

        return {
            labels: hourlyData.map(d => d.hour),
            datasets: [{
                label: 'Mentions',
                data: hourlyData.map(d => d.mentions),
                borderColor: color,
                backgroundColor: this.hexToRgba(color, 0.1),
                tension: 0.4,
                fill: true,
                pointRadius: 0,
                pointHoverRadius: 5
            }]
        };
    },

    // Get platform distribution for pie/doughnut chart
    getPlatformDistribution(platforms = null) {
        const allStats = this.getPlatformStats('all');
        const filteredStats = platforms ?
            allStats.filter(s => platforms.includes(s.platform)) :
            allStats;

        return {
            labels: filteredStats.map(s => s.name),
            datasets: [{
                data: filteredStats.map(s => s.mentions),
                backgroundColor: filteredStats.map(s => s.color),
                borderWidth: 0
            }]
        };
    },

    // Emotion data
    getEmotionData(platform = 'all') {
        const baseEmotions = [
            { emotion: 'Joy', value: 35, color: '#10b981' },
            { emotion: 'Trust', value: 25, color: '#3b82f6' },
            { emotion: 'Anticipation', value: 15, color: '#8b5cf6' },
            { emotion: 'Surprise', value: 10, color: '#f59e0b' },
            { emotion: 'Sadness', value: 5, color: '#6b7280' },
            { emotion: 'Fear', value: 5, color: '#ef4444' },
            { emotion: 'Anger', value: 3, color: '#dc2626' },
            { emotion: 'Disgust', value: 2, color: '#78716c' }
        ];

        // Adjust based on platform sentiment bias
        if (platform !== 'all' && this.platformConfig[platform]) {
            const bias = this.platformConfig[platform].sentimentBias;
            baseEmotions[0].value = Math.round(30 + bias * 15); // Joy
            baseEmotions[4].value = Math.round(10 - bias * 8); // Sadness
            baseEmotions[6].value = Math.round(5 - bias * 4);  // Anger
        }

        return baseEmotions;
    },

    // Demographics data
    getDemographicsData() {
        return {
            age: [
                { range: '18-24', percentage: 22 },
                { range: '25-34', percentage: 35 },
                { range: '35-44', percentage: 25 },
                { range: '45-54', percentage: 12 },
                { range: '55+', percentage: 6 }
            ],
            gender: [
                { type: 'Male', percentage: 58 },
                { type: 'Female', percentage: 40 },
                { type: 'Other', percentage: 2 }
            ],
            location: [
                { country: 'United States', percentage: 45, flag: '🇺🇸' },
                { country: 'United Kingdom', percentage: 15, flag: '🇬🇧' },
                { country: 'India', percentage: 12, flag: '🇮🇳' },
                { country: 'Germany', percentage: 8, flag: '🇩🇪' },
                { country: 'Canada', percentage: 7, flag: '🇨🇦' },
                { country: 'Australia', percentage: 5, flag: '🇦🇺' },
                { country: 'Others', percentage: 8, flag: '🌍' }
            ]
        };
    },

    // Generate alerts
    generateAlerts(count = 5, platform = null) {
        const alertTypes = [
            { type: 'spike', severity: 'high', message: 'Unusual spike in mentions detected', iconClass: 'icon-chart' },
            { type: 'sentiment', severity: 'medium', message: 'Sentiment dropping', iconClass: 'icon-sad' },
            { type: 'influencer', severity: 'low', message: 'New influencer mentioned your brand', iconClass: 'icon-users' },
            { type: 'competitor', severity: 'medium', message: 'Competitor launching new campaign', iconClass: 'icon-trending' },
            { type: 'viral', severity: 'high', message: 'Post going viral - 10K+ shares', iconClass: 'icon-trending' },
            { type: 'crisis', severity: 'critical', message: 'Potential PR crisis detected', iconClass: 'icon-alert' },
            { type: 'milestone', severity: 'low', message: 'Reached 100K mentions milestone', iconClass: 'icon-broadcast' },
            { type: 'trend', severity: 'medium', message: 'New trending topic related to brand', iconClass: 'icon-analytics' }
        ];

        const alerts = [];
        for (let i = 0; i < count; i++) {
            const alertTemplate = alertTypes[Math.floor(Math.random() * alertTypes.length)];
            const selectedPlatform = platform || Object.keys(this.platformConfig)[Math.floor(Math.random() * 8)];
            const config = this.platformConfig[selectedPlatform];

            alerts.push({
                id: Math.random().toString(36).substr(2, 8),
                ...alertTemplate,
                message: `${alertTemplate.message} on ${config.name}`,
                platform: selectedPlatform,
                platformIcon: config.icon,
                timestamp: new Date(Date.now() - Math.random() * 3600000 * 24),
                read: Math.random() > 0.5
            });
        }

        return alerts.sort((a, b) => b.timestamp - a.timestamp);
    },

    // Word cloud data
    getWordCloudData(platform = 'all') {
        const words = [
            { text: 'Innovation', size: 64, sentiment: 'positive' },
            { text: 'Quality', size: 56, sentiment: 'positive' },
            { text: 'Support', size: 52, sentiment: 'neutral' },
            { text: 'Features', size: 48, sentiment: 'positive' },
            { text: 'Experience', size: 45, sentiment: 'positive' },
            { text: 'Performance', size: 42, sentiment: 'neutral' },
            { text: 'Update', size: 40, sentiment: 'neutral' },
            { text: 'Integration', size: 38, sentiment: 'positive' },
            { text: 'Price', size: 36, sentiment: 'negative' },
            { text: 'Service', size: 34, sentiment: 'positive' },
            { text: 'Design', size: 32, sentiment: 'positive' },
            { text: 'Speed', size: 30, sentiment: 'positive' },
            { text: 'Bug', size: 28, sentiment: 'negative' },
            { text: 'Easy', size: 26, sentiment: 'positive' },
            { text: 'Team', size: 24, sentiment: 'neutral' },
            { text: 'Solution', size: 22, sentiment: 'positive' },
            { text: 'Reliable', size: 20, sentiment: 'positive' },
            { text: 'Issue', size: 18, sentiment: 'negative' },
            { text: 'Growth', size: 16, sentiment: 'positive' },
            { text: 'Value', size: 14, sentiment: 'positive' }
        ];

        return words.map(w => ({
            ...w,
            color: w.sentiment === 'positive' ? '#10b981' :
                   w.sentiment === 'negative' ? '#ef4444' : '#6366f1'
        }));
    },

    // Utility: hex to rgba
    hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    },

    // Report data
    generateReportData(platform = 'all') {
        const stats = this.getPlatformData(platform);

        return {
            summary: {
                totalMentions: stats.mentions,
                sentimentScore: stats.sentiment,
                engagementRate: parseFloat(stats.engagement),
                reach: stats.reach,
                shareOfVoice: 35
            },
            trends: {
                mentionsChange: stats.growth,
                sentimentChange: 5 + Math.round(Math.random() * 10),
                engagementChange: 12 + Math.round(Math.random() * 8),
                reachChange: 45 + Math.round(Math.random() * 20)
            },
            topPlatforms: this.getPlatformStats('all').slice(0, 5),
            topTopics: this.trendingTopics.slice(0, 5),
            topInfluencers: this.influencers.slice(0, 5)
        };
    }
};

// Make globally available
if (typeof window !== 'undefined') {
    window.MockData = MockData;
}

console.log('📊 Enhanced Mock Data Generator Loaded');
