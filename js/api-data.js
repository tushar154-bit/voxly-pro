/**
 * Voxly Pro - Dummy API Data Service
 * Realistic brands, products, and industry-specific data
 */

const APIData = {
    // ========================================
    // BRANDS CONFIGURATION
    // ========================================
    brands: {
        apple: {
            id: 'apple',
            name: 'Apple',
            logo: 'https://logo.clearbit.com/apple.com',
            industry: 'technology',
            color: '#000000',
            tagline: 'Think Different',
            founded: 1976,
            headquarters: 'Cupertino, CA',
            products: ['iPhone', 'MacBook', 'iPad', 'Apple Watch', 'AirPods'],
            competitors: ['samsung', 'oneplus', 'xiaomi'],
            socialHandles: {
                twitter: '@Apple',
                instagram: '@apple',
                youtube: 'Apple',
                linkedin: 'apple'
            },
            metrics: {
                baseFollowers: 25000000,
                avgSentiment: 78,
                avgEngagement: 4.8,
                avgMentions: 185000,
                avgReach: 450000000,
                growthRate: 12.5
            }
        },
        google: {
            id: 'google',
            name: 'Google',
            logo: 'https://logo.clearbit.com/google.com',
            industry: 'technology',
            color: '#4285F4',
            tagline: 'Organize the world\'s information',
            founded: 1998,
            headquarters: 'Mountain View, CA',
            products: ['Pixel', 'Chrome', 'Android', 'Google Cloud', 'YouTube'],
            competitors: ['firefox', 'edge', 'brave'],
            socialHandles: {
                twitter: '@Google',
                instagram: '@google',
                youtube: 'Google',
                linkedin: 'google'
            },
            metrics: {
                baseFollowers: 32000000,
                avgSentiment: 72,
                avgEngagement: 5.2,
                avgMentions: 220000,
                avgReach: 520000000,
                growthRate: 15.3
            }
        },
        nvidia: {
            id: 'nvidia',
            name: 'NVIDIA',
            logo: 'https://logo.clearbit.com/nvidia.com',
            industry: 'technology',
            color: '#76B900',
            tagline: 'The way it\'s meant to be played',
            founded: 1993,
            headquarters: 'Santa Clara, CA',
            products: ['GeForce RTX', 'Quadro', 'Tesla GPUs', 'CUDA', 'DGX'],
            competitors: ['amd', 'intel', 'qualcomm'],
            socialHandles: {
                twitter: '@nvidia',
                instagram: '@nvidia',
                youtube: 'NVIDIA',
                linkedin: 'nvidia'
            },
            metrics: {
                baseFollowers: 8500000,
                avgSentiment: 82,
                avgEngagement: 6.8,
                avgMentions: 95000,
                avgReach: 180000000,
                growthRate: 28.7
            }
        },
        tcs: {
            id: 'tcs',
            name: 'Tata Consultancy Services',
            logo: 'https://logo.clearbit.com/tcs.com',
            industry: 'it_services',
            color: '#0066B3',
            tagline: 'Building on Belief',
            founded: 1968,
            headquarters: 'Mumbai, India',
            products: ['TCS BaNCS', 'ignio', 'TCS iON', 'Quartz', 'TCS MasterCraft'],
            competitors: ['infosys', 'wipro', 'accenture'],
            socialHandles: {
                twitter: '@TCS',
                instagram: '@tcsglobal',
                youtube: 'TCS',
                linkedin: 'tata-consultancy-services'
            },
            metrics: {
                baseFollowers: 4200000,
                avgSentiment: 74,
                avgEngagement: 3.5,
                avgMentions: 45000,
                avgReach: 85000000,
                growthRate: 8.2
            }
        },
        tesla: {
            id: 'tesla',
            name: 'Tesla',
            logo: 'https://logo.clearbit.com/tesla.com',
            industry: 'automotive',
            color: '#CC0000',
            tagline: 'Accelerating the world\'s transition to sustainable energy',
            founded: 2003,
            headquarters: 'Austin, TX',
            products: ['Model S', 'Model 3', 'Model X', 'Model Y', 'Cybertruck'],
            competitors: ['tata_motors', 'mahindra', 'mg_motors'],
            socialHandles: {
                twitter: '@Tesla',
                instagram: '@teslamotors',
                youtube: 'Tesla',
                linkedin: 'tesla-motors'
            },
            metrics: {
                baseFollowers: 22000000,
                avgSentiment: 68,
                avgEngagement: 7.5,
                avgMentions: 310000,
                avgReach: 620000000,
                growthRate: 18.9
            }
        },
        // Additional Tech Brands
        samsung: {
            id: 'samsung',
            name: 'Samsung',
            logo: 'https://logo.clearbit.com/samsung.com',
            industry: 'technology',
            color: '#1428A0',
            tagline: 'Do What You Can\'t',
            founded: 1938,
            headquarters: 'Seoul, South Korea',
            products: ['Galaxy S24', 'Galaxy Z Fold', 'Galaxy Watch', 'Neo QLED TV', 'Galaxy Buds'],
            competitors: ['apple', 'google', 'xiaomi'],
            socialHandles: {
                twitter: '@Samsung',
                instagram: '@samsung',
                youtube: 'Samsung',
                linkedin: 'samsung'
            },
            metrics: {
                baseFollowers: 18500000,
                avgSentiment: 71,
                avgEngagement: 4.5,
                avgMentions: 165000,
                avgReach: 380000000,
                growthRate: 9.8
            }
        },
        microsoft: {
            id: 'microsoft',
            name: 'Microsoft',
            logo: 'https://logo.clearbit.com/microsoft.com',
            industry: 'technology',
            color: '#00A4EF',
            tagline: 'Empowering us all',
            founded: 1975,
            headquarters: 'Redmond, WA',
            products: ['Windows 11', 'Microsoft 365', 'Azure', 'Xbox', 'Surface Pro'],
            competitors: ['apple', 'google', 'amazon'],
            socialHandles: {
                twitter: '@Microsoft',
                instagram: '@microsoft',
                youtube: 'Microsoft',
                linkedin: 'microsoft'
            },
            metrics: {
                baseFollowers: 28000000,
                avgSentiment: 74,
                avgEngagement: 5.1,
                avgMentions: 195000,
                avgReach: 480000000,
                growthRate: 14.2
            }
        },
        amazon: {
            id: 'amazon',
            name: 'Amazon',
            logo: 'https://logo.clearbit.com/amazon.com',
            industry: 'technology',
            color: '#FF9900',
            tagline: 'Work hard. Have fun. Make history.',
            founded: 1994,
            headquarters: 'Seattle, WA',
            products: ['AWS', 'Prime', 'Alexa', 'Kindle', 'Fire TV'],
            competitors: ['google', 'microsoft', 'alibaba'],
            socialHandles: {
                twitter: '@Amazon',
                instagram: '@amazon',
                youtube: 'Amazon',
                linkedin: 'amazon'
            },
            metrics: {
                baseFollowers: 35000000,
                avgSentiment: 69,
                avgEngagement: 4.2,
                avgMentions: 280000,
                avgReach: 650000000,
                growthRate: 11.5
            }
        },
        // Automotive Brands
        ford: {
            id: 'ford',
            name: 'Ford',
            logo: 'https://logo.clearbit.com/ford.com',
            industry: 'automotive',
            color: '#003478',
            tagline: 'Built Ford Tough',
            founded: 1903,
            headquarters: 'Dearborn, MI',
            products: ['F-150', 'Mustang', 'Bronco', 'Explorer', 'Mach-E'],
            competitors: ['tesla', 'gm', 'toyota'],
            socialHandles: {
                twitter: '@Ford',
                instagram: '@ford',
                youtube: 'Ford',
                linkedin: 'ford-motor-company'
            },
            metrics: {
                baseFollowers: 12000000,
                avgSentiment: 66,
                avgEngagement: 3.8,
                avgMentions: 145000,
                avgReach: 280000000,
                growthRate: 6.5
            }
        },
        bmw: {
            id: 'bmw',
            name: 'BMW',
            logo: 'https://logo.clearbit.com/bmw.com',
            industry: 'automotive',
            color: '#0066B1',
            tagline: 'The Ultimate Driving Machine',
            founded: 1916,
            headquarters: 'Munich, Germany',
            products: ['i4', 'iX', 'M3', '7 Series', 'X5'],
            competitors: ['mercedes', 'audi', 'tesla'],
            socialHandles: {
                twitter: '@BMW',
                instagram: '@bmw',
                youtube: 'BMW',
                linkedin: 'bmw'
            },
            metrics: {
                baseFollowers: 16000000,
                avgSentiment: 75,
                avgEngagement: 5.2,
                avgMentions: 120000,
                avgReach: 320000000,
                growthRate: 8.9
            }
        },
        mercedes: {
            id: 'mercedes',
            name: 'Mercedes-Benz',
            logo: 'https://logo.clearbit.com/mercedes-benz.com',
            industry: 'automotive',
            color: '#00ADEF',
            tagline: 'The Best or Nothing',
            founded: 1926,
            headquarters: 'Stuttgart, Germany',
            products: ['EQS', 'S-Class', 'AMG GT', 'GLE', 'C-Class'],
            competitors: ['bmw', 'audi', 'tesla'],
            socialHandles: {
                twitter: '@MercedesBenz',
                instagram: '@mercedesbenz',
                youtube: 'MercedesBenz',
                linkedin: 'mercedes-benz'
            },
            metrics: {
                baseFollowers: 14500000,
                avgSentiment: 77,
                avgEngagement: 4.9,
                avgMentions: 105000,
                avgReach: 290000000,
                growthRate: 7.8
            }
        },
        // Healthcare & Pharma Brands
        pfizer: {
            id: 'pfizer',
            name: 'Pfizer',
            logo: 'https://logo.clearbit.com/pfizer.com',
            industry: 'healthcare',
            color: '#0093D0',
            tagline: 'Science Will Win',
            founded: 1849,
            headquarters: 'New York, NY',
            products: ['Comirnaty', 'Paxlovid', 'Eliquis', 'Ibrance', 'Prevnar'],
            competitors: ['moderna', 'johnson_johnson', 'merck'],
            socialHandles: {
                twitter: '@Pfizer',
                instagram: '@pfizer',
                youtube: 'Pfizer',
                linkedin: 'pfizer'
            },
            metrics: {
                baseFollowers: 3200000,
                avgSentiment: 62,
                avgEngagement: 2.8,
                avgMentions: 85000,
                avgReach: 150000000,
                growthRate: 5.2
            }
        },
        johnson_johnson: {
            id: 'johnson_johnson',
            name: 'Johnson & Johnson',
            logo: 'https://logo.clearbit.com/jnj.com',
            industry: 'healthcare',
            color: '#D51900',
            tagline: 'Caring for the world, one person at a time',
            founded: 1886,
            headquarters: 'New Brunswick, NJ',
            products: ['Tylenol', 'Neutrogena', 'Band-Aid', 'Listerine', 'Aveeno'],
            competitors: ['pfizer', 'procter_gamble', 'unilever'],
            socialHandles: {
                twitter: '@JNJNews',
                instagram: '@jnj',
                youtube: 'JNJvideo',
                linkedin: 'johnson-johnson'
            },
            metrics: {
                baseFollowers: 2800000,
                avgSentiment: 68,
                avgEngagement: 2.5,
                avgMentions: 72000,
                avgReach: 180000000,
                growthRate: 4.8
            }
        },
        // FMCG / Consumer Goods Brands
        procter_gamble: {
            id: 'procter_gamble',
            name: 'Procter & Gamble',
            logo: 'https://logo.clearbit.com/pg.com',
            industry: 'fmcg',
            color: '#003DA5',
            tagline: 'Touching Lives, Improving Life',
            founded: 1837,
            headquarters: 'Cincinnati, OH',
            products: ['Head & Shoulders', 'Pantene', 'Gillette', 'Tide', 'Pampers'],
            competitors: ['unilever', 'johnson_johnson', 'colgate'],
            socialHandles: {
                twitter: '@ProcterGamble',
                instagram: '@proctergamble',
                youtube: 'ProcterGamble',
                linkedin: 'procter-and-gamble'
            },
            metrics: {
                baseFollowers: 1500000,
                avgSentiment: 72,
                avgEngagement: 3.2,
                avgMentions: 55000,
                avgReach: 120000000,
                growthRate: 4.5
            }
        },
        unilever: {
            id: 'unilever',
            name: 'Unilever',
            logo: 'https://logo.clearbit.com/unilever.com',
            industry: 'fmcg',
            color: '#1F36C7',
            tagline: 'Making sustainable living commonplace',
            founded: 1929,
            headquarters: 'London, UK',
            products: ['Dove', 'Axe', 'Lipton', 'Ben & Jerry\'s', 'Sunsilk'],
            competitors: ['procter_gamble', 'nestle', 'colgate'],
            socialHandles: {
                twitter: '@Unilever',
                instagram: '@unilever',
                youtube: 'Unilever',
                linkedin: 'unilever'
            },
            metrics: {
                baseFollowers: 2100000,
                avgSentiment: 70,
                avgEngagement: 2.9,
                avgMentions: 48000,
                avgReach: 110000000,
                growthRate: 3.8
            }
        },
        loreal: {
            id: 'loreal',
            name: "L'Oréal",
            logo: 'https://logo.clearbit.com/loreal.com',
            industry: 'fmcg',
            color: '#000000',
            tagline: "Because You're Worth It",
            founded: 1909,
            headquarters: 'Paris, France',
            products: ['Maybelline', 'Garnier', 'Lancôme', 'Kérastase', 'NYX'],
            competitors: ['unilever', 'estee_lauder', 'shiseido'],
            socialHandles: {
                twitter: '@Loreal',
                instagram: '@loloreal',
                youtube: 'Loreal',
                linkedin: 'loreal'
            },
            metrics: {
                baseFollowers: 4500000,
                avgSentiment: 74,
                avgEngagement: 4.1,
                avgMentions: 62000,
                avgReach: 145000000,
                growthRate: 6.2
            }
        },
        // Real Estate Brands
        dlf: {
            id: 'dlf',
            name: 'DLF Limited',
            logo: 'https://logo.clearbit.com/dlf.in',
            industry: 'realestate',
            color: '#00539B',
            tagline: 'Building India',
            founded: 1946,
            headquarters: 'New Delhi, India',
            products: ['DLF Cyber City', 'DLF Mall of India', 'DLF Emporio', 'DLF Camellias', 'DLF Park Place'],
            competitors: ['godrej_properties', 'prestige', 'oberoi'],
            socialHandles: {
                twitter: '@DLF_India',
                instagram: '@dlf_india',
                youtube: 'DLFLimited',
                linkedin: 'dlf-limited'
            },
            metrics: {
                baseFollowers: 450000,
                avgSentiment: 65,
                avgEngagement: 2.1,
                avgMentions: 15000,
                avgReach: 35000000,
                growthRate: 5.5
            }
        },
        godrej_properties: {
            id: 'godrej_properties',
            name: 'Godrej Properties',
            logo: 'https://logo.clearbit.com/godrejproperties.com',
            industry: 'realestate',
            color: '#00A650',
            tagline: 'Add More to Life',
            founded: 1990,
            headquarters: 'Mumbai, India',
            products: ['Godrej Aria', 'Godrej Woods', 'Godrej Platinum', 'Godrej Prime', 'Godrej Nurture'],
            competitors: ['dlf', 'prestige', 'sobha'],
            socialHandles: {
                twitter: '@GodrejProp',
                instagram: '@godrejproperties',
                youtube: 'GodrejProperties',
                linkedin: 'godrej-properties'
            },
            metrics: {
                baseFollowers: 320000,
                avgSentiment: 68,
                avgEngagement: 2.4,
                avgMentions: 12000,
                avgReach: 28000000,
                growthRate: 7.2
            }
        },
        // IT Services
        infosys: {
            id: 'infosys',
            name: 'Infosys',
            logo: 'https://logo.clearbit.com/infosys.com',
            industry: 'it_services',
            color: '#007CC3',
            tagline: 'Navigate your next',
            founded: 1981,
            headquarters: 'Bangalore, India',
            products: ['Infosys Nia', 'Infosys Cobalt', 'EdgeVerve', 'Infosys Topaz', 'Infosys Helix'],
            competitors: ['tcs', 'wipro', 'accenture'],
            socialHandles: {
                twitter: '@Infosys',
                instagram: '@infosys',
                youtube: 'Infosys',
                linkedin: 'infosys'
            },
            metrics: {
                baseFollowers: 3800000,
                avgSentiment: 72,
                avgEngagement: 3.2,
                avgMentions: 38000,
                avgReach: 75000000,
                growthRate: 9.5
            }
        },
        wipro: {
            id: 'wipro',
            name: 'Wipro',
            logo: 'https://logo.clearbit.com/wipro.com',
            industry: 'it_services',
            color: '#441D70',
            tagline: 'Spirit of Wipro',
            founded: 1945,
            headquarters: 'Bangalore, India',
            products: ['Wipro Holmes', 'Wipro ATGA', 'FullStride Cloud', 'Wipro FieldX', 'iDEAS'],
            competitors: ['tcs', 'infosys', 'accenture'],
            socialHandles: {
                twitter: '@Wipro',
                instagram: '@wiprolimited',
                youtube: 'Wipro',
                linkedin: 'wipro'
            },
            metrics: {
                baseFollowers: 2900000,
                avgSentiment: 70,
                avgEngagement: 2.8,
                avgMentions: 32000,
                avgReach: 65000000,
                growthRate: 7.8
            }
        },
        // Additional Competitors for IT Services
        accenture: {
            id: 'accenture',
            name: 'Accenture',
            logo: 'https://logo.clearbit.com/accenture.com',
            industry: 'it_services',
            color: '#A100FF',
            tagline: 'Let there be change',
            founded: 1989,
            headquarters: 'Dublin, Ireland',
            products: ['Accenture Cloud First', 'Accenture myConcerto', 'Accenture Intelligent Operations', 'SynOps'],
            competitors: ['tcs', 'infosys', 'wipro'],
            socialHandles: {
                twitter: '@Accenture',
                instagram: '@accenture',
                youtube: 'Accenture',
                linkedin: 'accenture'
            },
            metrics: {
                baseFollowers: 5200000,
                avgSentiment: 74,
                avgEngagement: 3.8,
                avgMentions: 58000,
                avgReach: 95000000,
                growthRate: 10.5
            }
        },
        // Browser Competitors for Google Chrome
        firefox: {
            id: 'firefox',
            name: 'Mozilla Firefox',
            logo: 'https://logo.clearbit.com/mozilla.org',
            industry: 'technology',
            color: '#FF7139',
            tagline: 'The browser that protects your privacy',
            founded: 2002,
            headquarters: 'San Francisco, CA',
            products: ['Firefox Browser', 'Firefox Focus', 'Firefox Relay', 'Mozilla VPN'],
            competitors: ['google', 'microsoft', 'brave'],
            socialHandles: {
                twitter: '@Firefox',
                instagram: '@firefox',
                youtube: 'Firefox',
                linkedin: 'mozilla-corporation'
            },
            metrics: {
                baseFollowers: 2800000,
                avgSentiment: 76,
                avgEngagement: 4.2,
                avgMentions: 45000,
                avgReach: 85000000,
                growthRate: 5.2
            }
        },
        edge: {
            id: 'edge',
            name: 'Microsoft Edge',
            logo: 'https://logo.clearbit.com/microsoft.com',
            industry: 'technology',
            color: '#0078D7',
            tagline: 'Your AI-powered browser',
            founded: 2015,
            headquarters: 'Redmond, WA',
            products: ['Edge Browser', 'Edge for Business', 'Edge Mobile', 'Edge Dev Tools'],
            competitors: ['google', 'firefox', 'brave'],
            socialHandles: {
                twitter: '@MicrosoftEdge',
                instagram: '@microsoftedge',
                youtube: 'MicrosoftEdge',
                linkedin: 'microsoft'
            },
            metrics: {
                baseFollowers: 1500000,
                avgSentiment: 72,
                avgEngagement: 3.5,
                avgMentions: 32000,
                avgReach: 65000000,
                growthRate: 18.5
            }
        },
        brave: {
            id: 'brave',
            name: 'Brave Browser',
            logo: 'https://logo.clearbit.com/brave.com',
            industry: 'technology',
            color: '#FB542B',
            tagline: 'Browse privately. Search privately. And ditch Big Tech.',
            founded: 2016,
            headquarters: 'San Francisco, CA',
            products: ['Brave Browser', 'Brave Search', 'Brave Rewards', 'Brave Wallet'],
            competitors: ['google', 'firefox', 'edge'],
            socialHandles: {
                twitter: '@brave',
                instagram: '@bravesoftware',
                youtube: 'BraveSoftware',
                linkedin: 'brave-software'
            },
            metrics: {
                baseFollowers: 1200000,
                avgSentiment: 82,
                avgEngagement: 6.5,
                avgMentions: 28000,
                avgReach: 55000000,
                growthRate: 35.2
            }
        },
        // Mobile Phone Competitors for Apple
        oneplus: {
            id: 'oneplus',
            name: 'OnePlus',
            logo: 'https://logo.clearbit.com/oneplus.com',
            industry: 'technology',
            color: '#F5010C',
            tagline: 'Never Settle',
            founded: 2013,
            headquarters: 'Shenzhen, China',
            products: ['OnePlus 12', 'OnePlus Open', 'OnePlus Buds', 'OnePlus Watch', 'OnePlus Pad'],
            competitors: ['apple', 'samsung', 'xiaomi'],
            socialHandles: {
                twitter: '@OnePlus',
                instagram: '@oneplus',
                youtube: 'OnePlus',
                linkedin: 'oneplus'
            },
            metrics: {
                baseFollowers: 8500000,
                avgSentiment: 78,
                avgEngagement: 5.8,
                avgMentions: 62000,
                avgReach: 145000000,
                growthRate: 12.8
            }
        },
        xiaomi: {
            id: 'xiaomi',
            name: 'Xiaomi',
            logo: 'https://logo.clearbit.com/xiaomi.com',
            industry: 'technology',
            color: '#FF6700',
            tagline: 'Innovation for Everyone',
            founded: 2010,
            headquarters: 'Beijing, China',
            products: ['Xiaomi 14', 'Redmi Note', 'Mi Band', 'Mi TV', 'Xiaomi SU7'],
            competitors: ['apple', 'samsung', 'oneplus'],
            socialHandles: {
                twitter: '@Xiaomi',
                instagram: '@xiaomi',
                youtube: 'Xiaomi',
                linkedin: 'xiaomi'
            },
            metrics: {
                baseFollowers: 12500000,
                avgSentiment: 74,
                avgEngagement: 4.8,
                avgMentions: 98000,
                avgReach: 220000000,
                growthRate: 15.5
            }
        },
        // Indian Automotive Competitors for Tesla
        tata_motors: {
            id: 'tata_motors',
            name: 'Tata Motors',
            logo: 'https://logo.clearbit.com/tatamotors.com',
            industry: 'automotive',
            color: '#1A3567',
            tagline: 'Connecting Aspirations',
            founded: 1945,
            headquarters: 'Mumbai, India',
            products: ['Tata Nexon EV', 'Tata Tiago EV', 'Tata Punch EV', 'Tata Harrier', 'Tata Safari'],
            competitors: ['tesla', 'mahindra', 'mg_motors'],
            socialHandles: {
                twitter: '@TataMotors',
                instagram: '@tatamotors',
                youtube: 'TataMotors',
                linkedin: 'tata-motors'
            },
            metrics: {
                baseFollowers: 3500000,
                avgSentiment: 72,
                avgEngagement: 4.2,
                avgMentions: 48000,
                avgReach: 95000000,
                growthRate: 22.5
            }
        },
        mahindra: {
            id: 'mahindra',
            name: 'Mahindra & Mahindra',
            logo: 'https://logo.clearbit.com/mahindra.com',
            industry: 'automotive',
            color: '#E31837',
            tagline: 'Rise',
            founded: 1945,
            headquarters: 'Mumbai, India',
            products: ['XUV700', 'Thar', 'Scorpio-N', 'XUV400 EV', 'BE 6e'],
            competitors: ['tesla', 'tata_motors', 'mg_motors'],
            socialHandles: {
                twitter: '@MahindraRise',
                instagram: '@mahaborhood',
                youtube: 'MahindraRise',
                linkedin: 'mahindra-rise'
            },
            metrics: {
                baseFollowers: 2800000,
                avgSentiment: 74,
                avgEngagement: 4.5,
                avgMentions: 42000,
                avgReach: 85000000,
                growthRate: 18.2
            }
        },
        mg_motors: {
            id: 'mg_motors',
            name: 'MG Motor India',
            logo: 'https://logo.clearbit.com/mgmotor.co.in',
            industry: 'automotive',
            color: '#C41230',
            tagline: 'The future of mobility',
            founded: 2017,
            headquarters: 'Gurugram, India',
            products: ['MG ZS EV', 'MG Comet EV', 'MG Hector', 'MG Astor', 'MG Gloster'],
            competitors: ['tesla', 'tata_motors', 'mahindra'],
            socialHandles: {
                twitter: '@MGMotorIn',
                instagram: '@mgmotorin',
                youtube: 'MGMotorIndia',
                linkedin: 'mg-motor-india'
            },
            metrics: {
                baseFollowers: 1800000,
                avgSentiment: 70,
                avgEngagement: 5.2,
                avgMentions: 28000,
                avgReach: 55000000,
                growthRate: 28.5
            }
        },
        // GPU/Chip Competitors for NVIDIA
        amd: {
            id: 'amd',
            name: 'AMD',
            logo: 'https://logo.clearbit.com/amd.com',
            industry: 'technology',
            color: '#ED1C24',
            tagline: 'Together We Advance',
            founded: 1969,
            headquarters: 'Santa Clara, CA',
            products: ['Ryzen 9', 'Radeon RX 7900', 'EPYC', 'Instinct MI300', 'Threadripper'],
            competitors: ['nvidia', 'intel', 'qualcomm'],
            socialHandles: {
                twitter: '@AMD',
                instagram: '@amd',
                youtube: 'AMD',
                linkedin: 'amd'
            },
            metrics: {
                baseFollowers: 4500000,
                avgSentiment: 78,
                avgEngagement: 5.5,
                avgMentions: 72000,
                avgReach: 145000000,
                growthRate: 22.8
            }
        },
        intel: {
            id: 'intel',
            name: 'Intel',
            logo: 'https://logo.clearbit.com/intel.com',
            industry: 'technology',
            color: '#0071C5',
            tagline: 'Intel Inside',
            founded: 1968,
            headquarters: 'Santa Clara, CA',
            products: ['Core Ultra', 'Xeon', 'Arc Graphics', 'Intel Evo', 'Gaudi AI'],
            competitors: ['nvidia', 'amd', 'qualcomm'],
            socialHandles: {
                twitter: '@Intel',
                instagram: '@intel',
                youtube: 'Intel',
                linkedin: 'intel-corporation'
            },
            metrics: {
                baseFollowers: 6800000,
                avgSentiment: 68,
                avgEngagement: 4.2,
                avgMentions: 85000,
                avgReach: 175000000,
                growthRate: 8.5
            }
        },
        qualcomm: {
            id: 'qualcomm',
            name: 'Qualcomm',
            logo: 'https://logo.clearbit.com/qualcomm.com',
            industry: 'technology',
            color: '#3253DC',
            tagline: 'Inventing the tech the world loves',
            founded: 1985,
            headquarters: 'San Diego, CA',
            products: ['Snapdragon 8 Gen 3', 'Snapdragon X Elite', 'FastConnect', 'QCS AI'],
            competitors: ['nvidia', 'amd', 'intel'],
            socialHandles: {
                twitter: '@Qualcomm',
                instagram: '@qualcomm',
                youtube: 'Qualcomm',
                linkedin: 'qualcomm'
            },
            metrics: {
                baseFollowers: 3200000,
                avgSentiment: 75,
                avgEngagement: 4.8,
                avgMentions: 52000,
                avgReach: 110000000,
                growthRate: 15.2
            }
        }
    },

    // ========================================
    // PRODUCT CATEGORIES / INDUSTRIES
    // ========================================
    industries: {
        technology: {
            id: 'technology',
            name: 'Technology',
            icon: 'icon-chip',
            keywords: ['tech', 'innovation', 'AI', 'software', 'hardware', 'digital', 'smart'],
            emotions: {
                joy: 35, trust: 25, anticipation: 20, surprise: 8, sadness: 4, fear: 3, anger: 3, disgust: 2
            },
            topHashtags: ['#tech', '#innovation', '#AI', '#gadgets', '#futuretech', '#digital'],
            avgPurchaseIntent: 42
        },
        automotive: {
            id: 'automotive',
            name: 'Automobiles',
            icon: 'icon-car',
            keywords: ['car', 'drive', 'EV', 'electric', 'vehicle', 'automotive', 'road'],
            emotions: {
                joy: 30, trust: 20, anticipation: 25, surprise: 10, sadness: 5, fear: 4, anger: 4, disgust: 2
            },
            topHashtags: ['#EV', '#electriccar', '#automotive', '#carlife', '#greendriving', '#futureofdriving'],
            avgPurchaseIntent: 38
        },
        healthcare: {
            id: 'healthcare',
            name: 'Healthcare & Pharma',
            icon: 'icon-health',
            keywords: ['health', 'wellness', 'medicine', 'pharma', 'care', 'treatment', 'doctor'],
            emotions: {
                joy: 20, trust: 35, anticipation: 15, surprise: 5, sadness: 10, fear: 8, anger: 4, disgust: 3
            },
            topHashtags: ['#healthcare', '#wellness', '#pharma', '#healthtech', '#medicine', '#patientcare'],
            avgPurchaseIntent: 55
        },
        fmcg: {
            id: 'fmcg',
            name: 'FMCG / Consumer Goods',
            icon: 'icon-shopping',
            keywords: ['shampoo', 'soap', 'beauty', 'personal care', 'household', 'daily'],
            emotions: {
                joy: 40, trust: 25, anticipation: 10, surprise: 12, sadness: 5, fear: 2, anger: 4, disgust: 2
            },
            topHashtags: ['#beauty', '#skincare', '#haircare', '#selfcare', '#dailyroutine', '#wellness'],
            avgPurchaseIntent: 65
        },
        realestate: {
            id: 'realestate',
            name: 'Real Estate',
            icon: 'icon-home',
            keywords: ['property', 'home', 'house', 'apartment', 'real estate', 'investment', 'location'],
            emotions: {
                joy: 28, trust: 30, anticipation: 22, surprise: 8, sadness: 4, fear: 5, anger: 2, disgust: 1
            },
            topHashtags: ['#realestate', '#property', '#homesweethome', '#investment', '#dreamhome', '#housing'],
            avgPurchaseIntent: 25
        },
        it_services: {
            id: 'it_services',
            name: 'IT Services',
            icon: 'icon-server',
            keywords: ['consulting', 'digital transformation', 'cloud', 'enterprise', 'solutions', 'services'],
            emotions: {
                joy: 22, trust: 38, anticipation: 18, surprise: 8, sadness: 5, fear: 4, anger: 3, disgust: 2
            },
            topHashtags: ['#ITservices', '#digitaltransformation', '#consulting', '#enterprise', '#cloud', '#B2B'],
            avgPurchaseIntent: 35
        }
    },

    // ========================================
    // PRODUCT CATALOG
    // ========================================
    products: {
        // Technology Products
        iphone: {
            id: 'iphone',
            name: 'iPhone 15 Pro',
            brand: 'apple',
            category: 'smartphone',
            industry: 'technology',
            price: 999,
            rating: 4.7,
            reviewCount: 125000,
            launchDate: '2023-09-22',
            features: ['A17 Pro chip', 'Titanium design', 'USB-C', '48MP camera'],
            sentiment: { positive: 72, neutral: 18, negative: 10 }
        },
        pixel: {
            id: 'pixel',
            name: 'Google Pixel 8 Pro',
            brand: 'google',
            category: 'smartphone',
            industry: 'technology',
            price: 899,
            rating: 4.5,
            reviewCount: 45000,
            launchDate: '2023-10-12',
            features: ['Tensor G3', 'AI photography', 'Pure Android', '7 years updates'],
            sentiment: { positive: 68, neutral: 22, negative: 10 }
        },
        rtx4090: {
            id: 'rtx4090',
            name: 'GeForce RTX 4090',
            brand: 'nvidia',
            category: 'graphics_card',
            industry: 'technology',
            price: 1599,
            rating: 4.9,
            reviewCount: 32000,
            launchDate: '2022-10-12',
            features: ['Ada Lovelace', '24GB GDDR6X', 'DLSS 3', 'Ray Tracing'],
            sentiment: { positive: 85, neutral: 10, negative: 5 }
        },

        // Automotive Products
        model3: {
            id: 'model3',
            name: 'Tesla Model 3',
            brand: 'tesla',
            category: 'electric_vehicle',
            industry: 'automotive',
            price: 40240,
            rating: 4.6,
            reviewCount: 89000,
            launchDate: '2017-07-28',
            features: ['358 mile range', 'Autopilot', '0-60 in 3.1s', 'Supercharger network'],
            sentiment: { positive: 65, neutral: 20, negative: 15 }
        },
        cybertruck: {
            id: 'cybertruck',
            name: 'Tesla Cybertruck',
            brand: 'tesla',
            category: 'electric_vehicle',
            industry: 'automotive',
            price: 60990,
            rating: 4.3,
            reviewCount: 28000,
            launchDate: '2023-11-30',
            features: ['Exoskeleton', 'Stainless steel', 'Vault bed', 'Adaptive air suspension'],
            sentiment: { positive: 58, neutral: 22, negative: 20 }
        },

        // FMCG Products
        headshoulders: {
            id: 'headshoulders',
            name: 'Head & Shoulders Classic Clean',
            brand: 'pg',
            category: 'shampoo',
            industry: 'fmcg',
            price: 8.99,
            rating: 4.4,
            reviewCount: 156000,
            launchDate: '1961-01-01',
            features: ['Anti-dandruff', 'Fresh scent', 'Dermatologist tested', 'pH balanced'],
            sentiment: { positive: 75, neutral: 18, negative: 7 }
        },

        // IT Services
        tcsbancs: {
            id: 'tcsbancs',
            name: 'TCS BaNCS',
            brand: 'tcs',
            category: 'banking_software',
            industry: 'it_services',
            price: null, // Enterprise pricing
            rating: 4.2,
            reviewCount: 1200,
            launchDate: '2000-01-01',
            features: ['Core banking', 'Digital channels', 'Payments', 'Risk management'],
            sentiment: { positive: 70, neutral: 22, negative: 8 }
        }
    },

    // ========================================
    // SAMPLE CONTENT TEMPLATES BY INDUSTRY
    // ========================================
    contentTemplates: {
        technology: {
            positive: [
                "Just upgraded to {product} and I'm absolutely blown away! The {feature} is incredible.",
                "Been using {brand} for years and they never disappoint. {product} is their best yet!",
                "{product} just made my workflow 10x more efficient. Game changer!",
                "The innovation from {brand} is unmatched. {product} sets a new standard.",
                "Finally got my hands on {product}. Worth every penny! {brand} delivers again.",
                "Can't believe how smooth {product} is. {brand} really knows their tech.",
                "After testing {product} for a week, I can say it's revolutionary. Kudos to {brand}!"
            ],
            negative: [
                "Disappointed with {product}. Expected better from {brand}.",
                "{product} crashed again. {brand} needs to fix these bugs ASAP.",
                "Overpriced and underdelivered. {product} is not worth it.",
                "Had to return my {product}. Quality control at {brand} is slipping.",
                "The new {product} update broke everything. Thanks {brand}."
            ],
            neutral: [
                "Received my {product} today. Will update after testing.",
                "Comparing {product} with alternatives. Interesting specs.",
                "Anyone else using {product}? Looking for opinions on {brand}.",
                "{product} arrived. Setting it up now.",
                "Thinking about getting {product}. Any {brand} users here?"
            ]
        },
        automotive: {
            positive: [
                "Just took delivery of my {product}! Best decision ever. Thanks {brand}!",
                "6 months with {product} and zero regrets. {brand} makes amazing vehicles.",
                "The {feature} on {product} is insane. Future is here!",
                "Road trip in my {product} was incredible. {brand} knows comfort.",
                "Charged my {product} in 20 minutes. The future of driving!",
                "{product} is turning heads everywhere I go. {brand} nailed the design!"
            ],
            negative: [
                "Service center experience with {brand} was terrible. {product} issues unresolved.",
                "{product} had to go in for repairs again. Reliability concerns with {brand}.",
                "Range anxiety is real with {product}. {brand} oversold the numbers.",
                "Quality issues on my {product}. Panel gaps and rattles. Come on {brand}!",
                "Waiting 8 months for parts. {brand} supply chain is broken."
            ],
            neutral: [
                "Test drove {product} today. Interesting experience.",
                "Considering {product} vs competitors. {brand} has interesting features.",
                "Anyone have long-term experience with {product}?",
                "Saw {product} on the road. {brand}'s design is distinctive.",
                "Researching {product}. What should I know about {brand}?"
            ]
        },
        healthcare: {
            positive: [
                "{brand}'s new treatment changed my life. Forever grateful.",
                "Doctor recommended {product} and it actually works!",
                "Two weeks on {product} and seeing real improvements. Thank you {brand}!",
                "Finally a {brand} solution that addresses the root cause.",
                "The team at {brand} was so helpful throughout my journey."
            ],
            negative: [
                "Experienced side effects with {product}. Consulting my doctor.",
                "{brand} support was unhelpful when I had concerns about {product}.",
                "Insurance doesn't cover {product}. {brand} pricing is outrageous.",
                "Waited months for {product} availability. {brand} supply issues.",
                "{product} didn't work for me. Trying alternatives."
            ],
            neutral: [
                "Starting {product} treatment today. Hopeful for results.",
                "Doctor is considering {product} by {brand} for my condition.",
                "Researching {product}. Looking for patient experiences.",
                "Anyone tried {product}? {brand} seems promising.",
                "Comparing {product} with other options. Need more info."
            ]
        },
        fmcg: {
            positive: [
                "My hair has never looked better since switching to {product}!",
                "{brand} knows what they're doing. {product} is my new favorite!",
                "Finally found a shampoo that works! Thank you {brand}!",
                "The scent of {product} is amazing. Using it daily now.",
                "{product} cleared my dandruff in just one week! Incredible!"
            ],
            negative: [
                "{product} made my hair dry and frizzy. Not buying again.",
                "Allergic reaction to {product}. {brand} needs better testing.",
                "The new {product} formula is terrible. Why did {brand} change it?",
                "Overpriced for what it is. {product} isn't worth it.",
                "{product} leaked in shipping. Poor packaging {brand}."
            ],
            neutral: [
                "Trying {product} for the first time. Will share results.",
                "Comparing {product} with my usual brand.",
                "Anyone used {product}? How does {brand} compare?",
                "Saw {product} on sale. Worth trying?",
                "Switching to {product} as an experiment. Stay tuned."
            ]
        },
        realestate: {
            positive: [
                "Just closed on my dream home with {brand}! Best experience ever.",
                "{brand} made the buying process so smooth and transparent.",
                "The property by {brand} exceeded all expectations. Quality built.",
                "Moved into our new {brand} home. Couldn't be happier!",
                "Excellent investment with {brand}. Property value already up!"
            ],
            negative: [
                "Still waiting for possession. {brand} delays are frustrating.",
                "Hidden charges weren't disclosed by {brand}. Feeling cheated.",
                "{brand} promised amenities that don't exist. False advertising.",
                "Quality issues in our new flat. {brand} construction is subpar.",
                "Customer service at {brand} is non-responsive."
            ],
            neutral: [
                "Visiting {brand} property this weekend. Looking promising.",
                "Comparing {brand} with other developers. Need advice.",
                "Anyone invested with {brand}? Looking for feedback.",
                "{brand} launched new project. Interesting location.",
                "Considering {brand} for first home. Any experiences?"
            ]
        },
        it_services: {
            positive: [
                "{brand} transformed our digital infrastructure. Excellent partnership!",
                "The team at {brand} delivered {product} on time and under budget.",
                "Our cloud migration with {brand} was seamless. Highly recommend.",
                "{product} by {brand} increased our efficiency by 40%.",
                "Best consulting decision we made was partnering with {brand}."
            ],
            negative: [
                "{brand} missed the project deadline again. Communication issues.",
                "The {product} implementation had too many bugs. Disappointed.",
                "Costly overruns with {brand}. Poor project management.",
                "Support response from {brand} is too slow.",
                "{product} doesn't integrate well with our existing systems."
            ],
            neutral: [
                "Evaluating {brand} for our digital transformation project.",
                "RFP sent to {brand} and competitors. Awaiting proposals.",
                "Demo of {product} scheduled with {brand} team.",
                "Researching {brand}'s case studies. Interesting approach.",
                "Anyone worked with {brand} on enterprise projects?"
            ]
        }
    },

    // ========================================
    // INFLUENCER DATA BY INDUSTRY
    // ========================================
    influencers: {
        technology: [
            { name: 'Marques Brownlee', handle: '@MKBHD', followers: 18500000, platform: 'youtube', specialty: 'Tech Reviews' },
            { name: 'Linus Tech Tips', handle: '@LinusTech', followers: 15800000, platform: 'youtube', specialty: 'PC Hardware' },
            { name: 'iJustine', handle: '@iJustine', followers: 7200000, platform: 'youtube', specialty: 'Apple Products' },
            { name: 'Unbox Therapy', handle: '@UnboxTherapy', followers: 18100000, platform: 'youtube', specialty: 'Gadgets' },
            { name: 'Dave2D', handle: '@Dave2D', followers: 3500000, platform: 'youtube', specialty: 'Laptops' }
        ],
        automotive: [
            { name: 'Doug DeMuro', handle: '@DougDeMuro', followers: 4800000, platform: 'youtube', specialty: 'Car Reviews' },
            { name: 'Supercar Blondie', handle: '@superabordie', followers: 12500000, platform: 'instagram', specialty: 'Luxury Cars' },
            { name: 'Chris Harris', handle: '@harrismonkey', followers: 980000, platform: 'twitter', specialty: 'Driving' },
            { name: 'Shmee150', handle: '@Shmee150', followers: 2400000, platform: 'youtube', specialty: 'Supercars' },
            { name: 'Car Throttle', handle: '@carthrottle', followers: 3800000, platform: 'youtube', specialty: 'Car Culture' }
        ],
        healthcare: [
            { name: 'Dr. Mike', handle: '@RealDoctorMike', followers: 11200000, platform: 'youtube', specialty: 'Medical Education' },
            { name: 'MedCram', handle: '@MedCram', followers: 2800000, platform: 'youtube', specialty: 'Medical Lectures' },
            { name: 'ZDoggMD', handle: '@ZDoggMD', followers: 1500000, platform: 'youtube', specialty: 'Healthcare Commentary' }
        ],
        fmcg: [
            { name: 'James Welsh', handle: '@james_s_welsh', followers: 1200000, platform: 'youtube', specialty: 'Skincare' },
            { name: 'Hyram', handle: '@skincarebyhyram', followers: 4500000, platform: 'youtube', specialty: 'Skincare Education' },
            { name: 'Jackie Aina', handle: '@jackieaina', followers: 3600000, platform: 'youtube', specialty: 'Beauty' }
        ]
    },

    // ========================================
    // TRENDING TOPICS BY BRAND
    // ========================================
    trendingByBrand: {
        apple: [
            { name: '#iPhone15Pro', mentions: 125000, growth: 45, sentiment: 75 },
            { name: '#AppleEvent', mentions: 98000, growth: 120, sentiment: 82 },
            { name: '#MacBookPro', mentions: 67000, growth: 23, sentiment: 78 },
            { name: '#AppleVisionPro', mentions: 89000, growth: 180, sentiment: 70 },
            { name: '#iOS18', mentions: 45000, growth: 35, sentiment: 72 },
            { name: '#AirPodsPro', mentions: 34000, growth: 12, sentiment: 85 }
        ],
        google: [
            { name: '#Pixel8', mentions: 78000, growth: 65, sentiment: 72 },
            { name: '#GoogleIO', mentions: 56000, growth: 95, sentiment: 78 },
            { name: '#Gemini', mentions: 145000, growth: 250, sentiment: 68 },
            { name: '#AndroidUpdate', mentions: 42000, growth: 18, sentiment: 65 },
            { name: '#GoogleCloud', mentions: 38000, growth: 28, sentiment: 75 },
            { name: '#ChromeOS', mentions: 21000, growth: 8, sentiment: 70 }
        ],
        nvidia: [
            { name: '#RTX4090', mentions: 89000, growth: 35, sentiment: 88 },
            { name: '#CUDA', mentions: 45000, growth: 42, sentiment: 82 },
            { name: '#NvidiaAI', mentions: 156000, growth: 180, sentiment: 85 },
            { name: '#GeForceNow', mentions: 34000, growth: 25, sentiment: 72 },
            { name: '#Blackwell', mentions: 78000, growth: 320, sentiment: 90 },
            { name: '#JensenHuang', mentions: 42000, growth: 85, sentiment: 88 }
        ],
        tcs: [
            { name: '#TCSInnovation', mentions: 12000, growth: 18, sentiment: 74 },
            { name: '#TCSCareers', mentions: 28000, growth: 45, sentiment: 68 },
            { name: '#DigitalTCS', mentions: 8500, growth: 22, sentiment: 76 },
            { name: '#TCSResults', mentions: 15000, growth: 120, sentiment: 72 },
            { name: '#TCSPartner', mentions: 6800, growth: 15, sentiment: 78 },
            { name: '#BuildingOnBelief', mentions: 4200, growth: 8, sentiment: 80 }
        ],
        tesla: [
            { name: '#Tesla', mentions: 245000, growth: 28, sentiment: 65 },
            { name: '#Cybertruck', mentions: 178000, growth: 85, sentiment: 58 },
            { name: '#ModelY', mentions: 89000, growth: 15, sentiment: 72 },
            { name: '#FSD', mentions: 112000, growth: 45, sentiment: 55 },
            { name: '#ElonMusk', mentions: 320000, growth: 65, sentiment: 52 },
            { name: '#Supercharger', mentions: 45000, growth: 22, sentiment: 78 }
        ],
        samsung: [
            { name: '#GalaxyS24', mentions: 98000, growth: 75, sentiment: 78 },
            { name: '#GalaxyZFold', mentions: 67000, growth: 45, sentiment: 72 },
            { name: '#SamsungUnpacked', mentions: 89000, growth: 150, sentiment: 80 },
            { name: '#OneUI', mentions: 34000, growth: 18, sentiment: 68 },
            { name: '#GalaxyAI', mentions: 78000, growth: 220, sentiment: 75 },
            { name: '#GalaxyWatch', mentions: 42000, growth: 25, sentiment: 82 }
        ],
        microsoft: [
            { name: '#Windows11', mentions: 112000, growth: 22, sentiment: 68 },
            { name: '#Copilot', mentions: 156000, growth: 280, sentiment: 72 },
            { name: '#Azure', mentions: 89000, growth: 35, sentiment: 78 },
            { name: '#Xbox', mentions: 145000, growth: 42, sentiment: 75 },
            { name: '#Microsoft365', mentions: 67000, growth: 18, sentiment: 72 },
            { name: '#SurfacePro', mentions: 45000, growth: 28, sentiment: 76 }
        ],
        amazon: [
            { name: '#AWS', mentions: 178000, growth: 32, sentiment: 76 },
            { name: '#PrimeDay', mentions: 245000, growth: 180, sentiment: 72 },
            { name: '#Alexa', mentions: 98000, growth: 15, sentiment: 70 },
            { name: '#AmazonDeals', mentions: 156000, growth: 85, sentiment: 75 },
            { name: '#Kindle', mentions: 45000, growth: 12, sentiment: 82 },
            { name: '#FireTV', mentions: 34000, growth: 18, sentiment: 74 }
        ],
        ford: [
            { name: '#F150', mentions: 89000, growth: 22, sentiment: 75 },
            { name: '#Mustang', mentions: 78000, growth: 35, sentiment: 82 },
            { name: '#FordBronco', mentions: 67000, growth: 45, sentiment: 78 },
            { name: '#MachE', mentions: 56000, growth: 55, sentiment: 72 },
            { name: '#BuiltFordTough', mentions: 42000, growth: 18, sentiment: 76 },
            { name: '#FordExplorer', mentions: 34000, growth: 12, sentiment: 74 }
        ],
        bmw: [
            { name: '#BMWi4', mentions: 45000, growth: 65, sentiment: 82 },
            { name: '#BMWiX', mentions: 38000, growth: 55, sentiment: 78 },
            { name: '#BMWM3', mentions: 67000, growth: 28, sentiment: 88 },
            { name: '#7Series', mentions: 34000, growth: 35, sentiment: 80 },
            { name: '#BMWMPerformance', mentions: 56000, growth: 42, sentiment: 85 },
            { name: '#SheerDrivingPleasure', mentions: 28000, growth: 15, sentiment: 82 }
        ],
        mercedes: [
            { name: '#MercedesEQS', mentions: 48000, growth: 58, sentiment: 80 },
            { name: '#SClass', mentions: 56000, growth: 22, sentiment: 85 },
            { name: '#AMGGT', mentions: 42000, growth: 35, sentiment: 88 },
            { name: '#MercedesGLE', mentions: 38000, growth: 18, sentiment: 78 },
            { name: '#TheBestOrNothing', mentions: 32000, growth: 12, sentiment: 82 },
            { name: '#MercedesAMG', mentions: 67000, growth: 45, sentiment: 86 }
        ],
        pfizer: [
            { name: '#Pfizer', mentions: 78000, growth: 15, sentiment: 62 },
            { name: '#PfizerVaccine', mentions: 145000, growth: -12, sentiment: 58 },
            { name: '#ScienceWillWin', mentions: 34000, growth: 22, sentiment: 72 },
            { name: '#Paxlovid', mentions: 45000, growth: 35, sentiment: 68 },
            { name: '#PharmaInnovation', mentions: 28000, growth: 18, sentiment: 70 },
            { name: '#HealthcareResearch', mentions: 21000, growth: 25, sentiment: 74 }
        ],
        johnson_johnson: [
            { name: '#JNJ', mentions: 45000, growth: 12, sentiment: 68 },
            { name: '#Tylenol', mentions: 34000, growth: 8, sentiment: 72 },
            { name: '#Neutrogena', mentions: 56000, growth: 28, sentiment: 76 },
            { name: '#BandAid', mentions: 28000, growth: 5, sentiment: 78 },
            { name: '#Aveeno', mentions: 38000, growth: 22, sentiment: 80 },
            { name: '#CaringForWorld', mentions: 18000, growth: 15, sentiment: 74 }
        ],
        procter_gamble: [
            { name: '#PG', mentions: 34000, growth: 10, sentiment: 72 },
            { name: '#Tide', mentions: 45000, growth: 15, sentiment: 74 },
            { name: '#Gillette', mentions: 38000, growth: 8, sentiment: 70 },
            { name: '#Pampers', mentions: 42000, growth: 18, sentiment: 78 },
            { name: '#HeadAndShoulders', mentions: 28000, growth: 12, sentiment: 72 },
            { name: '#Pantene', mentions: 32000, growth: 22, sentiment: 76 }
        ],
        unilever: [
            { name: '#Dove', mentions: 56000, growth: 25, sentiment: 78 },
            { name: '#Axe', mentions: 38000, growth: 15, sentiment: 72 },
            { name: '#Lipton', mentions: 28000, growth: 8, sentiment: 74 },
            { name: '#BenAndJerrys', mentions: 45000, growth: 32, sentiment: 82 },
            { name: '#Unilever', mentions: 32000, growth: 12, sentiment: 70 },
            { name: '#SustainableLiving', mentions: 21000, growth: 35, sentiment: 76 }
        ],
        loreal: [
            { name: '#Loreal', mentions: 67000, growth: 22, sentiment: 76 },
            { name: '#Maybelline', mentions: 89000, growth: 35, sentiment: 80 },
            { name: '#Garnier', mentions: 56000, growth: 18, sentiment: 74 },
            { name: '#BecauseYoureWorthIt', mentions: 45000, growth: 28, sentiment: 82 },
            { name: '#Lancome', mentions: 38000, growth: 15, sentiment: 78 },
            { name: '#NYXCosmetics', mentions: 78000, growth: 45, sentiment: 75 }
        ],
        dlf: [
            { name: '#DLF', mentions: 12000, growth: 15, sentiment: 65 },
            { name: '#DLFCyberCity', mentions: 8500, growth: 22, sentiment: 72 },
            { name: '#DLFCamellias', mentions: 5600, growth: 35, sentiment: 78 },
            { name: '#DLFMallOfIndia', mentions: 9800, growth: 28, sentiment: 75 },
            { name: '#BuildingIndia', mentions: 4200, growth: 12, sentiment: 68 },
            { name: '#DLFLuxury', mentions: 3800, growth: 18, sentiment: 80 }
        ],
        godrej_properties: [
            { name: '#GodrejProperties', mentions: 9500, growth: 18, sentiment: 68 },
            { name: '#GodrejAria', mentions: 5200, growth: 25, sentiment: 72 },
            { name: '#GodrejWoods', mentions: 4800, growth: 32, sentiment: 75 },
            { name: '#AddMoreToLife', mentions: 3500, growth: 15, sentiment: 70 },
            { name: '#GodrejHomes', mentions: 6800, growth: 22, sentiment: 74 },
            { name: '#GodrejPrime', mentions: 4200, growth: 28, sentiment: 76 }
        ],
        infosys: [
            { name: '#Infosys', mentions: 28000, growth: 18, sentiment: 72 },
            { name: '#InfosysCobalt', mentions: 12000, growth: 35, sentiment: 76 },
            { name: '#NavigateYourNext', mentions: 8500, growth: 22, sentiment: 74 },
            { name: '#InfosysAI', mentions: 18000, growth: 55, sentiment: 78 },
            { name: '#DigitalTransformation', mentions: 45000, growth: 28, sentiment: 72 },
            { name: '#InfosysCareers', mentions: 21000, growth: 45, sentiment: 68 }
        ],
        wipro: [
            { name: '#Wipro', mentions: 22000, growth: 15, sentiment: 70 },
            { name: '#WiproHolmes', mentions: 8500, growth: 28, sentiment: 74 },
            { name: '#SpiritOfWipro', mentions: 6200, growth: 12, sentiment: 72 },
            { name: '#WiproCloud', mentions: 12000, growth: 35, sentiment: 76 },
            { name: '#WiproCareers', mentions: 18000, growth: 42, sentiment: 66 },
            { name: '#WiproDigital', mentions: 9800, growth: 22, sentiment: 74 }
        ]
    },

    // ========================================
    // API SIMULATION METHODS
    // ========================================

    // Get current selected brand
    currentBrand: 'apple',

    // Set active brand
    setActiveBrand(brandId) {
        if (this.brands[brandId]) {
            this.currentBrand = brandId;
            return this.brands[brandId];
        }
        return null;
    },

    // Get active brand data
    getActiveBrand() {
        return this.brands[this.currentBrand];
    },

    // Simulate API delay
    async delay(ms = 300) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    // ========================================
    // API ENDPOINTS (Simulated)
    // ========================================

    // GET /api/brands
    async getBrands() {
        await this.delay(200);
        return {
            success: true,
            data: Object.values(this.brands).map(b => ({
                id: b.id,
                name: b.name,
                logo: b.logo,
                industry: b.industry,
                color: b.color
            })),
            timestamp: new Date().toISOString()
        };
    },

    // GET /api/brands/:id
    async getBrandById(brandId) {
        await this.delay(150);
        const brand = this.brands[brandId];
        if (!brand) {
            return { success: false, error: 'Brand not found' };
        }
        return { success: true, data: brand, timestamp: new Date().toISOString() };
    },

    // GET /api/brands/:id/metrics
    async getBrandMetrics(brandId) {
        await this.delay(300);
        const brand = this.brands[brandId];
        if (!brand) {
            return { success: false, error: 'Brand not found' };
        }

        const metrics = brand.metrics;
        const variance = () => (Math.random() * 0.2 - 0.1); // ±10% variance

        return {
            success: true,
            data: {
                sentiment: Math.round(metrics.avgSentiment * (1 + variance())),
                mentions: Math.round(metrics.avgMentions * (1 + variance())),
                engagement: parseFloat((metrics.avgEngagement * (1 + variance())).toFixed(1)),
                reach: Math.round(metrics.avgReach * (1 + variance())),
                followers: metrics.baseFollowers,
                growth: parseFloat((metrics.growthRate * (1 + variance())).toFixed(1)),
                positive: Math.round(70 + Math.random() * 15),
                neutral: Math.round(15 + Math.random() * 10),
                negative: Math.round(5 + Math.random() * 10)
            },
            timestamp: new Date().toISOString()
        };
    },

    // GET /api/brands/:id/trending
    async getBrandTrending(brandId) {
        await this.delay(250);
        let trending = this.trendingByBrand[brandId];

        // Generate generic trending if brand not in predefined list
        if (!trending && this.brands[brandId]) {
            const brand = this.brands[brandId];
            trending = [
                { name: `#${brand.name.replace(/\s+/g, '')}`, mentions: 45000 + Math.floor(Math.random() * 50000), growth: 15 + Math.floor(Math.random() * 30), sentiment: 65 + Math.floor(Math.random() * 20) },
                { name: `#${brand.products[0]?.replace(/\s+/g, '') || 'Product'}`, mentions: 25000 + Math.floor(Math.random() * 30000), growth: 20 + Math.floor(Math.random() * 40), sentiment: 68 + Math.floor(Math.random() * 18) },
                { name: `#${this.industries[brand.industry]?.topHashtags?.[0] || '#Industry'}`, mentions: 35000 + Math.floor(Math.random() * 40000), growth: 10 + Math.floor(Math.random() * 25), sentiment: 70 + Math.floor(Math.random() * 15) },
                { name: `#${brand.name.replace(/\s+/g, '')}News`, mentions: 18000 + Math.floor(Math.random() * 20000), growth: 8 + Math.floor(Math.random() * 20), sentiment: 66 + Math.floor(Math.random() * 18) },
                { name: `#${brand.products[1]?.replace(/\s+/g, '') || 'Updates'}`, mentions: 15000 + Math.floor(Math.random() * 25000), growth: 12 + Math.floor(Math.random() * 35), sentiment: 72 + Math.floor(Math.random() * 14) },
                { name: `#${brand.name.charAt(0)}Innovation`, mentions: 12000 + Math.floor(Math.random() * 15000), growth: 25 + Math.floor(Math.random() * 30), sentiment: 74 + Math.floor(Math.random() * 12) }
            ];
        }

        if (!trending) {
            return { success: false, error: 'Brand not found' };
        }

        return {
            success: true,
            data: trending.map(t => ({
                ...t,
                mentions: Math.round(t.mentions * (0.9 + Math.random() * 0.2)),
                growth: Math.round(t.growth * (0.8 + Math.random() * 0.4))
            })),
            timestamp: new Date().toISOString()
        };
    },

    // GET /api/brands/:id/mentions
    async getBrandMentions(brandId, count = 10) {
        await this.delay(400);
        const brand = this.brands[brandId];
        if (!brand) {
            return { success: false, error: 'Brand not found' };
        }

        const industry = brand.industry;
        const templates = this.contentTemplates[industry] || this.contentTemplates.technology;
        const mentions = [];

        for (let i = 0; i < count; i++) {
            const sentimentType = Math.random() < 0.65 ? 'positive' : (Math.random() < 0.7 ? 'neutral' : 'negative');
            const contentList = templates[sentimentType];
            const product = brand.products[Math.floor(Math.random() * brand.products.length)];
            const feature = ['performance', 'design', 'quality', 'innovation', 'value'][Math.floor(Math.random() * 5)];

            let content = contentList[Math.floor(Math.random() * contentList.length)];
            content = content.replace(/{brand}/g, brand.name)
                           .replace(/{product}/g, product)
                           .replace(/{feature}/g, feature);

            mentions.push({
                id: `mention_${Date.now()}_${i}`,
                content,
                sentiment: sentimentType,
                sentimentScore: sentimentType === 'positive' ? 70 + Math.random() * 25 :
                               sentimentType === 'negative' ? 20 + Math.random() * 25 : 45 + Math.random() * 20,
                platform: ['twitter', 'reddit', 'youtube', 'linkedin', 'facebook', 'instagram'][Math.floor(Math.random() * 6)],
                author: this.generateAuthorName(),
                timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
                likes: Math.floor(Math.random() * 5000),
                comments: Math.floor(Math.random() * 500),
                shares: Math.floor(Math.random() * 1000),
                reach: Math.floor(Math.random() * 100000)
            });
        }

        return {
            success: true,
            data: mentions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)),
            timestamp: new Date().toISOString()
        };
    },

    // GET /api/brands/:id/influencers
    async getBrandInfluencers(brandId) {
        await this.delay(200);
        const brand = this.brands[brandId];
        if (!brand) {
            return { success: false, error: 'Brand not found' };
        }

        const industryInfluencers = this.influencers[brand.industry] || this.influencers.technology;
        return {
            success: true,
            data: industryInfluencers.map(inf => ({
                ...inf,
                recentMentions: Math.floor(Math.random() * 10) + 1,
                sentiment: 60 + Math.floor(Math.random() * 35)
            })),
            timestamp: new Date().toISOString()
        };
    },

    // GET /api/brands/:id/competitors
    async getBrandCompetitors(brandId) {
        await this.delay(300);
        const brand = this.brands[brandId];
        if (!brand) {
            return { success: false, error: 'Brand not found' };
        }

        const competitors = brand.competitors.map(compId => {
            const comp = this.brands[compId];
            if (comp) {
                return {
                    id: comp.id,
                    name: comp.name,
                    logo: comp.logo,
                    sentiment: Math.round(comp.metrics.avgSentiment * (0.9 + Math.random() * 0.2)),
                    mentions: Math.round(comp.metrics.avgMentions * (0.9 + Math.random() * 0.2)),
                    growth: parseFloat((comp.metrics.growthRate * (0.9 + Math.random() * 0.2)).toFixed(1))
                };
            }
            return null;
        }).filter(Boolean);

        return {
            success: true,
            data: competitors,
            timestamp: new Date().toISOString()
        };
    },

    // GET /api/industries
    async getIndustries() {
        await this.delay(150);
        return {
            success: true,
            data: Object.values(this.industries),
            timestamp: new Date().toISOString()
        };
    },

    // GET /api/products
    async getProducts(brandId = null) {
        await this.delay(200);
        let products = Object.values(this.products);
        if (brandId) {
            products = products.filter(p => p.brand === brandId);
        }
        return {
            success: true,
            data: products,
            timestamp: new Date().toISOString()
        };
    },

    // Helper: Generate random author name
    generateAuthorName() {
        const firstNames = ['Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Avery', 'Quinn', 'Jamie', 'Reese',
                          'Priya', 'Raj', 'Amit', 'Sarah', 'Michael', 'Emma', 'David', 'Sophie', 'James', 'Lisa'];
        const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Kumar', 'Patel',
                          'Chen', 'Wang', 'Singh', 'Kim', 'Tanaka', 'Mueller', 'Santos', 'Rossi', 'Martin', 'Thompson'];
        return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
    },

    // Generate daily data for charts
    generateDailyData(brandId, days = 30) {
        const brand = this.brands[brandId] || this.brands.apple;
        const data = [];
        const baseValue = brand.metrics.avgMentions / 30;

        let positiveWalk = 60 + Math.random() * 10;
        let negativeWalk = 15 + Math.random() * 5;

        for (let i = days; i > 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);

            // Add realistic variations
            const dayOfWeek = date.getDay();
            const weekendFactor = (dayOfWeek === 0 || dayOfWeek === 6) ? 0.7 : 1.1;
            const randomEvent = Math.random() < 0.1;

            // Random walk for sentiment
            positiveWalk += (Math.random() - 0.5) * 5;
            negativeWalk += (Math.random() - 0.5) * 3;
            positiveWalk = Math.max(45, Math.min(85, positiveWalk));
            negativeWalk = Math.max(5, Math.min(30, negativeWalk));

            if (randomEvent) {
                positiveWalk += (Math.random() > 0.5 ? 1 : -1) * 10;
            }

            const neutral = 100 - positiveWalk - negativeWalk;

            data.push({
                date: date.toISOString().split('T')[0],
                mentions: Math.round(baseValue * weekendFactor * (0.8 + Math.random() * 0.4)),
                positive: Math.round(positiveWalk),
                neutral: Math.round(neutral),
                negative: Math.round(negativeWalk),
                engagement: parseFloat((brand.metrics.avgEngagement * (0.8 + Math.random() * 0.4)).toFixed(1)),
                reach: Math.round((brand.metrics.avgReach / 30) * (0.7 + Math.random() * 0.6))
            });
        }

        return data;
    },

    // Generate hourly data for charts
    generateHourlyData(brandId) {
        const brand = this.brands[brandId] || this.brands.apple;
        const data = [];
        const platform = Object.values(MockData.platformConfig)[0];

        for (let hour = 0; hour < 24; hour++) {
            const isPeakHour = platform.peakHours.includes(hour);
            const baseMentions = brand.metrics.avgMentions / 720; // Per hour

            data.push({
                hour: `${hour.toString().padStart(2, '0')}:00`,
                mentions: Math.round(baseMentions * (isPeakHour ? 1.8 : 0.6) * (0.7 + Math.random() * 0.6)),
                sentiment: Math.round(brand.metrics.avgSentiment * (0.9 + Math.random() * 0.2))
            });
        }

        return data;
    }
};

// Make it globally available
if (typeof window !== 'undefined') {
    window.APIData = APIData;
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = APIData;
}

console.log('API Data Service Loaded - Brands:', Object.keys(APIData.brands).join(', '));
