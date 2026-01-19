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
    }

    render() {
        // Get current brand info
        const currentBrandId = typeof APIData !== 'undefined' ? APIData.currentBrand : 'apple';
        const brand = typeof APIData !== 'undefined' ? APIData.brands[currentBrandId] : null;
        const brandName = brand ? brand.name : 'Your Brand';

        return `
            <div class="analytics-container">
                <!-- Page Header -->
                <div class="page-header">
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
                    <div class="stat-card gradient-purple">
                        <div class="stat-icon-large"><span class="flat-icon lg icon-analytics"></span></div>
                        <div class="stat-label">Total Mentions</div>
                        <div class="stat-value">245.8K</div>
                        <div class="stat-change positive">+18.5% vs prev period</div>
                    </div>

                    <div class="stat-card gradient-success">
                        <div class="stat-icon-large"><span class="flat-icon lg icon-sentiment"></span></div>
                        <div class="stat-label">Avg Sentiment</div>
                        <div class="stat-value">76.2%</div>
                        <div class="stat-change positive">+5.3% vs prev period</div>
                    </div>

                    <div class="stat-card gradient-info">
                        <div class="stat-icon-large"><span class="flat-icon lg icon-users"></span></div>
                        <div class="stat-label">Unique Authors</div>
                        <div class="stat-value">12.4K</div>
                        <div class="stat-change positive">+22.1% vs prev period</div>
                    </div>

                    <div class="stat-card gradient-warning">
                        <div class="stat-icon-large"><span class="flat-icon lg icon-chart"></span></div>
                        <div class="stat-label">Engagement Rate</div>
                        <div class="stat-value">9.2%</div>
                        <div class="stat-change positive">+1.8% vs prev period</div>
                    </div>

                    <div class="stat-card gradient-danger">
                        <div class="stat-icon-large"><span class="flat-icon lg icon-broadcast"></span></div>
                        <div class="stat-label">Reach</div>
                        <div class="stat-value">3.2M</div>
                        <div class="stat-change positive">+45.6% vs prev period</div>
                    </div>
                </div>

                <!-- Analytics Tabs -->
                <div class="card">
                    <div class="card-header">
                        <div class="tabs" id="analyticsTabs">
                            <button class="tab active" data-tab="overview">Overview</button>
                            <button class="tab" data-tab="sentiment">Sentiment Analysis</button>
                            <button class="tab" data-tab="engagement">Engagement</button>
                            <button class="tab" data-tab="demographics">Demographics</button>
                            <button class="tab" data-tab="performance">Performance</button>
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
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Sentiment Breakdown</h3>
                            <div class="card-actions">
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
                            <h3 class="card-title">Platform Performance</h3>
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
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Activity by Hour</h3>
                            <div class="card-actions">
                                <button class="btn btn-sm btn-secondary">
                                    <i class="fas fa-download"></i>
                                </button>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="chart-container" style="height: 300px;">
                                <canvas id="hourlyActivityChart"></canvas>
                            </div>
                        </div>
                    </div>

                    <!-- Top Keywords -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Top Keywords</h3>
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
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Detailed Metrics</h3>
                        <div class="card-actions">
                            <input type="text" class="form-input" placeholder="Search..." id="searchMetrics">
                            <button class="btn btn-sm btn-secondary">
                                <i class="fas fa-filter"></i> Filter
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="table-container">
                            <table class="table">
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
        this.setupTabs();
        this.loadOverviewTab();
        this.initializeCharts();
        this.loadKeywords();
        this.loadMetricsTable();
        this.setupEventListeners();
        this.updateStatsCards();
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

            const sentiment = statCards[1].querySelector('.stat-value');
            if (sentiment) sentiment.textContent = this.brandData.sentiment + '%';

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
            dateRange.addEventListener('change', (e) => {
                this.dateRange = e.target.value;
                this.refreshData();
                Notifications.info(`Date range changed to ${e.target.value}`);
            });
        }

        // Export button
        const exportBtn = document.getElementById('exportAnalyticsBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportReport());
        }

        // Search metrics
        const searchInput = document.getElementById('searchMetrics');
        if (searchInput) {
            searchInput.addEventListener('input', Utils.debounce((e) => {
                this.filterMetrics(e.target.value);
            }, 300));
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
            <div class="overview-grid">
                <div class="overview-stat">
                    <div class="overview-label">Peak Activity Time</div>
                    <div class="overview-value">2:00 PM - 4:00 PM</div>
                    <div class="overview-meta">Most mentions during this window</div>
                </div>
                <div class="overview-stat">
                    <div class="overview-label">Top Platform</div>
                    <div class="overview-value">Twitter</div>
                    <div class="overview-meta">42% of all mentions</div>
                </div>
                <div class="overview-stat">
                    <div class="overview-label">Avg Response Time</div>
                    <div class="overview-value">2.4 hours</div>
                    <div class="overview-meta">15% faster than last period</div>
                </div>
                <div class="overview-stat">
                    <div class="overview-label">Virality Score</div>
                    <div class="overview-value">8.7/10</div>
                    <div class="overview-meta">Excellent shareability</div>
                </div>
            </div>
        `;
    }

    loadSentimentTab() {
        const content = document.getElementById('analyticsTabContent');
        if (!content) return;

        content.innerHTML = `
            <div class="sentiment-analysis">
                <div class="sentiment-breakdown-grid">
                    <div class="sentiment-box positive">
                        <div class="sentiment-icon"><span class="flat-icon lg icon-happy"></span></div>
                        <div class="sentiment-label">Positive</div>
                        <div class="sentiment-percentage">68.4%</div>
                        <div class="sentiment-count">168.1K mentions</div>
                    </div>
                    <div class="sentiment-box neutral">
                        <div class="sentiment-icon"><span class="flat-icon lg icon-neutral"></span></div>
                        <div class="sentiment-label">Neutral</div>
                        <div class="sentiment-percentage">24.3%</div>
                        <div class="sentiment-count">59.7K mentions</div>
                    </div>
                    <div class="sentiment-box negative">
                        <div class="sentiment-icon"><span class="flat-icon lg icon-sad"></span></div>
                        <div class="sentiment-label">Negative</div>
                        <div class="sentiment-percentage">7.3%</div>
                        <div class="sentiment-count">17.9K mentions</div>
                    </div>
                </div>
            </div>
        `;
    }

    loadEngagementTab() {
        const content = document.getElementById('analyticsTabContent');
        if (!content) return;

        content.innerHTML = `
            <div class="engagement-metrics">
                <p class="text-secondary">Engagement metrics analysis coming soon...</p>
            </div>
        `;
    }

    loadDemographicsTab() {
        const content = document.getElementById('analyticsTabContent');
        if (!content) return;

        content.innerHTML = `
            <div class="demographics-data">
                <p class="text-secondary">Demographics analysis coming soon...</p>
            </div>
        `;
    }

    loadPerformanceTab() {
        const content = document.getElementById('analyticsTabContent');
        if (!content) return;

        content.innerHTML = `
            <div class="performance-data">
                <p class="text-secondary">Performance metrics coming soon...</p>
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

        keywordList.innerHTML = keywords.map(kw => `
            <div class="keyword-item">
                <div class="keyword-word">#${kw.word}</div>
                <div class="keyword-stats">
                    <span class="keyword-count">${Utils.formatNumber(kw.count)}</span>
                    <div class="keyword-sentiment" style="width: ${kw.sentiment}%; background: ${Utils.getSentimentColor(kw.sentiment)}"></div>
                </div>
            </div>
        `).join('');
    }

    loadMetricsTable() {
        const tbody = document.getElementById('metricsTableBody');
        if (!tbody) return;

        const data = [
            { platform: 'Twitter', mentions: 102453, sentiment: 75, engagement: 8.5, reach: 1250000, growth: 18 },
            { platform: 'Reddit', mentions: 62890, sentiment: 68, engagement: 12.3, reach: 850000, growth: 24 },
            { platform: 'YouTube', mentions: 45120, sentiment: 82, engagement: 15.7, reach: 620000, growth: 12 },
            { platform: 'LinkedIn', mentions: 22340, sentiment: 79, engagement: 6.8, reach: 380000, growth: 31 },
            { platform: 'Facebook', mentions: 12997, sentiment: 71, engagement: 9.2, reach: 290000, growth: 8 }
        ];

        tbody.innerHTML = data.map(row => `
            <tr>
                <td><strong>${row.platform}</strong></td>
                <td>${Utils.formatNumber(row.mentions)}</td>
                <td>
                    <span class="badge badge-${Utils.getSentimentLabel(row.sentiment).toLowerCase()}">
                        ${row.sentiment}%
                    </span>
                </td>
                <td>${row.engagement}%</td>
                <td>${Utils.formatNumber(row.reach)}</td>
                <td class="positive">+${row.growth}%</td>
            </tr>
        `).join('');
    }

    refreshData() {
        this.loadMetricsTable();
        this.loadKeywords();
        Notifications.success('Analytics data refreshed');
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
