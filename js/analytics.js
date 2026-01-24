/**
 * Analytics Page
 * Advanced analytics with custom date ranges and deep insights
 */

class AnalyticsPage {
    constructor() {
        this.dateRange = 'last30days';
        this.selectedMetric = 'sentiment';
        this.currentBrand = null;
        this.isAnimating = false;
        this.brandData = null;
        this.currentData = null;

        // Base analytics data (for 30 days as reference)
        this.baseData = {
            mentions: 245800,
            sentiment: 76.2,
            authors: 12400,
            engagement: 9.2,
            reach: 3200000,
            keywords: [
                { word: 'innovation', count: 3420, sentiment: 85 },
                { word: 'quality', count: 2890, sentiment: 78 },
                { word: 'support', count: 2340, sentiment: 82 },
                { word: 'features', count: 1980, sentiment: 76 },
                { word: 'price', count: 1560, sentiment: 65 },
                { word: 'service', count: 1340, sentiment: 88 },
                { word: 'update', count: 1120, sentiment: 72 },
                { word: 'design', count: 980, sentiment: 90 }
            ],
            platforms: [
                { platform: 'Twitter', mentions: 102453, sentiment: 75, engagement: 8.5, reach: 1250000, growth: 18 },
                { platform: 'Instagram', mentions: 89720, sentiment: 81, engagement: 14.2, reach: 1180000, growth: 28 },
                { platform: 'Reddit', mentions: 62890, sentiment: 68, engagement: 12.3, reach: 850000, growth: 24 },
                { platform: 'YouTube', mentions: 45120, sentiment: 82, engagement: 15.7, reach: 620000, growth: 12 },
                { platform: 'LinkedIn', mentions: 22340, sentiment: 79, engagement: 6.8, reach: 380000, growth: 31 },
                { platform: 'Facebook', mentions: 12997, sentiment: 71, engagement: 9.2, reach: 290000, growth: 8 }
            ]
        };
    }

    // Get multiplier based on selected date range
    getDateRangeMultiplier() {
        switch (this.dateRange) {
            case 'last7days': return 0.25;
            case 'last30days': return 1;
            case 'last90days': return 2.8;
            case 'thisMonth': return 0.9;
            case 'lastMonth': return 1.1;
            case 'custom': return 1;
            default: return 1;
        }
    }

    // Get date range label for display
    getDateRangeLabel() {
        switch (this.dateRange) {
            case 'last7days': return 'Last 7 Days';
            case 'last30days': return 'Last 30 Days';
            case 'last90days': return 'Last 90 Days';
            case 'thisMonth': return 'This Month';
            case 'lastMonth': return 'Last Month';
            case 'custom': return 'Custom Range';
            default: return 'Last 30 Days';
        }
    }

    // Calculate adjusted data based on date range
    getAdjustedData() {
        const multiplier = this.getDateRangeMultiplier();
        const variance = () => 0.9 + Math.random() * 0.2; // Add some variance

        return {
            mentions: Math.round(this.baseData.mentions * multiplier * variance()),
            sentiment: Math.round((this.baseData.sentiment + (Math.random() - 0.5) * 8) * 10) / 10,
            authors: Math.round(this.baseData.authors * multiplier * variance()),
            engagement: Math.round((this.baseData.engagement + (Math.random() - 0.5) * 2) * 10) / 10,
            reach: Math.round(this.baseData.reach * multiplier * variance()),
            keywords: this.baseData.keywords.map(kw => ({
                ...kw,
                count: Math.round(kw.count * multiplier * variance()),
                sentiment: Math.min(100, Math.max(40, Math.round(kw.sentiment + (Math.random() - 0.5) * 10)))
            })),
            platforms: this.baseData.platforms.map(p => ({
                ...p,
                mentions: Math.round(p.mentions * multiplier * variance()),
                sentiment: Math.min(100, Math.max(40, Math.round(p.sentiment + (Math.random() - 0.5) * 8))),
                engagement: Math.round((p.engagement + (Math.random() - 0.5) * 2) * 10) / 10,
                reach: Math.round(p.reach * multiplier * variance()),
                growth: Math.round(p.growth * (multiplier > 1 ? 0.7 : multiplier < 1 ? 1.5 : 1) * variance())
            }))
        };
    }

    render() {
        // Get current brand info
        const currentBrandId = typeof APIData !== 'undefined' ? APIData.currentBrand : 'apple';
        const brand = typeof APIData !== 'undefined' ? APIData.brands[currentBrandId] : null;
        const brandName = brand ? brand.name : 'Your Brand';

        return `
            <div class="analytics-container">
                <!-- Combined Header & Key Metrics -->
                <div class="analytics-hero-section">
                    <div class="analytics-hero-header">
                        <div class="page-header-left">
                            <h1 class="page-title">Advanced Analytics</h1>
                            <p class="page-subtitle">Deep insights for <strong>${brandName}</strong></p>
                        </div>
                        <div class="page-header-right">
                            <select id="dateRangeSelect" class="form-select">
                                <option value="last7days">Last 7 Days</option>
                                <option value="last30days" selected>Last 30 Days</option>
                                <option value="last90days">Last 90 Days</option>
                                <option value="thisMonth">This Month</option>
                                <option value="lastMonth">Last Month</option>
                                <option value="custom">Custom Range</option>
                            </select>
                            <button class="btn btn-primary" id="exportAnalyticsBtn">
                                <i class="fas fa-file-export"></i>
                                <span>Export Report</span>
                            </button>
                        </div>
                    </div>

                    <!-- Key Metrics -->
                    <div class="stats-grid stats-grid-5">
                        <div class="stat-card analytics-card analytics-purple">
                            <div class="stat-card-bg">
                                <div class="stat-bg-shape shape-1"></div>
                                <div class="stat-bg-shape shape-2"></div>
                                <div class="stat-bg-shape shape-3"></div>
                            </div>
                            <div class="stat-icon-large">
                                <div class="icon-pulse-wrapper">
                                    <span class="pulse-ring"></span>
                                    <span class="pulse-ring delay-1"></span>
                                    <span class="material-icons">analytics</span>
                                </div>
                            </div>
                            <div class="stat-label">Total Mentions</div>
                            <div class="stat-value">245.8K</div>
                            <div class="stat-change positive">+18.5% vs prev period</div>
                        </div>

                        <div class="stat-card analytics-card analytics-green">
                            <div class="stat-card-bg">
                                <div class="stat-bg-shape shape-1"></div>
                                <div class="stat-bg-shape shape-2"></div>
                                <div class="stat-bg-shape shape-3"></div>
                            </div>
                            <div class="stat-icon-large">
                                <div class="icon-pulse-wrapper">
                                    <span class="pulse-ring"></span>
                                    <span class="pulse-ring delay-1"></span>
                                    <span class="material-icons">visibility</span>
                                </div>
                            </div>
                            <div class="stat-label">Brand Awareness Score</div>
                            <div class="stat-value">8.4<span style="font-size: 0.6em;">/10</span></div>
                            <div class="stat-change positive">+0.6 vs prev period</div>
                        </div>

                        <div class="stat-card analytics-card analytics-cyan">
                            <div class="stat-card-bg">
                                <div class="stat-bg-shape shape-1"></div>
                                <div class="stat-bg-shape shape-2"></div>
                                <div class="stat-bg-shape shape-3"></div>
                            </div>
                            <div class="stat-icon-large">
                                <div class="icon-pulse-wrapper">
                                    <span class="pulse-ring"></span>
                                    <span class="pulse-ring delay-1"></span>
                                    <span class="material-icons">groups</span>
                                </div>
                            </div>
                            <div class="stat-label">Unique Authors</div>
                            <div class="stat-value">12.4K</div>
                            <div class="stat-change positive">+22.1% vs prev period</div>
                        </div>

                        <div class="stat-card analytics-card analytics-orange">
                            <div class="stat-card-bg">
                                <div class="stat-bg-shape shape-1"></div>
                                <div class="stat-bg-shape shape-2"></div>
                                <div class="stat-bg-shape shape-3"></div>
                            </div>
                            <div class="stat-icon-large">
                                <div class="icon-pulse-wrapper">
                                    <span class="pulse-ring"></span>
                                    <span class="pulse-ring delay-1"></span>
                                    <span class="material-icons">show_chart</span>
                                </div>
                            </div>
                            <div class="stat-label">Engagement Rate</div>
                            <div class="stat-value">9.2%</div>
                            <div class="stat-change positive">+1.8% vs prev period</div>
                        </div>

                        <div class="stat-card analytics-card analytics-pink">
                            <div class="stat-card-bg">
                                <div class="stat-bg-shape shape-1"></div>
                                <div class="stat-bg-shape shape-2"></div>
                                <div class="stat-bg-shape shape-3"></div>
                            </div>
                            <div class="stat-icon-large">
                                <div class="icon-pulse-wrapper">
                                    <span class="pulse-ring"></span>
                                    <span class="pulse-ring delay-1"></span>
                                    <span class="material-icons">cell_tower</span>
                                </div>
                            </div>
                            <div class="stat-label">Reach</div>
                            <div class="stat-value">3.2M</div>
                            <div class="stat-change positive">+45.6% vs prev period</div>
                        </div>
                    </div>
                </div>

                <!-- Analytics Tabs -->
                <div class="card analytics-tabs-card">
                    <div class="card-header">
                        <div class="tabs analytics-tabs" id="analyticsTabs">
                            <button class="tab active" data-tab="overview">
                                <i class="fas fa-chart-pie"></i>
                                <span>Overview</span>
                            </button>
                            <button class="tab" data-tab="sentiment">
                                <i class="fas fa-smile"></i>
                                <span>Sentiment</span>
                            </button>
                            <button class="tab" data-tab="engagement">
                                <i class="fas fa-heart"></i>
                                <span>Engagement</span>
                            </button>
                            <button class="tab" data-tab="demographics">
                                <i class="fas fa-users"></i>
                                <span>Demographics</span>
                            </button>
                            <button class="tab" data-tab="performance">
                                <i class="fas fa-rocket"></i>
                                <span>Performance</span>
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="tab-content" id="analyticsTabContent">
                            <!-- Content will be populated by JS -->
                        </div>
                    </div>
                </div>

                <!-- Charts Grid -->
                <div class="charts-grid-2">
                    <!-- Sentiment Breakdown -->
                    <div class="card sentiment-breakdown-card">
                        <div class="card-header">
                            <h3 class="card-title"><span class="material-icons" style="color: #8b5cf6; vertical-align: middle; margin-right: 8px;">pie_chart</span>Sentiment Breakdown</h3>
                            <div class="card-actions">
                                <select class="activity-period-filter" id="sentimentPeriodFilter">
                                    <option value="7d">Last 7 Days</option>
                                    <option value="14d">Last 14 Days</option>
                                    <option value="30d">Last 30 Days</option>
                                    <option value="90d">Last 90 Days</option>
                                </select>
                                <button class="btn btn-sm btn-secondary">
                                    <i class="fas fa-download"></i>
                                </button>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="chart-container" style="height: 300px;">
                                <canvas id="sentimentBreakdownChart"></canvas>
                            </div>
                        </div>
                    </div>

                    <!-- Platform Performance -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title"><span class="material-icons" style="color: #8b5cf6; vertical-align: middle; margin-right: 8px;">bar_chart</span>Platform Performance</h3>
                            <div class="card-actions">
                                <button class="btn btn-sm btn-secondary">
                                    <i class="fas fa-download"></i>
                                </button>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="chart-container" style="height: 300px;">
                                <canvas id="platformPerformanceChart"></canvas>
                            </div>
                        </div>
                    </div>

                    <!-- Hourly Activity -->
                    <div class="card activity-by-hour-card">
                        <div class="card-header">
                            <h3 class="card-title"><span class="material-icons" style="color: #8b5cf6; vertical-align: middle; margin-right: 8px;">schedule</span>Activity by Hour</h3>
                            <div class="card-actions">
                                <select class="activity-period-filter" id="activityPeriodFilter">
                                    <option value="7d">Last 7 Days</option>
                                    <option value="14d">Last 14 Days</option>
                                    <option value="30d">Last 30 Days</option>
                                    <option value="90d">Last 90 Days</option>
                                </select>
                                <button class="btn btn-sm btn-secondary">
                                    <i class="fas fa-download"></i>
                                </button>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="chart-container" style="height: 300px;">
                                <canvas id="hourlyActivityChart"></canvas>
                            </div>

                            <!-- Activity Stats Summary -->
                            <div class="activity-summary-grid" id="activitySummaryGrid">
                                <div class="activity-summary-card peak-hour">
                                    <div class="activity-summary-icon">
                                        <span class="material-icons">trending_up</span>
                                    </div>
                                    <div class="activity-summary-content">
                                        <span class="activity-summary-label">Peak Hour</span>
                                        <span class="activity-summary-value" id="peakHourValue">2:00 PM</span>
                                        <span class="activity-summary-change positive">+24% engagement</span>
                                    </div>
                                </div>
                                <div class="activity-summary-card total-engagement">
                                    <div class="activity-summary-icon">
                                        <span class="material-icons">favorite</span>
                                    </div>
                                    <div class="activity-summary-content">
                                        <span class="activity-summary-label">Total Engagement</span>
                                        <span class="activity-summary-value" id="totalEngagementValue">48.2K</span>
                                        <span class="activity-summary-change positive">+12% vs last week</span>
                                    </div>
                                </div>
                                <div class="activity-summary-card avg-activity">
                                    <div class="activity-summary-icon">
                                        <span class="material-icons">analytics</span>
                                    </div>
                                    <div class="activity-summary-content">
                                        <span class="activity-summary-label">Avg Daily Activity</span>
                                        <span class="activity-summary-value" id="avgActivityValue">6.9K</span>
                                        <span class="activity-summary-change positive">+8% growth</span>
                                    </div>
                                </div>
                                <div class="activity-summary-card best-day">
                                    <div class="activity-summary-icon">
                                        <span class="material-icons">star</span>
                                    </div>
                                    <div class="activity-summary-content">
                                        <span class="activity-summary-label">Best Day</span>
                                        <span class="activity-summary-value" id="bestDayValue">Tuesday</span>
                                        <span class="activity-summary-change">9.2K interactions</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Engagement Breakdown -->
                            <div class="engagement-breakdown" id="engagementBreakdown">
                                <h4 class="breakdown-title">
                                    <span class="material-icons" style="color: #8b5cf6; font-size: 18px; vertical-align: middle; margin-right: 6px;">donut_small</span>
                                    Engagement Breakdown
                                </h4>
                                <div class="breakdown-bars">
                                    <div class="breakdown-item">
                                        <div class="breakdown-label">
                                            <span class="breakdown-dot likes"></span>
                                            <span>Likes</span>
                                        </div>
                                        <div class="breakdown-bar-container">
                                            <div class="breakdown-bar likes" style="width: 60%;"></div>
                                        </div>
                                        <span class="breakdown-value">28.9K</span>
                                        <span class="breakdown-percent">60%</span>
                                    </div>
                                    <div class="breakdown-item">
                                        <div class="breakdown-label">
                                            <span class="breakdown-dot comments"></span>
                                            <span>Comments</span>
                                        </div>
                                        <div class="breakdown-bar-container">
                                            <div class="breakdown-bar comments" style="width: 25%;"></div>
                                        </div>
                                        <span class="breakdown-value">12.1K</span>
                                        <span class="breakdown-percent">25%</span>
                                    </div>
                                    <div class="breakdown-item">
                                        <div class="breakdown-label">
                                            <span class="breakdown-dot shares"></span>
                                            <span>Shares</span>
                                        </div>
                                        <div class="breakdown-bar-container">
                                            <div class="breakdown-bar shares" style="width: 15%;"></div>
                                        </div>
                                        <span class="breakdown-value">7.2K</span>
                                        <span class="breakdown-percent">15%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Top Keywords -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title"><span class="material-icons" style="color: #8b5cf6; vertical-align: middle; margin-right: 8px;">manage_search</span>Top Keywords</h3>
                            <div class="card-actions">
                                <button class="btn btn-sm btn-secondary">
                                    <i class="fas fa-download"></i>
                                </button>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="keyword-list" id="keywordList">
                                <!-- Keywords populated by JS -->
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Detailed Table -->
                <div class="card detailed-metrics-card">
                    <div class="card-header">
                        <h3 class="card-title"><span class="material-icons" style="color: #8b5cf6; vertical-align: middle; margin-right: 8px;">table_chart</span>Detailed Metrics</h3>
                        <div class="card-actions metrics-actions">
                            <select class="form-select platform-select" id="platformFilter">
                                <option value="all">All Platforms</option>
                                <option value="twitter">Twitter</option>
                                <option value="instagram">Instagram</option>
                                <option value="reddit">Reddit</option>
                                <option value="youtube">YouTube</option>
                                <option value="linkedin">LinkedIn</option>
                                <option value="facebook">Facebook</option>
                            </select>
                            <button class="btn btn-sm btn-secondary export-metrics-btn" id="exportMetricsBtn">
                                <i class="fas fa-download"></i> Export
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="table-container metrics-table-container">
                            <table class="table metrics-table">
                                <colgroup>
                                    <col style="width: 16%;">
                                    <col style="width: 16%;">
                                    <col style="width: 17%;">
                                    <col style="width: 17%;">
                                    <col style="width: 17%;">
                                    <col style="width: 17%;">
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>Platform</th>
                                        <th>Mentions</th>
                                        <th>Sentiment</th>
                                        <th>Engagement</th>
                                        <th>Reach</th>
                                        <th>Growth</th>
                                    </tr>
                                </thead>
                                <tbody id="metricsTableBody">
                                    <!-- Populated by JS -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    init() {
        this.currentBrand = typeof APIData !== 'undefined' ? APIData.currentBrand : 'apple';
        this.loadBrandData();

        // Initialize current data based on default date range
        this.currentData = this.getAdjustedData();

        this.setupTabs();
        this.loadOverviewTab();
        this.initializeCharts();
        this.loadKeywordsWithData();
        this.loadMetricsTableWithData();
        this.setupEventListeners();
        this.updateStatsCardsWithData();
    }

    loadBrandData() {
        const brand = typeof APIData !== 'undefined' ? APIData.brands[this.currentBrand] : null;
        if (brand) {
            const metrics = brand.metrics;
            this.brandData = {
                mentions: Math.round(metrics.avgMentions * (0.9 + Math.random() * 0.2)),
                sentiment: Math.round(metrics.avgSentiment * (0.95 + Math.random() * 0.1)),
                engagement: parseFloat((metrics.avgEngagement * (0.9 + Math.random() * 0.2)).toFixed(1)),
                reach: Math.round(metrics.avgReach * (0.9 + Math.random() * 0.2)),
                followers: Math.round(metrics.baseFollowers * (0.95 + Math.random() * 0.1)),
                growth: parseFloat((metrics.growthRate * (0.9 + Math.random() * 0.2)).toFixed(1))
            };
        }
    }

    updateStatsCards() {
        if (!this.brandData) return;

        const formatNum = (n) => {
            if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
            if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
            return n.toString();
        };

        // Update stat cards with brand-specific data
        const statCards = document.querySelectorAll('.stat-card');
        if (statCards.length >= 5) {
            const values = statCards[0].querySelector('.stat-value');
            if (values) values.textContent = formatNum(this.brandData.mentions);

            const awareness = statCards[1].querySelector('.stat-value');
            if (awareness) awareness.innerHTML = (this.brandData.sentiment / 10).toFixed(1) + '<span style="font-size: 0.6em;">/10</span>';

            const authors = statCards[2].querySelector('.stat-value');
            if (authors) authors.textContent = formatNum(Math.round(this.brandData.followers / 20));

            const engagement = statCards[3].querySelector('.stat-value');
            if (engagement) engagement.textContent = this.brandData.engagement + '%';

            const reach = statCards[4].querySelector('.stat-value');
            if (reach) reach.textContent = formatNum(this.brandData.reach);
        }
    }

    async handleBrandChange(brandId, force = false) {
        if (this.isAnimating) return;
        if (!force && brandId === this.currentBrand) return;

        this.isAnimating = true;
        this.currentBrand = brandId;

        if (typeof APIData !== 'undefined') {
            APIData.setActiveBrand(brandId);
        }

        // Reload brand data
        this.loadBrandData();
        this.updateStatsCards();
        this.loadOverviewTab();
        this.initializeCharts();
        this.loadKeywords();
        this.loadMetricsTable();

        // Update subtitle
        const brand = typeof APIData !== 'undefined' ? APIData.brands[brandId] : null;
        const subtitle = document.querySelector('.page-subtitle');
        if (subtitle && brand) {
            subtitle.innerHTML = `Deep insights for <strong>${brand.name}</strong>`;
        }

        try {
            if (window.notificationManager) {
                window.notificationManager.show(`Analytics updated for ${brand?.name || brandId}`, 'success');
            }
        } catch (e) {
            console.warn('Notification failed:', e);
        }

        this.isAnimating = false;
    }

    setupEventListeners() {
        // Date range selector
        const dateRange = document.getElementById('dateRangeSelect');
        if (dateRange) {
            // Set initial value from state
            dateRange.value = this.dateRange;

            dateRange.addEventListener('change', (e) => {
                this.dateRange = e.target.value;
                this.refreshData();
            });
        }

        // Export button
        const exportBtn = document.getElementById('exportAnalyticsBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportReport());
        }

        // Platform filter dropdown
        const platformFilter = document.getElementById('platformFilter');
        if (platformFilter) {
            platformFilter.addEventListener('change', (e) => {
                const selectedPlatform = e.target.value;
                this.loadMetricsTableWithData(selectedPlatform);
            });
        }

        // Export metrics button
        const exportMetricsBtn = document.getElementById('exportMetricsBtn');
        if (exportMetricsBtn) {
            exportMetricsBtn.addEventListener('click', () => this.exportMetrics());
        }

        // Search metrics
        const searchInput = document.getElementById('searchMetrics');
        if (searchInput) {
            searchInput.addEventListener('input', Utils.debounce((e) => {
                this.filterMetrics(e.target.value);
            }, 300));
        }

        // Activity period filter
        const activityPeriodFilter = document.getElementById('activityPeriodFilter');
        if (activityPeriodFilter) {
            activityPeriodFilter.addEventListener('change', (e) => {
                this.updateActivityByHour(e.target.value);
            });
        }

        // Sentiment period filter
        const sentimentPeriodFilter = document.getElementById('sentimentPeriodFilter');
        if (sentimentPeriodFilter) {
            sentimentPeriodFilter.addEventListener('change', (e) => {
                this.updateSentimentBreakdown(e.target.value);
            });
        }
    }

    // Activity period state
    activityPeriod = '7d';

    updateActivityByHour(period) {
        this.activityPeriod = period;

        // Destroy existing chart
        if (this.hourlyChart) {
            this.hourlyChart.destroy();
            this.hourlyChart = null;
        }

        // Get days count based on period
        const daysMap = { '7d': 7, '14d': 14, '30d': 30, '90d': 90 };
        const days = daysMap[period] || 7;

        // Recreate the chart with new data
        if (typeof Charts !== 'undefined') {
            this.hourlyChart = Charts.createEngagementChart('hourlyActivityChart', 'all', days);
        }

        // Update summary stats based on period
        this.updateActivitySummaryStats(period, days);
    }

    updateActivitySummaryStats(period, days) {
        // Generate dynamic stats based on period
        const multiplier = days / 7; // Base multiplier for 7 days

        // Peak hours data
        const peakHours = ['2:00 PM', '3:00 PM', '11:00 AM', '4:00 PM', '1:00 PM'];
        const peakHour = peakHours[Math.floor(Math.random() * peakHours.length)];

        // Calculate values based on period
        const baseEngagement = 48200;
        const totalEngagement = Math.round(baseEngagement * multiplier * (0.9 + Math.random() * 0.2));
        const avgDaily = Math.round(totalEngagement / days);

        // Best days
        const bestDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        const bestDay = bestDays[Math.floor(Math.random() * bestDays.length)];
        const bestDayInteractions = Math.round(avgDaily * (1.2 + Math.random() * 0.3));

        // Format numbers
        const formatNum = (n) => {
            if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
            if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
            return n.toString();
        };

        // Update DOM elements
        const peakHourValue = document.getElementById('peakHourValue');
        const totalEngagementValue = document.getElementById('totalEngagementValue');
        const avgActivityValue = document.getElementById('avgActivityValue');
        const bestDayValue = document.getElementById('bestDayValue');

        if (peakHourValue) {
            peakHourValue.textContent = peakHour;
            const peakChange = peakHourValue.nextElementSibling;
            if (peakChange) {
                const changeVal = Math.round(15 + Math.random() * 20);
                peakChange.textContent = `+${changeVal}% engagement`;
            }
        }

        if (totalEngagementValue) {
            totalEngagementValue.textContent = formatNum(totalEngagement);
            const totalChange = totalEngagementValue.nextElementSibling;
            if (totalChange) {
                const changeVal = Math.round(5 + Math.random() * 15);
                totalChange.textContent = `+${changeVal}% vs prev period`;
            }
        }

        if (avgActivityValue) {
            avgActivityValue.textContent = formatNum(avgDaily);
            const avgChange = avgActivityValue.nextElementSibling;
            if (avgChange) {
                const changeVal = Math.round(3 + Math.random() * 12);
                avgChange.textContent = `+${changeVal}% growth`;
            }
        }

        if (bestDayValue) {
            bestDayValue.textContent = bestDay;
            const bestDayChange = bestDayValue.nextElementSibling;
            if (bestDayChange) {
                bestDayChange.textContent = `${formatNum(bestDayInteractions)} interactions`;
            }
        }

        // Update engagement breakdown
        this.updateEngagementBreakdown(totalEngagement);
    }

    updateEngagementBreakdown(totalEngagement) {
        const formatNum = (n) => {
            if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
            if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
            return n.toString();
        };

        // Calculate breakdown values (60% likes, 25% comments, 15% shares)
        const likes = Math.round(totalEngagement * 0.60);
        const comments = Math.round(totalEngagement * 0.25);
        const shares = Math.round(totalEngagement * 0.15);

        const breakdownItems = document.querySelectorAll('.breakdown-item');
        if (breakdownItems.length >= 3) {
            // Update likes
            const likesValue = breakdownItems[0].querySelector('.breakdown-value');
            if (likesValue) likesValue.textContent = formatNum(likes);

            // Update comments
            const commentsValue = breakdownItems[1].querySelector('.breakdown-value');
            if (commentsValue) commentsValue.textContent = formatNum(comments);

            // Update shares
            const sharesValue = breakdownItems[2].querySelector('.breakdown-value');
            if (sharesValue) sharesValue.textContent = formatNum(shares);
        }
    }

    // Sentiment period state
    sentimentPeriod = '7d';

    updateSentimentBreakdown(period) {
        this.sentimentPeriod = period;

        // Destroy existing chart
        if (this.sentimentChart) {
            this.sentimentChart.destroy();
            this.sentimentChart = null;
        }

        // Get days count based on period
        const daysMap = { '7d': 7, '14d': 14, '30d': 30, '90d': 90 };
        const days = daysMap[period] || 7;

        // Recreate the chart with new data
        if (typeof Charts !== 'undefined') {
            this.sentimentChart = Charts.createSentimentTrend('sentimentBreakdownChart', days);
        }
    }

    setupTabs() {
        const tabs = document.querySelectorAll('#analyticsTabs .tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active from all
                tabs.forEach(t => t.classList.remove('active'));
                // Add active to clicked
                tab.classList.add('active');
                // Load tab content
                this.loadTabContent(tab.dataset.tab);
            });
        });
    }

    loadTabContent(tabName) {
        const content = document.getElementById('analyticsTabContent');
        if (!content) return;

        switch(tabName) {
            case 'overview':
                this.loadOverviewTab();
                break;
            case 'sentiment':
                this.loadSentimentTab();
                break;
            case 'engagement':
                this.loadEngagementTab();
                break;
            case 'demographics':
                this.loadDemographicsTab();
                break;
            case 'performance':
                this.loadPerformanceTab();
                break;
        }
    }

    loadOverviewTab() {
        const content = document.getElementById('analyticsTabContent');
        if (!content) return;

        content.innerHTML = `
            <div class="overview-container">
                <!-- Hero Stats Row -->
                <div class="overview-hero-grid">
                    <!-- Peak Activity Card -->
                    <div class="overview-hero-card purple">
                        <div class="hero-card-bg">
                            <div class="hero-bg-shape"></div>
                            <div class="hero-bg-shape secondary"></div>
                        </div>
                        <div class="hero-card-content">
                            <div class="hero-icon-wrapper">
                                <span class="hero-pulse-ring"></span>
                                <span class="hero-pulse-ring delay-1"></span>
                                <div class="hero-icon">
                                    <i class="fas fa-clock"></i>
                                </div>
                            </div>
                            <div class="hero-text">
                                <span class="hero-label">Peak Activity Time</span>
                                <span class="hero-value">2:00 PM - 4:00 PM</span>
                                <div class="hero-footer">
                                    <span class="hero-badge">
                                        <i class="fas fa-bolt"></i> Highest engagement window
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Top Platform Card -->
                    <div class="overview-hero-card blue">
                        <div class="hero-card-bg">
                            <div class="hero-bg-shape"></div>
                            <div class="hero-bg-shape secondary"></div>
                        </div>
                        <div class="hero-card-content">
                            <div class="hero-icon-wrapper">
                                <span class="hero-pulse-ring"></span>
                                <span class="hero-pulse-ring delay-1"></span>
                                <div class="hero-icon">
                                    <i class="fab fa-twitter"></i>
                                </div>
                            </div>
                            <div class="hero-text">
                                <span class="hero-label">Top Platform</span>
                                <span class="hero-value">Twitter</span>
                                <div class="hero-footer">
                                    <span class="hero-badge">
                                        <i class="fab fa-twitter"></i> 42% of mentions
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Response Time Card -->
                    <div class="overview-hero-card green">
                        <div class="hero-card-bg">
                            <div class="hero-bg-shape"></div>
                            <div class="hero-bg-shape secondary"></div>
                        </div>
                        <div class="hero-card-content">
                            <div class="hero-icon-wrapper">
                                <span class="hero-pulse-ring"></span>
                                <span class="hero-pulse-ring delay-1"></span>
                                <div class="hero-icon">
                                    <i class="fas fa-reply"></i>
                                </div>
                            </div>
                            <div class="hero-text">
                                <span class="hero-label">Avg Response Time</span>
                                <span class="hero-value">2.4 <span class="value-unit">hours</span></span>
                                <div class="hero-footer">
                                    <span class="hero-badge">
                                        <i class="fas fa-arrow-up"></i> 15% faster vs last period
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Virality Score Card -->
                    <div class="overview-hero-card orange">
                        <div class="hero-card-bg">
                            <div class="hero-bg-shape"></div>
                            <div class="hero-bg-shape secondary"></div>
                        </div>
                        <div class="hero-card-content">
                            <div class="hero-icon-wrapper">
                                <span class="hero-pulse-ring"></span>
                                <span class="hero-pulse-ring delay-1"></span>
                                <div class="hero-icon fire-glow">
                                    <i class="fas fa-fire-alt"></i>
                                </div>
                            </div>
                            <div class="hero-text">
                                <span class="hero-label">Virality Score</span>
                                <span class="hero-value">8.7<span class="value-small">/10</span></span>
                                <div class="hero-footer">
                                    <span class="hero-badge excellent">
                                        <i class="fas fa-star"></i> Excellent
                                    </span>
                                    <span class="hero-hint">shareability</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Quick Insights Row -->
                <div class="overview-insights-grid">
                    <div class="insight-card">
                        <div class="insight-icon blue">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="insight-content">
                            <span class="insight-value">12.4K</span>
                            <span class="insight-label">Active Users</span>
                        </div>
                        <div class="insight-trend positive">
                            <i class="fas fa-caret-up"></i> 8.2%
                        </div>
                    </div>
                    <div class="insight-card">
                        <div class="insight-icon purple">
                            <i class="fas fa-comments"></i>
                        </div>
                        <div class="insight-content">
                            <span class="insight-value">3.2K</span>
                            <span class="insight-label">Conversations</span>
                        </div>
                        <div class="insight-trend positive">
                            <i class="fas fa-caret-up"></i> 12.5%
                        </div>
                    </div>
                    <div class="insight-card">
                        <div class="insight-icon green">
                            <i class="fas fa-share-alt"></i>
                        </div>
                        <div class="insight-content">
                            <span class="insight-value">8.9K</span>
                            <span class="insight-label">Shares</span>
                        </div>
                        <div class="insight-trend positive">
                            <i class="fas fa-caret-up"></i> 24.1%
                        </div>
                    </div>
                    <div class="insight-card">
                        <div class="insight-icon orange">
                            <i class="fas fa-hashtag"></i>
                        </div>
                        <div class="insight-content">
                            <span class="insight-value">156</span>
                            <span class="insight-label">Trending Tags</span>
                        </div>
                        <div class="insight-trend negative">
                            <i class="fas fa-caret-down"></i> 3.2%
                        </div>
                    </div>
                    <div class="insight-card">
                        <div class="insight-icon pink">
                            <i class="fas fa-heart"></i>
                        </div>
                        <div class="insight-content">
                            <span class="insight-value">45.8K</span>
                            <span class="insight-label">Reactions</span>
                        </div>
                        <div class="insight-trend positive">
                            <i class="fas fa-caret-up"></i> 18.7%
                        </div>
                    </div>
                    <div class="insight-card">
                        <div class="insight-icon cyan">
                            <i class="fas fa-eye"></i>
                        </div>
                        <div class="insight-content">
                            <span class="insight-value">1.2M</span>
                            <span class="insight-label">Impressions</span>
                        </div>
                        <div class="insight-trend positive">
                            <i class="fas fa-caret-up"></i> 32.4%
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    loadSentimentTab() {
        const content = document.getElementById('analyticsTabContent');
        if (!content) return;

        content.innerHTML = `
            <div class="sentiment-container">
                <!-- Hero Sentiment Cards -->
                <div class="sentiment-hero-grid">
                    <!-- Positive Sentiment Card -->
                    <div class="sentiment-hero-card yellow">
                        <div class="hero-card-bg">
                            <div class="hero-bg-shape"></div>
                            <div class="hero-bg-shape secondary"></div>
                        </div>
                        <div class="hero-card-content">
                            <div class="hero-icon-wrapper">
                                <span class="hero-pulse-ring"></span>
                                <span class="hero-pulse-ring delay-1"></span>
                                <div class="hero-icon">
                                    <i class="fas fa-smile-beam"></i>
                                </div>
                            </div>
                            <div class="hero-text">
                                <span class="hero-label">Positive Sentiment</span>
                                <span class="hero-value">68.4%</span>
                                <div class="hero-footer">
                                    <span class="hero-trend">
                                        <i class="fas fa-arrow-up"></i> +5.2%
                                    </span>
                                    <span class="hero-hint">168.1K mentions</span>
                                </div>
                            </div>
                            <div class="hero-progress-bar">
                                <div class="hero-progress-fill" style="width: 68.4%;"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Neutral Sentiment Card -->
                    <div class="sentiment-hero-card blue">
                        <div class="hero-card-bg">
                            <div class="hero-bg-shape"></div>
                            <div class="hero-bg-shape secondary"></div>
                        </div>
                        <div class="hero-card-content">
                            <div class="hero-icon-wrapper">
                                <span class="hero-pulse-ring"></span>
                                <span class="hero-pulse-ring delay-1"></span>
                                <div class="hero-icon">
                                    <i class="fas fa-meh"></i>
                                </div>
                            </div>
                            <div class="hero-text">
                                <span class="hero-label">Neutral Sentiment</span>
                                <span class="hero-value">24.3%</span>
                                <div class="hero-footer">
                                    <span class="hero-trend">
                                        <i class="fas fa-minus"></i> 0.8%
                                    </span>
                                    <span class="hero-hint">59.7K mentions</span>
                                </div>
                            </div>
                            <div class="hero-progress-bar">
                                <div class="hero-progress-fill" style="width: 24.3%;"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Negative Sentiment Card -->
                    <div class="sentiment-hero-card red">
                        <div class="hero-card-bg">
                            <div class="hero-bg-shape"></div>
                            <div class="hero-bg-shape secondary"></div>
                        </div>
                        <div class="hero-card-content">
                            <div class="hero-icon-wrapper">
                                <span class="hero-pulse-ring"></span>
                                <span class="hero-pulse-ring delay-1"></span>
                                <div class="hero-icon">
                                    <i class="fas fa-frown"></i>
                                </div>
                            </div>
                            <div class="hero-text">
                                <span class="hero-label">Negative Sentiment</span>
                                <span class="hero-value">7.3%</span>
                                <div class="hero-footer">
                                    <span class="hero-trend">
                                        <i class="fas fa-arrow-down"></i> -2.1%
                                    </span>
                                    <span class="hero-hint">17.9K mentions</span>
                                </div>
                            </div>
                            <div class="hero-progress-bar">
                                <div class="hero-progress-fill" style="width: 7.3%;"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Sentiment Insights Grid -->
                <div class="sentiment-insights-grid">
                    <div class="insight-card">
                        <div class="insight-icon green">
                            <i class="fas fa-thumbs-up"></i>
                        </div>
                        <div class="insight-content">
                            <span class="insight-value">Excellent</span>
                            <span class="insight-label">Overall Score</span>
                        </div>
                        <div class="insight-trend up">
                            <i class="fas fa-caret-up"></i> 3.1%
                        </div>
                    </div>
                    <div class="insight-card">
                        <div class="insight-icon purple">
                            <i class="fas fa-database"></i>
                        </div>
                        <div class="insight-content">
                            <span class="insight-value">245.7K</span>
                            <span class="insight-label">Total Analyzed</span>
                        </div>
                        <div class="insight-trend up">
                            <i class="fas fa-caret-up"></i> 12.4%
                        </div>
                    </div>
                    <div class="insight-card">
                        <div class="insight-icon blue">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <div class="insight-content">
                            <span class="insight-value">+3.1%</span>
                            <span class="insight-label">Sentiment Shift</span>
                        </div>
                        <div class="insight-trend up">
                            <i class="fas fa-caret-up"></i> Improving
                        </div>
                    </div>
                    <div class="insight-card">
                        <div class="insight-icon orange">
                            <i class="fas fa-bolt"></i>
                        </div>
                        <div class="insight-content">
                            <span class="insight-value">2.4h</span>
                            <span class="insight-label">Avg Response</span>
                        </div>
                        <div class="insight-trend up">
                            <i class="fas fa-caret-up"></i> 15% faster
                        </div>
                    </div>
                </div>

                <!-- Sentiment Breakdown Cards -->
                <div class="sentiment-breakdown-grid">
                    <!-- Top Positive Topics -->
                    <div class="breakdown-card">
                        <div class="breakdown-header">
                            <div class="breakdown-icon green">
                                <i class="fas fa-heart"></i>
                            </div>
                            <h4>Top Positive Topics</h4>
                        </div>
                        <div class="breakdown-body">
                            <div class="topic-list">
                                <div class="topic-item">
                                    <span class="topic-name">Product Quality</span>
                                    <div class="topic-bar-wrap">
                                        <div class="topic-bar green" style="width: 92%;"></div>
                                    </div>
                                    <span class="topic-value">92%</span>
                                </div>
                                <div class="topic-item">
                                    <span class="topic-name">Customer Service</span>
                                    <div class="topic-bar-wrap">
                                        <div class="topic-bar green" style="width: 87%;"></div>
                                    </div>
                                    <span class="topic-value">87%</span>
                                </div>
                                <div class="topic-item">
                                    <span class="topic-name">Fast Delivery</span>
                                    <div class="topic-bar-wrap">
                                        <div class="topic-bar green" style="width: 84%;"></div>
                                    </div>
                                    <span class="topic-value">84%</span>
                                </div>
                                <div class="topic-item">
                                    <span class="topic-name">Value for Money</span>
                                    <div class="topic-bar-wrap">
                                        <div class="topic-bar green" style="width: 79%;"></div>
                                    </div>
                                    <span class="topic-value">79%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Top Negative Topics -->
                    <div class="breakdown-card">
                        <div class="breakdown-header">
                            <div class="breakdown-icon red">
                                <i class="fas fa-exclamation-triangle"></i>
                            </div>
                            <h4>Areas for Improvement</h4>
                        </div>
                        <div class="breakdown-body">
                            <div class="topic-list">
                                <div class="topic-item">
                                    <span class="topic-name">App Performance</span>
                                    <div class="topic-bar-wrap">
                                        <div class="topic-bar red" style="width: 45%;"></div>
                                    </div>
                                    <span class="topic-value">45%</span>
                                </div>
                                <div class="topic-item">
                                    <span class="topic-name">Pricing Concerns</span>
                                    <div class="topic-bar-wrap">
                                        <div class="topic-bar red" style="width: 32%;"></div>
                                    </div>
                                    <span class="topic-value">32%</span>
                                </div>
                                <div class="topic-item">
                                    <span class="topic-name">Feature Requests</span>
                                    <div class="topic-bar-wrap">
                                        <div class="topic-bar orange" style="width: 28%;"></div>
                                    </div>
                                    <span class="topic-value">28%</span>
                                </div>
                                <div class="topic-item">
                                    <span class="topic-name">Documentation</span>
                                    <div class="topic-bar-wrap">
                                        <div class="topic-bar orange" style="width: 18%;"></div>
                                    </div>
                                    <span class="topic-value">18%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    loadEngagementTab() {
        const content = document.getElementById('analyticsTabContent');
        if (!content) return;

        content.innerHTML = `
            <div class="engagement-container">
                <!-- Hero Engagement Cards -->
                <div class="engagement-hero-grid">
                    <!-- Total Engagement Card -->
                    <div class="engagement-hero-card purple">
                        <div class="hero-card-bg">
                            <div class="hero-bg-shape"></div>
                            <div class="hero-bg-shape secondary"></div>
                        </div>
                        <div class="hero-card-content">
                            <div class="hero-icon-wrapper">
                                <span class="hero-pulse-ring"></span>
                                <span class="hero-pulse-ring delay-1"></span>
                                <div class="hero-icon">
                                    <i class="fas fa-hand-pointer"></i>
                                </div>
                            </div>
                            <div class="hero-text">
                                <span class="hero-label">Total Engagement</span>
                                <span class="hero-value">2.4M</span>
                                <div class="hero-footer">
                                    <span class="hero-trend">
                                        <i class="fas fa-arrow-up"></i> +24.5%
                                    </span>
                                    <span class="hero-hint">vs last period</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Engagement Rate Card -->
                    <div class="engagement-hero-card blue">
                        <div class="hero-card-bg">
                            <div class="hero-bg-shape"></div>
                            <div class="hero-bg-shape secondary"></div>
                        </div>
                        <div class="hero-card-content">
                            <div class="hero-icon-wrapper">
                                <span class="hero-pulse-ring"></span>
                                <span class="hero-pulse-ring delay-1"></span>
                                <div class="hero-icon">
                                    <i class="fas fa-percentage"></i>
                                </div>
                            </div>
                            <div class="hero-text">
                                <span class="hero-label">Engagement Rate</span>
                                <span class="hero-value">9.2%</span>
                                <div class="hero-footer">
                                    <span class="hero-trend">
                                        <i class="fas fa-arrow-up"></i> +2.4%
                                    </span>
                                    <span class="hero-hint">above industry avg</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Avg Interactions Card -->
                    <div class="engagement-hero-card green">
                        <div class="hero-card-bg">
                            <div class="hero-bg-shape"></div>
                            <div class="hero-bg-shape secondary"></div>
                        </div>
                        <div class="hero-card-content">
                            <div class="hero-icon-wrapper">
                                <span class="hero-pulse-ring"></span>
                                <span class="hero-pulse-ring delay-1"></span>
                                <div class="hero-icon">
                                    <i class="fas fa-sync-alt"></i>
                                </div>
                            </div>
                            <div class="hero-text">
                                <span class="hero-label">Avg Interactions</span>
                                <span class="hero-value">847</span>
                                <div class="hero-footer">
                                    <span class="hero-trend">
                                        <i class="fas fa-arrow-up"></i> +18.3%
                                    </span>
                                    <span class="hero-hint">per post</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Virality Score Card -->
                    <div class="engagement-hero-card orange">
                        <div class="hero-card-bg">
                            <div class="hero-bg-shape"></div>
                            <div class="hero-bg-shape secondary"></div>
                        </div>
                        <div class="hero-card-content">
                            <div class="hero-icon-wrapper">
                                <span class="hero-pulse-ring"></span>
                                <span class="hero-pulse-ring delay-1"></span>
                                <div class="hero-icon fire-glow">
                                    <i class="fas fa-fire-alt"></i>
                                </div>
                            </div>
                            <div class="hero-text">
                                <span class="hero-label">Virality Score</span>
                                <span class="hero-value">8.7<span class="value-small">/10</span></span>
                                <div class="hero-footer">
                                    <span class="hero-badge">
                                        <i class="fas fa-star"></i> Excellent
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Engagement Type Breakdown -->
                <div class="engagement-insights-grid">
                    <div class="insight-card">
                        <div class="insight-icon pink">
                            <i class="fas fa-heart"></i>
                        </div>
                        <div class="insight-content">
                            <span class="insight-value">1.2M</span>
                            <span class="insight-label">Likes</span>
                        </div>
                        <div class="insight-trend up">
                            <i class="fas fa-caret-up"></i> 28.4%
                        </div>
                    </div>
                    <div class="insight-card">
                        <div class="insight-icon blue">
                            <i class="fas fa-comment"></i>
                        </div>
                        <div class="insight-content">
                            <span class="insight-value">456K</span>
                            <span class="insight-label">Comments</span>
                        </div>
                        <div class="insight-trend up">
                            <i class="fas fa-caret-up"></i> 19.2%
                        </div>
                    </div>
                    <div class="insight-card">
                        <div class="insight-icon green">
                            <i class="fas fa-share"></i>
                        </div>
                        <div class="insight-content">
                            <span class="insight-value">234K</span>
                            <span class="insight-label">Shares</span>
                        </div>
                        <div class="insight-trend up">
                            <i class="fas fa-caret-up"></i> 35.7%
                        </div>
                    </div>
                    <div class="insight-card">
                        <div class="insight-icon purple">
                            <i class="fas fa-bookmark"></i>
                        </div>
                        <div class="insight-content">
                            <span class="insight-value">89K</span>
                            <span class="insight-label">Saves</span>
                        </div>
                        <div class="insight-trend up">
                            <i class="fas fa-caret-up"></i> 42.1%
                        </div>
                    </div>
                    <div class="insight-card">
                        <div class="insight-icon cyan">
                            <i class="fas fa-retweet"></i>
                        </div>
                        <div class="insight-content">
                            <span class="insight-value">178K</span>
                            <span class="insight-label">Retweets</span>
                        </div>
                        <div class="insight-trend up">
                            <i class="fas fa-caret-up"></i> 22.8%
                        </div>
                    </div>
                    <div class="insight-card">
                        <div class="insight-icon yellow">
                            <i class="fas fa-at"></i>
                        </div>
                        <div class="insight-content">
                            <span class="insight-value">67K</span>
                            <span class="insight-label">Mentions</span>
                        </div>
                        <div class="insight-trend up">
                            <i class="fas fa-caret-up"></i> 15.3%
                        </div>
                    </div>
                </div>

                <!-- Platform Engagement Breakdown -->
                <div class="engagement-breakdown-grid">
                    <!-- Platform Performance -->
                    <div class="breakdown-card">
                        <div class="breakdown-header">
                            <div class="breakdown-icon blue">
                                <i class="fas fa-chart-bar"></i>
                            </div>
                            <h4>Platform Performance</h4>
                        </div>
                        <div class="breakdown-body">
                            <div class="platform-engagement-list">
                                <div class="platform-eng-item">
                                    <div class="platform-eng-icon twitter">
                                        <i class="fab fa-twitter"></i>
                                    </div>
                                    <div class="platform-eng-info">
                                        <span class="platform-eng-name">Twitter</span>
                                        <div class="platform-eng-bar-wrap">
                                            <div class="platform-eng-bar" style="width: 92%; background: linear-gradient(90deg, #1da1f2, #4dc0ff);"></div>
                                        </div>
                                    </div>
                                    <span class="platform-eng-rate">9.2%</span>
                                </div>
                                <div class="platform-eng-item">
                                    <div class="platform-eng-icon instagram">
                                        <i class="fab fa-instagram"></i>
                                    </div>
                                    <div class="platform-eng-info">
                                        <span class="platform-eng-name">Instagram</span>
                                        <div class="platform-eng-bar-wrap">
                                            <div class="platform-eng-bar" style="width: 88%; background: linear-gradient(90deg, #e1306c, #ff6b9d);"></div>
                                        </div>
                                    </div>
                                    <span class="platform-eng-rate">8.8%</span>
                                </div>
                                <div class="platform-eng-item">
                                    <div class="platform-eng-icon youtube">
                                        <i class="fab fa-youtube"></i>
                                    </div>
                                    <div class="platform-eng-info">
                                        <span class="platform-eng-name">YouTube</span>
                                        <div class="platform-eng-bar-wrap">
                                            <div class="platform-eng-bar" style="width: 76%; background: linear-gradient(90deg, #ff0000, #ff5252);"></div>
                                        </div>
                                    </div>
                                    <span class="platform-eng-rate">7.6%</span>
                                </div>
                                <div class="platform-eng-item">
                                    <div class="platform-eng-icon linkedin">
                                        <i class="fab fa-linkedin"></i>
                                    </div>
                                    <div class="platform-eng-info">
                                        <span class="platform-eng-name">LinkedIn</span>
                                        <div class="platform-eng-bar-wrap">
                                            <div class="platform-eng-bar" style="width: 68%; background: linear-gradient(90deg, #0077b5, #00a0dc);"></div>
                                        </div>
                                    </div>
                                    <span class="platform-eng-rate">6.8%</span>
                                </div>
                                <div class="platform-eng-item">
                                    <div class="platform-eng-icon reddit">
                                        <i class="fab fa-reddit"></i>
                                    </div>
                                    <div class="platform-eng-info">
                                        <span class="platform-eng-name">Reddit</span>
                                        <div class="platform-eng-bar-wrap">
                                            <div class="platform-eng-bar" style="width: 54%; background: linear-gradient(90deg, #ff4500, #ff7043);"></div>
                                        </div>
                                    </div>
                                    <span class="platform-eng-rate">5.4%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Top Engaging Content -->
                    <div class="breakdown-card">
                        <div class="breakdown-header">
                            <div class="breakdown-icon orange">
                                <i class="fas fa-crown"></i>
                            </div>
                            <h4>Top Engaging Content</h4>
                        </div>
                        <div class="breakdown-body">
                            <div class="top-content-list">
                                <div class="top-content-item">
                                    <span class="content-rank gold">1</span>
                                    <div class="content-details">
                                        <span class="content-title">Product Launch Video</span>
                                        <span class="content-platform"><i class="fab fa-youtube"></i> YouTube</span>
                                    </div>
                                    <div class="content-engagement">
                                        <span class="eng-value">245K</span>
                                        <span class="eng-label">engagements</span>
                                    </div>
                                </div>
                                <div class="top-content-item">
                                    <span class="content-rank silver">2</span>
                                    <div class="content-details">
                                        <span class="content-title">Behind the Scenes</span>
                                        <span class="content-platform"><i class="fab fa-instagram"></i> Instagram</span>
                                    </div>
                                    <div class="content-engagement">
                                        <span class="eng-value">189K</span>
                                        <span class="eng-label">engagements</span>
                                    </div>
                                </div>
                                <div class="top-content-item">
                                    <span class="content-rank bronze">3</span>
                                    <div class="content-details">
                                        <span class="content-title">Customer Story Thread</span>
                                        <span class="content-platform"><i class="fab fa-twitter"></i> Twitter</span>
                                    </div>
                                    <div class="content-engagement">
                                        <span class="eng-value">156K</span>
                                        <span class="eng-label">engagements</span>
                                    </div>
                                </div>
                                <div class="top-content-item">
                                    <span class="content-rank">4</span>
                                    <div class="content-details">
                                        <span class="content-title">Industry Insights</span>
                                        <span class="content-platform"><i class="fab fa-linkedin"></i> LinkedIn</span>
                                    </div>
                                    <div class="content-engagement">
                                        <span class="eng-value">98K</span>
                                        <span class="eng-label">engagements</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    loadDemographicsTab() {
        const content = document.getElementById('analyticsTabContent');
        if (!content) return;

        content.innerHTML = `
            <div class="demographics-container">
                <!-- Hero Demographics Cards -->
                <div class="demographics-hero-grid">
                    <!-- Total Audience Card -->
                    <div class="demo-hero-card purple">
                        <div class="hero-card-bg">
                            <div class="hero-bg-shape"></div>
                            <div class="hero-bg-shape secondary"></div>
                        </div>
                        <div class="hero-card-content">
                            <div class="hero-icon-wrapper">
                                <span class="hero-pulse-ring"></span>
                                <span class="hero-pulse-ring delay-1"></span>
                                <div class="hero-icon">
                                    <i class="fas fa-users"></i>
                                </div>
                            </div>
                            <div class="hero-text">
                                <span class="hero-label">Total Audience</span>
                                <span class="hero-value">245K</span>
                                <div class="hero-footer">
                                    <span class="hero-badge">
                                        <i class="fas fa-arrow-up"></i> +18.5% growth this month
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Primary Age Group Card -->
                    <div class="demo-hero-card blue">
                        <div class="hero-card-bg">
                            <div class="hero-bg-shape"></div>
                            <div class="hero-bg-shape secondary"></div>
                        </div>
                        <div class="hero-card-content">
                            <div class="hero-icon-wrapper">
                                <span class="hero-pulse-ring"></span>
                                <span class="hero-pulse-ring delay-1"></span>
                                <div class="hero-icon">
                                    <i class="fas fa-user-clock"></i>
                                </div>
                            </div>
                            <div class="hero-text">
                                <span class="hero-label">Primary Age Group</span>
                                <span class="hero-value">25-34</span>
                                <div class="hero-footer">
                                    <span class="hero-badge">
                                        <i class="fas fa-user-clock"></i> 35% of audience
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Top Location Card -->
                    <div class="demo-hero-card green">
                        <div class="hero-card-bg">
                            <div class="hero-bg-shape"></div>
                            <div class="hero-bg-shape secondary"></div>
                        </div>
                        <div class="hero-card-content">
                            <div class="hero-icon-wrapper">
                                <span class="hero-pulse-ring"></span>
                                <span class="hero-pulse-ring delay-1"></span>
                                <div class="hero-icon">
                                    <i class="fas fa-globe-americas"></i>
                                </div>
                            </div>
                            <div class="hero-text">
                                <span class="hero-label">Top Location</span>
                                <span class="hero-value">🇺🇸 USA</span>
                                <div class="hero-footer">
                                    <span class="hero-badge">
                                        <i class="fas fa-map-marker-alt"></i> 42% of users
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Primary Device Card -->
                    <div class="demo-hero-card orange">
                        <div class="hero-card-bg">
                            <div class="hero-bg-shape"></div>
                            <div class="hero-bg-shape secondary"></div>
                        </div>
                        <div class="hero-card-content">
                            <div class="hero-icon-wrapper">
                                <span class="hero-pulse-ring"></span>
                                <span class="hero-pulse-ring delay-1"></span>
                                <div class="hero-icon">
                                    <i class="fas fa-mobile-alt"></i>
                                </div>
                            </div>
                            <div class="hero-text">
                                <span class="hero-label">Primary Device</span>
                                <span class="hero-value">Mobile</span>
                                <div class="hero-footer">
                                    <span class="hero-badge">
                                        <i class="fas fa-mobile-alt"></i> 68% mobile users
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Quick Demographics Stats -->
                <div class="demographics-insights-grid">
                    <div class="insight-card">
                        <div class="insight-icon blue">
                            <i class="fas fa-mars"></i>
                        </div>
                        <div class="insight-content">
                            <span class="insight-value">55%</span>
                            <span class="insight-label">Male</span>
                        </div>
                    </div>
                    <div class="insight-card">
                        <div class="insight-icon pink">
                            <i class="fas fa-venus"></i>
                        </div>
                        <div class="insight-content">
                            <span class="insight-value">40%</span>
                            <span class="insight-label">Female</span>
                        </div>
                    </div>
                    <div class="insight-card">
                        <div class="insight-icon purple">
                            <i class="fas fa-genderless"></i>
                        </div>
                        <div class="insight-content">
                            <span class="insight-value">5%</span>
                            <span class="insight-label">Other</span>
                        </div>
                    </div>
                    <div class="insight-card">
                        <div class="insight-icon green">
                            <i class="fas fa-language"></i>
                        </div>
                        <div class="insight-content">
                            <span class="insight-value">72%</span>
                            <span class="insight-label">English</span>
                        </div>
                    </div>
                    <div class="insight-card">
                        <div class="insight-icon orange">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="insight-content">
                            <span class="insight-value">2-6 PM</span>
                            <span class="insight-label">Peak Hours</span>
                        </div>
                    </div>
                    <div class="insight-card">
                        <div class="insight-icon cyan">
                            <i class="fas fa-calendar-day"></i>
                        </div>
                        <div class="insight-content">
                            <span class="insight-value">Tuesday</span>
                            <span class="insight-label">Most Active</span>
                        </div>
                    </div>
                </div>

                <!-- Detailed Breakdown Cards -->
                <div class="demographics-breakdown-grid">
                    <!-- Age Distribution -->
                    <div class="breakdown-card">
                        <div class="breakdown-header">
                            <div class="breakdown-icon purple">
                                <i class="fas fa-birthday-cake"></i>
                            </div>
                            <h4>Age Distribution</h4>
                        </div>
                        <div class="breakdown-body">
                            <div class="age-distribution-list">
                                <div class="age-dist-item">
                                    <span class="age-range">18-24</span>
                                    <div class="age-bar-wrapper">
                                        <div class="age-bar-bg">
                                            <div class="age-bar-fill purple" style="width: 28%;"></div>
                                        </div>
                                    </div>
                                    <span class="age-pct">28%</span>
                                </div>
                                <div class="age-dist-item">
                                    <span class="age-range">25-34</span>
                                    <div class="age-bar-wrapper">
                                        <div class="age-bar-bg">
                                            <div class="age-bar-fill purple" style="width: 35%;"></div>
                                        </div>
                                    </div>
                                    <span class="age-pct highlight">35%</span>
                                </div>
                                <div class="age-dist-item">
                                    <span class="age-range">35-44</span>
                                    <div class="age-bar-wrapper">
                                        <div class="age-bar-bg">
                                            <div class="age-bar-fill purple" style="width: 22%;"></div>
                                        </div>
                                    </div>
                                    <span class="age-pct">22%</span>
                                </div>
                                <div class="age-dist-item">
                                    <span class="age-range">45-54</span>
                                    <div class="age-bar-wrapper">
                                        <div class="age-bar-bg">
                                            <div class="age-bar-fill purple" style="width: 10%;"></div>
                                        </div>
                                    </div>
                                    <span class="age-pct">10%</span>
                                </div>
                                <div class="age-dist-item">
                                    <span class="age-range">55+</span>
                                    <div class="age-bar-wrapper">
                                        <div class="age-bar-bg">
                                            <div class="age-bar-fill purple" style="width: 5%;"></div>
                                        </div>
                                    </div>
                                    <span class="age-pct">5%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Top Locations -->
                    <div class="breakdown-card">
                        <div class="breakdown-header">
                            <div class="breakdown-icon green">
                                <i class="fas fa-map-marked-alt"></i>
                            </div>
                            <h4>Top Locations</h4>
                        </div>
                        <div class="breakdown-body">
                            <div class="location-breakdown-list">
                                <div class="loc-item">
                                    <span class="loc-flag">🇺🇸</span>
                                    <span class="loc-name">United States</span>
                                    <div class="loc-bar-wrap">
                                        <div class="loc-bar green" style="width: 100%;"></div>
                                    </div>
                                    <span class="loc-pct">42%</span>
                                </div>
                                <div class="loc-item">
                                    <span class="loc-flag">🇬🇧</span>
                                    <span class="loc-name">United Kingdom</span>
                                    <div class="loc-bar-wrap">
                                        <div class="loc-bar green" style="width: 38%;"></div>
                                    </div>
                                    <span class="loc-pct">16%</span>
                                </div>
                                <div class="loc-item">
                                    <span class="loc-flag">🇮🇳</span>
                                    <span class="loc-name">India</span>
                                    <div class="loc-bar-wrap">
                                        <div class="loc-bar green" style="width: 33%;"></div>
                                    </div>
                                    <span class="loc-pct">14%</span>
                                </div>
                                <div class="loc-item">
                                    <span class="loc-flag">🇨🇦</span>
                                    <span class="loc-name">Canada</span>
                                    <div class="loc-bar-wrap">
                                        <div class="loc-bar green" style="width: 24%;"></div>
                                    </div>
                                    <span class="loc-pct">10%</span>
                                </div>
                                <div class="loc-item">
                                    <span class="loc-flag">🇦🇺</span>
                                    <span class="loc-name">Australia</span>
                                    <div class="loc-bar-wrap">
                                        <div class="loc-bar green" style="width: 19%;"></div>
                                    </div>
                                    <span class="loc-pct">8%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Top Interests -->
                    <div class="breakdown-card">
                        <div class="breakdown-header">
                            <div class="breakdown-icon orange">
                                <i class="fas fa-heart"></i>
                            </div>
                            <h4>Top Interests</h4>
                        </div>
                        <div class="breakdown-body">
                            <div class="interests-tags">
                                <span class="interest-pill large purple">Technology</span>
                                <span class="interest-pill large blue">Entertainment</span>
                                <span class="interest-pill medium green">Music</span>
                                <span class="interest-pill medium orange">Gaming</span>
                                <span class="interest-pill medium pink">Fashion</span>
                                <span class="interest-pill small cyan">Food</span>
                                <span class="interest-pill small purple">Travel</span>
                                <span class="interest-pill small green">Sports</span>
                                <span class="interest-pill small blue">Photography</span>
                                <span class="interest-pill small orange">Fitness</span>
                                <span class="interest-pill small pink">Art</span>
                                <span class="interest-pill small cyan">Business</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    loadPerformanceTab() {
        const content = document.getElementById('analyticsTabContent');
        if (!content) return;

        content.innerHTML = `
            <div class="performance-container">
                <!-- Hero Performance Cards -->
                <div class="performance-hero-grid">
                    <!-- Overall Score Card -->
                    <div class="perf-hero-card purple">
                        <div class="hero-card-bg">
                            <div class="hero-bg-shape"></div>
                            <div class="hero-bg-shape secondary"></div>
                        </div>
                        <div class="hero-card-content">
                            <div class="hero-icon-wrapper">
                                <span class="hero-pulse-ring"></span>
                                <span class="hero-pulse-ring delay-1"></span>
                                <div class="hero-icon">
                                    <i class="fas fa-tachometer-alt"></i>
                                </div>
                            </div>
                            <div class="hero-text">
                                <span class="hero-label">Performance Score</span>
                                <span class="hero-value">87<span class="value-small">/100</span></span>
                                <div class="hero-footer">
                                    <span class="hero-badge">
                                        <i class="fas fa-star"></i> Excellent
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Goal Completion Card -->
                    <div class="perf-hero-card green">
                        <div class="hero-card-bg">
                            <div class="hero-bg-shape"></div>
                            <div class="hero-bg-shape secondary"></div>
                        </div>
                        <div class="hero-card-content">
                            <div class="hero-icon-wrapper">
                                <span class="hero-pulse-ring"></span>
                                <span class="hero-pulse-ring delay-1"></span>
                                <div class="hero-icon">
                                    <i class="fas fa-bullseye"></i>
                                </div>
                            </div>
                            <div class="hero-text">
                                <span class="hero-label">Goal Completion</span>
                                <span class="hero-value">94.2%</span>
                                <div class="hero-footer">
                                    <span class="hero-trend">
                                        <i class="fas fa-arrow-up"></i> +8.3%
                                    </span>
                                    <span class="hero-hint">vs last period</span>
                                </div>
                            </div>
                            <div class="hero-progress-bar">
                                <div class="hero-progress-fill" style="width: 94.2%;"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Impressions Card -->
                    <div class="perf-hero-card blue">
                        <div class="hero-card-bg">
                            <div class="hero-bg-shape"></div>
                            <div class="hero-bg-shape secondary"></div>
                        </div>
                        <div class="hero-card-content">
                            <div class="hero-icon-wrapper">
                                <span class="hero-pulse-ring"></span>
                                <span class="hero-pulse-ring delay-1"></span>
                                <div class="hero-icon">
                                    <i class="fas fa-eye"></i>
                                </div>
                            </div>
                            <div class="hero-text">
                                <span class="hero-label">Total Impressions</span>
                                <span class="hero-value">1.2M</span>
                                <div class="hero-footer">
                                    <span class="hero-trend">
                                        <i class="fas fa-arrow-up"></i> +24.5%
                                    </span>
                                    <span class="hero-hint">growth this month</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- CTR Card -->
                    <div class="perf-hero-card orange">
                        <div class="hero-card-bg">
                            <div class="hero-bg-shape"></div>
                            <div class="hero-bg-shape secondary"></div>
                        </div>
                        <div class="hero-card-content">
                            <div class="hero-icon-wrapper">
                                <span class="hero-pulse-ring"></span>
                                <span class="hero-pulse-ring delay-1"></span>
                                <div class="hero-icon fire-glow">
                                    <i class="fas fa-mouse-pointer"></i>
                                </div>
                            </div>
                            <div class="hero-text">
                                <span class="hero-label">Click-through Rate</span>
                                <span class="hero-value">3.8%</span>
                                <div class="hero-footer">
                                    <span class="hero-trend">
                                        <i class="fas fa-arrow-up"></i> +0.5%
                                    </span>
                                    <span class="hero-hint">above average</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Performance KPI Insights -->
                <div class="performance-insights-grid">
                    <div class="insight-card">
                        <div class="insight-icon green">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <div class="insight-content">
                            <span class="insight-value">92</span>
                            <span class="insight-label">Engagement Score</span>
                        </div>
                        <div class="insight-trend up">
                            <i class="fas fa-caret-up"></i> 5.2%
                        </div>
                    </div>
                    <div class="insight-card">
                        <div class="insight-icon blue">
                            <i class="fas fa-broadcast-tower"></i>
                        </div>
                        <div class="insight-content">
                            <span class="insight-value">85</span>
                            <span class="insight-label">Reach Score</span>
                        </div>
                        <div class="insight-trend up">
                            <i class="fas fa-caret-up"></i> 12.8%
                        </div>
                    </div>
                    <div class="insight-card">
                        <div class="insight-icon yellow">
                            <i class="fas fa-smile"></i>
                        </div>
                        <div class="insight-content">
                            <span class="insight-value">78</span>
                            <span class="insight-label">Sentiment Score</span>
                        </div>
                        <div class="insight-trend up">
                            <i class="fas fa-caret-up"></i> 3.1%
                        </div>
                    </div>
                    <div class="insight-card">
                        <div class="insight-icon purple">
                            <i class="fas fa-rocket"></i>
                        </div>
                        <div class="insight-content">
                            <span class="insight-value">94</span>
                            <span class="insight-label">Growth Score</span>
                        </div>
                        <div class="insight-trend up">
                            <i class="fas fa-caret-up"></i> 18.5%
                        </div>
                    </div>
                    <div class="insight-card">
                        <div class="insight-icon pink">
                            <i class="fas fa-undo"></i>
                        </div>
                        <div class="insight-content">
                            <span class="insight-value">12.4%</span>
                            <span class="insight-label">Bounce Rate</span>
                        </div>
                        <div class="insight-trend down">
                            <i class="fas fa-caret-down"></i> 2.1%
                        </div>
                    </div>
                    <div class="insight-card">
                        <div class="insight-icon cyan">
                            <i class="fas fa-share-alt"></i>
                        </div>
                        <div class="insight-content">
                            <span class="insight-value">18.2%</span>
                            <span class="insight-label">Share of Voice</span>
                        </div>
                        <div class="insight-trend up">
                            <i class="fas fa-caret-up"></i> 5.1%
                        </div>
                    </div>
                </div>

                <!-- Performance Breakdown Cards -->
                <div class="performance-breakdown-grid">
                    <!-- Industry Benchmark -->
                    <div class="breakdown-card">
                        <div class="breakdown-header">
                            <div class="breakdown-icon green">
                                <i class="fas fa-chart-bar"></i>
                            </div>
                            <h4>Industry Benchmark</h4>
                        </div>
                        <div class="breakdown-body">
                            <div class="benchmark-comparison-list">
                                <div class="benchmark-comp-item">
                                    <div class="benchmark-comp-info">
                                        <span class="benchmark-comp-metric">Engagement Rate</span>
                                        <span class="benchmark-comp-badge above">+2.4% above avg</span>
                                    </div>
                                    <div class="benchmark-comp-bars">
                                        <div class="comp-bar-row">
                                            <span class="comp-bar-label">You</span>
                                            <div class="comp-bar-track">
                                                <div class="comp-bar-fill yours" style="width: 75%;"></div>
                                            </div>
                                            <span class="comp-bar-value">9.2%</span>
                                        </div>
                                        <div class="comp-bar-row">
                                            <span class="comp-bar-label">Avg</span>
                                            <div class="comp-bar-track">
                                                <div class="comp-bar-fill industry" style="width: 55%;"></div>
                                            </div>
                                            <span class="comp-bar-value">6.8%</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="benchmark-comp-item">
                                    <div class="benchmark-comp-info">
                                        <span class="benchmark-comp-metric">Response Time</span>
                                        <span class="benchmark-comp-badge above">32% faster</span>
                                    </div>
                                    <div class="benchmark-comp-bars">
                                        <div class="comp-bar-row">
                                            <span class="comp-bar-label">You</span>
                                            <div class="comp-bar-track">
                                                <div class="comp-bar-fill yours" style="width: 60%;"></div>
                                            </div>
                                            <span class="comp-bar-value">2.4h</span>
                                        </div>
                                        <div class="comp-bar-row">
                                            <span class="comp-bar-label">Avg</span>
                                            <div class="comp-bar-track">
                                                <div class="comp-bar-fill industry" style="width: 85%;"></div>
                                            </div>
                                            <span class="comp-bar-value">3.5h</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Top Performing Content -->
                    <div class="breakdown-card">
                        <div class="breakdown-header">
                            <div class="breakdown-icon orange">
                                <i class="fas fa-crown"></i>
                            </div>
                            <h4>Top Performing Content</h4>
                        </div>
                        <div class="breakdown-body">
                            <div class="top-content-perf-list">
                                <div class="content-perf-item">
                                    <span class="content-perf-rank gold">1</span>
                                    <div class="content-perf-info">
                                        <span class="content-perf-title">Product Launch Announcement</span>
                                        <span class="content-perf-meta"><i class="fab fa-twitter"></i> Twitter • 2 days ago</span>
                                    </div>
                                    <div class="content-perf-stats">
                                        <span class="content-perf-value">45.2K</span>
                                    </div>
                                </div>
                                <div class="content-perf-item">
                                    <span class="content-perf-rank silver">2</span>
                                    <div class="content-perf-info">
                                        <span class="content-perf-title">Behind the Scenes Video</span>
                                        <span class="content-perf-meta"><i class="fab fa-instagram"></i> Instagram • 5 days ago</span>
                                    </div>
                                    <div class="content-perf-stats">
                                        <span class="content-perf-value">38.7K</span>
                                    </div>
                                </div>
                                <div class="content-perf-item">
                                    <span class="content-perf-rank bronze">3</span>
                                    <div class="content-perf-info">
                                        <span class="content-perf-title">Customer Success Story</span>
                                        <span class="content-perf-meta"><i class="fab fa-linkedin"></i> LinkedIn • 1 week ago</span>
                                    </div>
                                    <div class="content-perf-stats">
                                        <span class="content-perf-value">28.3K</span>
                                    </div>
                                </div>
                                <div class="content-perf-item">
                                    <span class="content-perf-rank">4</span>
                                    <div class="content-perf-info">
                                        <span class="content-perf-title">Industry Insights Thread</span>
                                        <span class="content-perf-meta"><i class="fab fa-reddit"></i> Reddit • 1 week ago</span>
                                    </div>
                                    <div class="content-perf-stats">
                                        <span class="content-perf-value">21.5K</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Channel Performance -->
                    <div class="breakdown-card">
                        <div class="breakdown-header">
                            <div class="breakdown-icon pink">
                                <i class="fas fa-broadcast-tower"></i>
                            </div>
                            <h4>Channel Performance</h4>
                        </div>
                        <div class="breakdown-body">
                            <div class="channel-perf-list">
                                <div class="channel-perf-item">
                                    <div class="channel-perf-icon twitter">
                                        <i class="fab fa-twitter"></i>
                                    </div>
                                    <div class="channel-perf-info">
                                        <span class="channel-perf-name">Twitter</span>
                                        <div class="channel-perf-bar-wrap">
                                            <div class="channel-perf-bar" style="width: 92%; background: linear-gradient(90deg, #1da1f2, #4dc0ff);"></div>
                                        </div>
                                    </div>
                                    <span class="channel-perf-score">92</span>
                                </div>
                                <div class="channel-perf-item">
                                    <div class="channel-perf-icon instagram">
                                        <i class="fab fa-instagram"></i>
                                    </div>
                                    <div class="channel-perf-info">
                                        <span class="channel-perf-name">Instagram</span>
                                        <div class="channel-perf-bar-wrap">
                                            <div class="channel-perf-bar" style="width: 88%; background: linear-gradient(90deg, #e1306c, #ff6b9d);"></div>
                                        </div>
                                    </div>
                                    <span class="channel-perf-score">88</span>
                                </div>
                                <div class="channel-perf-item">
                                    <div class="channel-perf-icon linkedin">
                                        <i class="fab fa-linkedin"></i>
                                    </div>
                                    <div class="channel-perf-info">
                                        <span class="channel-perf-name">LinkedIn</span>
                                        <div class="channel-perf-bar-wrap">
                                            <div class="channel-perf-bar" style="width: 85%; background: linear-gradient(90deg, #0077b5, #00a0dc);"></div>
                                        </div>
                                    </div>
                                    <span class="channel-perf-score">85</span>
                                </div>
                                <div class="channel-perf-item">
                                    <div class="channel-perf-icon youtube">
                                        <i class="fab fa-youtube"></i>
                                    </div>
                                    <div class="channel-perf-info">
                                        <span class="channel-perf-name">YouTube</span>
                                        <div class="channel-perf-bar-wrap">
                                            <div class="channel-perf-bar" style="width: 79%; background: linear-gradient(90deg, #ff0000, #ff5252);"></div>
                                        </div>
                                    </div>
                                    <span class="channel-perf-score">79</span>
                                </div>
                                <div class="channel-perf-item">
                                    <div class="channel-perf-icon reddit">
                                        <i class="fab fa-reddit"></i>
                                    </div>
                                    <div class="channel-perf-info">
                                        <span class="channel-perf-name">Reddit</span>
                                        <div class="channel-perf-bar-wrap">
                                            <div class="channel-perf-bar" style="width: 71%; background: linear-gradient(90deg, #ff4500, #ff7043);"></div>
                                        </div>
                                    </div>
                                    <span class="channel-perf-score">71</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    initializeCharts() {
        // Destroy existing charts if they exist
        if (this.sentimentChart) {
            this.sentimentChart.destroy();
            this.sentimentChart = null;
        }
        if (this.platformChart) {
            this.platformChart.destroy();
            this.platformChart = null;
        }
        if (this.hourlyChart) {
            this.hourlyChart.destroy();
            this.hourlyChart = null;
        }

        if (typeof Charts !== 'undefined') {
            this.sentimentChart = Charts.createSentimentTrend('sentimentBreakdownChart');
            this.platformChart = Charts.createPlatformDistribution('platformPerformanceChart');
            this.hourlyChart = Charts.createEngagementChart('hourlyActivityChart');
        }
    }

    loadKeywords() {
        const keywordList = document.getElementById('keywordList');
        if (!keywordList) return;

        const keywords = [
            { word: 'innovation', count: 3420, sentiment: 85 },
            { word: 'quality', count: 2890, sentiment: 78 },
            { word: 'support', count: 2340, sentiment: 82 },
            { word: 'features', count: 1980, sentiment: 76 },
            { word: 'price', count: 1560, sentiment: 65 },
            { word: 'service', count: 1340, sentiment: 88 },
            { word: 'update', count: 1120, sentiment: 72 },
            { word: 'design', count: 980, sentiment: 90 }
        ];

        keywordList.innerHTML = keywords.map((kw, index) => `
            <div class="keyword-item">
                <div class="keyword-rank">${index + 1}</div>
                <div class="keyword-info">
                    <div class="keyword-word">#${kw.word}</div>
                    <div class="keyword-meta">
                        <span class="keyword-trend ${kw.sentiment >= 75 ? 'trending-up' : 'trending-down'}">
                            <i class="fas fa-${kw.sentiment >= 75 ? 'arrow-up' : 'arrow-down'}"></i>
                            ${kw.sentiment >= 75 ? 'Trending' : 'Stable'}
                        </span>
                    </div>
                </div>
                <div class="keyword-stats">
                    <div class="keyword-count-wrapper">
                        <span class="keyword-count-label">Mentions</span>
                        <span class="keyword-count">${Utils.formatNumber(kw.count)}</span>
                    </div>
                    <div class="keyword-sentiment-wrapper">
                        <span class="keyword-sentiment-label">Sentiment ${kw.sentiment}%</span>
                        <div class="keyword-sentiment-bar">
                            <div class="keyword-sentiment" style="width: ${kw.sentiment}%; background: ${Utils.getSentimentColor(kw.sentiment)}"></div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    loadMetricsTable(filter = 'all') {
        const tbody = document.getElementById('metricsTableBody');
        if (!tbody) return;

        const allData = [
            { platform: 'Twitter', mentions: 102453, sentiment: 75, engagement: 8.5, reach: 1250000, growth: 18 },
            { platform: 'Instagram', mentions: 89720, sentiment: 81, engagement: 14.2, reach: 1180000, growth: 28 },
            { platform: 'Reddit', mentions: 62890, sentiment: 68, engagement: 12.3, reach: 850000, growth: 24 },
            { platform: 'YouTube', mentions: 45120, sentiment: 82, engagement: 15.7, reach: 620000, growth: 12 },
            { platform: 'LinkedIn', mentions: 22340, sentiment: 79, engagement: 6.8, reach: 380000, growth: 31 },
            { platform: 'Facebook', mentions: 12997, sentiment: 71, engagement: 9.2, reach: 290000, growth: 8 }
        ];

        // Filter data based on selected platform
        const data = filter === 'all'
            ? allData
            : allData.filter(row => row.platform.toLowerCase() === filter.toLowerCase());

        if (data.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 2rem; color: var(--gray-500);">
                        No data available for the selected platform
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = data.map(row => `
            <tr class="metrics-row">
                <td><strong>${row.platform}</strong></td>
                <td>${Utils.formatNumber(row.mentions)}</td>
                <td>
                    <span class="badge badge-${Utils.getSentimentLabel(row.sentiment).toLowerCase()}">
                        ${row.sentiment}%
                    </span>
                </td>
                <td>${row.engagement}%</td>
                <td>${Utils.formatNumber(row.reach)}</td>
                <td class="growth-positive">+${row.growth}%</td>
            </tr>
        `).join('');
    }

    refreshData() {
        // Calculate new data based on selected date range
        this.currentData = this.getAdjustedData();

        // Update all components with new data
        this.updateStatsCardsWithData();
        this.loadMetricsTableWithData();
        this.loadKeywordsWithData();
        this.initializeCharts();

        // Show notification with date range
        if (typeof Notifications !== 'undefined') {
            Notifications.success(`Data updated for ${this.getDateRangeLabel()}`);
        }
    }

    // Update stat cards with current data
    updateStatsCardsWithData() {
        if (!this.currentData) return;

        const formatNum = (n) => {
            if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
            if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
            return n.toString();
        };

        const statCards = document.querySelectorAll('.stats-grid-5 .stat-card');
        if (statCards.length >= 5) {
            // Total Mentions
            const mentionsValue = statCards[0].querySelector('.stat-value');
            const mentionsChange = statCards[0].querySelector('.stat-change');
            if (mentionsValue) {
                mentionsValue.textContent = formatNum(this.currentData.mentions);
                this.animateValue(mentionsValue);
            }
            if (mentionsChange) {
                const changeVal = Math.round((Math.random() * 30 - 5) * 10) / 10;
                mentionsChange.textContent = `${changeVal >= 0 ? '+' : ''}${changeVal}% vs prev period`;
                mentionsChange.className = `stat-change ${changeVal >= 0 ? 'positive' : 'negative'}`;
            }

            // Brand Awareness (score out of 10)
            const awarenessValue = statCards[1].querySelector('.stat-value');
            const awarenessChange = statCards[1].querySelector('.stat-change');
            if (awarenessValue) {
                const awarenessScore = (this.currentData.sentiment / 10).toFixed(1);
                awarenessValue.innerHTML = awarenessScore + '<span style="font-size: 0.6em;">/10</span>';
                this.animateValue(awarenessValue);
            }
            if (awarenessChange) {
                const changeVal = Math.round((Math.random() * 1.5 - 0.3) * 10) / 10;
                awarenessChange.textContent = `${changeVal >= 0 ? '+' : ''}${changeVal} vs prev period`;
                awarenessChange.className = `stat-change ${changeVal >= 0 ? 'positive' : 'negative'}`;
            }

            // Unique Authors
            const authorsValue = statCards[2].querySelector('.stat-value');
            const authorsChange = statCards[2].querySelector('.stat-change');
            if (authorsValue) {
                authorsValue.textContent = formatNum(this.currentData.authors);
                this.animateValue(authorsValue);
            }
            if (authorsChange) {
                const changeVal = Math.round((Math.random() * 35 - 5) * 10) / 10;
                authorsChange.textContent = `${changeVal >= 0 ? '+' : ''}${changeVal}% vs prev period`;
                authorsChange.className = `stat-change ${changeVal >= 0 ? 'positive' : 'negative'}`;
            }

            // Engagement Rate
            const engagementValue = statCards[3].querySelector('.stat-value');
            const engagementChange = statCards[3].querySelector('.stat-change');
            if (engagementValue) {
                engagementValue.textContent = this.currentData.engagement + '%';
                this.animateValue(engagementValue);
            }
            if (engagementChange) {
                const changeVal = Math.round((Math.random() * 5 - 1) * 10) / 10;
                engagementChange.textContent = `${changeVal >= 0 ? '+' : ''}${changeVal}% vs prev period`;
                engagementChange.className = `stat-change ${changeVal >= 0 ? 'positive' : 'negative'}`;
            }

            // Reach
            const reachValue = statCards[4].querySelector('.stat-value');
            const reachChange = statCards[4].querySelector('.stat-change');
            if (reachValue) {
                reachValue.textContent = formatNum(this.currentData.reach);
                this.animateValue(reachValue);
            }
            if (reachChange) {
                const changeVal = Math.round((Math.random() * 60 - 10) * 10) / 10;
                reachChange.textContent = `${changeVal >= 0 ? '+' : ''}${changeVal}% vs prev period`;
                reachChange.className = `stat-change ${changeVal >= 0 ? 'positive' : 'negative'}`;
            }
        }
    }

    // Animate value change
    animateValue(element) {
        element.style.transform = 'scale(1.1)';
        element.style.transition = 'transform 0.3s ease';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 300);
    }

    // Load metrics table with current data
    loadMetricsTableWithData(filter = 'all') {
        const tbody = document.getElementById('metricsTableBody');
        if (!tbody || !this.currentData) return;

        // Get current filter from dropdown
        const platformFilter = document.getElementById('platformFilter');
        if (platformFilter) {
            filter = platformFilter.value;
        }

        // Filter data based on selected platform
        const data = filter === 'all'
            ? this.currentData.platforms
            : this.currentData.platforms.filter(row => row.platform.toLowerCase() === filter.toLowerCase());

        if (data.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 2rem; color: var(--gray-500);">
                        No data available for the selected platform
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = data.map(row => `
            <tr class="metrics-row">
                <td><strong>${row.platform}</strong></td>
                <td>${Utils.formatNumber(row.mentions)}</td>
                <td>
                    <span class="badge badge-${Utils.getSentimentLabel(row.sentiment).toLowerCase()}">
                        ${row.sentiment}%
                    </span>
                </td>
                <td>${row.engagement}%</td>
                <td>${Utils.formatNumber(row.reach)}</td>
                <td class="${row.growth >= 0 ? 'growth-positive' : 'growth-negative'}">${row.growth >= 0 ? '+' : ''}${row.growth}%</td>
            </tr>
        `).join('');

        // Animate table rows
        const rows = tbody.querySelectorAll('.metrics-row');
        rows.forEach((row, index) => {
            row.style.opacity = '0';
            row.style.transform = 'translateX(-10px)';
            setTimeout(() => {
                row.style.transition = 'all 0.3s ease';
                row.style.opacity = '1';
                row.style.transform = 'translateX(0)';
            }, index * 50);
        });
    }

    // Load keywords with current data
    loadKeywordsWithData() {
        const keywordList = document.getElementById('keywordList');
        if (!keywordList || !this.currentData) return;

        const keywords = this.currentData.keywords;

        keywordList.innerHTML = keywords.map((kw, index) => `
            <div class="keyword-item" style="opacity: 0; transform: translateY(10px);">
                <div class="keyword-rank">${index + 1}</div>
                <div class="keyword-info">
                    <div class="keyword-word">#${kw.word}</div>
                    <div class="keyword-meta">
                        <span class="keyword-trend ${kw.sentiment >= 75 ? 'trending-up' : 'trending-down'}">
                            <i class="fas fa-${kw.sentiment >= 75 ? 'arrow-up' : 'arrow-down'}"></i>
                            ${kw.sentiment >= 75 ? 'Trending' : 'Stable'}
                        </span>
                    </div>
                </div>
                <div class="keyword-stats">
                    <div class="keyword-count-wrapper">
                        <span class="keyword-count-label">Mentions</span>
                        <span class="keyword-count">${Utils.formatNumber(kw.count)}</span>
                    </div>
                    <div class="keyword-sentiment-wrapper">
                        <span class="keyword-sentiment-label">Sentiment ${kw.sentiment}%</span>
                        <div class="keyword-sentiment-bar">
                            <div class="keyword-sentiment" style="width: ${kw.sentiment}%; background: ${Utils.getSentimentColor(kw.sentiment)}"></div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        // Animate keyword items
        const items = keywordList.querySelectorAll('.keyword-item');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.style.transition = 'all 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 60);
        });
    }

    filterMetrics(query) {
        const rows = document.querySelectorAll('#metricsTableBody tr');
        const lowerQuery = query.toLowerCase();
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(lowerQuery) ? '' : 'none';
        });
    }

    exportReport() {
        const report = {
            dateRange: this.dateRange,
            timestamp: new Date().toISOString(),
            summary: {
                totalMentions: 245800,
                avgSentiment: 76.2,
                engagementRate: 9.2,
                reach: 3200000
            }
        };

        Utils.downloadFile(
            JSON.stringify(report, null, 2),
            `analytics-report-${Date.now()}.json`,
            'application/json'
        );

        Notifications.success('Analytics report exported successfully');
    }

    exportMetrics() {
        // Get current filter value
        const platformFilter = document.getElementById('platformFilter');
        const filter = platformFilter ? platformFilter.value : 'all';

        const allData = [
            { platform: 'Twitter', mentions: 102453, sentiment: 75, engagement: 8.5, reach: 1250000, growth: 18 },
            { platform: 'Instagram', mentions: 89720, sentiment: 81, engagement: 14.2, reach: 1180000, growth: 28 },
            { platform: 'Reddit', mentions: 62890, sentiment: 68, engagement: 12.3, reach: 850000, growth: 24 },
            { platform: 'YouTube', mentions: 45120, sentiment: 82, engagement: 15.7, reach: 620000, growth: 12 },
            { platform: 'LinkedIn', mentions: 22340, sentiment: 79, engagement: 6.8, reach: 380000, growth: 31 },
            { platform: 'Facebook', mentions: 12997, sentiment: 71, engagement: 9.2, reach: 290000, growth: 8 }
        ];

        // Filter data based on current selection
        const data = filter === 'all'
            ? allData
            : allData.filter(row => row.platform.toLowerCase() === filter.toLowerCase());

        // Create CSV content
        const headers = ['Platform', 'Mentions', 'Sentiment (%)', 'Engagement (%)', 'Reach', 'Growth (%)'];
        const csvContent = [
            headers.join(','),
            ...data.map(row =>
                `${row.platform},${row.mentions},${row.sentiment},${row.engagement},${row.reach},${row.growth}`
            )
        ].join('\n');

        Utils.downloadFile(
            csvContent,
            `metrics-${filter}-${Date.now()}.csv`,
            'text/csv'
        );

        Notifications.success('Metrics exported successfully');
    }

    destroy() {
        // Cleanup
    }
}

// Create global instance for app.js
const Analytics = {
    instance: null,
    render() {
        this.instance = new AnalyticsPage();
        return this.instance.render();
    },
    init() {
        if (this.instance) {
            this.instance.init();
        }
    },
    async handleBrandChange(brandId, force = false) {
        if (this.instance) {
            await this.instance.handleBrandChange(brandId, force);
        }
    },
    destroy() {
        if (this.instance) {
            this.instance.destroy();
        }
    }
};

// Make available globally
window.Analytics = Analytics;

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnalyticsPage;
}
