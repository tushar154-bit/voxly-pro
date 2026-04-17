/**
 * Customer Journey Mapping Page
 * Visualize and analyze customer journey through stages
 */

class JourneyPage {
    constructor() {
        this.charts = {};
        this.currentBrand = null;
        this.selectedStage = null;
        this.selectedSegment = 'all';
        this.isAnimating = false;
        this.journeyData = null;
    }

    // Journey stages configuration
    getJourneyStages(brandId) {
        const seed = this.getBrandSeed(brandId);
        const baseCustomers = 80000 + Math.floor(this.seededRandom(seed) * 40000);

        return [
            {
                id: 'awareness',
                name: 'Awareness',
                icon: 'visibility',
                color: '#8b5cf6',
                customers: baseCustomers,
                dropoffRate: 0,
                sentiment: Math.round(68 + this.seededRandom(seed + 1) * 12),
                avgTime: (1.5 + this.seededRandom(seed + 2) * 2).toFixed(1) + ' days',
                topTouchpoints: ['Social Media', 'Ads', 'News'],
                keyMetrics: {
                    impressions: Math.round(baseCustomers * 25),
                    engagement: Math.round(baseCustomers * 0.45),
                    mentions: Math.round(baseCustomers * 0.12)
                }
            },
            {
                id: 'interest',
                name: 'Interest',
                icon: 'favorite_border',
                color: '#3b82f6',
                customers: Math.round(baseCustomers * (0.6 + this.seededRandom(seed + 3) * 0.1)),
                dropoffRate: 0,
                sentiment: Math.round(64 + this.seededRandom(seed + 4) * 10),
                avgTime: (3 + this.seededRandom(seed + 5) * 3).toFixed(1) + ' days',
                topTouchpoints: ['Website', 'Reviews', 'Social Media'],
                keyMetrics: {
                    pageViews: Math.round(baseCustomers * 1.8),
                    timeOnSite: '3:45',
                    downloads: Math.round(baseCustomers * 0.085)
                }
            },
            {
                id: 'consideration',
                name: 'Consideration',
                icon: 'psychology',
                color: '#06b6d4',
                customers: Math.round(baseCustomers * (0.38 + this.seededRandom(seed + 6) * 0.08)),
                dropoffRate: 0,
                sentiment: Math.round(60 + this.seededRandom(seed + 7) * 12),
                avgTime: (5 + this.seededRandom(seed + 8) * 4).toFixed(1) + ' days',
                topTouchpoints: ['Email', 'Support', 'Reviews'],
                keyMetrics: {
                    demoRequests: Math.round(baseCustomers * 0.032),
                    comparisons: Math.round(baseCustomers * 0.12),
                    inquiries: Math.round(baseCustomers * 0.056)
                }
            },
            {
                id: 'intent',
                name: 'Intent',
                icon: 'shopping_cart',
                color: '#10b981',
                customers: Math.round(baseCustomers * (0.25 + this.seededRandom(seed + 9) * 0.06)),
                dropoffRate: 0,
                sentiment: Math.round(70 + this.seededRandom(seed + 10) * 10),
                avgTime: (2.5 + this.seededRandom(seed + 11) * 2.5).toFixed(1) + ' days',
                topTouchpoints: ['Website', 'Sales', 'Email'],
                keyMetrics: {
                    cartAdds: Math.round(baseCustomers * 0.18),
                    quotes: Math.round(baseCustomers * 0.045),
                    trials: Math.round(baseCustomers * 0.082)
                }
            },
            {
                id: 'purchase',
                name: 'Purchase',
                icon: 'check_circle',
                color: '#f59e0b',
                customers: Math.round(baseCustomers * (0.16 + this.seededRandom(seed + 12) * 0.05)),
                dropoffRate: 0,
                sentiment: Math.round(78 + this.seededRandom(seed + 13) * 10),
                avgTime: (0.8 + this.seededRandom(seed + 14) * 0.8).toFixed(1) + ' days',
                topTouchpoints: ['Website', 'Sales', 'Support'],
                keyMetrics: {
                    conversions: 0,
                    revenue: 0,
                    avgOrderValue: Math.round(80 + this.seededRandom(seed + 15) * 120)
                }
            },
            {
                id: 'loyalty',
                name: 'Loyalty',
                icon: 'loyalty',
                color: '#ec4899',
                customers: Math.round(baseCustomers * (0.1 + this.seededRandom(seed + 16) * 0.04)),
                dropoffRate: 0,
                sentiment: Math.round(82 + this.seededRandom(seed + 17) * 12),
                avgTime: 'Ongoing',
                topTouchpoints: ['Support', 'Email', 'Social Media'],
                keyMetrics: {
                    repeatPurchases: 0,
                    referrals: 0,
                    nps: Math.round(60 + this.seededRandom(seed + 18) * 25)
                }
            }
        ];
    }

    getBrandSeed(brandId) {
        let hash = 0;
        const str = brandId || 'default';
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash);
    }

    seededRandom(seed) {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    }

    // Touchpoints data
    getTouchpoints(brandId) {
        const seed = this.getBrandSeed(brandId);
        return [
            {
                id: 'social_media',
                name: 'Social Media',
                icon: 'share',
                color: '#8b5cf6',
                impressions: Math.round(2000000 + this.seededRandom(seed + 20) * 1000000),
                engagement: Math.round(100000 + this.seededRandom(seed + 21) * 50000),
                conversions: Math.round(2500 + this.seededRandom(seed + 22) * 1500),
                sentiment: Math.round(68 + this.seededRandom(seed + 23) * 15),
                attribution: Math.round(25 + this.seededRandom(seed + 24) * 10)
            },
            {
                id: 'website',
                name: 'Website',
                icon: 'language',
                color: '#3b82f6',
                impressions: Math.round(800000 + this.seededRandom(seed + 25) * 400000),
                engagement: Math.round(350000 + this.seededRandom(seed + 26) * 150000),
                conversions: Math.round(7000 + this.seededRandom(seed + 27) * 3000),
                sentiment: Math.round(72 + this.seededRandom(seed + 28) * 12),
                attribution: Math.round(28 + this.seededRandom(seed + 29) * 10)
            },
            {
                id: 'email',
                name: 'Email',
                icon: 'email',
                color: '#10b981',
                impressions: Math.round(500000 + this.seededRandom(seed + 30) * 200000),
                engagement: Math.round(80000 + this.seededRandom(seed + 31) * 40000),
                conversions: Math.round(4000 + this.seededRandom(seed + 32) * 2000),
                sentiment: Math.round(70 + this.seededRandom(seed + 33) * 15),
                attribution: Math.round(18 + this.seededRandom(seed + 34) * 8)
            },
            {
                id: 'ads',
                name: 'Paid Ads',
                icon: 'campaign',
                color: '#f59e0b',
                impressions: Math.round(3000000 + this.seededRandom(seed + 35) * 1500000),
                engagement: Math.round(60000 + this.seededRandom(seed + 36) * 30000),
                conversions: Math.round(3000 + this.seededRandom(seed + 37) * 1500),
                sentiment: Math.round(62 + this.seededRandom(seed + 38) * 12),
                attribution: Math.round(15 + this.seededRandom(seed + 39) * 8)
            },
            {
                id: 'reviews',
                name: 'Reviews',
                icon: 'rate_review',
                color: '#ec4899',
                impressions: Math.round(200000 + this.seededRandom(seed + 40) * 100000),
                engagement: Math.round(25000 + this.seededRandom(seed + 41) * 15000),
                conversions: Math.round(1500 + this.seededRandom(seed + 42) * 800),
                sentiment: Math.round(65 + this.seededRandom(seed + 43) * 20),
                attribution: Math.round(8 + this.seededRandom(seed + 44) * 5)
            },
            {
                id: 'support',
                name: 'Support',
                icon: 'support_agent',
                color: '#06b6d4',
                impressions: Math.round(50000 + this.seededRandom(seed + 45) * 25000),
                engagement: Math.round(45000 + this.seededRandom(seed + 46) * 20000),
                conversions: Math.round(2000 + this.seededRandom(seed + 47) * 1000),
                sentiment: Math.round(75 + this.seededRandom(seed + 48) * 15),
                attribution: Math.round(6 + this.seededRandom(seed + 49) * 4)
            }
        ];
    }

    // Customer segments data
    getCustomerSegments(brandId) {
        const seed = this.getBrandSeed(brandId);
        return [
            {
                id: 'new_customers',
                name: 'New Customers',
                count: Math.round(7000 + this.seededRandom(seed + 50) * 3000),
                percentage: Math.round(42 + this.seededRandom(seed + 51) * 10),
                avgJourneyTime: (15 + this.seededRandom(seed + 52) * 8).toFixed(1) + ' days',
                conversionRate: (2.5 + this.seededRandom(seed + 53) * 2).toFixed(1),
                sentiment: Math.round(68 + this.seededRandom(seed + 54) * 10),
                topPath: ['Ads', 'Website', 'Trial', 'Purchase'],
                color: '#8b5cf6'
            },
            {
                id: 'returning',
                name: 'Returning',
                count: Math.round(5000 + this.seededRandom(seed + 55) * 2500),
                percentage: Math.round(30 + this.seededRandom(seed + 56) * 8),
                avgJourneyTime: (3 + this.seededRandom(seed + 57) * 3).toFixed(1) + ' days',
                conversionRate: (10 + this.seededRandom(seed + 58) * 5).toFixed(1),
                sentiment: Math.round(80 + this.seededRandom(seed + 59) * 10),
                topPath: ['Email', 'Website', 'Purchase'],
                color: '#10b981'
            },
            {
                id: 'high_value',
                name: 'High-Value',
                count: Math.round(2000 + this.seededRandom(seed + 60) * 1000),
                percentage: Math.round(12 + this.seededRandom(seed + 61) * 5),
                avgJourneyTime: (18 + this.seededRandom(seed + 62) * 8).toFixed(1) + ' days',
                conversionRate: (7 + this.seededRandom(seed + 63) * 4).toFixed(1),
                sentiment: Math.round(76 + this.seededRandom(seed + 64) * 12),
                topPath: ['Referral', 'Demo', 'Sales', 'Purchase'],
                color: '#f59e0b'
            },
            {
                id: 'at_risk',
                name: 'At-Risk',
                count: Math.round(1000 + this.seededRandom(seed + 65) * 800),
                percentage: Math.round(8 + this.seededRandom(seed + 66) * 4),
                avgJourneyTime: (25 + this.seededRandom(seed + 67) * 10).toFixed(1) + ' days',
                conversionRate: (1 + this.seededRandom(seed + 68) * 1.5).toFixed(1),
                sentiment: Math.round(55 + this.seededRandom(seed + 69) * 12),
                topPath: ['Search', 'Website', 'Abandon'],
                color: '#ef4444'
            }
        ];
    }

    // Top converting paths
    getTopPaths(brandId) {
        const seed = this.getBrandSeed(brandId);
        return [
            {
                path: ['Social Ads', 'Website', 'Demo', 'Sales Call', 'Purchase'],
                conversionRate: (3.5 + this.seededRandom(seed + 70) * 2).toFixed(1),
                avgTime: Math.round(10 + this.seededRandom(seed + 71) * 5) + ' days',
                customers: Math.round(2500 + this.seededRandom(seed + 72) * 1500)
            },
            {
                path: ['Search', 'Reviews', 'Website', 'Trial', 'Purchase'],
                conversionRate: (5 + this.seededRandom(seed + 73) * 3).toFixed(1),
                avgTime: Math.round(14 + this.seededRandom(seed + 74) * 6) + ' days',
                customers: Math.round(1800 + this.seededRandom(seed + 75) * 1200)
            },
            {
                path: ['Email', 'Website', 'Purchase'],
                conversionRate: (12 + this.seededRandom(seed + 76) * 5).toFixed(1),
                avgTime: Math.round(2 + this.seededRandom(seed + 77) * 2) + ' days',
                customers: Math.round(3200 + this.seededRandom(seed + 78) * 1800)
            },
            {
                path: ['Referral', 'Website', 'Demo', 'Purchase'],
                conversionRate: (8 + this.seededRandom(seed + 79) * 4).toFixed(1),
                avgTime: Math.round(7 + this.seededRandom(seed + 80) * 4) + ' days',
                customers: Math.round(1200 + this.seededRandom(seed + 81) * 800)
            }
        ];
    }

    loadJourneyData() {
        const currentBrandId = typeof APIData !== 'undefined' ? APIData.currentBrand : 'apple';
        this.currentBrand = currentBrandId;

        const stages = this.getJourneyStages(currentBrandId);

        // Calculate drop-off rates
        for (let i = 1; i < stages.length; i++) {
            stages[i].dropoffRate = Math.round((1 - stages[i].customers / stages[i - 1].customers) * 100);
        }

        // Set purchase stage metrics
        const purchaseStage = stages.find(s => s.id === 'purchase');
        if (purchaseStage) {
            purchaseStage.keyMetrics.conversions = purchaseStage.customers;
            purchaseStage.keyMetrics.revenue = purchaseStage.customers * purchaseStage.keyMetrics.avgOrderValue;
        }

        // Set loyalty stage metrics
        const loyaltyStage = stages.find(s => s.id === 'loyalty');
        if (loyaltyStage && purchaseStage) {
            loyaltyStage.keyMetrics.repeatPurchases = Math.round(loyaltyStage.customers * 0.35);
            loyaltyStage.keyMetrics.referrals = Math.round(loyaltyStage.customers * 0.15);
        }

        this.journeyData = {
            stages: stages,
            touchpoints: this.getTouchpoints(currentBrandId),
            segments: this.getCustomerSegments(currentBrandId),
            topPaths: this.getTopPaths(currentBrandId),
            sentimentJourney: {
                labels: stages.map(s => s.name),
                data: stages.map(s => s.sentiment),
                painPoints: [
                    { stage: 'Consideration', issue: 'Pricing Concerns', impact: 'Medium' },
                    { stage: 'Interest', issue: 'Feature Clarity', impact: 'Low' }
                ]
            }
        };
    }

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    render() {
        const currentBrandId = typeof APIData !== 'undefined' ? APIData.currentBrand : 'apple';
        const brand = typeof APIData !== 'undefined' ? APIData.brands[currentBrandId] : null;
        const brandName = brand ? brand.name : 'Your Brand';

        this.loadJourneyData();
        const stages = this.journeyData.stages;
        const touchpoints = this.journeyData.touchpoints;
        const segments = this.journeyData.segments;
        const topPaths = this.journeyData.topPaths;

        // Calculate summary metrics
        const totalCustomers = stages[0].customers;
        const conversions = stages[stages.length - 2].customers;
        const conversionRate = ((conversions / totalCustomers) * 100).toFixed(1);
        const avgDropoff = (stages.slice(1).reduce((sum, s) => sum + s.dropoffRate, 0) / (stages.length - 1)).toFixed(1);
        const avgSentiment = Math.round(stages.reduce((sum, s) => sum + s.sentiment, 0) / stages.length);

        return `
            <div class="journey-container">
                <!-- Page Header -->
                <div class="page-header journey-header">
                    <div class="page-header-left">
                        <h1 class="page-title">Customer Journey Mapping</h1>
                        <p class="page-subtitle">Track customer paths and optimize conversions for <strong>${brandName}</strong></p>
                    </div>
                    <div class="page-header-right">
                        <select class="form-select" id="segmentFilter">
                            <option value="all">All Customers</option>
                            <option value="new_customers">New Customers</option>
                            <option value="returning">Returning</option>
                            <option value="high_value">High-Value</option>
                            <option value="at_risk">At-Risk</option>
                        </select>
                        <button class="btn btn-outline" id="exportJourneyBtn">
                            <span class="material-icons" style="font-size: 18px; margin-right: 6px;">download</span>
                            Export Report
                        </button>
                    </div>
                </div>

                <!-- Key Metrics Dashboard -->
                <div class="stats-grid stats-grid-4">
                    <div class="stat-card journey-stat-card journey-purple">
                        <div class="journey-stat-bg">
                            <div class="journey-circle circle-1"></div>
                            <div class="journey-circle circle-2"></div>
                            <div class="journey-circle circle-3"></div>
                        </div>
                        <div class="stat-header">
                            <span class="stat-title">Total Reach</span>
                            <div class="stat-icon">
                                <span class="material-icons">visibility</span>
                            </div>
                        </div>
                        <div class="stat-value">${this.formatNumber(totalCustomers)}</div>
                        <div class="stat-change positive">
                            <span class="material-icons">trending_up</span>
                            +12.5% from last period
                        </div>
                    </div>

                    <div class="stat-card journey-stat-card journey-green">
                        <div class="journey-stat-bg">
                            <div class="journey-circle circle-1"></div>
                            <div class="journey-circle circle-2"></div>
                            <div class="journey-circle circle-3"></div>
                        </div>
                        <div class="stat-header">
                            <span class="stat-title">Conversion Rate</span>
                            <div class="stat-icon">
                                <span class="material-icons">check_circle</span>
                            </div>
                        </div>
                        <div class="stat-value">${conversionRate}%</div>
                        <div class="stat-change positive">
                            <span class="material-icons">trending_up</span>
                            +2.3% improvement
                        </div>
                    </div>

                    <div class="stat-card journey-stat-card journey-orange">
                        <div class="journey-stat-bg">
                            <div class="journey-circle circle-1"></div>
                            <div class="journey-circle circle-2"></div>
                            <div class="journey-circle circle-3"></div>
                        </div>
                        <div class="stat-header">
                            <span class="stat-title">Avg Drop-off</span>
                            <div class="stat-icon">
                                <span class="material-icons">trending_down</span>
                            </div>
                        </div>
                        <div class="stat-value">${avgDropoff}%</div>
                        <div class="stat-change negative">
                            <span class="material-icons">trending_down</span>
                            -1.8% (improving)
                        </div>
                    </div>

                    <div class="stat-card journey-stat-card journey-blue">
                        <div class="journey-stat-bg">
                            <div class="journey-circle circle-1"></div>
                            <div class="journey-circle circle-2"></div>
                            <div class="journey-circle circle-3"></div>
                        </div>
                        <div class="stat-header">
                            <span class="stat-title">Avg Sentiment</span>
                            <div class="stat-icon">
                                <span class="material-icons">mood</span>
                            </div>
                        </div>
                        <div class="stat-value">${avgSentiment}%</div>
                        <div class="stat-change positive">
                            <span class="material-icons">trending_up</span>
                            +4.2% satisfaction
                        </div>
                    </div>
                </div>

                <!-- Journey Funnel Visualization -->
                <div class="card journey-funnel-card">
                    <div class="card-header">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div class="card-header-icon" style="background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%); width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                                <span class="material-icons" style="color: white; font-size: 1.25rem;">route</span>
                            </div>
                            <div>
                                <h3 class="card-title" style="margin: 0;">Customer Journey Flow</h3>
                                <p class="card-subtitle" style="margin: 4px 0 0 0; font-size: 0.875rem; color: #6b7280;">Click on any stage for detailed breakdown</p>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="journey-funnel-container" id="journeyFunnel">
                            ${stages.map((stage, index) => {
                                const maxCustomers = stages[0].customers;
                                const widthPercent = (stage.customers / maxCustomers) * 100;
                                const nextStage = stages[index + 1];

                                return `
                                    <div class="funnel-stage" data-stage="${stage.id}" style="--stage-color: ${stage.color}">
                                        <div class="stage-bar" style="width: ${Math.max(widthPercent, 15)}%;">
                                            <div class="stage-content">
                                                <span class="material-icons">${stage.icon}</span>
                                                <span class="stage-name">${stage.name}</span>
                                                <span class="stage-count">${this.formatNumber(stage.customers)}</span>
                                            </div>
                                        </div>
                                        ${nextStage ? `
                                            <div class="stage-dropoff-indicator">
                                                <div class="dropoff-line"></div>
                                                <span class="dropoff-badge">-${nextStage.dropoffRate}%</span>
                                            </div>
                                        ` : ''}
                                        <div class="stage-sentiment">
                                            <span class="material-icons" style="font-size: 14px; color: ${stage.sentiment >= 70 ? '#10b981' : stage.sentiment >= 60 ? '#f59e0b' : '#ef4444'}">
                                                ${stage.sentiment >= 70 ? 'sentiment_satisfied' : stage.sentiment >= 60 ? 'sentiment_neutral' : 'sentiment_dissatisfied'}
                                            </span>
                                            <span>${stage.sentiment}%</span>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                </div>

                <!-- Two Column: Touchpoints + Sentiment Chart -->
                <div class="charts-grid-2">
                    <!-- Touchpoint Analysis -->
                    <div class="card">
                        <div class="card-header">
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <div class="card-header-icon" style="background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%); width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                                    <span class="material-icons" style="color: white; font-size: 1.25rem;">touch_app</span>
                                </div>
                                <h3 class="card-title" style="margin: 0;">Touchpoint Analysis</h3>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="touchpoint-grid" id="touchpointGrid">
                                ${touchpoints.map(tp => `
                                    <div class="touchpoint-card" style="--touchpoint-color: ${tp.color}">
                                        <div class="touchpoint-header">
                                            <div class="touchpoint-icon" style="background: linear-gradient(135deg, ${tp.color}, ${tp.color}dd);">
                                                <span class="material-icons">${tp.icon}</span>
                                            </div>
                                            <span class="touchpoint-name">${tp.name}</span>
                                        </div>
                                        <div class="touchpoint-metrics">
                                            <div class="touchpoint-metric">
                                                <span class="metric-label">Impressions</span>
                                                <span class="metric-value">${this.formatNumber(tp.impressions)}</span>
                                            </div>
                                            <div class="touchpoint-metric">
                                                <span class="metric-label">Conversions</span>
                                                <span class="metric-value">${this.formatNumber(tp.conversions)}</span>
                                            </div>
                                            <div class="touchpoint-metric">
                                                <span class="metric-label">Sentiment</span>
                                                <span class="metric-value" style="color: ${tp.sentiment >= 70 ? '#10b981' : '#f59e0b'}">${tp.sentiment}%</span>
                                            </div>
                                        </div>
                                        <div class="touchpoint-attribution">
                                            <span class="attribution-label">Attribution: ${tp.attribution}%</span>
                                            <div class="attribution-bar">
                                                <div class="attribution-fill" style="width: ${tp.attribution}%; background: ${tp.color};"></div>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>

                    <!-- Sentiment Journey Chart -->
                    <div class="card">
                        <div class="card-header">
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <div class="card-header-icon" style="background: linear-gradient(135deg, #10b981 0%, #34d399 100%); width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                                    <span class="material-icons" style="color: white; font-size: 1.25rem;">mood</span>
                                </div>
                                <h3 class="card-title" style="margin: 0;">Sentiment Through Journey</h3>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="chart-container" style="height: 280px;">
                                <canvas id="sentimentJourneyChart"></canvas>
                            </div>
                            <div class="pain-points-section">
                                <h4 style="font-size: 0.875rem; color: #374151; margin: 1rem 0 0.5rem 0;">
                                    <span class="material-icons" style="font-size: 16px; vertical-align: middle; color: #ef4444;">warning</span>
                                    Pain Points Identified
                                </h4>
                                <div class="pain-points-list">
                                    ${this.journeyData.sentimentJourney.painPoints.map(pp => `
                                        <div class="pain-point-item">
                                            <span class="pain-point-stage">${pp.stage}</span>
                                            <span class="pain-point-issue">${pp.issue}</span>
                                            <span class="pain-point-impact impact-${pp.impact.toLowerCase()}">${pp.impact}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Top Converting Paths -->
                <div class="card">
                    <div class="card-header">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div class="card-header-icon" style="background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%); width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                                <span class="material-icons" style="color: white; font-size: 1.25rem;">account_tree</span>
                            </div>
                            <div>
                                <h3 class="card-title" style="margin: 0;">Top Converting Paths</h3>
                                <p class="card-subtitle" style="margin: 4px 0 0 0; font-size: 0.875rem; color: #6b7280;">Most successful customer journeys to conversion</p>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="paths-list">
                            ${topPaths.map((path, index) => `
                                <div class="path-item ${index === 0 ? 'best-path' : ''}">
                                    <span class="path-rank">#${index + 1}</span>
                                    <div class="path-flow">
                                        ${path.path.map((step, i) => `
                                            <span class="path-step">${step}</span>
                                            ${i < path.path.length - 1 ? '<span class="path-arrow">→</span>' : ''}
                                        `).join('')}
                                    </div>
                                    <div class="path-metrics">
                                        <div class="path-metric">
                                            <span class="metric-value conversion">${path.conversionRate}%</span>
                                            <span class="metric-label">Conv. Rate</span>
                                        </div>
                                        <div class="path-metric">
                                            <span class="metric-value">${path.avgTime}</span>
                                            <span class="metric-label">Avg Time</span>
                                        </div>
                                        <div class="path-metric">
                                            <span class="metric-value">${this.formatNumber(path.customers)}</span>
                                            <span class="metric-label">Customers</span>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Customer Segments -->
                <div class="card">
                    <div class="card-header">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div class="card-header-icon" style="background: linear-gradient(135deg, #ec4899 0%, #f472b6 100%); width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                                <span class="material-icons" style="color: white; font-size: 1.25rem;">groups</span>
                            </div>
                            <div>
                                <h3 class="card-title" style="margin: 0;">Customer Segments</h3>
                                <p class="card-subtitle" style="margin: 4px 0 0 0; font-size: 0.875rem; color: #6b7280;">Journey patterns by customer type</p>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="segments-grid">
                            ${segments.map(segment => `
                                <div class="segment-card" style="--segment-color: ${segment.color}">
                                    <div class="segment-header">
                                        <div class="segment-info">
                                            <span class="segment-name">${segment.name}</span>
                                            <span class="segment-count">${this.formatNumber(segment.count)} customers</span>
                                        </div>
                                        <span class="segment-percentage" style="background: ${segment.color}20; color: ${segment.color}">${segment.percentage}%</span>
                                    </div>
                                    <div class="segment-metrics">
                                        <div class="segment-metric">
                                            <span class="metric-value">${segment.avgJourneyTime}</span>
                                            <span class="metric-label">Avg Journey</span>
                                        </div>
                                        <div class="segment-metric">
                                            <span class="metric-value" style="color: #10b981">${segment.conversionRate}%</span>
                                            <span class="metric-label">Conversion</span>
                                        </div>
                                        <div class="segment-metric">
                                            <span class="metric-value" style="color: ${segment.sentiment >= 70 ? '#10b981' : segment.sentiment >= 60 ? '#f59e0b' : '#ef4444'}">${segment.sentiment}%</span>
                                            <span class="metric-label">Sentiment</span>
                                        </div>
                                    </div>
                                    <div class="segment-path">
                                        <span class="path-label">Top Path:</span>
                                        <div class="segment-path-flow">
                                            ${segment.topPath.map((step, i) => `
                                                <span class="mini-step" style="background: ${segment.color}">${step}</span>
                                                ${i < segment.topPath.length - 1 ? '<span class="mini-arrow">→</span>' : ''}
                                            `).join('')}
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Stage Detail Modal -->
                <div class="modal-overlay" id="stageModal" style="display: none;">
                    <div class="modal-content stage-detail-modal">
                        <div class="modal-header">
                            <h3 id="stageModalTitle">Stage Details</h3>
                            <button class="modal-close" id="closeStageModal">
                                <span class="material-icons">close</span>
                            </button>
                        </div>
                        <div class="modal-body" id="stageModalContent"></div>
                    </div>
                </div>
            </div>
        `;
    }

    init() {
        this.loadJourneyData();
        this.initSentimentChart();
        this.setupEventListeners();
        this.animateFunnel();

        // Phase 4: hydrate from the live backend API (non-blocking fallback to mock).
        this.loadLiveData();
    }

    async loadLiveData() {
        if (typeof window.API === 'undefined') return;
        const slug = (typeof APIData !== 'undefined' ? APIData.currentBrand : null) || 'apple';
        try {
            const payload = await window.API.journey.get(slug);
            this.liveJourney = payload;
            this.applyLiveJourney(payload);
            console.log('✓ Journey hydrated from API');
        } catch (err) {
            console.warn('Journey live data unavailable, using mock fallback:', err.message);
        }
    }

    applyLiveJourney(payload) {
        const stages = payload?.stages;
        if (!Array.isArray(stages) || !stages.length) return;

        const fmt = (n) => {
            if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
            if (n >= 1_000)     return (n / 1_000).toFixed(1) + 'K';
            return String(n);
        };

        const funnelItems = document.querySelectorAll('.funnel-stage, [data-stage]');
        stages.forEach((s, idx) => {
            const container = funnelItems[idx];
            if (!container) return;
            const countEl = container.querySelector('.stage-count, .funnel-count, [data-role="count"]');
            const convEl  = container.querySelector('.stage-conversion, [data-role="conversion"]');
            const sentEl  = container.querySelector('.stage-sentiment, [data-role="sentiment"]');
            if (countEl) countEl.textContent = fmt(s.customers);
            if (convEl)  convEl.textContent  = s.conversionRate.toFixed(1) + '%';
            if (sentEl)  sentEl.textContent  = s.sentiment + '/100';
        });
    }

    initSentimentChart() {
        const ctx = document.getElementById('sentimentJourneyChart');
        if (!ctx) return;

        const data = this.journeyData.sentimentJourney;

        // Create gradient
        const canvas = ctx.getContext('2d');
        const gradient = canvas.createLinearGradient(0, 0, 0, 280);
        gradient.addColorStop(0, 'rgba(139, 92, 246, 0.3)');
        gradient.addColorStop(1, 'rgba(139, 92, 246, 0.02)');

        this.charts.sentimentJourney = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Sentiment Score',
                    data: data.data,
                    borderColor: '#8b5cf6',
                    backgroundColor: gradient,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 6,
                    pointBackgroundColor: data.data.map((val, i) => {
                        const stage = data.labels[i];
                        const isPainPoint = data.painPoints.some(pp => pp.stage === stage);
                        return isPainPoint ? '#ef4444' : '#fff';
                    }),
                    pointBorderColor: data.data.map((val, i) => {
                        const stage = data.labels[i];
                        const isPainPoint = data.painPoints.some(pp => pp.stage === stage);
                        return isPainPoint ? '#ef4444' : '#8b5cf6';
                    }),
                    pointBorderWidth: 3,
                    pointHoverRadius: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        titleColor: '#1f2937',
                        bodyColor: '#4b5563',
                        borderColor: '#e5e7eb',
                        borderWidth: 1,
                        padding: 12,
                        displayColors: false,
                        callbacks: {
                            title: (items) => items[0].label + ' Stage',
                            label: (context) => `Sentiment: ${context.parsed.y}%`,
                            afterLabel: (context) => {
                                const stage = context.label;
                                const painPoint = data.painPoints.find(pp => pp.stage === stage);
                                return painPoint ? `⚠️ ${painPoint.issue}` : '';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        min: 50,
                        max: 100,
                        grid: { color: 'rgba(0, 0, 0, 0.05)' },
                        ticks: {
                            callback: v => v + '%',
                            font: { size: 11 }
                        }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { font: { size: 11 } }
                    }
                }
            }
        });
    }

    animateFunnel() {
        const stages = document.querySelectorAll('.funnel-stage');
        stages.forEach((stage, index) => {
            stage.style.opacity = '0';
            stage.style.transform = 'translateX(-20px)';

            setTimeout(() => {
                stage.style.transition = 'all 0.5s ease';
                stage.style.opacity = '1';
                stage.style.transform = 'translateX(0)';
            }, index * 100);
        });
    }

    setupEventListeners() {
        // Stage click handlers
        document.querySelectorAll('.funnel-stage').forEach(stage => {
            stage.addEventListener('click', () => {
                this.showStageDetails(stage.dataset.stage);
            });
        });

        // Close modal
        const closeBtn = document.getElementById('closeStageModal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeStageModal());
        }

        const modal = document.getElementById('stageModal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.closeStageModal();
            });
        }

        // Segment filter
        const segmentFilter = document.getElementById('segmentFilter');
        if (segmentFilter) {
            segmentFilter.addEventListener('change', (e) => {
                this.filterBySegment(e.target.value);
            });
        }

        // Export button
        const exportBtn = document.getElementById('exportJourneyBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportReport());
        }
    }

    showStageDetails(stageId) {
        const stage = this.journeyData.stages.find(s => s.id === stageId);
        if (!stage) return;

        const modal = document.getElementById('stageModal');
        const title = document.getElementById('stageModalTitle');
        const content = document.getElementById('stageModalContent');

        title.textContent = stage.name + ' Stage';

        content.innerHTML = `
            <div class="stage-detail-header" style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
                <div style="width: 60px; height: 60px; border-radius: 16px; background: linear-gradient(135deg, ${stage.color}, ${stage.color}dd); display: flex; align-items: center; justify-content: center;">
                    <span class="material-icons" style="color: white; font-size: 2rem;">${stage.icon}</span>
                </div>
                <div>
                    <h4 style="margin: 0; font-size: 1.25rem;">${this.formatNumber(stage.customers)} Customers</h4>
                    <p style="margin: 4px 0 0 0; color: #6b7280;">Avg. Time: ${stage.avgTime}</p>
                </div>
            </div>

            <div class="stage-metrics-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.5rem;">
                <div style="text-align: center; padding: 1rem; background: #f8fafc; border-radius: 12px;">
                    <div style="font-size: 1.5rem; font-weight: 700; color: ${stage.sentiment >= 70 ? '#10b981' : '#f59e0b'}">${stage.sentiment}%</div>
                    <div style="font-size: 0.75rem; color: #6b7280; margin-top: 4px;">Sentiment</div>
                </div>
                <div style="text-align: center; padding: 1rem; background: #f8fafc; border-radius: 12px;">
                    <div style="font-size: 1.5rem; font-weight: 700; color: #ef4444">${stage.dropoffRate}%</div>
                    <div style="font-size: 0.75rem; color: #6b7280; margin-top: 4px;">Drop-off</div>
                </div>
                <div style="text-align: center; padding: 1rem; background: #f8fafc; border-radius: 12px;">
                    <div style="font-size: 1.5rem; font-weight: 700; color: #3b82f6">${stage.avgTime}</div>
                    <div style="font-size: 0.75rem; color: #6b7280; margin-top: 4px;">Avg Time</div>
                </div>
            </div>

            <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: #374151;">Top Touchpoints</h4>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
                ${stage.topTouchpoints.map(tp => `
                    <span style="padding: 0.375rem 0.75rem; background: ${stage.color}20; color: ${stage.color}; border-radius: 100px; font-size: 0.8125rem; font-weight: 500;">${tp}</span>
                `).join('')}
            </div>

            <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: #374151;">Key Metrics</h4>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem;">
                ${Object.entries(stage.keyMetrics).map(([key, value]) => `
                    <div style="display: flex; justify-content: space-between; padding: 0.75rem; background: #f8fafc; border-radius: 8px;">
                        <span style="color: #6b7280; font-size: 0.8125rem;">${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                        <span style="font-weight: 600; color: #1f2937;">${typeof value === 'number' ? this.formatNumber(value) : value}</span>
                    </div>
                `).join('')}
            </div>
        `;

        modal.style.display = 'flex';
    }

    closeStageModal() {
        const modal = document.getElementById('stageModal');
        if (modal) modal.style.display = 'none';
    }

    filterBySegment(segmentId) {
        // Visual feedback - highlight the selected segment card
        document.querySelectorAll('.segment-card').forEach(card => {
            card.classList.remove('selected');
        });

        if (segmentId !== 'all') {
            const segment = this.journeyData.segments.find(s => s.id === segmentId);
            if (segment) {
                // Could update funnel visualization based on segment
                // For now, just add visual selection
            }
        }
    }

    exportReport() {
        const data = {
            brand: this.currentBrand,
            exportDate: new Date().toISOString(),
            journeyStages: this.journeyData.stages,
            touchpoints: this.journeyData.touchpoints,
            segments: this.journeyData.segments,
            topPaths: this.journeyData.topPaths
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `journey-report-${this.currentBrand}-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    destroy() {
        // Cleanup charts
        Object.values(this.charts).forEach(chart => {
            if (chart && typeof chart.destroy === 'function') {
                chart.destroy();
            }
        });
        this.charts = {};
    }
}

// Create singleton instance
const Journey = new JourneyPage();

// Export for browser
if (typeof window !== 'undefined') {
    window.Journey = Journey;
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Journey;
}
