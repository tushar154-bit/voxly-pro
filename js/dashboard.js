/**
 * Dashboard Page Component - Enhanced Interactive Version
 * Main dashboard with platform-aware stats, interactive charts, and dynamic filtering
 * Updated: 2026-01-22 16:04
 */

console.log('📊 Dashboard JS loaded - version 2026-01-22 16:04');

class DashboardPage {
    constructor() {
        this.charts = {};
        this.currentBrand = 'apple'; // Default brand from APIData
        this.currentPlatform = 'all';
        this.platformData = null;
        this.refreshInterval = null;
        this.isAnimating = false;
        this.resizeObserver = null;
        this.zoomLevel = 1;
        this.cardSizeMode = 'normal'; // 'compact', 'normal', 'expanded'
        this.brandData = null;
    }

    render() {
        return `
            <div class="dashboard-container">
                <!-- Platform Filter Bar with SVG Icons -->
                <div class="filter-bar animated-fade-in">
                    <div class="filter-group">
                        <span class="filter-label">
                            <span class="chip-icon platform-icon icon-all"></span>
                            Filter by Platform:
                        </span>
                        <div class="filter-chips" id="platformFilters">
                            <button class="filter-chip active" data-platform="all">
                                <span class="chip-icon platform-icon icon-all"></span>
                                <span class="chip-text">All Platforms</span>
                                <span class="chip-count" id="countAll">-</span>
                            </button>
                            <button class="filter-chip" data-platform="twitter">
                                <span class="chip-icon platform-icon icon-twitter"></span>
                                <span class="chip-text">X</span>
                                <span class="chip-count" id="countTwitter">-</span>
                            </button>
                            <button class="filter-chip" data-platform="reddit">
                                <span class="chip-icon platform-icon icon-reddit"></span>
                                <span class="chip-text">Reddit</span>
                                <span class="chip-count" id="countReddit">-</span>
                            </button>
                            <button class="filter-chip" data-platform="youtube">
                                <span class="chip-icon platform-icon icon-youtube"></span>
                                <span class="chip-text">YouTube</span>
                                <span class="chip-count" id="countYoutube">-</span>
                            </button>
                            <button class="filter-chip" data-platform="linkedin">
                                <span class="chip-icon platform-icon icon-linkedin"></span>
                                <span class="chip-text">LinkedIn</span>
                                <span class="chip-count" id="countLinkedin">-</span>
                            </button>
                            <button class="filter-chip" data-platform="facebook">
                                <span class="chip-icon platform-icon icon-facebook"></span>
                                <span class="chip-text">Facebook</span>
                                <span class="chip-count" id="countFacebook">-</span>
                            </button>
                            <button class="filter-chip" data-platform="instagram">
                                <span class="chip-icon platform-icon icon-instagram"></span>
                                <span class="chip-text">Instagram</span>
                                <span class="chip-count" id="countInstagram">-</span>
                            </button>
                            <button class="filter-chip" data-platform="news">
                                <span class="chip-icon platform-icon icon-news"></span>
                                <span class="chip-text">News</span>
                                <span class="chip-count" id="countNews">-</span>
                            </button>
                            <button class="filter-chip" data-platform="reviews">
                                <span class="chip-icon platform-icon icon-reviews"></span>
                                <span class="chip-text">Reviews</span>
                                <span class="chip-count" id="countReviews">-</span>
                            </button>
                        </div>
                    </div>
                    <div class="filter-actions">
                        <button class="refresh-btn" id="refreshData" title="Refresh Data">
                            <span class="refresh-icon">↻</span>
                        </button>
                    </div>
                </div>

                <!-- Current Platform Indicator -->
                <div class="platform-indicator animated-fade-in" id="platformIndicator" style="display: none;">
                    <div class="indicator-content">
                        <span class="indicator-icon platform-icon lg" id="indicatorIcon"></span>
                        <span class="indicator-text">Showing data for <strong id="indicatorName">Twitter</strong></span>
                        <button class="indicator-clear" id="clearFilter">✕ Show All</button>
                    </div>
                </div>

                <!-- API Data Source Status -->
                ${typeof APIService !== 'undefined' ? APIService.getStatusIndicatorHTML() : ''}

                <!-- Stats Overview -->
                <div class="stats-grid animated-fade-in">
                    <div class="stat-card primary interactive" data-stat="sentiment">
                        <div class="stat-card-bg">
                            <div class="stat-bg-shape shape-1"></div>
                            <div class="stat-bg-shape shape-2"></div>
                            <div class="stat-bg-shape shape-3"></div>
                        </div>
                        <div class="stat-header">
                            <span class="stat-title">Overall Sentiment</span>
                            <div class="stat-icon"><span class="flat-icon icon-sentiment"></span></div>
                        </div>
                        <div class="stat-main">
                            <div class="stat-value" id="sentimentValue">
                                <span class="value-number">75</span>
                                <span class="value-suffix">%</span>
                            </div>
                            <div class="stat-change positive" id="sentimentChange">
                                <span class="stat-change-icon">↑</span>
                                <span>+12% from last week</span>
                            </div>
                        </div>
                        <div class="stat-trend">
                            <canvas id="sentimentSparkline"></canvas>
                        </div>
                        <div class="stat-footer">
                            <div class="stat-meta" id="sentimentBreakdown">
                                <span class="meta-item positive">
                                    <span class="meta-label">Positive</span>
                                    <span class="meta-value" id="positiveCount">-</span>
                                </span>
                                <span class="meta-item neutral">
                                    <span class="meta-label">Neutral</span>
                                    <span class="meta-value" id="neutralCount">-</span>
                                </span>
                                <span class="meta-item negative">
                                    <span class="meta-label">Negative</span>
                                    <span class="meta-value" id="negativeCount">-</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="stat-card success interactive" data-stat="mentions">
                        <div class="stat-card-bg">
                            <div class="stat-bg-shape shape-1"></div>
                            <div class="stat-bg-shape shape-2"></div>
                            <div class="stat-bg-shape shape-3"></div>
                        </div>
                        <div class="stat-header">
                            <span class="stat-title">Total Mentions</span>
                            <div class="stat-icon"><span class="flat-icon icon-chat"></span></div>
                        </div>
                        <div class="stat-main">
                            <div class="stat-value" id="mentionsValue">
                                <span class="value-number">156.8</span>
                                <span class="value-suffix">K</span>
                            </div>
                            <div class="stat-change positive" id="mentionsChange">
                                <span class="stat-change-icon">↑</span>
                                <span>+23% from last week</span>
                            </div>
                        </div>
                        <div class="stat-trend">
                            <canvas id="mentionsSparkline"></canvas>
                        </div>
                        <div class="stat-footer">
                            <div class="stat-meta">
                                <span class="meta-item">
                                    <span class="meta-icon flat-icon icon-analytics"></span>
                                    <span id="avgDaily">5.2K/day</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="stat-card warning interactive" data-stat="engagement">
                        <div class="stat-card-bg">
                            <div class="stat-bg-shape shape-1"></div>
                            <div class="stat-bg-shape shape-2"></div>
                            <div class="stat-bg-shape shape-3"></div>
                        </div>
                        <div class="stat-header">
                            <span class="stat-title">Engagement Rate</span>
                            <div class="stat-icon"><span class="flat-icon icon-engagement"></span></div>
                        </div>
                        <div class="stat-main">
                            <div class="stat-value" id="engagementValue">
                                <span class="value-number">8.5</span>
                                <span class="value-suffix">%</span>
                            </div>
                            <div class="stat-change positive" id="engagementChange">
                                <span class="stat-change-icon">↑</span>
                                <span>+3.2% from last week</span>
                            </div>
                        </div>
                        <div class="stat-trend">
                            <canvas id="engagementSparkline"></canvas>
                        </div>
                        <div class="stat-footer">
                            <div class="stat-meta">
                                <span class="meta-item">
                                    <span class="meta-icon flat-icon icon-heart"></span>
                                    <span id="totalLikes">392K</span>
                                </span>
                                <span class="meta-item">
                                    <span class="meta-icon flat-icon icon-chat"></span>
                                    <span id="totalComments">125K</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="stat-card info interactive" data-stat="reach">
                        <div class="stat-card-bg">
                            <div class="stat-bg-shape shape-1"></div>
                            <div class="stat-bg-shape shape-2"></div>
                            <div class="stat-bg-shape shape-3"></div>
                        </div>
                        <div class="stat-header">
                            <span class="stat-title">Total Reach</span>
                            <div class="stat-icon"><span class="flat-icon icon-broadcast"></span></div>
                        </div>
                        <div class="stat-main">
                            <div class="stat-value" id="reachValue">
                                <span class="value-number">12.5</span>
                                <span class="value-suffix">M</span>
                            </div>
                            <div class="stat-change positive" id="reachChange">
                                <span class="stat-change-icon">↑</span>
                                <span>+45% from last week</span>
                            </div>
                        </div>
                        <div class="stat-trend">
                            <canvas id="reachSparkline"></canvas>
                        </div>
                        <div class="stat-footer">
                            <div class="stat-meta">
                                <span class="meta-item">
                                    <span class="meta-icon flat-icon icon-users"></span>
                                    <span id="uniqueUsers">8.1M users</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Main Charts Grid - Improved Layout -->
                <div class="charts-section animated-fade-in">
                    <div class="section-header">
                        <h2 class="section-title">Analytics Overview</h2>
                        <div class="section-actions">
                            <div class="time-range-display" id="timeRangeDisplay">
                                <svg class="range-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                                <span id="dateRangeText">Jan 13 - Jan 20</span>
                            </div>
                            <select class="time-select" id="timeRange">
                                <option value="7d">Last 7 Days</option>
                                <option value="14d">Last 14 Days</option>
                                <option value="30d">Last 30 Days</option>
                                <option value="90d">Last 90 Days</option>
                            </select>
                        </div>
                    </div>

                    <div class="chart-grid">
                        <!-- Sentiment Over Time - Full Width -->
                        <div class="chart-card full-width sentiment-trend-card">
                            <div class="chart-header">
                                <div>
                                    <h3 class="chart-title">Sentiment Trend</h3>
                                    <p class="chart-subtitle">Positive, Neutral & Negative sentiment over time</p>
                                </div>
                                <div class="chart-actions">
                                    <button class="chart-action-btn" data-action="download" data-chart="sentimentChart" title="Download"><span class="flat-icon icon-download"></span></button>
                                </div>
                            </div>
                            <div class="chart-container large">
                                <canvas id="sentimentChart"></canvas>
                            </div>
                            <!-- Quick Stats below chart -->
                            <div class="chart-quick-stats">
                                <div class="chart-quick-stat">
                                    <span class="chart-quick-stat-value positive" id="avgPositive">78%</span>
                                    <span class="chart-quick-stat-label">Avg Positive</span>
                                </div>
                                <div class="chart-quick-stat">
                                    <span class="chart-quick-stat-value neutral" id="avgNeutral">15%</span>
                                    <span class="chart-quick-stat-label">Avg Neutral</span>
                                </div>
                                <div class="chart-quick-stat">
                                    <span class="chart-quick-stat-value negative" id="avgNegative">7%</span>
                                    <span class="chart-quick-stat-label">Avg Negative</span>
                                </div>
                                <div class="chart-quick-stat">
                                    <span class="chart-quick-stat-value" id="sentimentTrend" style="color: #10b981;">+3.2%</span>
                                    <span class="chart-quick-stat-label">Trend (7d)</span>
                                </div>
                            </div>
                        </div>

                        <!-- Platform Distribution & Mentions Volume -->
                        <div class="chart-card">
                            <div class="chart-header">
                                <div>
                                    <h3 class="chart-title"><span class="material-icons" style="color: #8b5cf6; font-size: 1.25rem; vertical-align: middle; margin-right: 0.5rem;">pie_chart</span>Platform Distribution</h3>
                                    <p class="chart-subtitle">Share of mentions by platform</p>
                                </div>
                                <div class="chart-actions">
                                    <button class="chart-action-btn" data-action="download" data-chart="platformChart" title="Download"><span class="flat-icon icon-download"></span></button>
                                </div>
                            </div>
                            <div class="chart-container">
                                <canvas id="platformChart"></canvas>
                            </div>
                            <!-- Platform Stats -->
                            <div class="chart-platform-stats">
                                <div class="platform-stat-item">
                                    <div class="platform-stat-icon twitter">
                                        <span class="platform-icon icon-twitter"></span>
                                    </div>
                                    <div class="platform-stat-info">
                                        <span class="platform-stat-name">X (Twitter)</span>
                                        <span class="platform-stat-value" id="twitterMentions">42.3K</span>
                                    </div>
                                    <span class="platform-stat-trend positive">+18%</span>
                                </div>
                                <div class="platform-stat-item">
                                    <div class="platform-stat-icon reddit">
                                        <span class="platform-icon icon-reddit"></span>
                                    </div>
                                    <div class="platform-stat-info">
                                        <span class="platform-stat-name">Reddit</span>
                                        <span class="platform-stat-value" id="redditMentions">28.1K</span>
                                    </div>
                                    <span class="platform-stat-trend positive">+24%</span>
                                </div>
                                <div class="platform-stat-item">
                                    <div class="platform-stat-icon youtube">
                                        <span class="platform-icon icon-youtube"></span>
                                    </div>
                                    <div class="platform-stat-info">
                                        <span class="platform-stat-name">YouTube</span>
                                        <span class="platform-stat-value" id="youtubeMentions">19.5K</span>
                                    </div>
                                    <span class="platform-stat-trend positive">+12%</span>
                                </div>
                            </div>
                        </div>

                        <div class="chart-card">
                            <div class="chart-header">
                                <div>
                                    <h3 class="chart-title"><span class="material-icons" style="color: #8b5cf6; font-size: 1.25rem; vertical-align: middle; margin-right: 0.5rem;">bar_chart</span>Mentions Volume</h3>
                                    <p class="chart-subtitle">Hourly mention activity (24h)</p>
                                </div>
                                <div class="chart-actions">
                                    <button class="chart-action-btn" data-action="download" data-chart="mentionsChart" title="Download"><span class="flat-icon icon-download"></span></button>
                                </div>
                            </div>
                            <div class="chart-container">
                                <canvas id="mentionsChart"></canvas>
                            </div>
                            <!-- Mentions Quick Stats -->
                            <div class="chart-mentions-stats">
                                <div class="mentions-stats-row">
                                    <div class="mentions-stat-card">
                                        <div class="mentions-stat-icon peak">
                                            <i class="fas fa-arrow-trend-up"></i>
                                        </div>
                                        <div class="mentions-stat-content">
                                            <span class="mentions-stat-label">Peak Hour</span>
                                            <span class="mentions-stat-value" id="peakHour">2:00 PM</span>
                                        </div>
                                    </div>
                                    <div class="mentions-stat-card">
                                        <div class="mentions-stat-icon avg">
                                            <i class="fas fa-chart-line"></i>
                                        </div>
                                        <div class="mentions-stat-content">
                                            <span class="mentions-stat-label">Avg/Hour</span>
                                            <span class="mentions-stat-value" id="avgHourly">6.5K</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="mentions-stat-card total-card">
                                    <div class="mentions-stat-icon total">
                                        <i class="fas fa-comments"></i>
                                    </div>
                                    <div class="mentions-stat-content">
                                        <span class="mentions-stat-label">24h Total</span>
                                        <span class="mentions-stat-value" id="total24h">156.8K</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Emotion Analysis -->
                        <div class="chart-card">
                            <div class="chart-header">
                                <div>
                                    <h3 class="chart-title"><span class="material-icons" style="color: #8b5cf6; font-size: 1.25rem; vertical-align: middle; margin-right: 0.5rem;">mood</span>Emotion Analysis</h3>
                                    <p class="chart-subtitle">Breakdown by emotion type</p>
                                </div>
                                <div class="chart-actions">
                                    <button class="chart-action-btn" data-action="download" data-chart="emotionChart" title="Download"><span class="flat-icon icon-download"></span></button>
                                </div>
                            </div>
                            <div class="chart-container">
                                <canvas id="emotionChart"></canvas>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Bottom Section: Activity & Top Posts -->
                <div class="bottom-section animated-fade-in">
                    <!-- Trending Topics & Word Cloud -->
                    <div class="trends-section">
                        <div class="chart-card">
                            <div class="chart-header">
                                <div>
                                    <h3 class="chart-title"><span class="flat-icon icon-trending"></span> Trending Topics</h3>
                                    <p class="chart-subtitle">Most discussed topics this week</p>
                                </div>
                            </div>
                            <div class="trending-list" id="trendingTopics">
                                <!-- Trending items will be loaded here -->
                            </div>
                        </div>
                    </div>

                    <!-- Recent Activity Feed -->
                    <div class="activity-section">
                        <div class="activity-feed">
                            <div class="activity-header">
                                <h3 class="activity-title"><span class="flat-icon icon-live" style="margin-right: 0.5rem;"></span>Live Activity Feed</h3>
                                <div class="activity-controls">
                                    <span class="live-indicator">
                                        <span class="live-dot"></span>
                                        Live
                                    </span>
                                    <button class="chart-action-btn" id="pauseActivity" title="Pause"><span class="flat-icon icon-pause"></span></button>
                                </div>
                            </div>
                            <div class="activity-list" id="activityList">
                                <!-- Activity items will be loaded here -->
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Top Posts Table -->
                <div class="posts-section animated-fade-in">
                    <div class="data-table">
                        <div class="table-header">
                            <div class="table-title-section">
                                <h3 class="chart-title"><span class="flat-icon icon-posts"></span> Top Performing Posts</h3>
                                <p class="chart-subtitle">Highest engagement mentions this week</p>
                            </div>
                            <div class="table-actions">
                                <button class="btn-secondary" id="exportPosts">
                                    <span class="flat-icon icon-download"></span> Export
                                </button>
                            </div>
                        </div>
                        <div class="table-wrapper posts-table-wrapper">
                            <table class="posts-table">
                                <colgroup>
                                    <col style="width: 15%;">
                                    <col style="width: 12%;">
                                    <col style="width: 28%;">
                                    <col style="width: 10%;">
                                    <col style="width: 18%;">
                                    <col style="width: 9%;">
                                    <col style="width: 8%;">
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>Author</th>
                                        <th>Platform</th>
                                        <th>Content</th>
                                        <th>Sentiment</th>
                                        <th>Engagement</th>
                                        <th>Reach</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody id="postsTable">
                                    <!-- Posts will be loaded here -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    init() {
        console.log('🎯 Initializing Enhanced Dashboard...');

        // Set default time range
        this.currentTimeRange = '7d';

        // Load initial brand data from APIData
        this.loadBrandData();

        // Load initial platform data
        this.loadPlatformData();

        // Initialize charts
        this.initializeCharts();

        // Load data
        this.loadData();

        // Set up event listeners
        this.setupEventListeners();

        // Start auto-refresh for activity feed
        this.startAutoRefresh();

        // Initialize dynamic KPI card sizing
        this.initDynamicCardSizing();

        // Initialize date range display
        this.initDateRangeDisplay();

        // Initialize card footer data with defaults
        this.initCardFooterData();

        console.log('✅ Enhanced Dashboard initialized');
    }

    initCardFooterData() {
        // Set default values for 3rd card (Engagement - likes & comments)
        const totalLikesEl = document.getElementById('totalLikes');
        const totalCommentsEl = document.getElementById('totalComments');
        if (totalLikesEl) totalLikesEl.textContent = '392K';
        if (totalCommentsEl) totalCommentsEl.textContent = '125K';

        // Set default values for 4th card (Reach - unique users)
        const uniqueUsersEl = document.getElementById('uniqueUsers');
        if (uniqueUsersEl) uniqueUsersEl.textContent = '8.1M users';
    }

    initDateRangeDisplay() {
        // Set initial date range display (last 7 days)
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 7);

        const formatDate = (date) => {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        };

        const dateRangeText = document.getElementById('dateRangeText');
        if (dateRangeText) {
            dateRangeText.textContent = `${formatDate(startDate)} - ${formatDate(endDate)}`;
        }
    }

    /**
     * Load brand selector chips from APIData
     */
    async loadBrandSelector() {
        if (typeof APIData === 'undefined') {
            console.warn('APIData not available');
            return;
        }

        const brandSelector = document.getElementById('brandSelector');
        if (!brandSelector) return;

        try {
            const response = await APIData.getBrands();
            if (response.success) {
                const brands = response.data;

                brandSelector.innerHTML = brands.map(brand => `
                    <button class="brand-chip ${brand.id === this.currentBrand ? 'active' : ''}"
                            data-brand="${brand.id}"
                            style="--brand-color: ${brand.color}">
                        <img src="${brand.logo}" alt="${brand.name}" class="brand-chip-logo"
                             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                        <span class="brand-chip-fallback" style="display: none; background: ${brand.color}">
                            ${brand.name.charAt(0)}
                        </span>
                        <span class="brand-chip-name">${brand.name}</span>
                    </button>
                `).join('');

                // Update brand info panel
                this.updateBrandInfo(this.currentBrand);

                // Set up brand click handlers
                brandSelector.querySelectorAll('.brand-chip').forEach(chip => {
                    chip.addEventListener('click', (e) => {
                        this.handleBrandChange(e.currentTarget.dataset.brand);
                    });
                });
            }
        } catch (error) {
            console.error('Failed to load brands:', error);
        }
    }

    /**
     * Update brand info panel
     */
    updateBrandInfo(brandId) {
        if (typeof APIData === 'undefined') return;

        const brand = APIData.brands[brandId];
        if (!brand) return;

        const brandLogo = document.getElementById('brandLogo');
        const brandName = document.getElementById('selectedBrandName');
        const brandIndustry = document.getElementById('selectedBrandIndustry');

        if (brandLogo) {
            brandLogo.innerHTML = `
                <img src="${brand.logo}" alt="${brand.name}"
                     onerror="this.style.display='none'; this.parentElement.innerHTML='<span class=\\'brand-logo-fallback\\' style=\\'background:${brand.color}\\'>${brand.name.charAt(0)}</span>';">
            `;
        }
        if (brandName) brandName.textContent = brand.name;
        if (brandIndustry) {
            const industry = APIData.industries[brand.industry];
            brandIndustry.textContent = industry ? industry.name : brand.industry;
        }
    }

    /**
     * Handle brand change
     * @param {string} brandId - The brand ID to switch to
     * @param {boolean} force - Force update even if same brand
     */
    async handleBrandChange(brandId, force = false) {
        console.log(`📍 handleBrandChange called with brandId: ${brandId}, force: ${force}, currentBrand: ${this.currentBrand}, isAnimating: ${this.isAnimating}`);

        if (this.isAnimating) {
            console.log('⚠️ Animation in progress, skipping');
            return;
        }
        if (!force && brandId === this.currentBrand) {
            console.log('⚠️ Same brand and not forced, skipping');
            return;
        }
        this.isAnimating = true;

        console.log(`🔄 Switching to brand: ${brandId}`);

        // Update current brand
        this.currentBrand = brandId;
        if (typeof APIData !== 'undefined') {
            APIData.setActiveBrand(brandId);
        }

        // Clear API cache and stored results for fresh data
        if (typeof APIService !== 'undefined') {
            APIService.clearCache();
        }
        this.apiResults = null;
        this.cachedPosts = null;

        // Fetch new real-time API data for the new brand
        console.log('📡 Fetching real-time API data for new brand...');
        await this.fetchRealTimeData();

        // Reload all data for the new brand
        console.log('📊 Loading brand data...');
        await this.loadBrandData();
        console.log('📊 Brand data loaded, brandData:', this.brandData);

        this.loadPlatformData();
        this.loadActivityFeed();
        this.loadPostsTable();
        await this.loadTrendingTopics();
        console.log('✅ All data reloaded for brand:', brandId);

        // Update charts with new brand data
        if (typeof Charts !== 'undefined') {
            Charts.updateAllChartsForPlatform(this.currentPlatform);
            console.log('📈 Charts updated');
        }

        // Show notification
        const brand = APIData?.brands[brandId];
        try {
            if (window.notificationManager) {
                window.notificationManager.show(`Now monitoring ${brand?.name || brandId}`, 'success');
            }
        } catch (e) {
            console.warn('Notification failed:', e);
        }
        console.log(`🎉 Brand change complete: ${brand?.name || brandId}`);

        // Reset animation flag
        this.isAnimating = false;
    }

    /**
     * Load brand-specific data from API
     */
    async loadBrandData() {
        if (typeof APIData === 'undefined') return;

        try {
            const metricsResponse = await APIData.getBrandMetrics(this.currentBrand);
            if (metricsResponse.success) {
                this.brandData = metricsResponse.data;
                this.updateBrandStats();
            }
        } catch (error) {
            console.error('Failed to load brand data:', error);
        }
    }

    /**
     * Update stats with brand-specific data
     */
    updateBrandStats() {
        if (!this.brandData) return;

        // Update sentiment
        const sentimentEl = document.querySelector('#sentimentValue .value-number');
        if (sentimentEl) {
            this.animateValue(sentimentEl, this.brandData.sentiment);
        }

        // Update breakdown counts
        const positiveEl = document.getElementById('positiveCount');
        const neutralEl = document.getElementById('neutralCount');
        const negativeEl = document.getElementById('negativeCount');

        if (positiveEl) this.animateValue(positiveEl, this.brandData.positive, true);
        if (neutralEl) this.animateValue(neutralEl, this.brandData.neutral, true);
        if (negativeEl) this.animateValue(negativeEl, this.brandData.negative, true);

        // Update mentions
        const mentionsEl = document.querySelector('#mentionsValue .value-number');
        const mentionsSuffix = document.querySelector('#mentionsValue .value-suffix');
        if (mentionsEl) {
            const formatted = Utils.formatNumber(this.brandData.mentions);
            const match = formatted.match(/^([\d.]+)([KMB]?)$/);
            if (match) {
                this.animateValue(mentionsEl, parseFloat(match[1]));
                if (mentionsSuffix) mentionsSuffix.textContent = match[2];
            }
        }

        // Update engagement
        const engagementEl = document.querySelector('#engagementValue .value-number');
        if (engagementEl) {
            this.animateValue(engagementEl, this.brandData.engagement);
        }

        // Update reach
        const reachEl = document.querySelector('#reachValue .value-number');
        const reachSuffix = document.querySelector('#reachValue .value-suffix');
        if (reachEl) {
            const formatted = Utils.formatNumber(this.brandData.reach);
            const match = formatted.match(/^([\d.]+)([KMB]?)$/);
            if (match) {
                this.animateValue(reachEl, parseFloat(match[1]));
                if (reachSuffix) reachSuffix.textContent = match[2];
            }
        }

        // Update growth indicators
        this.updateGrowthIndicator('sentimentChange', Math.round(this.brandData.growth));
        this.updateGrowthIndicator('mentionsChange', Math.round(this.brandData.growth + 5));
        this.updateGrowthIndicator('engagementChange', Math.round(this.brandData.growth - 2));
        this.updateGrowthIndicator('reachChange', Math.round(this.brandData.growth + 15));

        // Update engagement card metrics (3rd card)
        const totalLikesEl2 = document.getElementById('totalLikes');
        const totalCommentsEl2 = document.getElementById('totalComments');
        const brandMentions = this.brandData.mentions || 150000;
        const brandReach = this.brandData.reach || 12000000;

        if (totalLikesEl2) {
            const likes = Math.round(brandMentions * 2.5);
            totalLikesEl2.textContent = Utils.formatNumber(likes);
        }
        if (totalCommentsEl2) {
            const comments = Math.round(brandMentions * 0.8);
            totalCommentsEl2.textContent = Utils.formatNumber(comments);
        }

        // Update reach card metrics (4th card)
        const uniqueUsersEl2 = document.getElementById('uniqueUsers');
        if (uniqueUsersEl2) {
            const uniqueUsers = Math.round(brandReach * 0.65);
            uniqueUsersEl2.textContent = Utils.formatNumber(uniqueUsers) + ' users';
        }
    }

    /**
     * Initialize dynamic card sizing based on viewport and zoom level
     */
    initDynamicCardSizing() {
        // Set up ResizeObserver for the stats grid and charts
        this.setupResizeObserver();

        // Listen for window resize (includes zoom changes)
        this.boundHandleResize = this.handleViewportChange.bind(this);
        window.addEventListener('resize', this.boundHandleResize);

        // Listen for zoom changes via visual viewport API (modern browsers)
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', this.boundHandleResize);
        }

        // Initial resize of charts
        this.resizeAllCharts();
    }

    /**
     * Set up ResizeObserver for responsive components
     */
    setupResizeObserver() {
        if (!window.ResizeObserver) return;

        this.resizeObserver = new ResizeObserver((entries) => {
            // Debounce resize handling
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(() => {
                this.resizeAllCharts();
            }, 50);
        });

        // Observe the stats grid container
        const statsGrid = document.querySelector('.stats-grid');
        if (statsGrid) {
            this.resizeObserver.observe(statsGrid);
        }

        // Observe chart containers
        document.querySelectorAll('.chart-container').forEach(container => {
            this.resizeObserver.observe(container);
        });
    }

    /**
     * Handle viewport/zoom changes
     */
    handleViewportChange() {
        // Debounce the resize handling
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            this.resizeAllCharts();
        }, 100);
    }

    /**
     * Resize all charts to fit their containers
     */
    resizeAllCharts() {
        Object.values(this.charts).forEach(chart => {
            if (chart && typeof chart.resize === 'function') {
                chart.resize();
            }
        });
    }

    loadPlatformData() {
        if (typeof MockData !== 'undefined') {
            // Load counts for each platform
            const platforms = ['twitter', 'reddit', 'youtube', 'linkedin', 'facebook', 'instagram', 'news', 'reviews'];

            let totalMentions = 0;
            platforms.forEach(platform => {
                const stats = MockData.getPlatformStats(platform);
                const countEl = document.getElementById(`count${platform.charAt(0).toUpperCase() + platform.slice(1)}`);
                if (countEl && stats) {
                    countEl.textContent = Utils.formatNumber(stats.mentions);
                    totalMentions += stats.mentions;
                }
            });

            // Set all platforms count
            const countAll = document.getElementById('countAll');
            if (countAll) {
                countAll.textContent = Utils.formatNumber(totalMentions);
            }

            // Load current platform data
            this.platformData = MockData.getPlatformData(this.currentPlatform);
            this.updateStats();
        }
    }

    setupEventListeners() {
        // Platform filter chips
        document.querySelectorAll('#platformFilters .filter-chip').forEach(chip => {
            chip.addEventListener('click', (e) => {
                this.handlePlatformFilter(e.currentTarget);
            });
        });

        // Clear filter button
        const clearFilter = document.getElementById('clearFilter');
        if (clearFilter) {
            clearFilter.addEventListener('click', () => {
                this.handlePlatformFilter(document.querySelector('[data-platform="all"]'));
            });
        }

        // Refresh button
        const refreshBtn = document.getElementById('refreshData');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.refreshAllData();
            });
        }

        // Time range selector
        const timeRange = document.getElementById('timeRange');
        if (timeRange) {
            timeRange.addEventListener('change', (e) => {
                this.handleTimeRangeChange(e.target.value);
            });
        }

        // Posts platform filter
        const postsFilterPlatform = document.getElementById('postsFilterPlatform');
        if (postsFilterPlatform) {
            postsFilterPlatform.addEventListener('change', (e) => {
                this.handlePostsFilter(e.target.value);
            });
        }

        // Pause activity button
        const pauseBtn = document.getElementById('pauseActivity');
        if (pauseBtn) {
            pauseBtn.addEventListener('click', () => {
                this.toggleActivityFeed();
            });
        }

        // Chart action buttons
        document.querySelectorAll('.chart-action-btn[data-action]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                const chartId = e.currentTarget.dataset.chart;
                this.handleChartAction(action, chartId);
            });
        });

        // Interactive stat cards
        document.querySelectorAll('.stat-card.interactive').forEach(card => {
            card.addEventListener('click', () => {
                card.classList.toggle('expanded');
            });
        });
    }

    handlePlatformFilter(chip) {
        if (this.isAnimating) return;
        this.isAnimating = true;

        const platform = chip.dataset.platform;

        // Update active state
        document.querySelectorAll('#platformFilters .filter-chip').forEach(c => {
            c.classList.remove('active');
        });
        chip.classList.add('active');

        // Update current platform
        this.currentPlatform = platform;

        // Show/hide platform indicator
        const indicator = document.getElementById('platformIndicator');
        if (platform !== 'all') {
            const config = MockData?.platformConfig?.[platform];
            if (indicator && config) {
                const iconEl = document.getElementById('indicatorIcon');
                // Clear previous classes and add the new platform icon class
                iconEl.className = `indicator-icon platform-icon lg icon-${platform}`;
                document.getElementById('indicatorName').textContent = config.name;
                indicator.style.display = 'block';
                indicator.classList.add('slide-in');
            }
        } else {
            if (indicator) {
                indicator.style.display = 'none';
                indicator.classList.remove('slide-in');
            }
        }

        // Reload data for platform
        this.platformData = MockData?.getPlatformData?.(platform);
        this.updateStats();

        // Update all charts with animation
        if (typeof Charts !== 'undefined') {
            Charts.updateAllChartsForPlatform(platform);
        }

        // Reload activity feed and posts
        this.loadActivityFeed();
        this.loadPostsTable();
        this.loadTrendingTopics();

        setTimeout(() => {
            this.isAnimating = false;
        }, 500);
    }

    updateStats() {
        if (!this.platformData) return;

        // Update sentiment
        const sentimentEl = document.querySelector('#sentimentValue .value-number');
        if (sentimentEl) {
            this.animateValue(sentimentEl, this.platformData.sentiment);
        }

        // Update breakdown
        document.getElementById('positiveCount')?.textContent &&
            this.animateValue(document.getElementById('positiveCount'), this.platformData.positive, true);
        document.getElementById('neutralCount')?.textContent &&
            this.animateValue(document.getElementById('neutralCount'), this.platformData.neutral, true);
        document.getElementById('negativeCount')?.textContent &&
            this.animateValue(document.getElementById('negativeCount'), this.platformData.negative, true);

        // Update mentions
        const mentionsEl = document.querySelector('#mentionsValue .value-number');
        const mentionsSuffix = document.querySelector('#mentionsValue .value-suffix');
        if (mentionsEl) {
            const formatted = Utils.formatNumber(this.platformData.mentions);
            const match = formatted.match(/^([\d.]+)([KMB]?)$/);
            if (match) {
                this.animateValue(mentionsEl, parseFloat(match[1]));
                if (mentionsSuffix) mentionsSuffix.textContent = match[2];
            }
        }

        // Update avg daily
        document.getElementById('avgDaily')?.textContent &&
            (document.getElementById('avgDaily').textContent =
                Utils.formatNumber(Math.round(this.platformData.mentions / 30)) + '/day');

        // Update engagement
        const engagementEl = document.querySelector('#engagementValue .value-number');
        if (engagementEl) {
            this.animateValue(engagementEl, parseFloat(this.platformData.engagement));
        }

        // Update reach
        const reachEl = document.querySelector('#reachValue .value-number');
        const reachSuffix = document.querySelector('#reachValue .value-suffix');
        if (reachEl) {
            const formatted = Utils.formatNumber(this.platformData.reach);
            const match = formatted.match(/^([\d.]+)([KMB]?)$/);
            if (match) {
                this.animateValue(reachEl, parseFloat(match[1]));
                if (reachSuffix) reachSuffix.textContent = match[2];
            }
        }

        // Update growth indicators
        this.updateGrowthIndicator('sentimentChange', this.platformData.growth);
        this.updateGrowthIndicator('mentionsChange', this.platformData.growth + 5);
        this.updateGrowthIndicator('engagementChange', this.platformData.growth - 2);
        this.updateGrowthIndicator('reachChange', this.platformData.growth + 15);

        // Update engagement card metrics (3rd card)
        const totalLikesEl = document.getElementById('totalLikes');
        const totalCommentsEl = document.getElementById('totalComments');
        const mentions = this.platformData.mentions || 150000;
        const reach = this.platformData.reach || 12000000;

        if (totalLikesEl) {
            const likes = Math.round(mentions * 2.5);
            totalLikesEl.textContent = Utils.formatNumber(likes);
        }
        if (totalCommentsEl) {
            const comments = Math.round(mentions * 0.8);
            totalCommentsEl.textContent = Utils.formatNumber(comments);
        }

        // Update reach card metrics (4th card)
        const uniqueUsersEl = document.getElementById('uniqueUsers');
        if (uniqueUsersEl) {
            const uniqueUsers = Math.round(reach * 0.65);
            uniqueUsersEl.textContent = Utils.formatNumber(uniqueUsers) + ' users';
        }
    }

    animateValue(element, targetValue, formatAsNumber = false) {
        const startValue = parseFloat(element.textContent) || 0;
        const duration = 500;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic

            const currentValue = startValue + (targetValue - startValue) * easeProgress;

            if (formatAsNumber) {
                element.textContent = Utils.formatNumber(Math.round(currentValue));
            } else {
                element.textContent = currentValue.toFixed(targetValue % 1 === 0 ? 0 : 1);
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    updateGrowthIndicator(elementId, growth) {
        const element = document.getElementById(elementId);
        if (!element) return;

        const isPositive = growth >= 0;
        element.className = `stat-change ${isPositive ? 'positive' : 'negative'}`;
        element.innerHTML = `
            <span class="stat-change-icon">${isPositive ? '↑' : '↓'}</span>
            <span>${isPositive ? '+' : ''}${growth}% from last week</span>
        `;
    }

    initializeCharts() {
        if (typeof Charts === 'undefined') return;

        // Initialize all charts with current platform
        this.charts.sentiment = Charts.createSentimentTrend('sentimentChart', this.currentPlatform);
        this.charts.platform = Charts.createPlatformDistribution('platformChart', this.currentPlatform);
        this.charts.mentions = Charts.createMentionVolume('mentionsChart', this.currentPlatform);
        this.charts.emotion = Charts.createEmotionChart('emotionChart', this.currentPlatform);

        // Initialize sparklines with white color for visibility on vibrant card backgrounds
        this.charts.sentimentSparkline = Charts.createSparkline('sentimentSparkline', null, '#ffffff');
        this.charts.mentionsSparkline = Charts.createSparkline('mentionsSparkline', null, '#ffffff');
        this.charts.engagementSparkline = Charts.createSparkline('engagementSparkline', null, '#ffffff');
        this.charts.reachSparkline = Charts.createSparkline('reachSparkline', null, '#ffffff');
    }

    async loadData() {
        // Fetch real-time data from APIs
        await this.fetchRealTimeData();

        this.loadActivityFeed();
        this.loadPostsTable();
        this.loadTrendingTopics();
    }

    /**
     * Fetch real-time data from APIs and update stats
     */
    async fetchRealTimeData() {
        if (typeof APIService === 'undefined') {
            console.warn('APIService not available, using mock data');
            return;
        }

        // Get the current brand name for search query
        const brandName = this.currentBrand || 'apple';
        const brand = APIData?.brands?.[brandName];
        const searchQuery = brand?.name || brandName;

        console.log(`📊 Fetching real-time data for: ${searchQuery}`);

        try {
            // Fetch data from all APIs
            const apiResults = await APIService.searchAll(searchQuery, {
                reddit: { sort: 'new', time: 'week', limit: 25 },
                youtube: { order: 'date', maxResults: 25 },
                news: { sortBy: 'publishedAt', pageSize: 25 }
            });

            // Store API results for use in other sections
            this.apiResults = apiResults;

            // Update stat cards with real data
            this.updateStatsFromAPIData(apiResults);

            // Update the status indicator
            APIService.updateStatusIndicator();

        } catch (error) {
            console.error('Failed to fetch real-time data:', error);
        }
    }

    /**
     * Calculate and update stats from real API data
     */
    updateStatsFromAPIData(apiResults) {
        if (!apiResults || !apiResults.combined || apiResults.combined.length === 0) {
            console.log('No API data available, keeping existing stats');
            return;
        }

        const combined = apiResults.combined;
        const stats = apiResults.stats;

        console.log(`📈 Updating stats from ${combined.length} real-time results`);

        // Calculate real sentiment from API data
        let totalSentiment = 0;
        let positiveCount = 0;
        let neutralCount = 0;
        let negativeCount = 0;
        let totalEngagement = 0;
        let totalReach = 0;
        let totalLikes = 0;
        let totalComments = 0;

        combined.forEach(item => {
            const sentiment = item.sentiment || 50;
            totalSentiment += sentiment;

            if (sentiment >= 60) {
                positiveCount++;
            } else if (sentiment <= 40) {
                negativeCount++;
            } else {
                neutralCount++;
            }

            // Calculate engagement and reach based on platform (using actual values)
            if (item.platform === 'reddit') {
                const score = item.score || 0;
                const comments = item.numComments || 0;
                totalEngagement += score + comments;
                totalLikes += score;
                totalComments += comments;
                totalReach += score * 10; // Reddit reach estimate: 10 views per upvote
            } else if (item.platform === 'youtube') {
                const likes = item.likes || 0;
                const comments = item.comments || 0;
                const views = item.views || 0;
                totalEngagement += likes + comments;
                totalLikes += likes;
                totalComments += comments;
                totalReach += views;
            } else if (item.platform === 'news') {
                const engagement = item.engagement || 0;
                totalEngagement += engagement;
                totalLikes += Math.round(engagement * 0.7);
                totalComments += Math.round(engagement * 0.3);
                totalReach += engagement * 50; // News reach estimate
            }
        });

        const avgSentiment = Math.round(totalSentiment / combined.length);

        // Calculate engagement rate as percentage of reach
        const engagementRate = totalReach > 0
            ? ((totalEngagement / totalReach) * 100).toFixed(1)
            : 0;

        // Update sentiment stat card
        const sentimentEl = document.querySelector('#sentimentValue .value-number');
        if (sentimentEl) {
            this.animateValue(sentimentEl, avgSentiment);
        }

        // Update sentiment breakdown
        const positiveEl = document.getElementById('positiveCount');
        const neutralEl = document.getElementById('neutralCount');
        const negativeEl = document.getElementById('negativeCount');

        if (positiveEl) positiveEl.textContent = Utils.formatNumber(positiveCount);
        if (neutralEl) neutralEl.textContent = Utils.formatNumber(neutralCount);
        if (negativeEl) negativeEl.textContent = Utils.formatNumber(negativeCount);

        // Update total mentions (use actual count from APIs - not inflated)
        const mentionsEl = document.querySelector('#mentionsValue .value-number');
        const mentionsSuffix = document.querySelector('#mentionsValue .value-suffix');
        if (mentionsEl) {
            const totalMentions = combined.length;
            const formatted = Utils.formatNumber(totalMentions);
            const match = formatted.match(/^([\d.]+)([KMB]?)$/);
            if (match) {
                this.animateValue(mentionsEl, parseFloat(match[1]));
                if (mentionsSuffix) mentionsSuffix.textContent = match[2] || '';
            } else {
                // Handle plain numbers without suffix
                this.animateValue(mentionsEl, totalMentions);
                if (mentionsSuffix) mentionsSuffix.textContent = '';
            }
        }

        // Update avg daily
        const avgDailyEl = document.getElementById('avgDaily');
        if (avgDailyEl) {
            const avgDaily = Math.max(1, Math.round(combined.length / 7));
            avgDailyEl.textContent = avgDaily + '/day';
        }

        // Update engagement rate (capped at realistic values)
        const engagementEl = document.querySelector('#engagementValue .value-number');
        if (engagementEl) {
            const displayEngagement = Math.min(parseFloat(engagementRate), 25); // Cap at 25%
            this.animateValue(engagementEl, displayEngagement);
        }

        // Update likes and comments in engagement card (actual values)
        const totalLikesEl = document.getElementById('totalLikes');
        const totalCommentsEl = document.getElementById('totalComments');
        if (totalLikesEl) {
            totalLikesEl.textContent = Utils.formatNumber(totalLikes);
        }
        if (totalCommentsEl) {
            totalCommentsEl.textContent = Utils.formatNumber(totalComments);
        }

        // Update total reach (actual calculated reach)
        const reachEl = document.querySelector('#reachValue .value-number');
        const reachSuffix = document.querySelector('#reachValue .value-suffix');
        if (reachEl) {
            const displayReach = totalReach > 0 ? totalReach : combined.length * 100;
            const formatted = Utils.formatNumber(displayReach);
            const match = formatted.match(/^([\d.]+)([KMB]?)$/);
            if (match) {
                this.animateValue(reachEl, parseFloat(match[1]));
                if (reachSuffix) reachSuffix.textContent = match[2] || '';
            } else {
                this.animateValue(reachEl, displayReach);
                if (reachSuffix) reachSuffix.textContent = '';
            }
        }

        // Update unique users (estimate 65% of reach are unique)
        const uniqueUsersEl = document.getElementById('uniqueUsers');
        if (uniqueUsersEl) {
            const uniqueUsers = Math.round(totalReach * 0.65);
            uniqueUsersEl.textContent = Utils.formatNumber(uniqueUsers) + ' users';
        }

        // Update growth indicators based on live data sources
        const liveCount = Object.values(stats.dataSources).filter(s => s.isLive).length;
        const baseGrowth = liveCount > 0 ? 5 : 2;

        this.updateGrowthIndicator('sentimentChange', baseGrowth + Math.round(Math.random() * 3));
        this.updateGrowthIndicator('mentionsChange', baseGrowth + Math.round(Math.random() * 5));
        this.updateGrowthIndicator('engagementChange', baseGrowth + Math.round(Math.random() * 4));
        this.updateGrowthIndicator('reachChange', baseGrowth + Math.round(Math.random() * 6));

        console.log('✅ Stats updated from real-time API data');
        console.log(`   Mentions: ${combined.length}, Engagement: ${totalEngagement}, Reach: ${totalReach}`);
    }

    loadActivityFeed() {
        const activityList = document.getElementById('activityList');
        if (!activityList) return;

        let activities = [];

        // Use real API data if available
        if (this.apiResults && this.apiResults.combined && this.apiResults.combined.length > 0) {
            // Sort by recency and take top 8
            const recentPosts = [...this.apiResults.combined]
                .sort((a, b) => new Date(b.created) - new Date(a.created))
                .slice(0, 8);

            activities = recentPosts.map(post => {
                const sentimentLabel = post.sentiment >= 60 ? 'positive' :
                    post.sentiment <= 40 ? 'negative' : 'neutral';

                // Calculate engagement based on platform
                let engagement = post.engagement || 0;
                if (post.platform === 'reddit') {
                    engagement = (post.score || 0) + (post.numComments || 0);
                } else if (post.platform === 'youtube') {
                    engagement = (post.likes || 0) + (post.comments || 0);
                }

                return {
                    icon: sentimentLabel,
                    platform: post.platform,
                    text: `${post.author} ${sentimentLabel === 'positive' ? 'praised' :
                        sentimentLabel === 'negative' ? 'complained about' : 'mentioned'} your brand`,
                    content: Utils.truncate(post.title || post.content, 60),
                    time: post.created,
                    engagement: engagement,
                    url: post.url,
                    dataSource: post.dataSource
                };
            });
        } else {
            // Fallback to mock data
            const mentions = MockData?.generateMentions?.(8, this.currentPlatform === 'all' ? null : this.currentPlatform) || [];

            activities = mentions.map(mention => ({
                icon: mention.sentiment,
                platform: mention.platform,
                platformIcon: mention.platformIcon,
                text: `${mention.author} ${mention.sentiment === 'positive' ? 'praised' :
                    mention.sentiment === 'negative' ? 'complained about' : 'mentioned'} your brand`,
                content: Utils.truncate(mention.content, 60),
                time: mention.timestamp,
                engagement: mention.likes + mention.comments + mention.shares
            }));
        }

        const platformConfig = MockData?.platformConfig || {
            reddit: { name: 'Reddit', color: '#FF4500' },
            youtube: { name: 'YouTube', color: '#FF0000' },
            news: { name: 'News', color: '#4B5563' }
        };

        activityList.innerHTML = activities.map((activity, index) => `
            <div class="activity-item ${index === 0 ? 'new' : ''} ${activity.dataSource === 'live-api' ? 'live-data' : ''}" style="animation-delay: ${index * 0.1}s">
                <div class="activity-icon ${activity.icon}">
                    <span class="flat-icon ${activity.icon === 'positive' ? 'icon-happy' :
                activity.icon === 'negative' ? 'icon-sad' : 'icon-neutral'}"></span>
                </div>
                <div class="activity-content">
                    <div class="activity-text">
                        <span class="platform-badge" style="background: ${platformConfig[activity.platform]?.color}20; color: ${platformConfig[activity.platform]?.color}">
                            <span class="platform-icon sm icon-${activity.platform}"></span>
                            ${platformConfig[activity.platform]?.name || activity.platform}
                            ${activity.dataSource === 'live-api' ? '<span class="live-badge">LIVE</span>' : ''}
                        </span>
                        ${activity.text}
                    </div>
                    <div class="activity-preview">${activity.content}</div>
                    <div class="activity-meta">
                        <span>${Utils.formatDate(activity.time, 'relative')}</span>
                        <span class="meta-separator">•</span>
                        <span class="engagement-stat"><span class="flat-icon icon-heart xs"></span> ${Utils.formatNumber(activity.engagement)}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    loadPostsTable(filterPlatform = 'all') {
        const postsTable = document.getElementById('postsTable');
        if (!postsTable) return;

        let posts = [];

        // Use real API data if available
        if (this.apiResults && this.apiResults.combined && this.apiResults.combined.length > 0) {
            posts = this.apiResults.combined.map(post => {
                // Calculate engagement metrics based on platform
                let likes = 0, comments = 0, shares = 0, reach = 0;

                if (post.platform === 'reddit') {
                    likes = post.score || 0;
                    comments = post.numComments || 0;
                    shares = Math.round((post.score || 0) * 0.1);
                    reach = (post.score || 0) * 100;
                } else if (post.platform === 'youtube') {
                    likes = post.likes || 0;
                    comments = post.comments || 0;
                    shares = Math.round((post.likes || 0) * 0.2);
                    reach = post.views || 0;
                } else if (post.platform === 'news') {
                    likes = post.engagement || 0;
                    comments = Math.round((post.engagement || 0) * 0.3);
                    shares = Math.round((post.engagement || 0) * 0.5);
                    reach = (post.engagement || 0) * 500;
                }

                const sentimentValue = post.sentiment || 50;
                const sentimentLabel = sentimentValue >= 60 ? 'positive' :
                    sentimentValue <= 40 ? 'negative' : 'neutral';

                const platformConfig = MockData?.platformConfig || {
                    reddit: { name: 'Reddit', color: '#FF4500' },
                    youtube: { name: 'YouTube', color: '#FF0000' },
                    news: { name: 'News', color: '#4B5563' }
                };

                return {
                    author: post.author || 'Unknown',
                    platform: post.platform,
                    platformName: platformConfig[post.platform]?.name || post.platform,
                    platformColor: platformConfig[post.platform]?.color || '#6366f1',
                    content: post.title || post.content || '',
                    sentiment: sentimentLabel,
                    sentimentScore: sentimentValue,
                    likes,
                    comments,
                    shares,
                    reach,
                    timestamp: post.created,
                    url: post.url,
                    dataSource: post.dataSource,
                    verified: post.platform === 'youtube' || (post.score && post.score > 1000)
                };
            });

            // Apply recency-weighted sorting for top performers
            const now = new Date();
            posts = posts.map(post => {
                const postDate = new Date(post.timestamp);
                const hoursAgo = (now - postDate) / (1000 * 60 * 60);
                const engagement = post.likes + post.comments + post.shares;

                // Recency boost: posts within 24h get 3x, within 7 days get 2x
                let recencyMultiplier = 1;
                if (hoursAgo < 24) recencyMultiplier = 3;
                else if (hoursAgo < 168) recencyMultiplier = 2;

                post.sortScore = engagement * recencyMultiplier;
                return post;
            }).sort((a, b) => b.sortScore - a.sortScore);

        } else {
            // Fallback to mock data
            if (!this.cachedPosts || this.cachedPosts.length === 0) {
                this.cachedPosts = MockData?.generateMentions?.(20, this.currentPlatform === 'all' ? null : this.currentPlatform) || [];
            }
            posts = [...this.cachedPosts];
            posts.sort((a, b) => (b.likes + b.comments + b.shares) - (a.likes + a.comments + a.shares));
        }

        // Filter by platform if specified
        if (filterPlatform && filterPlatform !== 'all') {
            posts = posts.filter(post => post.platform === filterPlatform);
        }

        postsTable.innerHTML = posts.slice(0, 8).map((post, index) => `
            <tr class="post-row table-row-animated ${post.dataSource === 'live-api' ? 'live-data-row' : ''}" style="animation-delay: ${index * 0.05}s" data-platform="${post.platform}">
                <td>
                    <div class="author-cell">
                        <div class="author-avatar" style="background: ${post.platformColor}">
                            ${post.author.charAt(0).toUpperCase()}
                        </div>
                        <span class="author-name">${post.author}</span>
                        ${post.verified ? '<span class="verified-badge" title="Verified">✓</span>' : ''}
                    </div>
                </td>
                <td>
                    <span class="platform-badge" style="background: ${post.platformColor}20; color: ${post.platformColor}">
                        <span class="platform-icon sm icon-${post.platform}"></span>
                        ${post.platformName}
                        ${post.dataSource === 'live-api' ? '<span class="live-badge-sm">●</span>' : ''}
                    </span>
                </td>
                <td>
                    <div class="content-cell" title="${post.content}">
                        ${Utils.truncate(post.content, 50)}
                    </div>
                </td>
                <td>
                    <span class="sentiment-badge ${post.sentiment}">
                        <span class="flat-icon ${post.sentiment === 'positive' ? 'icon-happy' : post.sentiment === 'negative' ? 'icon-sad' : 'icon-neutral'} xs"></span>
                        ${post.sentimentScore}%
                    </span>
                </td>
                <td>
                    <div class="engagement-cell">
                        <span title="Likes" class="eng-likes"><span class="flat-icon icon-heart xs"></span> ${Utils.formatNumber(post.likes)}</span>
                        <span title="Comments" class="eng-comments"><span class="flat-icon icon-chat xs"></span> ${Utils.formatNumber(post.comments)}</span>
                        <span title="Shares" class="eng-shares"><span class="flat-icon icon-share xs"></span> ${Utils.formatNumber(post.shares)}</span>
                    </div>
                </td>
                <td>
                    <span class="reach-value">${Utils.formatNumber(post.reach)}</span>
                </td>
                <td>
                    <span class="time-value">${Utils.formatDate(post.timestamp, 'relative')}</span>
                </td>
            </tr>
        `).join('');
    }

    handlePostsFilter(platform) {
        console.log('Posts filter changed to:', platform);

        // Clear cached posts to regenerate with new filter
        this.cachedPosts = null;

        // Reload posts with the selected platform filter
        this.loadPostsTable(platform);

        // Show notification
        if (window.notificationManager) {
            const platformName = platform === 'all' ? 'All Platforms' : platform.charAt(0).toUpperCase() + platform.slice(1);
            window.notificationManager.show(`Showing posts from ${platformName}`, 'info');
        }
    }

    async loadTrendingTopics() {
        const trendingList = document.getElementById('trendingTopics');
        if (!trendingList) return;

        let topics = [];

        // Try to get brand-specific trending topics from APIData
        if (typeof APIData !== 'undefined') {
            try {
                const response = await APIData.getBrandTrending(this.currentBrand);
                if (response.success) {
                    topics = response.data;
                }
            } catch (error) {
                console.warn('Failed to load brand trending, falling back to MockData');
            }
        }

        // Fallback to MockData
        if (topics.length === 0) {
            topics = MockData?.trendingTopics || [];
        }

        // Filter by platform if needed
        if (this.currentPlatform !== 'all' && topics[0]?.platforms) {
            topics = topics.filter(t => t.platforms?.includes(this.currentPlatform));
        }

        topics = topics.slice(0, 6);

        trendingList.innerHTML = topics.map((topic, index) => `
            <div class="trending-item" style="animation-delay: ${index * 0.1}s">
                <div class="trending-rank">${index + 1}</div>
                <div class="trending-info">
                    <div class="trending-name">${topic.name}</div>
                    <div class="trending-meta">
                        <span>${Utils.formatNumber(topic.mentions)} mentions</span>
                        <span class="trending-change ${topic.growth >= 0 ? 'positive' : 'negative'}">
                            ${topic.growth >= 0 ? '↑' : '↓'} ${Math.abs(topic.growth)}%
                        </span>
                    </div>
                </div>
                <div class="trending-sentiment">
                    <div class="sentiment-bar" style="width: ${topic.sentiment}%"></div>
                </div>
            </div>
        `).join('');
    }

    async refreshAllData() {
        const refreshBtn = document.getElementById('refreshData');
        if (refreshBtn) {
            refreshBtn.classList.add('spinning');
        }

        // Clear API cache to force fresh data
        if (typeof APIService !== 'undefined') {
            APIService.clearCache();
        }

        // Re-fetch real-time API data
        await this.fetchRealTimeData();

        // Reload all data
        this.loadPlatformData();
        this.loadActivityFeed();
        this.loadPostsTable();
        this.loadTrendingTopics();

        // Update charts
        if (typeof Charts !== 'undefined') {
            Charts.updateAllChartsForPlatform(this.currentPlatform);
        }

        setTimeout(() => {
            if (refreshBtn) {
                refreshBtn.classList.remove('spinning');
            }

            // Show notification
            if (window.notificationManager) {
                window.notificationManager.show('Data refreshed from live APIs', 'success');
            }
        }, 500);
    }

    handleTimeRangeChange(range) {
        console.log('Time range changed to:', range);

        // Store current range
        this.currentTimeRange = range;

        // Calculate date range
        const endDate = new Date();
        const startDate = new Date();
        let days = 7;

        switch (range) {
            case '7d':
                days = 7;
                break;
            case '14d':
                days = 14;
                break;
            case '30d':
                days = 30;
                break;
            case '90d':
                days = 90;
                break;
        }

        startDate.setDate(endDate.getDate() - days);

        // Update date range display
        this.updateDateRangeDisplay(startDate, endDate, days);

        // Show loading state on charts
        this.showChartsLoading(true);

        // Regenerate chart data with new date range
        setTimeout(() => {
            this.updateChartsForTimeRange(days);
            this.showChartsLoading(false);

            // Show notification
            if (window.notificationManager) {
                window.notificationManager.show(`Showing data for last ${days} days`, 'info');
            }
        }, 300);
    }

    updateDateRangeDisplay(startDate, endDate, days) {
        // Format dates
        const formatDate = (date) => {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        };

        // Update the date range text
        const dateRangeText = document.getElementById('dateRangeText');
        if (dateRangeText) {
            dateRangeText.textContent = `${formatDate(startDate)} - ${formatDate(endDate)}`;
        }
    }

    showChartsLoading(show) {
        const chartContainers = document.querySelectorAll('.chart-container');
        chartContainers.forEach(container => {
            if (show) {
                container.classList.add('chart-loading');
            } else {
                container.classList.remove('chart-loading');
            }
        });
    }

    updateChartsForTimeRange(days) {
        if (typeof Charts === 'undefined') return;

        // Generate new labels based on days
        const labels = [];
        const endDate = new Date();

        for (let i = days - 1; i >= 0; i--) {
            const date = new Date();
            date.setDate(endDate.getDate() - i);
            labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        }

        // Generate random data for the new time range
        const generateData = (min, max, count) => {
            return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);
        };

        // Update sentiment chart
        if (this.charts.sentiment) {
            const positiveData = generateData(55, 85, days);
            const neutralData = generateData(8, 25, days);
            const negativeData = generateData(5, 20, days);

            this.charts.sentiment.data.labels = labels;
            this.charts.sentiment.data.datasets[0].data = positiveData;
            this.charts.sentiment.data.datasets[1].data = neutralData;
            this.charts.sentiment.data.datasets[2].data = negativeData;
            this.charts.sentiment.update('active');

            // Update avg stats
            const avgPos = Math.round(positiveData.reduce((a, b) => a + b, 0) / days);
            const avgNeu = Math.round(neutralData.reduce((a, b) => a + b, 0) / days);
            const avgNeg = Math.round(negativeData.reduce((a, b) => a + b, 0) / days);

            const avgPosEl = document.getElementById('avgPositive');
            const avgNeuEl = document.getElementById('avgNeutral');
            const avgNegEl = document.getElementById('avgNegative');
            const trendEl = document.getElementById('sentimentTrend');

            if (avgPosEl) avgPosEl.textContent = `${avgPos}%`;
            if (avgNeuEl) avgNeuEl.textContent = `${avgNeu}%`;
            if (avgNegEl) avgNegEl.textContent = `${avgNeg}%`;
            if (trendEl) {
                const trend = (Math.random() * 10 - 3).toFixed(1);
                trendEl.textContent = `${trend > 0 ? '+' : ''}${trend}%`;
                trendEl.style.color = trend > 0 ? '#10b981' : '#ef4444';
            }
        }

        // Update mentions chart
        if (this.charts.mentions) {
            const mentionsData = generateData(5000, 25000, days);
            this.charts.mentions.data.labels = labels;
            this.charts.mentions.data.datasets[0].data = mentionsData;
            this.charts.mentions.update('active');
        }

        console.log(`Charts updated for ${days} days range`);
    }

    handleChartAction(action, chartId) {
        switch (action) {
            case 'download':
                this.downloadChart(chartId);
                break;
            case 'fullscreen':
                this.toggleFullscreen(chartId);
                break;
        }
    }

    downloadChart(chartId) {
        if (typeof Charts !== 'undefined') {
            const imageData = Charts.exportAsImage(chartId);
            if (imageData) {
                const link = document.createElement('a');
                link.download = `${chartId}-${new Date().toISOString().split('T')[0]}.png`;
                link.href = imageData;
                link.click();
            }
        }
    }

    toggleFullscreen(chartId) {
        const chartCard = document.querySelector(`[data-chart="${chartId}"]`)?.closest('.chart-card');
        if (chartCard) {
            chartCard.classList.toggle('fullscreen');
        }
    }

    toggleActivityFeed() {
        const pauseBtn = document.getElementById('pauseActivity');
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
            this.refreshInterval = null;
            if (pauseBtn) pauseBtn.innerHTML = '<span class="flat-icon icon-play"></span>';
        } else {
            this.startAutoRefresh();
            if (pauseBtn) pauseBtn.innerHTML = '<span class="flat-icon icon-pause"></span>';
        }
    }

    startAutoRefresh() {
        // Auto-refresh activity feed every 30 seconds
        this.refreshInterval = setInterval(() => {
            this.loadActivityFeed();
        }, 30000);
    }

    destroy() {
        // Clear interval
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
        }

        // Clear resize timeout
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }

        // Disconnect ResizeObserver
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }

        // Remove event listeners
        if (this.boundHandleResize) {
            window.removeEventListener('resize', this.boundHandleResize);
            if (window.visualViewport) {
                window.visualViewport.removeEventListener('resize', this.boundHandleResize);
            }
        }

        // Clean up charts
        Object.values(this.charts).forEach(chart => {
            if (chart && chart.destroy) {
                chart.destroy();
            }
        });
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DashboardPage;
}

console.log('🎯 Enhanced Dashboard Page Loaded');
