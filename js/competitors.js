/**
 * Competitor Analysis Page
 * Compare your brand with competitors
 */

class CompetitorsPage {
    constructor() {
        this.competitors = [];
        this.selectedCompetitors = [];
        this.currentBrand = null;
        this.isAnimating = false;
    }

    render() {
        // Get current brand info
        const currentBrandId = typeof APIData !== 'undefined' ? APIData.currentBrand : 'apple';
        const brand = typeof APIData !== 'undefined' ? APIData.brands[currentBrandId] : null;
        const brandName = brand ? brand.name : 'Your Brand';

        return `
            <div class="competitors-container">
                <!-- Page Header -->
                <div class="page-header" style="background: #ffffff !important; border: 1px solid #e5e7eb !important;">
                    <style>
                        .competitors-container .page-header::before,
                        .competitors-container .page-header::after {
                            display: none !important;
                            content: none !important;
                        }
                    </style>
                    <div class="page-header-left">
                        <h1 class="page-title">Competitor Analysis</h1>
                        <p class="page-subtitle">Compare <strong>${brandName}</strong> with market competitors</p>
                    </div>
                    <div class="page-header-right">
                        <button class="btn btn-secondary" id="addCompetitorBtn">
                            <i class="fas fa-plus"></i>
                            <span>Add Competitor</span>
                        </button>
                        <button class="btn btn-primary" id="exportCompetitorBtn"
                            style="background: #ffffff !important; color: #1f2937 !important; border: 1px solid #d1d5db !important;"
                            onmouseover="this.style.color='#6366f1'; this.style.borderColor='#6366f1'; this.querySelector('i').style.color='#6366f1';"
                            onmouseout="this.style.color='#1f2937'; this.style.borderColor='#d1d5db'; this.querySelector('i').style.color='#1f2937';">
                            <i class="fas fa-download" style="color: #1f2937;"></i>
                            <span>Export Analysis</span>
                        </button>
                    </div>
                </div>

                <!-- Competitor Selection -->
                <div class="card">
                    <div class="card-header">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div class="card-header-icon" style="background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%); width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                                <i class="fas fa-users" style="color: white; font-size: 1.1rem;"></i>
                            </div>
                            <h3 class="card-title" style="margin: 0;">Select Competitors to Compare</h3>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="competitor-chips" id="competitorChips">
                            <!-- Chips will be dynamically populated -->
                        </div>
                    </div>
                </div>

                <!-- Comparison Overview - Vibrant Hero Cards -->
                <div class="stats-grid stats-grid-4 competitor-hero-stats">
                    <!-- Share of Voice Card - Purple -->
                    <div class="stat-card hero-card-vibrant competitor-vibrant-card" style="background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%); color: white; position: relative; overflow: hidden; border: none; border-radius: 20px; padding: 1.5rem;">
                        <div class="competitor-card-bg">
                            <div class="competitor-circle circle-1"></div>
                            <div class="competitor-circle circle-2"></div>
                            <div class="competitor-circle circle-3"></div>
                            <div class="competitor-circle circle-4"></div>
                            <div class="competitor-circle circle-5"></div>
                        </div>
                        <div class="competitor-card-icon-wrapper">
                            <div class="competitor-pulse-ring"></div>
                            <div class="competitor-pulse-ring ring-2"></div>
                            <div class="competitor-card-icon">
                                <i class="fas fa-chart-pie"></i>
                            </div>
                        </div>
                        <div class="competitor-card-label">SHARE OF VOICE</div>
                        <div class="competitor-card-value">36.7%</div>
                        <div class="competitor-card-badge positive">
                            <i class="fas fa-arrow-up"></i>
                            <span>+13.6% Market Share</span>
                        </div>
                        <div class="competitor-card-rank">#1 in category</div>
                    </div>

                    <!-- Product Launches Card - Blue -->
                    <div class="stat-card hero-card-vibrant competitor-vibrant-card" style="background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%); color: white; position: relative; overflow: hidden; border: none; border-radius: 20px; padding: 1.5rem;">
                        <div class="competitor-card-bg">
                            <div class="competitor-circle circle-1"></div>
                            <div class="competitor-circle circle-2"></div>
                            <div class="competitor-circle circle-3"></div>
                            <div class="competitor-circle circle-4"></div>
                            <div class="competitor-circle circle-5"></div>
                        </div>
                        <div class="competitor-card-icon-wrapper">
                            <div class="competitor-pulse-ring"></div>
                            <div class="competitor-pulse-ring ring-2"></div>
                            <div class="competitor-card-icon">
                                <i class="fas fa-rocket"></i>
                            </div>
                        </div>
                        <div class="competitor-card-label">PRODUCT LAUNCHES</div>
                        <div class="competitor-card-value">12</div>
                        <div class="competitor-card-badge positive">
                            <i class="fas fa-arrow-up"></i>
                            <span>+3 vs last quarter</span>
                        </div>
                        <div class="competitor-card-rank">You: 5 | Competitors: 7</div>
                    </div>

                    <!-- Engagement Rate Card - Emerald -->
                    <div class="stat-card hero-card-vibrant competitor-vibrant-card" style="background: linear-gradient(135deg, #10b981 0%, #34d399 100%); color: white; position: relative; overflow: hidden; border: none; border-radius: 20px; padding: 1.5rem;">
                        <div class="competitor-card-bg">
                            <div class="competitor-circle circle-1"></div>
                            <div class="competitor-circle circle-2"></div>
                            <div class="competitor-circle circle-3"></div>
                            <div class="competitor-circle circle-4"></div>
                            <div class="competitor-circle circle-5"></div>
                        </div>
                        <div class="competitor-card-icon-wrapper">
                            <div class="competitor-pulse-ring"></div>
                            <div class="competitor-pulse-ring ring-2"></div>
                            <div class="competitor-card-icon">
                                <i class="fas fa-bolt"></i>
                            </div>
                        </div>
                        <div class="competitor-card-label">ENGAGEMENT RATE</div>
                        <div class="competitor-card-value">5%</div>
                        <div class="competitor-card-badge negative">
                            <i class="fas fa-arrow-down"></i>
                            <span>Below avg (5.1%)</span>
                        </div>
                        <div class="competitor-card-rank">#2 in category</div>
                    </div>

                    <!-- Growth Rate Card - Orange -->
                    <div class="stat-card hero-card-vibrant competitor-vibrant-card" style="background: linear-gradient(135deg, #f97316 0%, #fb923c 100%); color: white; position: relative; overflow: hidden; border: none; border-radius: 20px; padding: 1.5rem;">
                        <div class="competitor-card-bg">
                            <div class="competitor-circle circle-1"></div>
                            <div class="competitor-circle circle-2"></div>
                            <div class="competitor-circle circle-3"></div>
                            <div class="competitor-circle circle-4"></div>
                            <div class="competitor-circle circle-5"></div>
                        </div>
                        <div class="competitor-card-icon-wrapper">
                            <div class="competitor-pulse-ring"></div>
                            <div class="competitor-pulse-ring ring-2"></div>
                            <div class="competitor-card-icon">
                                <i class="fas fa-rocket"></i>
                            </div>
                        </div>
                        <div class="competitor-card-label">GROWTH RATE</div>
                        <div class="competitor-card-value">+13.6%</div>
                        <div class="competitor-card-badge neutral">
                            <i class="fas fa-chart-line"></i>
                            <span>Steady growth</span>
                        </div>
                        <div class="competitor-card-rank">#2 in category</div>
                    </div>
                </div>

                <!-- Charts Grid -->
                <div class="charts-grid-2">
                    <!-- Share of Voice -->
                    <div class="card">
                        <div class="card-header">
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <div class="card-header-icon" style="background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%); width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                                    <i class="fas fa-chart-line" style="color: white; font-size: 1.1rem;"></i>
                                </div>
                                <h3 class="card-title" style="margin: 0;">Share of Voice Over Time</h3>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="chart-container" style="height: 300px;">
                                <canvas id="shareOfVoiceChart"></canvas>
                            </div>
                        </div>
                    </div>

                    <!-- Sentiment Comparison -->
                    <div class="card">
                        <div class="card-header">
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <div class="card-header-icon" style="background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%); width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                                    <i class="fas fa-smile" style="color: white; font-size: 1.1rem;"></i>
                                </div>
                                <h3 class="card-title" style="margin: 0;">Sentiment Comparison</h3>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="chart-container" style="height: 300px;">
                                <canvas id="sentimentComparisonChart"></canvas>
                            </div>
                        </div>
                    </div>

                    <!-- Engagement Comparison -->
                    <div class="card">
                        <div class="card-header">
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <div class="card-header-icon" style="background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%); width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                                    <i class="fas fa-bolt" style="color: white; font-size: 1.1rem;"></i>
                                </div>
                                <h3 class="card-title" style="margin: 0;">Engagement Metrics</h3>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="chart-container" style="height: 400px;">
                                <canvas id="engagementComparisonChart"></canvas>
                            </div>
                        </div>
                    </div>

                    <!-- Platform Distribution -->
                    <div class="card">
                        <div class="card-header">
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <div class="card-header-icon" style="background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%); width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                                    <span class="material-icons" style="color: white; font-size: 1.3rem;">pie_chart</span>
                                </div>
                                <h3 class="card-title" style="margin: 0;">Platform Distribution</h3>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="chart-container" style="height: 300px;">
                                <canvas id="platformComparisonChart"></canvas>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Detailed Comparison Table -->
                <div class="card" style="border-radius: 16px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.06);">
                    <div class="card-header" style="background: white; border-bottom: 1px solid #f3f4f6; padding: 20px 24px;">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div class="card-header-icon" style="background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%); width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                                <i class="fas fa-table" style="color: white; font-size: 1.1rem;"></i>
                            </div>
                            <h3 class="card-title" style="margin: 0; font-size: 1.1rem; font-weight: 600; color: #1f2937;">Detailed Metrics Comparison</h3>
                        </div>
                    </div>
                    <div class="card-body" style="padding: 0;">
                        <div class="comparison-table-wrapper">
                            <style>
                                .comparison-table-wrapper {
                                    overflow-x: auto;
                                    scrollbar-width: none;
                                    -ms-overflow-style: none;
                                }
                                .comparison-table-wrapper::-webkit-scrollbar {
                                    display: none;
                                    height: 0;
                                    width: 0;
                                }
                                .comparison-table {
                                    width: 100%;
                                    border-collapse: collapse;
                                    table-layout: auto;
                                }
                                /* Override global tbody tr::before pseudo-element */
                                .comparison-table tbody tr::before,
                                .comparison-table thead tr::before,
                                .comparison-table .comparison-row::before,
                                .comparison-table .comparison-row::after {
                                    display: none !important;
                                    content: none !important;
                                    width: 0 !important;
                                    height: 0 !important;
                                    position: static !important;
                                }
                                .comparison-table tbody tr,
                                .comparison-table .comparison-row {
                                    position: static !important;
                                    display: table-row !important;
                                }
                                .comparison-table thead tr {
                                    display: table-row !important;
                                }
                                .comparison-table th,
                                .comparison-table td {
                                    display: table-cell !important;
                                }
                                .comparison-table .metric-cell {
                                    text-align: left !important;
                                }
                                .comparison-table .value-cell,
                                .comparison-table .leader-cell {
                                    text-align: center !important;
                                }
                                .comparison-table thead {
                                    background: #f9fafb;
                                }
                                .comparison-table th {
                                    padding: 14px 20px;
                                    text-align: center;
                                    font-size: 0.75rem;
                                    font-weight: 600;
                                    text-transform: uppercase;
                                    letter-spacing: 0.5px;
                                    color: #6b7280;
                                    border-bottom: 1px solid #e5e7eb;
                                }
                                .comparison-table th:first-child {
                                    text-align: left;
                                    min-width: 200px;
                                    width: 20%;
                                }
                                .comparison-table th:last-child {
                                    min-width: 120px;
                                    width: 12%;
                                }
                                .comparison-table td {
                                    padding: 16px 20px;
                                    font-size: 0.9rem;
                                    color: #374151;
                                    border-bottom: 1px solid #f3f4f6;
                                    transition: all 0.2s ease;
                                    text-align: center;
                                    vertical-align: middle;
                                }
                                .comparison-table td:first-child {
                                    text-align: left;
                                }
                                .comparison-table tbody tr {
                                    transition: all 0.2s ease;
                                    cursor: pointer;
                                }
                                .comparison-table tbody tr:hover {
                                    background: linear-gradient(90deg, rgba(139, 92, 246, 0.04) 0%, rgba(168, 85, 247, 0.08) 100%);
                                    transform: scale(1.005);
                                }
                                .comparison-table tbody tr:hover td {
                                    color: #1f2937;
                                }
                                .comparison-table tbody tr:last-child td {
                                    border-bottom: none;
                                }
                                .comparison-table tbody tr:hover {
                                    outline: none !important;
                                    box-shadow: none !important;
                                }
                                .comparison-table-wrapper {
                                    border-bottom: none !important;
                                }
                                .comparison-table {
                                    border-bottom: none !important;
                                    outline: none !important;
                                }
                                .comparison-table .metric-name {
                                    font-weight: 600;
                                    color: #1f2937;
                                    display: flex;
                                    align-items: center;
                                    gap: 12px;
                                    white-space: nowrap;
                                }
                                .comparison-table .metric-icon {
                                    width: 32px;
                                    height: 32px;
                                    min-width: 32px;
                                    flex-shrink: 0;
                                    border-radius: 8px;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    font-size: 0.85rem;
                                }
                                .comparison-table .value-cell {
                                    font-weight: 500;
                                }
                                .comparison-table .value-leader {
                                    color: #10b981;
                                    font-weight: 600;
                                }
                                .comparison-table .leader-badge {
                                    display: inline-flex;
                                    align-items: center;
                                    padding: 6px 12px;
                                    background: linear-gradient(135deg, #f43f5e 0%, #ec4899 100%);
                                    color: white;
                                    font-size: 0.75rem;
                                    font-weight: 600;
                                    border-radius: 20px;
                                    box-shadow: 0 2px 8px rgba(244, 63, 94, 0.3);
                                }
                            </style>
                            <table class="comparison-table">
                                <thead id="comparisonTableHead">
                                    <!-- Populated by JS -->
                                </thead>
                                <tbody id="comparisonTableBody">
                                    <!-- Populated by JS -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Competitive Insights -->
                <div class="card">
                    <div class="card-header">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div class="card-header-icon" style="background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%); width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                                <i class="fas fa-lightbulb" style="color: white; font-size: 1.1rem;"></i>
                            </div>
                            <h3 class="card-title" style="margin: 0;">Competitive Insights</h3>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="insights-grid" id="insightsGrid">
                            <!-- Insights populated by JS -->
                        </div>
                    </div>
                </div>

                <!-- Content Strategy Analysis -->
                <div class="charts-grid-2">
                    <div class="card">
                        <div class="card-header">
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <div class="card-header-icon" style="background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%); width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                                    <i class="fas fa-photo-video" style="color: white; font-size: 1.1rem;"></i>
                                </div>
                                <h3 class="card-title" style="margin: 0;">Content Type Distribution</h3>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="chart-container" style="height: 300px;">
                                <canvas id="contentTypeChart"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header">
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <div class="card-header-icon" style="background: linear-gradient(135deg, #10b981 0%, #34d399 100%); width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                                    <i class="fas fa-calendar-alt" style="color: white; font-size: 1.1rem;"></i>
                                </div>
                                <h3 class="card-title" style="margin: 0;">Posting Frequency</h3>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="chart-container" style="height: 300px;">
                                <canvas id="postingFrequencyChart"></canvas>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Competitor Activity Timeline -->
                <div class="card">
                    <div class="card-header">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div class="card-header-icon" style="background: linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%); width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                                <i class="fas fa-stream" style="color: white; font-size: 1.1rem;"></i>
                            </div>
                            <div>
                                <h3 class="card-title" style="margin: 0;">Competitor Activity Timeline</h3>
                                <p class="card-subtitle" style="margin: 4px 0 0 0; font-size: 0.875rem; color: #6b7280;">Recent competitor activities and market events</p>
                            </div>
                        </div>
                        <div class="timeline-filters" style="display: flex; gap: 0.75rem;">
                            <select id="timelineTypeFilter" class="form-select" style="min-width: 150px;">
                                <option value="all">All Activities</option>
                                <option value="product_launch">Product Launches</option>
                                <option value="campaign">Campaigns</option>
                                <option value="viral_content">Viral Content</option>
                                <option value="partnership">Partnerships</option>
                            </select>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="activity-timeline" id="activityTimeline">
                            <!-- Timeline populated by JS -->
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    init() {
        this.currentBrand = typeof APIData !== 'undefined' ? APIData.currentBrand : 'apple';
        this.addCompetitorCircleStyles();
        this.loadCompetitorData();
        this.renderCompetitorChips();
        this.initializeCharts();
        this.loadComparisonTable();
        this.loadInsights();
        // Advanced Competitor Intelligence
        this.initContentTypeChart();
        this.initPostingFrequencyChart();
        this.loadActivityTimeline();
        this.setupEventListeners();
    }

    addCompetitorCircleStyles() {
        // Remove existing styles to allow updates
        const existingStyles = document.getElementById('competitor-circle-styles');
        if (existingStyles) existingStyles.remove();

        const styles = document.createElement('style');
        styles.id = 'competitor-circle-styles';
        styles.textContent = `
            /* Background container for circles */
            .competitor-card-bg {
                position: absolute !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                bottom: 0 !important;
                overflow: hidden !important;
                pointer-events: none !important;
                z-index: 1 !important;
            }

            /* Floating circle background shapes - soft bokeh style */
            .competitor-vibrant-card .competitor-circle {
                position: absolute !important;
                border-radius: 50% !important;
                pointer-events: none !important;
                background: rgba(255, 255, 255, 0.2) !important;
                opacity: 0.25 !important;
            }

            /* Large circle - top right */
            .competitor-vibrant-card .competitor-circle.circle-1 {
                width: 140px !important;
                height: 140px !important;
                top: -50px !important;
                right: -50px !important;
                background: rgba(255, 255, 255, 0.25) !important;
                animation: competitorFloat 5s ease-in-out infinite, competitorPulse 4s ease-in-out infinite !important;
            }

            /* Medium circle - bottom left */
            .competitor-vibrant-card .competitor-circle.circle-2 {
                width: 100px !important;
                height: 100px !important;
                bottom: -30px !important;
                left: -30px !important;
                background: rgba(255, 255, 255, 0.2) !important;
                animation: competitorFloat 6s ease-in-out infinite, competitorPulse 5s ease-in-out infinite !important;
                animation-delay: -2s, -1s !important;
            }

            /* Small circle - center right */
            .competitor-vibrant-card .competitor-circle.circle-3 {
                width: 70px !important;
                height: 70px !important;
                top: 35% !important;
                right: 15% !important;
                background: rgba(255, 255, 255, 0.18) !important;
                animation: competitorFloat 5.5s ease-in-out infinite, competitorPulse 6s ease-in-out infinite !important;
                animation-delay: -3s, -2s !important;
            }

            /* Extra small circle - top left */
            .competitor-vibrant-card .competitor-circle.circle-4 {
                width: 50px !important;
                height: 50px !important;
                top: 20px !important;
                left: 20% !important;
                background: rgba(255, 255, 255, 0.15) !important;
                animation: competitorFloat 7s ease-in-out infinite, competitorPulse 5.5s ease-in-out infinite !important;
                animation-delay: -1s, -0.5s !important;
            }

            /* Medium circle - bottom right */
            .competitor-vibrant-card .competitor-circle.circle-5 {
                width: 80px !important;
                height: 80px !important;
                bottom: 0 !important;
                right: 5% !important;
                background: rgba(255, 255, 255, 0.12) !important;
                animation: competitorFloat 8s ease-in-out infinite, competitorPulse 6.5s ease-in-out infinite !important;
                animation-delay: -4s, -3s !important;
            }

            @keyframes competitorFloat {
                0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
                25% { transform: translate(-8px, 6px) scale(1.08) rotate(4deg); }
                50% { transform: translate(-12px, 10px) scale(1.12) rotate(0deg); }
                75% { transform: translate(-5px, 4px) scale(1.05) rotate(-4deg); }
            }

            @keyframes competitorPulse {
                0%, 100% { opacity: 0.25; }
                50% { opacity: 0.45; }
            }
        `;
        document.head.appendChild(styles);
    }

    async handleBrandChange(brandId, force = false) {
        if (this.isAnimating) return;
        if (!force && brandId === this.currentBrand) return;

        this.isAnimating = true;
        this.currentBrand = brandId;

        if (typeof APIData !== 'undefined') {
            APIData.setActiveBrand(brandId);
        }

        // Reload all data for the new brand
        this.loadCompetitorData();
        this.renderCompetitorChips();
        this.initializeCharts();
        this.loadComparisonTable();
        this.loadInsights();
        this.setupEventListeners();

        // Update subtitle
        const brand = typeof APIData !== 'undefined' ? APIData.brands[brandId] : null;
        const subtitle = document.querySelector('.page-subtitle');
        if (subtitle && brand) {
            subtitle.innerHTML = `Compare <strong>${brand.name}</strong> with market competitors`;
        }

        try {
            if (window.notificationManager) {
                window.notificationManager.show(`Competitor analysis updated for ${brand?.name || brandId}`, 'success');
            }
        } catch (e) {
            console.warn('Notification failed:', e);
        }

        this.isAnimating = false;
    }

    setupEventListeners() {
        // Add competitor
        const addBtn = document.getElementById('addCompetitorBtn');
        if (addBtn) {
            addBtn.addEventListener('click', () => this.showAddCompetitorModal());
        }

        // Export
        const exportBtn = document.getElementById('exportCompetitorBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.showExportOptions());
        }

        // Close modal on outside click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-competitor-modal')) {
                this.closeAddCompetitorModal();
            }
        });

        // Close modal on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAddCompetitorModal();
            }
        });
    }

    showAddCompetitorModal() {
        // Remove existing modal if any
        const existingModal = document.querySelector('.add-competitor-modal');
        if (existingModal) existingModal.remove();

        // Get suggested competitors (brands not already in competitors list)
        const currentBrandId = this.currentBrand || (typeof APIData !== 'undefined' ? APIData.currentBrand : 'apple');
        const currentBrand = typeof APIData !== 'undefined' ? APIData.brands[currentBrandId] : null;
        const existingCompetitorIds = currentBrand ? [currentBrandId, ...currentBrand.competitors] : [currentBrandId];

        const suggestedBrands = typeof APIData !== 'undefined'
            ? Object.entries(APIData.brands)
                .filter(([id]) => !existingCompetitorIds.includes(id))
                .slice(0, 5)
            : [];

        const suggestedHtml = suggestedBrands.length > 0
            ? `
                <div class="form-group">
                    <label>Suggested Competitors</label>
                    <div class="suggested-competitors">
                        ${suggestedBrands.map(([id, brand]) => `
                            <div class="suggested-competitor" data-brand-id="${id}">
                                <div class="suggested-competitor-logo" style="background: ${brand.color}">${brand.name.charAt(0)}</div>
                                <div class="suggested-competitor-info">
                                    <div class="suggested-competitor-name">${brand.name}</div>
                                    <div class="suggested-competitor-industry">${brand.industry || 'Technology'}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `
            : '';

        const modalHtml = `
            <div class="add-competitor-modal">
                <div class="add-competitor-modal-content">
                    <div class="add-competitor-modal-header">
                        <h3>Add Competitor</h3>
                        <button class="add-competitor-modal-close" id="closeAddCompetitorModal">&times;</button>
                    </div>
                    <form class="add-competitor-form" id="addCompetitorForm">
                        <div class="form-group">
                            <label for="competitorName">Competitor Name</label>
                            <input type="text" id="competitorName" name="competitorName" placeholder="Enter competitor name..." required>
                        </div>
                        <div class="form-group">
                            <label for="competitorIndustry">Industry</label>
                            <select id="competitorIndustry" name="competitorIndustry">
                                <option value="technology">Technology</option>
                                <option value="retail">Retail</option>
                                <option value="finance">Finance</option>
                                <option value="healthcare">Healthcare</option>
                                <option value="automotive">Automotive</option>
                                <option value="entertainment">Entertainment</option>
                                <option value="food">Food & Beverage</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        ${suggestedHtml}
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" id="cancelAddCompetitor">Cancel</button>
                            <button type="submit" class="btn btn-primary">Add Competitor</button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);

        // Show modal with animation
        setTimeout(() => {
            document.querySelector('.add-competitor-modal').classList.add('active');
        }, 10);

        // Setup modal event listeners
        document.getElementById('closeAddCompetitorModal').addEventListener('click', () => this.closeAddCompetitorModal());
        document.getElementById('cancelAddCompetitor').addEventListener('click', () => this.closeAddCompetitorModal());
        document.getElementById('addCompetitorForm').addEventListener('submit', (e) => this.handleAddCompetitor(e));

        // Setup suggested competitor clicks
        document.querySelectorAll('.suggested-competitor').forEach(el => {
            el.addEventListener('click', () => {
                const brandId = el.dataset.brandId;
                const brand = typeof APIData !== 'undefined' ? APIData.brands[brandId] : null;
                if (brand) {
                    document.getElementById('competitorName').value = brand.name;
                }
            });
        });
    }

    closeAddCompetitorModal() {
        const modal = document.querySelector('.add-competitor-modal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 200);
        }
    }

    handleAddCompetitor(e) {
        e.preventDefault();
        const name = document.getElementById('competitorName').value.trim();
        const industry = document.getElementById('competitorIndustry').value;

        if (!name) {
            if (window.notificationManager) {
                window.notificationManager.show('Please enter a competitor name', 'warning');
            }
            return;
        }

        // Generate a random ID and add the competitor
        const newCompetitorId = name.toLowerCase().replace(/\s+/g, '_') + '_' + Date.now();
        const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        // Add to competitors array
        this.competitors.push({
            id: newCompetitorId,
            name: name,
            color: randomColor,
            mentions: Math.round(5000 + Math.random() * 20000),
            sentiment: Math.round(60 + Math.random() * 30),
            engagement: parseFloat((5 + Math.random() * 10).toFixed(1)),
            reach: Math.round(1000000 + Math.random() * 10000000),
            growth: parseFloat((5 + Math.random() * 25).toFixed(1))
        });

        // Update UI
        this.renderCompetitorChips();
        this.initializeCharts();
        this.loadComparisonTable();
        this.loadInsights();

        // Close modal
        this.closeAddCompetitorModal();

        if (window.notificationManager) {
            window.notificationManager.show(`${name} added to competitor analysis`, 'success');
        }
    }

    showExportOptions() {
        // Remove existing dropdown if any
        const existingDropdown = document.querySelector('.export-dropdown');
        if (existingDropdown) {
            existingDropdown.remove();
            return;
        }

        const exportBtn = document.getElementById('exportCompetitorBtn');
        if (!exportBtn) return;

        const rect = exportBtn.getBoundingClientRect();

        const dropdownHtml = `
            <div class="export-dropdown" style="
                position: fixed;
                top: ${rect.bottom + 8}px;
                right: ${window.innerWidth - rect.right}px;
                background: white;
                border-radius: 8px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
                z-index: 1000;
                min-width: 180px;
                overflow: hidden;
            ">
                <div class="export-option" data-format="json" style="
                    padding: 0.75rem 1rem;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    cursor: pointer;
                    transition: background 0.2s ease;
                " onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='white'">
                    <i class="fas fa-code" style="color: #6366f1; width: 16px;"></i>
                    <span>Export as JSON</span>
                </div>
                <div class="export-option" data-format="csv" style="
                    padding: 0.75rem 1rem;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    cursor: pointer;
                    transition: background 0.2s ease;
                " onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='white'">
                    <i class="fas fa-file-csv" style="color: #10b981; width: 16px;"></i>
                    <span>Export as CSV</span>
                </div>
                <div class="export-option" data-format="pdf" style="
                    padding: 0.75rem 1rem;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    cursor: pointer;
                    transition: background 0.2s ease;
                " onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='white'">
                    <i class="fas fa-file-pdf" style="color: #ef4444; width: 16px;"></i>
                    <span>Export as PDF</span>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', dropdownHtml);

        // Setup click handlers
        document.querySelectorAll('.export-option').forEach(option => {
            option.addEventListener('click', () => {
                const format = option.dataset.format;
                this.exportAnalysis(format);
                document.querySelector('.export-dropdown').remove();
            });
        });

        // Close on outside click
        setTimeout(() => {
            document.addEventListener('click', function closeDropdown(e) {
                if (!e.target.closest('.export-dropdown') && !e.target.closest('#exportCompetitorBtn')) {
                    const dropdown = document.querySelector('.export-dropdown');
                    if (dropdown) dropdown.remove();
                    document.removeEventListener('click', closeDropdown);
                }
            });
        }, 100);
    }

    renderCompetitorChips() {
        const chipsContainer = document.getElementById('competitorChips');
        if (!chipsContainer) return;

        // Get current brand and its competitors
        const brandId = this.currentBrand || (typeof APIData !== 'undefined' ? APIData.currentBrand : 'apple');
        const brand = typeof APIData !== 'undefined' ? APIData.brands[brandId] : null;

        if (!brand) {
            chipsContainer.innerHTML = '<p>No brand selected</p>';
            return;
        }

        // Build chips HTML - Your brand first, then competitors
        const brandLogoHtml = brand.logo
            ? `<img src="${brand.logo}" alt="${brand.name}" onerror="this.parentElement.innerHTML='${brand.name.charAt(0)}'; this.parentElement.style.background='${brand.color}';">`
            : brand.name.charAt(0);

        let chipsHtml = `
            <button class="competitor-chip active" data-competitor="${brandId}">
                <span class="chip-logo" style="background: ${brand.logo ? '#ffffff' : brand.color}">${brandLogoHtml}</span>
                <span>${brand.name}</span>
            </button>
        `;

        // Add competitor chips
        brand.competitors.forEach(compId => {
            const comp = typeof APIData !== 'undefined' ? APIData.brands[compId] : null;
            if (comp) {
                const compLogoHtml = comp.logo
                    ? `<img src="${comp.logo}" alt="${comp.name}" onerror="this.parentElement.innerHTML='${comp.name.charAt(0)}'; this.parentElement.style.background='${comp.color}';">`
                    : comp.name.charAt(0);

                chipsHtml += `
                    <button class="competitor-chip active" data-competitor="${compId}">
                        <span class="chip-logo" style="background: ${comp.logo ? '#ffffff' : comp.color}">${compLogoHtml}</span>
                        <span>${comp.name}</span>
                    </button>
                `;
            }
        });

        chipsContainer.innerHTML = chipsHtml;

        // Attach click events
        chipsContainer.querySelectorAll('.competitor-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                chip.classList.toggle('active');
                this.updateComparison();
            });
        });
    }

    loadCompetitorData() {
        const brandId = this.currentBrand || (typeof APIData !== 'undefined' ? APIData.currentBrand : 'apple');
        const brand = typeof APIData !== 'undefined' ? APIData.brands[brandId] : null;

        if (!brand) {
            this.competitors = [];
            return;
        }

        // Build competitors array with the current brand first
        this.competitors = [{
            id: brandId,
            name: brand.name,
            color: brand.color,
            mentions: Math.round(brand.metrics.avgMentions * (0.9 + Math.random() * 0.2)),
            sentiment: Math.round(brand.metrics.avgSentiment * (0.95 + Math.random() * 0.1)),
            engagement: parseFloat((brand.metrics.avgEngagement * (0.9 + Math.random() * 0.2)).toFixed(1)),
            reach: Math.round(brand.metrics.avgReach * (0.9 + Math.random() * 0.2)),
            growth: parseFloat((brand.metrics.growthRate * (0.9 + Math.random() * 0.2)).toFixed(1))
        }];

        // Add competitor data
        brand.competitors.forEach(compId => {
            const comp = typeof APIData !== 'undefined' ? APIData.brands[compId] : null;
            if (comp) {
                this.competitors.push({
                    id: compId,
                    name: comp.name,
                    color: comp.color,
                    mentions: Math.round(comp.metrics.avgMentions * (0.9 + Math.random() * 0.2)),
                    sentiment: Math.round(comp.metrics.avgSentiment * (0.95 + Math.random() * 0.1)),
                    engagement: parseFloat((comp.metrics.avgEngagement * (0.9 + Math.random() * 0.2)).toFixed(1)),
                    reach: Math.round(comp.metrics.avgReach * (0.9 + Math.random() * 0.2)),
                    growth: parseFloat((comp.metrics.growthRate * (0.9 + Math.random() * 0.2)).toFixed(1))
                });
            }
        });

        this.selectedCompetitors = this.competitors.map(c => c.id);

        // Update the stats overview cards
        this.updateStatsCards();
    }

    updateStatsCards() {
        if (this.competitors.length === 0) return;

        const yourBrand = this.competitors[0];
        const allCompetitors = this.competitors;

        // Calculate category averages
        const avgSentiment = (allCompetitors.reduce((s, c) => s + c.sentiment, 0) / allCompetitors.length).toFixed(1);
        const avgEngagement = (allCompetitors.reduce((s, c) => s + c.engagement, 0) / allCompetitors.length).toFixed(1);

        // Find ranks
        const sortedBySov = [...allCompetitors].sort((a, b) => b.mentions - a.mentions);
        const sortedBySentiment = [...allCompetitors].sort((a, b) => b.sentiment - a.sentiment);
        const sortedByEngagement = [...allCompetitors].sort((a, b) => b.engagement - a.engagement);
        const sortedByGrowth = [...allCompetitors].sort((a, b) => b.growth - a.growth);

        const sovRank = sortedBySov.findIndex(c => c.id === yourBrand.id) + 1;
        const sentimentRank = sortedBySentiment.findIndex(c => c.id === yourBrand.id) + 1;
        const engagementRank = sortedByEngagement.findIndex(c => c.id === yourBrand.id) + 1;
        const growthRank = sortedByGrowth.findIndex(c => c.id === yourBrand.id) + 1;

        // Calculate share of voice
        const totalMentions = allCompetitors.reduce((s, c) => s + c.mentions, 0);
        const shareOfVoice = ((yourBrand.mentions / totalMentions) * 100).toFixed(1);

        // Update stat cards
        const statCards = document.querySelectorAll('.stats-grid-4 .stat-card');
        if (statCards.length >= 4) {
            // Share of Voice
            const sovValue = statCards[0].querySelector('.stat-value');
            const sovChange = statCards[0].querySelector('.stat-change');
            const sovRankEl = statCards[0].querySelector('.stat-rank');
            if (sovValue) sovValue.textContent = shareOfVoice + '%';
            if (sovChange) sovChange.innerHTML = `<span>+${yourBrand.growth.toFixed(1)}% Market Share</span>`;
            if (sovRankEl) sovRankEl.textContent = `#${sovRank} in category`;

            // Sentiment
            const sentValue = statCards[1].querySelector('.stat-value');
            const sentChange = statCards[1].querySelector('.stat-change');
            const sentRankEl = statCards[1].querySelector('.stat-rank');
            if (sentValue) sentValue.textContent = yourBrand.sentiment + '%';
            if (sentChange) {
                const diff = (yourBrand.sentiment - avgSentiment).toFixed(1);
                sentChange.className = `stat-change ${diff >= 0 ? 'positive' : 'negative'}`;
                sentChange.innerHTML = `<span>${diff >= 0 ? 'Above' : 'Below'} avg (${avgSentiment}%)</span>`;
            }
            if (sentRankEl) sentRankEl.textContent = `#${sentimentRank} in category`;

            // Engagement
            const engValue = statCards[2].querySelector('.stat-value');
            const engChange = statCards[2].querySelector('.stat-change');
            const engRankEl = statCards[2].querySelector('.stat-rank');
            if (engValue) engValue.textContent = yourBrand.engagement + '%';
            if (engChange) {
                const diff = (yourBrand.engagement - avgEngagement).toFixed(1);
                engChange.className = `stat-change ${diff >= 0 ? 'positive' : 'negative'}`;
                engChange.innerHTML = `<span>${diff >= 0 ? 'Above' : 'Below'} avg (${avgEngagement}%)</span>`;
            }
            if (engRankEl) engRankEl.textContent = `#${engagementRank} in category`;

            // Growth Rate
            const growthValue = statCards[3].querySelector('.stat-value');
            const growthChange = statCards[3].querySelector('.stat-change');
            const growthRankEl = statCards[3].querySelector('.stat-rank');
            if (growthValue) growthValue.textContent = '+' + yourBrand.growth + '%';
            if (growthChange) {
                growthChange.className = `stat-change ${growthRank === 1 ? 'positive' : 'neutral'}`;
                growthChange.innerHTML = `<span>${growthRank === 1 ? 'Fastest growing' : 'Steady growth'}</span>`;
            }
            if (growthRankEl) growthRankEl.textContent = `#${growthRank} in category`;
        }
    }

    initializeCharts() {
        if (typeof Chart === 'undefined') return;

        // Destroy existing charts
        if (this.shareOfVoiceChart) this.shareOfVoiceChart.destroy();
        if (this.sentimentChart) this.sentimentChart.destroy();
        if (this.engagementChart) this.engagementChart.destroy();
        if (this.platformChart) this.platformChart.destroy();

        // Share of Voice
        this.createShareOfVoiceChart();

        // Sentiment Comparison
        this.createSentimentComparisonChart();

        // Engagement Comparison
        this.createEngagementChart();

        // Platform Distribution
        this.createPlatformChart();
    }

    createShareOfVoiceChart() {
        const ctx = document.getElementById('shareOfVoiceChart');
        if (!ctx) return;

        const chartColors = [
            { border: '#8b5cf6', gradient: ['rgba(139, 92, 246, 0.3)', 'rgba(139, 92, 246, 0.01)'] },
            { border: '#3b82f6', gradient: ['rgba(59, 130, 246, 0.3)', 'rgba(59, 130, 246, 0.01)'] },
            { border: '#ec4899', gradient: ['rgba(236, 72, 153, 0.3)', 'rgba(236, 72, 153, 0.01)'] },
            { border: '#f59e0b', gradient: ['rgba(245, 158, 11, 0.3)', 'rgba(245, 158, 11, 0.01)'] }
        ];

        const datasets = this.competitors.slice(0, 4).map((comp, index) => {
            const baseValue = 25 + Math.random() * 25;
            const colorSet = chartColors[index];

            // Create gradient
            const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 300);
            gradient.addColorStop(0, colorSet.gradient[0]);
            gradient.addColorStop(1, colorSet.gradient[1]);

            return {
                label: comp.name,
                data: [
                    baseValue,
                    baseValue + (Math.random() * 15 - 5),
                    baseValue + (Math.random() * 15 - 3),
                    baseValue + (Math.random() * 15 - 2)
                ],
                borderColor: colorSet.border,
                backgroundColor: gradient,
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointRadius: 6,
                pointBackgroundColor: 'white',
                pointBorderColor: colorSet.border,
                pointBorderWidth: 3,
                pointHoverRadius: 8,
                pointHoverBackgroundColor: colorSet.border,
                pointHoverBorderColor: 'white',
                pointHoverBorderWidth: 2
            };
        });

        this.shareOfVoiceChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            pointStyle: 'circle',
                            padding: 20,
                            font: {
                                size: 12,
                                weight: '500'
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        titleColor: '#1f2937',
                        bodyColor: '#4b5563',
                        borderColor: '#e5e7eb',
                        borderWidth: 1,
                        padding: 12,
                        boxPadding: 6,
                        usePointStyle: true,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y.toFixed(1) + '%';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.04)',
                            drawBorder: false
                        },
                        border: {
                            display: false
                        },
                        ticks: {
                            stepSize: 25,
                            callback: (value) => value + '%',
                            font: {
                                size: 12,
                                weight: '500'
                            },
                            color: '#9ca3af',
                            padding: 10
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        border: {
                            display: false
                        },
                        ticks: {
                            font: {
                                size: 12,
                                weight: '500'
                            },
                            color: '#6b7280',
                            padding: 8
                        }
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }

    createSentimentComparisonChart() {
        const ctx = document.getElementById('sentimentComparisonChart');
        if (!ctx) return;

        // Purple shades matching Activity by Hour
        const purpleShades = ['#c4b5fd', '#a78bfa', '#8b5cf6', '#6d28d9'];

        this.sentimentChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.competitors.slice(0, 4).map(c => c.name),
                datasets: [{
                    label: 'Sentiment Score',
                    data: this.competitors.slice(0, 4).map(c => c.sentiment),
                    backgroundColor: purpleShades,
                    borderRadius: 8,
                    borderSkipped: false,
                    barThickness: 50
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        titleColor: '#1f2937',
                        bodyColor: '#4b5563',
                        borderColor: '#e5e7eb',
                        borderWidth: 1,
                        padding: 12,
                        callbacks: {
                            label: function(context) {
                                return 'Sentiment: ' + context.parsed.y + '%';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.04)',
                            drawBorder: false
                        },
                        border: {
                            display: false
                        },
                        ticks: {
                            stepSize: 25,
                            callback: (value) => value + '%',
                            font: {
                                size: 12,
                                weight: '500'
                            },
                            color: '#9ca3af',
                            padding: 10
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        border: {
                            display: false
                        },
                        ticks: {
                            font: {
                                size: 12,
                                weight: '500'
                            },
                            color: '#6b7280',
                            padding: 8
                        }
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }

    createEngagementChart() {
        const ctx = document.getElementById('engagementComparisonChart');
        if (!ctx) return;

        // Vibrant colors with transparency
        const chartStyles = [
            { border: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.2)', pointBg: '#8b5cf6' },
            { border: '#ec4899', bg: 'rgba(236, 72, 153, 0.2)', pointBg: '#ec4899' },
            { border: '#06b6d4', bg: 'rgba(6, 182, 212, 0.2)', pointBg: '#06b6d4' },
            { border: '#f59e0b', bg: 'rgba(245, 158, 11, 0.2)', pointBg: '#f59e0b' }
        ];

        const datasets = this.competitors.slice(0, 2).map((comp, index) => ({
            label: comp.name,
            data: [
                Math.round(65 + Math.random() * 30),
                Math.round(55 + Math.random() * 35),
                Math.round(45 + Math.random() * 40),
                Math.round(60 + Math.random() * 30),
                Math.round(70 + Math.random() * 25)
            ],
            borderColor: chartStyles[index].border,
            backgroundColor: chartStyles[index].bg,
            borderWidth: 3,
            pointRadius: 5,
            pointBackgroundColor: 'white',
            pointBorderColor: chartStyles[index].border,
            pointBorderWidth: 3,
            pointHoverRadius: 7,
            pointHoverBackgroundColor: chartStyles[index].pointBg,
            pointHoverBorderColor: 'white',
            pointHoverBorderWidth: 2
        }));

        this.engagementChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Likes', 'Comments', 'Shares', 'Saves', 'Clicks'],
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            pointStyle: 'circle',
                            padding: 20,
                            font: {
                                size: 12,
                                weight: '500'
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        titleColor: '#1f2937',
                        bodyColor: '#4b5563',
                        borderColor: '#e5e7eb',
                        borderWidth: 1,
                        padding: 12,
                        usePointStyle: true,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.r + '%';
                            }
                        }
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 25,
                            font: {
                                size: 12,
                                weight: '500'
                            },
                            color: '#6b7280',
                            backdropColor: 'transparent'
                        },
                        grid: {
                            color: 'rgba(139, 92, 246, 0.15)'
                        },
                        angleLines: {
                            color: 'rgba(139, 92, 246, 0.15)'
                        },
                        pointLabels: {
                            font: {
                                size: 14,
                                weight: '600'
                            },
                            color: '#4b5563'
                        }
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }

    createPlatformChart() {
        const ctx = document.getElementById('platformComparisonChart');
        if (!ctx) return;

        this.platformChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Twitter', 'LinkedIn', 'Instagram', 'Facebook', 'Reddit'],
                datasets: [{
                    data: [35, 25, 20, 12, 8],
                    backgroundColor: ['#1DA1F2', '#0A66C2', '#E4405F', '#1877F2', '#FF4500']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    loadComparisonTable() {
        const thead = document.getElementById('comparisonTableHead');
        const tbody = document.getElementById('comparisonTableBody');
        if (!thead || !tbody) return;

        // Build metrics from competitor data
        const comps = this.competitors.slice(0, 4);

        // Create header row with dynamic brand names and explicit widths
        thead.innerHTML = `<tr>
            <th style="width: 180px; text-align: left;">Metric</th>
            ${comps.map(c => `<th style="text-align: center;">${c.name}</th>`).join('')}
            <th style="width: 120px; text-align: center;">Leader</th>
        </tr>`;

        // Helper to format numbers
        const formatNum = (n) => {
            if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
            if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
            return n.toString();
        };

        // Find leaders for each metric
        const mentionsLeader = comps.reduce((a, b) => a.mentions > b.mentions ? a : b);
        const sentimentLeader = comps.reduce((a, b) => a.sentiment > b.sentiment ? a : b);
        const engagementLeader = comps.reduce((a, b) => a.engagement > b.engagement ? a : b);
        const reachLeader = comps.reduce((a, b) => a.reach > b.reach ? a : b);
        const growthLeader = comps.reduce((a, b) => a.growth > b.growth ? a : b);

        const metrics = [
            {
                name: 'Total Mentions',
                icon: 'fa-comment-dots',
                iconBg: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
                values: comps.map(c => formatNum(c.mentions)),
                leader: mentionsLeader.name
            },
            {
                name: 'Sentiment Score',
                icon: 'fa-smile',
                iconBg: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                values: comps.map(c => c.sentiment + '%'),
                leader: sentimentLeader.name
            },
            {
                name: 'Engagement Rate',
                icon: 'fa-heart',
                iconBg: 'linear-gradient(135deg, #f43f5e 0%, #fb7185 100%)',
                values: comps.map(c => c.engagement + '%'),
                leader: engagementLeader.name
            },
            {
                name: 'Total Reach',
                icon: 'fa-users',
                iconBg: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
                values: comps.map(c => formatNum(c.reach)),
                leader: reachLeader.name
            },
            {
                name: 'Growth Rate',
                icon: 'fa-chart-line',
                iconBg: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                values: comps.map(c => '+' + c.growth + '%'),
                leader: growthLeader.name
            },
            {
                name: 'Response Time',
                icon: 'fa-clock',
                iconBg: 'linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)',
                values: comps.map(() => (1.5 + Math.random() * 4).toFixed(1) + 'h'),
                leader: comps[0].name
            }
        ];

        tbody.innerHTML = metrics.map(metric => {
            const valueCells = metric.values.map((val, idx) => {
                const isLeader = comps[idx]?.name === metric.leader;
                return `<td class="value-cell ${isLeader ? 'value-leader' : ''}">${val}</td>`;
            }).join('');

            return `
                <tr class="comparison-row">
                    <td class="metric-cell">
                        <div class="metric-name">
                            <div class="metric-icon" style="background: ${metric.iconBg};">
                                <i class="fas ${metric.icon}" style="color: white; font-size: 0.75rem;"></i>
                            </div>
                            ${metric.name}
                        </div>
                    </td>
                    ${valueCells}
                    <td class="leader-cell"><span class="leader-badge">${metric.leader}</span></td>
                </tr>
            `;
        }).join('');
    }

    loadInsights() {
        const grid = document.getElementById('insightsGrid');
        if (!grid) return;

        if (this.competitors.length < 2) {
            grid.innerHTML = '<p>Not enough data for insights</p>';
            return;
        }

        const yourBrand = this.competitors[0];
        const otherCompetitors = this.competitors.slice(1);

        // Calculate insights based on actual data
        const avgSentiment = otherCompetitors.reduce((sum, c) => sum + c.sentiment, 0) / otherCompetitors.length;
        const sentimentDiff = (yourBrand.sentiment - avgSentiment).toFixed(1);
        const isSentimentLeader = yourBrand.sentiment >= Math.max(...this.competitors.map(c => c.sentiment));
        const sentimentRank = [...this.competitors].sort((a, b) => b.sentiment - a.sentiment).findIndex(c => c.id === yourBrand.id) + 1;

        const maxEngagement = Math.max(...otherCompetitors.map(c => c.engagement));
        const engagementGap = (maxEngagement - yourBrand.engagement).toFixed(1);
        const engagementLeader = otherCompetitors.find(c => c.engagement === maxEngagement);
        const engagementRank = [...this.competitors].sort((a, b) => b.engagement - a.engagement).findIndex(c => c.id === yourBrand.id) + 1;
        const engagementScore = Math.min(100, (yourBrand.engagement / maxEngagement) * 100);

        const maxGrowth = Math.max(...otherCompetitors.map(c => c.growth));
        const isGrowthLeader = yourBrand.growth >= maxGrowth;
        const growthDiff = (yourBrand.growth - maxGrowth).toFixed(1);
        const growthRank = [...this.competitors].sort((a, b) => b.growth - a.growth).findIndex(c => c.id === yourBrand.id) + 1;
        const growthScore = Math.min(100, (yourBrand.growth / Math.max(maxGrowth, yourBrand.growth)) * 100);

        const totalReach = this.competitors.reduce((sum, c) => sum + c.reach, 0);
        const marketShare = ((yourBrand.reach / totalReach) * 100).toFixed(1);
        const sortedByReach = [...this.competitors].sort((a, b) => b.reach - a.reach);
        const marketRank = sortedByReach.findIndex(c => c.id === yourBrand.id) + 1;

        // Generate detailed modal content for each insight
        const sentimentBreakdown = {
            positive: yourBrand.sentiment,
            neutral: Math.round((100 - yourBrand.sentiment) * 0.6),
            negative: Math.round((100 - yourBrand.sentiment) * 0.4)
        };

        const engagementByType = {
            likes: Math.round(yourBrand.engagement * 0.45),
            comments: Math.round(yourBrand.engagement * 0.25),
            shares: Math.round(yourBrand.engagement * 0.20),
            saves: Math.round(yourBrand.engagement * 0.10)
        };

        const growthByChannel = {
            social: Math.round(yourBrand.growth * 0.4),
            organic: Math.round(yourBrand.growth * 0.35),
            referral: Math.round(yourBrand.growth * 0.15),
            direct: Math.round(yourBrand.growth * 0.10)
        };

        const insights = [
            {
                id: 'sentiment',
                type: isSentimentLeader ? 'success' : parseFloat(sentimentDiff) >= -5 ? 'warning' : 'danger',
                icon: isSentimentLeader ? 'fa-smile-beam' : 'fa-meh',
                iconColor: isSentimentLeader ? '#10b981' : '#f59e0b',
                title: isSentimentLeader ? 'Positive Reviews' : 'Customer Sentiment',
                value: yourBrand.sentiment + '%',
                valueLabel: 'positive mentions',
                change: sentimentDiff,
                changeType: parseFloat(sentimentDiff) >= 0 ? 'positive' : 'negative',
                rank: sentimentRank,
                total: this.competitors.length,
                progress: yourBrand.sentiment,
                description: isSentimentLeader
                    ? `${yourBrand.sentiment}% of customers speak positively`
                    : `${Math.abs(sentimentDiff)}% below avg · Room to improve`,
                tips: isSentimentLeader
                    ? ['Maintain quality engagement', 'Continue monitoring trends', 'Leverage positive momentum']
                    : ['Improve response times', 'Address customer concerns', 'Enhance product quality'],
                metric: 'sentiment',
                modalContent: {
                    keyFindings: [
                        {
                            icon: 'fa-comments',
                            label: 'Customer Feedback',
                            value: `${Math.round(yourBrand.mentions * 0.7).toLocaleString()} reviews analyzed`,
                            detail: 'Across all platforms'
                        },
                        {
                            icon: 'fa-clock',
                            label: 'Avg Response Time',
                            value: isSentimentLeader ? '< 2 hours' : '4-6 hours',
                            detail: isSentimentLeader ? 'Industry leading' : 'Room for improvement'
                        },
                        {
                            icon: 'fa-star',
                            label: 'Brand Perception',
                            value: isSentimentLeader ? 'Excellent' : 'Good',
                            detail: `Top ${sentimentRank} of ${this.competitors.length} brands`
                        }
                    ],
                    sentimentBreakdown: sentimentBreakdown,
                    topThemes: isSentimentLeader
                        ? [
                            { theme: 'Product Quality', sentiment: 'positive', mentions: Math.round(yourBrand.mentions * 0.3) },
                            { theme: 'Customer Service', sentiment: 'positive', mentions: Math.round(yourBrand.mentions * 0.25) },
                            { theme: 'Value for Money', sentiment: 'positive', mentions: Math.round(yourBrand.mentions * 0.2) },
                            { theme: 'User Experience', sentiment: 'neutral', mentions: Math.round(yourBrand.mentions * 0.15) }
                        ]
                        : [
                            { theme: 'Delivery Speed', sentiment: 'negative', mentions: Math.round(yourBrand.mentions * 0.25) },
                            { theme: 'Product Quality', sentiment: 'neutral', mentions: Math.round(yourBrand.mentions * 0.2) },
                            { theme: 'Customer Support', sentiment: 'negative', mentions: Math.round(yourBrand.mentions * 0.18) },
                            { theme: 'Pricing', sentiment: 'positive', mentions: Math.round(yourBrand.mentions * 0.15) }
                        ],
                    weeklyTrend: [65, 68, 72, 70, 74, yourBrand.sentiment - 2, yourBrand.sentiment],
                    actionItems: isSentimentLeader
                        ? [
                            'Continue monitoring social mentions for early warning signs',
                            'Amplify positive customer stories through testimonials',
                            'Maintain response time standards across all channels'
                        ]
                        : [
                            'Implement automated response system for common queries',
                            'Address top 3 negative feedback themes within 30 days',
                            'Launch customer satisfaction survey to gather detailed insights'
                        ]
                }
            },
            {
                id: 'engagement',
                type: engagementGap <= 0 ? 'success' : parseFloat(engagementGap) <= 2 ? 'warning' : 'danger',
                icon: engagementGap <= 0 ? 'fa-fire' : 'fa-chart-bar',
                iconColor: engagementGap <= 0 ? '#ec4899' : '#3b82f6',
                title: engagementGap <= 0 ? 'High Engagement' : 'Audience Engagement',
                value: yourBrand.engagement + '%',
                valueLabel: 'of audience interacts',
                change: engagementGap <= 0 ? '+' + Math.abs(engagementGap) : '-' + engagementGap,
                changeType: engagementGap <= 0 ? 'positive' : 'negative',
                rank: engagementRank,
                total: this.competitors.length,
                progress: engagementScore,
                description: engagementGap <= 0
                    ? `${Math.abs(engagementGap)}% more likes & comments than avg`
                    : `${engagementGap}% fewer interactions than ${engagementLeader?.name || 'leader'}`,
                tips: engagementGap <= 0
                    ? ['Scale successful content types', 'Experiment with new formats', 'Optimize posting times']
                    : ['Create interactive content', 'Respond faster to comments', 'Use more visual content'],
                metric: 'engagement',
                modalContent: {
                    keyFindings: [
                        {
                            icon: 'fa-bullseye',
                            label: 'Engagement Rate',
                            value: yourBrand.engagement + '%',
                            detail: engagementGap <= 0 ? 'Above industry average' : 'Below top performer'
                        },
                        {
                            icon: 'fa-users',
                            label: 'Active Audience',
                            value: (yourBrand.reach * yourBrand.engagement / 100 / 1000000).toFixed(1) + 'M',
                            detail: 'Monthly engaged users'
                        },
                        {
                            icon: 'fa-redo',
                            label: 'Content Frequency',
                            value: Math.round(yourBrand.mentions / 30) + '/day',
                            detail: 'Average posts per day'
                        }
                    ],
                    engagementByType: engagementByType,
                    topContentTypes: [
                        { type: 'Video Content', engagement: Math.round(yourBrand.engagement * 1.4), icon: 'fa-video' },
                        { type: 'Carousel Posts', engagement: Math.round(yourBrand.engagement * 1.2), icon: 'fa-images' },
                        { type: 'Stories', engagement: Math.round(yourBrand.engagement * 0.9), icon: 'fa-clock' },
                        { type: 'Static Images', engagement: Math.round(yourBrand.engagement * 0.7), icon: 'fa-image' }
                    ],
                    peakHours: ['9 AM', '12 PM', '6 PM', '9 PM'],
                    audienceInsights: {
                        mostActiveDay: 'Thursday',
                        avgSessionTime: '4.2 mins',
                        returnRate: '68%'
                    },
                    actionItems: engagementGap <= 0
                        ? [
                            'Double down on video content - highest engagement driver',
                            'Test interactive polls and Q&A sessions',
                            'Collaborate with micro-influencers for authentic reach'
                        ]
                        : [
                            'Increase video content production by 50%',
                            'Implement a consistent posting schedule during peak hours',
                            'Add clear CTAs to boost comment and share rates'
                        ]
                }
            },
            {
                id: 'growth',
                type: isGrowthLeader ? 'success' : parseFloat(growthDiff) >= -5 ? 'info' : 'warning',
                icon: isGrowthLeader ? 'fa-rocket' : 'fa-chart-line',
                iconColor: isGrowthLeader ? '#8b5cf6' : '#f97316',
                title: isGrowthLeader ? 'Fastest Growing' : 'Growth Rate',
                value: '+' + yourBrand.growth + '%',
                valueLabel: 'follower growth this month',
                change: growthDiff,
                changeType: parseFloat(growthDiff) >= 0 ? 'positive' : 'negative',
                rank: growthRank,
                total: this.competitors.length,
                progress: growthScore,
                description: isGrowthLeader
                    ? `Growing faster than all competitors`
                    : `${engagementLeader?.name || 'Leader'} growing at +${maxGrowth}%`,
                tips: isGrowthLeader
                    ? ['Capitalize on momentum', 'Expand to new channels', 'Increase content frequency']
                    : ['Analyze competitor strategies', 'Test new approaches', 'Focus on viral content'],
                metric: 'growth',
                modalContent: {
                    keyFindings: [
                        {
                            icon: 'fa-chart-line',
                            label: 'Growth Velocity',
                            value: '+' + yourBrand.growth + '%',
                            detail: 'Month over month'
                        },
                        {
                            icon: 'fa-user-plus',
                            label: 'New Followers',
                            value: '+' + Math.round(yourBrand.reach * yourBrand.growth / 100 / 1000).toLocaleString() + 'K',
                            detail: 'This month'
                        },
                        {
                            icon: 'fa-trophy',
                            label: 'Growth Rank',
                            value: '#' + growthRank,
                            detail: `of ${this.competitors.length} competitors`
                        }
                    ],
                    growthByChannel: growthByChannel,
                    growthDrivers: isGrowthLeader
                        ? [
                            { driver: 'Viral Campaign', impact: 'High', contribution: '+4.2%' },
                            { driver: 'Influencer Partnership', impact: 'High', contribution: '+3.8%' },
                            { driver: 'SEO Improvements', impact: 'Medium', contribution: '+2.1%' },
                            { driver: 'Paid Advertising', impact: 'Medium', contribution: '+1.9%' }
                        ]
                        : [
                            { driver: 'Organic Content', impact: 'Medium', contribution: '+2.5%' },
                            { driver: 'Word of Mouth', impact: 'Low', contribution: '+1.8%' },
                            { driver: 'Email Marketing', impact: 'Low', contribution: '+1.2%' },
                            { driver: 'Social Ads', impact: 'Low', contribution: '+0.9%' }
                        ],
                    projectedGrowth: {
                        nextMonth: (yourBrand.growth * 1.1).toFixed(1),
                        nextQuarter: (yourBrand.growth * 3.2).toFixed(1),
                        confidence: isGrowthLeader ? 'High' : 'Medium'
                    },
                    actionItems: isGrowthLeader
                        ? [
                            'Secure additional budget to scale winning campaigns',
                            'Expand to emerging platforms (TikTok, Threads)',
                            'Document and replicate successful growth tactics'
                        ]
                        : [
                            'Analyze top competitor\'s content strategy and posting patterns',
                            'Invest in paid social to accelerate follower acquisition',
                            'Launch a referral program to boost organic growth'
                        ]
                }
            },
            {
                id: 'market',
                type: marketRank === 1 ? 'success' : marketRank <= 2 ? 'info' : 'warning',
                icon: 'fa-globe',
                iconColor: '#06b6d4',
                title: 'Market Share',
                value: marketShare + '%',
                valueLabel: 'of total audience reach',
                change: marketRank === 1 ? 'Leader' : '#' + marketRank,
                changeType: marketRank <= 2 ? 'positive' : 'neutral',
                rank: marketRank,
                total: this.competitors.length,
                progress: parseFloat(marketShare),
                description: `Reaching ${(yourBrand.reach / 1000000).toFixed(1)}M people · ${(yourBrand.mentions / 1000).toFixed(1)}K talking about you`,
                tips: ['Expand platform presence', 'Partner with influencers', 'Run targeted campaigns'],
                metric: 'reach',
                modalContent: {
                    keyFindings: [
                        {
                            icon: 'fa-chart-pie',
                            label: 'Market Share',
                            value: marketShare + '%',
                            detail: 'Share of total reach'
                        },
                        {
                            icon: 'fa-bullhorn',
                            label: 'Share of Voice',
                            value: ((yourBrand.mentions / this.competitors.reduce((s, c) => s + c.mentions, 0)) * 100).toFixed(1) + '%',
                            detail: 'Of total conversations'
                        },
                        {
                            icon: 'fa-eye',
                            label: 'Brand Visibility',
                            value: marketRank <= 2 ? 'High' : 'Medium',
                            detail: `Rank #${marketRank} in category`
                        }
                    ],
                    marketDistribution: this.competitors.map(c => ({
                        name: c.name,
                        share: ((c.reach / totalReach) * 100).toFixed(1),
                        isYou: c.id === yourBrand.id
                    })).sort((a, b) => parseFloat(b.share) - parseFloat(a.share)),
                    channelPresence: [
                        { channel: 'Instagram', strength: Math.round(80 + Math.random() * 15), icon: 'fa-instagram' },
                        { channel: 'Twitter/X', strength: Math.round(60 + Math.random() * 20), icon: 'fa-twitter' },
                        { channel: 'Facebook', strength: Math.round(50 + Math.random() * 25), icon: 'fa-facebook' },
                        { channel: 'LinkedIn', strength: Math.round(40 + Math.random() * 20), icon: 'fa-linkedin' }
                    ],
                    competitiveGap: {
                        leader: sortedByReach[0]?.name || 'N/A',
                        leaderShare: ((sortedByReach[0]?.reach || 0) / totalReach * 100).toFixed(1),
                        gapToLeader: marketRank === 1 ? 'You are the leader' : ((sortedByReach[0]?.reach - yourBrand.reach) / 1000000).toFixed(1) + 'M reach gap'
                    },
                    actionItems: marketRank === 1
                        ? [
                            'Defend market position with consistent brand messaging',
                            'Monitor challenger brands for competitive threats',
                            'Explore adjacent market opportunities'
                        ]
                        : [
                            'Increase content output to boost share of voice',
                            'Target competitor audiences with differentiated messaging',
                            'Invest in brand awareness campaigns'
                        ]
                }
            }
        ];


        // Store insights for later use
        this.currentInsights = insights;

        grid.innerHTML = insights.map((insight, index) => `
            <div class="insight-card insight-card-dynamic insight-${insight.id}-card" data-insight-id="${insight.id}" style="animation-delay: ${index * 0.1}s;">
                <div class="stat-card-bg">
                    <div class="stat-bg-shape shape-1"></div>
                    <div class="stat-bg-shape shape-2"></div>
                    <div class="stat-bg-shape shape-3"></div>
                </div>
                <div class="insight-card-header">
                    <div class="insight-icon-wrapper">
                        <i class="fas ${insight.icon}"></i>
                    </div>
                    <div class="insight-rank-badge">
                        #${insight.rank}
                    </div>
                </div>
                <h4 class="insight-title">${insight.title}</h4>
                <div class="insight-value-row">
                    <span class="insight-value">${insight.value}</span>
                    <span class="insight-change ${insight.changeType}">
                        <i class="fas fa-arrow-${insight.changeType === 'positive' ? 'up' : insight.changeType === 'negative' ? 'down' : 'right'}"></i>
                        ${typeof insight.change === 'string' ? insight.change : (parseFloat(insight.change) >= 0 ? '+' : '') + insight.change + '%'}
                    </span>
                </div>
                ${insight.valueLabel ? `<span class="insight-value-label">${insight.valueLabel}</span>` : ''}
                <div class="insight-progress-bar">
                    <div class="insight-progress-fill" style="width: 0%;" data-progress="${insight.progress}"></div>
                </div>
                <p class="insight-description">${insight.description}</p>
                <button class="insight-action-btn" data-insight-id="${insight.id}">
                    <span>View Details</span>
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        `).join('');

        // Add styles for the new insight cards
        this.addInsightStyles();

        // Animate progress bars
        setTimeout(() => {
            grid.querySelectorAll('.insight-progress-fill').forEach(bar => {
                const progress = bar.dataset.progress;
                bar.style.width = progress + '%';
            });
        }, 100);

        // Add click handlers
        grid.querySelectorAll('.insight-action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const insightId = btn.dataset.insightId;
                this.showInsightDetails(insightId);
            });
        });

        grid.querySelectorAll('.insight-card-dynamic').forEach(card => {
            card.addEventListener('click', () => {
                const insightId = card.dataset.insightId;
                this.showInsightDetails(insightId);
            });
        });
    }

    addInsightStyles() {
        // Remove existing styles to allow updates
        const existingStyles = document.getElementById('insight-dynamic-styles');
        if (existingStyles) existingStyles.remove();

        const styles = document.createElement('style');
        styles.id = 'insight-dynamic-styles';
        styles.textContent = `
            /* Base card styling */
            .insight-card-dynamic {
                position: relative;
                border-radius: 16px;
                padding: 24px;
                border: none;
                cursor: pointer;
                overflow: hidden;
                color: white;
                transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                            box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                            background 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                animation: insightFadeIn 0.6s ease-out;
                animation-fill-mode: backwards;
            }

            @keyframes insightFadeIn {
                0% {
                    opacity: 0;
                    transform: translateY(20px);
                }
            }

            /* Hover pop-up effect for all cards - smooth transition */
            .insight-card-dynamic:hover {
                transform: translateY(-8px) scale(1.02);
            }

            /* Background shapes container */
            .insight-card-dynamic .stat-card-bg {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                overflow: hidden;
                pointer-events: none;
            }

            /* Floating background shapes */
            .insight-card-dynamic .stat-bg-shape {
                position: absolute;
                border-radius: 50%;
                opacity: 0.25;
                background: rgba(255, 255, 255, 0.2);
            }
            .insight-card-dynamic .stat-bg-shape.shape-1 {
                width: 140px;
                height: 140px;
                top: -50px;
                right: -50px;
                background: rgba(255, 255, 255, 0.25);
                animation: insightFloat 5s ease-in-out infinite, insightPulse 4s ease-in-out infinite;
            }
            .insight-card-dynamic .stat-bg-shape.shape-2 {
                width: 100px;
                height: 100px;
                bottom: -30px;
                left: -30px;
                background: rgba(255, 255, 255, 0.2);
                animation: insightFloat 6s ease-in-out infinite, insightPulse 5s ease-in-out infinite;
                animation-delay: -2s, -1s;
            }
            .insight-card-dynamic .stat-bg-shape.shape-3 {
                width: 70px;
                height: 70px;
                top: 35%;
                right: 15%;
                background: rgba(255, 255, 255, 0.18);
                animation: insightFloat 5.5s ease-in-out infinite, insightPulse 6s ease-in-out infinite;
                animation-delay: -3s, -2s;
            }

            @keyframes insightFloat {
                0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
                25% { transform: translate(-8px, 6px) scale(1.08) rotate(4deg); }
                50% { transform: translate(-12px, 10px) scale(1.12) rotate(0deg); }
                75% { transform: translate(-5px, 4px) scale(1.05) rotate(-4deg); }
            }

            @keyframes insightPulse {
                0%, 100% { opacity: 0.25; }
                50% { opacity: 0.4; }
            }

            /* Sentiment Card - Light Green */
            .insight-sentiment-card {
                background: linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%);
                box-shadow: 0 4px 15px rgba(34, 197, 94, 0.2);
            }
            .insight-sentiment-card:hover {
                background: linear-gradient(135deg, #4ade80 0%, #22c55e 50%, #16a34a 100%);
                transform: translateY(-8px) scale(1.02);
                box-shadow: 0 20px 40px -15px rgba(34, 197, 94, 0.5), 0 0 25px rgba(34, 197, 94, 0.4);
            }

            /* Engagement Card - Blue */
            .insight-engagement-card {
                background: linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%);
                box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2);
            }
            .insight-engagement-card:hover {
                background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%);
                transform: translateY(-8px) scale(1.02);
                box-shadow: 0 20px 40px -15px rgba(59, 130, 246, 0.5), 0 0 25px rgba(59, 130, 246, 0.4);
            }

            /* Growth Card - Orange */
            .insight-growth-card {
                background: linear-gradient(135deg, #f97316 0%, #ea580c 50%, #c2410c 100%);
                box-shadow: 0 4px 15px rgba(249, 115, 22, 0.2);
            }
            .insight-growth-card:hover {
                background: linear-gradient(135deg, #fb923c 0%, #f97316 50%, #ea580c 100%);
                transform: translateY(-8px) scale(1.02);
                box-shadow: 0 20px 40px -15px rgba(249, 115, 22, 0.5), 0 0 25px rgba(249, 115, 22, 0.4);
            }

            /* Market Card - Cyan/Teal */
            .insight-market-card {
                background: linear-gradient(135deg, #06b6d4 0%, #0891b2 50%, #0e7490 100%);
                box-shadow: 0 4px 15px rgba(6, 182, 212, 0.2);
            }
            .insight-market-card:hover {
                background: linear-gradient(135deg, #22d3ee 0%, #06b6d4 50%, #0891b2 100%);
                transform: translateY(-8px) scale(1.02);
                box-shadow: 0 20px 40px -15px rgba(6, 182, 212, 0.5), 0 0 25px rgba(6, 182, 212, 0.4);
            }

            /* Card header */
            .insight-card-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 16px;
                position: relative;
                z-index: 1;
            }

            /* Icon wrapper */
            .insight-icon-wrapper {
                width: 48px;
                height: 48px;
                border-radius: 14px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.3rem;
                background: rgba(255, 255, 255, 0.25);
                color: white;
                backdrop-filter: blur(10px);
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            }

            /* Rank badge */
            .insight-rank-badge {
                padding: 6px 12px;
                border-radius: 20px;
                background: rgba(255, 255, 255, 0.3);
                color: white;
                font-size: 0.75rem;
                font-weight: 700;
                backdrop-filter: blur(10px);
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }

            /* Title */
            .insight-card-dynamic .insight-title {
                font-size: 1rem;
                font-weight: 600;
                color: rgba(255, 255, 255, 0.95);
                margin: 0 0 14px 0;
                position: relative;
                z-index: 1;
            }

            /* Value row */
            .insight-value-row {
                display: flex;
                align-items: baseline;
                gap: 12px;
                margin-bottom: 14px;
                position: relative;
                z-index: 1;
            }

            /* Main value */
            .insight-value {
                font-size: 2.25rem;
                font-weight: 700;
                color: white;
                text-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
            }

            /* Value label */
            .insight-value-label {
                display: block;
                font-size: 0.75rem;
                color: rgba(255, 255, 255, 0.85);
                margin-top: -8px;
                margin-bottom: 12px;
                position: relative;
                z-index: 1;
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            /* Change badge */
            .insight-change {
                font-size: 0.8rem;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 4px;
                padding: 4px 10px;
                border-radius: 12px;
                background: rgba(255, 255, 255, 0.25);
                color: white;
                backdrop-filter: blur(10px);
            }
            .insight-change.positive,
            .insight-change.negative,
            .insight-change.neutral {
                background: rgba(255, 255, 255, 0.25);
                color: white;
            }

            /* Progress bar */
            .insight-progress-bar {
                height: 8px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 4px;
                margin-bottom: 14px;
                overflow: hidden;
                position: relative;
                z-index: 1;
            }
            .insight-progress-fill {
                height: 100%;
                border-radius: 4px;
                transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
                background: rgba(255, 255, 255, 0.85);
                box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
            }

            /* Description */
            .insight-card-dynamic .insight-description {
                font-size: 0.85rem;
                color: rgba(255, 255, 255, 0.9);
                margin: 0 0 18px 0;
                line-height: 1.5;
                position: relative;
                z-index: 1;
            }

            /* Action button */
            .insight-action-btn {
                width: 100%;
                padding: 12px 18px;
                background: rgba(255, 255, 255, 0.2);
                border: 1px solid rgba(255, 255, 255, 0.3);
                border-radius: 12px;
                font-size: 0.85rem;
                font-weight: 600;
                color: white;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: space-between;
                transition: all 0.3s ease;
                position: relative;
                z-index: 1;
                backdrop-filter: blur(10px);
            }
            .insight-action-btn:hover {
                background: rgba(255, 255, 255, 0.35);
                border-color: rgba(255, 255, 255, 0.5);
                transform: translateY(-2px);
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
            }
            .insight-action-btn i {
                transition: transform 0.3s ease;
            }
            .insight-action-btn:hover i {
                transform: translateX(4px);
            }

            /* Insight Modal Styles */
            .insight-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            .insight-modal.active {
                opacity: 1;
                visibility: visible;
            }
            .insight-modal-content {
                background: white;
                border-radius: 20px;
                width: 90%;
                max-width: 560px;
                max-height: 90vh;
                overflow-y: auto;
                transform: scale(0.9) translateY(20px);
                transition: all 0.3s ease;
                scrollbar-width: thin;
                scrollbar-color: #8b5cf6 #f1f5f9;
            }
            .insight-modal-content::-webkit-scrollbar {
                width: 6px;
            }
            .insight-modal-content::-webkit-scrollbar-track {
                background: #f1f5f9;
                border-radius: 3px;
            }
            .insight-modal-content::-webkit-scrollbar-thumb {
                background: #8b5cf6;
                border-radius: 3px;
            }
            .insight-modal.active .insight-modal-content {
                transform: scale(1) translateY(0);
            }
            .insight-modal-header {
                padding: 24px 24px 16px;
                border-bottom: 1px solid #f3f4f6;
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
            }
            .insight-modal-header-left {
                display: flex;
                align-items: center;
                gap: 16px;
            }
            .insight-modal-icon {
                width: 56px;
                height: 56px;
                border-radius: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
            }
            .insight-modal-title {
                font-size: 1.25rem;
                font-weight: 700;
                color: #1f2937;
                margin: 0 0 4px 0;
            }
            .insight-modal-subtitle {
                font-size: 0.85rem;
                color: #6b7280;
                margin: 0;
            }
            .insight-modal-close {
                width: 36px;
                height: 36px;
                border-radius: 10px;
                border: none;
                background: #f3f4f6;
                color: #6b7280;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
                transition: all 0.2s ease;
            }
            .insight-modal-close:hover {
                background: #e5e7eb;
                color: #1f2937;
            }
            .insight-modal-body {
                padding: 24px;
            }
            .insight-modal-stats {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 16px;
                margin-bottom: 24px;
            }
            .insight-modal-stat {
                text-align: center;
                padding: 16px;
                background: #f9fafb;
                border-radius: 12px;
            }
            .insight-modal-stat-value {
                font-size: 1.5rem;
                font-weight: 700;
                color: #1f2937;
            }
            .insight-modal-stat-label {
                font-size: 0.75rem;
                color: #6b7280;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-top: 4px;
            }
            .insight-modal-section {
                margin-bottom: 24px;
            }
            .insight-modal-section-title {
                font-size: 0.85rem;
                font-weight: 600;
                color: #1f2937;
                margin: 0 0 12px 0;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .insight-modal-section-title i {
                color: #8b5cf6;
            }
            .insight-tips-list {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            .insight-tips-list li {
                padding: 12px 16px;
                background: #f9fafb;
                border-radius: 10px;
                margin-bottom: 8px;
                font-size: 0.85rem;
                color: #374151;
                display: flex;
                align-items: center;
                gap: 12px;
            }
            .insight-tips-list li:last-child {
                margin-bottom: 0;
            }
            .insight-tips-list li::before {
                content: '';
                width: 8px;
                height: 8px;
                background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
                border-radius: 50%;
                flex-shrink: 0;
            }
            .insight-competitor-list {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            .insight-competitor-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 12px 16px;
                background: #f9fafb;
                border-radius: 10px;
            }
            .insight-competitor-item.current {
                background: linear-gradient(135deg, #8b5cf620 0%, #a855f720 100%);
                border: 1px solid #8b5cf640;
            }
            .insight-competitor-info {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            .insight-competitor-avatar {
                width: 32px;
                height: 32px;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: 600;
                font-size: 0.8rem;
            }
            .insight-competitor-name {
                font-weight: 600;
                color: #1f2937;
                font-size: 0.85rem;
            }
            .insight-competitor-value {
                font-weight: 700;
                color: #1f2937;
            }

            /* ===== NEW DETAILED MODAL STYLES ===== */

            /* Key Findings Section */
            .insight-key-findings {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 12px;
                margin-bottom: 20px;
            }
            .insight-finding-card {
                background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
                border-radius: 12px;
                padding: 16px;
                text-align: center;
                border: 1px solid #e2e8f0;
            }
            .finding-icon {
                width: 40px;
                height: 40px;
                border-radius: 10px;
                background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 10px;
                font-size: 1rem;
            }
            .finding-label {
                font-size: 0.7rem;
                color: #64748b;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 4px;
            }
            .finding-value {
                font-size: 1.1rem;
                font-weight: 700;
                color: #1e293b;
                margin-bottom: 2px;
            }
            .finding-detail {
                font-size: 0.7rem;
                color: #94a3b8;
            }

            /* Sentiment Breakdown Section */
            .insight-breakdown-section {
                margin-bottom: 20px;
            }
            .sentiment-breakdown-bars {
                display: flex;
                flex-direction: column;
                gap: 12px;
            }
            .breakdown-bar-item {
                display: flex;
                flex-direction: column;
                gap: 6px;
            }
            .breakdown-bar-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .breakdown-label {
                font-size: 0.85rem;
                color: #374151;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .breakdown-label i {
                font-size: 0.9rem;
            }
            .breakdown-label .text-success { color: #10b981; }
            .breakdown-label .text-warning { color: #f59e0b; }
            .breakdown-label .text-danger { color: #ef4444; }
            .breakdown-value {
                font-weight: 600;
                color: #1f2937;
            }
            .breakdown-bar {
                height: 8px;
                background: #e5e7eb;
                border-radius: 4px;
                overflow: hidden;
            }
            .breakdown-bar-fill {
                height: 100%;
                border-radius: 4px;
                transition: width 0.8s ease;
            }
            .breakdown-bar-fill.positive { background: linear-gradient(90deg, #10b981, #34d399); }
            .breakdown-bar-fill.neutral { background: linear-gradient(90deg, #f59e0b, #fbbf24); }
            .breakdown-bar-fill.negative { background: linear-gradient(90deg, #ef4444, #f87171); }

            /* Top Themes Section */
            .insight-themes-section {
                margin-bottom: 20px;
            }
            .themes-list {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            .theme-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 12px 16px;
                background: #f9fafb;
                border-radius: 10px;
                border-left: 3px solid #e5e7eb;
            }
            .theme-item:has(.theme-sentiment.positive) { border-left-color: #10b981; }
            .theme-item:has(.theme-sentiment.neutral) { border-left-color: #f59e0b; }
            .theme-item:has(.theme-sentiment.negative) { border-left-color: #ef4444; }
            .theme-info {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .theme-name {
                font-weight: 600;
                color: #1f2937;
                font-size: 0.85rem;
            }
            .theme-sentiment {
                font-size: 0.65rem;
                padding: 3px 8px;
                border-radius: 12px;
                font-weight: 600;
                text-transform: uppercase;
            }
            .theme-sentiment.positive { background: #d1fae5; color: #059669; }
            .theme-sentiment.neutral { background: #fef3c7; color: #d97706; }
            .theme-sentiment.negative { background: #fee2e2; color: #dc2626; }
            .theme-mentions {
                font-size: 0.8rem;
                color: #6b7280;
            }

            /* Engagement Type Grid */
            .engagement-type-grid {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 10px;
            }
            .engagement-type-item {
                background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
                border-radius: 12px;
                padding: 16px 12px;
                text-align: center;
                border: 1px solid #e2e8f0;
            }
            .engagement-type-item i {
                font-size: 1.25rem;
                color: #8b5cf6;
                margin-bottom: 8px;
            }
            .engagement-type-item .type-value {
                display: block;
                font-size: 1.1rem;
                font-weight: 700;
                color: #1e293b;
            }
            .engagement-type-item .type-label {
                font-size: 0.7rem;
                color: #64748b;
            }

            /* Top Content Section */
            .insight-content-section {
                margin-bottom: 20px;
            }
            .content-type-list {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            .content-type-item {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px 16px;
                background: #f9fafb;
                border-radius: 10px;
            }
            .content-rank {
                width: 24px;
                height: 24px;
                border-radius: 6px;
                background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
                color: white;
                font-size: 0.75rem;
                font-weight: 700;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .content-icon {
                width: 36px;
                height: 36px;
                border-radius: 8px;
                background: #e0e7ff;
                color: #6366f1;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .content-info {
                flex: 1;
            }
            .content-name {
                font-size: 0.85rem;
                font-weight: 600;
                color: #1f2937;
                display: block;
                margin-bottom: 4px;
            }
            .content-bar {
                height: 6px;
                background: #e5e7eb;
                border-radius: 3px;
                overflow: hidden;
            }
            .content-bar-fill {
                height: 100%;
                background: linear-gradient(90deg, #8b5cf6, #a855f7);
                border-radius: 3px;
            }
            .content-engagement {
                font-weight: 700;
                color: #8b5cf6;
                font-size: 0.9rem;
            }

            /* Audience Insights Section */
            .insight-audience-section {
                margin-bottom: 20px;
            }
            .audience-stats-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 10px;
            }
            .audience-stat {
                background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
                border-radius: 10px;
                padding: 14px;
                border: 1px solid #e2e8f0;
            }
            .audience-stat-label {
                display: block;
                font-size: 0.7rem;
                color: #64748b;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 4px;
            }
            .audience-stat-value {
                font-size: 1rem;
                font-weight: 700;
                color: #1e293b;
            }

            /* Growth Channel Grid */
            .growth-channel-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 10px;
            }
            .growth-channel-item {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 14px;
                background: #f9fafb;
                border-radius: 10px;
                border: 1px solid #e2e8f0;
            }
            .channel-icon {
                width: 40px;
                height: 40px;
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 1rem;
            }
            .channel-icon.social { background: linear-gradient(135deg, #ec4899, #f472b6); }
            .channel-icon.organic { background: linear-gradient(135deg, #10b981, #34d399); }
            .channel-icon.referral { background: linear-gradient(135deg, #3b82f6, #60a5fa); }
            .channel-icon.direct { background: linear-gradient(135deg, #f97316, #fb923c); }
            .channel-info {
                display: flex;
                flex-direction: column;
            }
            .channel-name {
                font-size: 0.8rem;
                color: #64748b;
            }
            .channel-value {
                font-size: 1rem;
                font-weight: 700;
                color: #1e293b;
            }

            /* Growth Drivers Section */
            .insight-drivers-section {
                margin-bottom: 20px;
            }
            .drivers-list {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            .driver-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 12px 16px;
                background: #f9fafb;
                border-radius: 10px;
            }
            .driver-info {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .driver-name {
                font-weight: 600;
                color: #1f2937;
                font-size: 0.85rem;
            }
            .driver-impact {
                font-size: 0.65rem;
                padding: 3px 8px;
                border-radius: 12px;
                font-weight: 600;
            }
            .driver-impact.impact-high { background: #d1fae5; color: #059669; }
            .driver-impact.impact-medium { background: #fef3c7; color: #d97706; }
            .driver-impact.impact-low { background: #e0e7ff; color: #6366f1; }
            .driver-contribution {
                font-weight: 700;
                color: #10b981;
                font-size: 0.9rem;
            }

            /* Projection Section */
            .insight-projection-section {
                margin-bottom: 20px;
            }
            .projection-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 10px;
            }
            .projection-item {
                background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
                border-radius: 10px;
                padding: 14px;
                text-align: center;
                border: 1px solid #e2e8f0;
            }
            .projection-period {
                display: block;
                font-size: 0.7rem;
                color: #64748b;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 4px;
            }
            .projection-value {
                font-size: 1.1rem;
                font-weight: 700;
                color: #10b981;
            }
            .projection-value.confidence-high { color: #10b981; }
            .projection-value.confidence-medium { color: #f59e0b; }
            .projection-value.confidence-low { color: #ef4444; }

            /* Market Distribution Section */
            .insight-market-section {
                margin-bottom: 20px;
            }
            .market-distribution-list {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            .market-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 14px;
                background: #f9fafb;
                border-radius: 8px;
            }
            .market-item.is-you {
                background: linear-gradient(135deg, #8b5cf620 0%, #a855f720 100%);
                border: 1px solid #8b5cf640;
            }
            .market-item-info {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .market-rank {
                font-size: 0.75rem;
                font-weight: 700;
                color: #8b5cf6;
            }
            .market-name {
                font-weight: 600;
                color: #1f2937;
                font-size: 0.85rem;
            }
            .market-bar-container {
                display: flex;
                align-items: center;
                gap: 10px;
                width: 50%;
            }
            .market-bar {
                flex: 1;
                height: 6px;
                background: linear-gradient(90deg, #8b5cf6, #a855f7);
                border-radius: 3px;
            }
            .market-share {
                font-weight: 700;
                color: #1f2937;
                font-size: 0.85rem;
                min-width: 45px;
                text-align: right;
            }

            /* Channel Presence Section */
            .insight-channel-section {
                margin-bottom: 20px;
            }
            .channel-presence-grid {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            .channel-presence-item {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px 14px;
                background: #f9fafb;
                border-radius: 10px;
            }
            .channel-presence-icon {
                width: 36px;
                height: 36px;
                border-radius: 8px;
                background: #e0e7ff;
                color: #6366f1;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.1rem;
            }
            .channel-presence-info {
                flex: 1;
            }
            .channel-presence-name {
                font-size: 0.85rem;
                font-weight: 600;
                color: #1f2937;
                display: block;
                margin-bottom: 4px;
            }
            .channel-presence-bar {
                height: 6px;
                background: #e5e7eb;
                border-radius: 3px;
                overflow: hidden;
            }
            .channel-presence-fill {
                height: 100%;
                background: linear-gradient(90deg, #6366f1, #8b5cf6);
                border-radius: 3px;
            }
            .channel-presence-value {
                font-weight: 700;
                color: #6366f1;
                font-size: 0.9rem;
            }

            /* Competitive Gap Section */
            .insight-gap-section {
                margin-bottom: 20px;
            }
            .competitive-gap-card {
                background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
                border-radius: 12px;
                padding: 20px;
                border: 1px solid #e2e8f0;
            }
            .gap-leader {
                text-align: center;
                margin-bottom: 16px;
            }
            .gap-label {
                display: block;
                font-size: 0.7rem;
                color: #64748b;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 4px;
            }
            .gap-value {
                font-size: 1.25rem;
                font-weight: 700;
                color: #1e293b;
            }
            .gap-share {
                display: block;
                font-size: 0.8rem;
                color: #64748b;
                margin-top: 2px;
            }
            .gap-divider {
                height: 1px;
                background: #e2e8f0;
                margin: 16px 0;
            }
            .gap-info {
                text-align: center;
            }
            .gap-text {
                font-size: 0.9rem;
                font-weight: 600;
                color: #8b5cf6;
            }

            /* Action Items Section */
            .insight-actions-section {
                margin-bottom: 10px;
            }
            .action-items-list {
                list-style: none;
                padding: 0;
                margin: 0;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            .action-item {
                display: flex;
                align-items: flex-start;
                gap: 12px;
                padding: 14px 16px;
                background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
                border-radius: 10px;
                border-left: 3px solid #8b5cf6;
            }
            .action-number {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
                color: white;
                font-size: 0.75rem;
                font-weight: 700;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
            }
            .action-text {
                font-size: 0.85rem;
                color: #374151;
                line-height: 1.5;
            }

            /* Responsive for modal */
            @media (max-width: 480px) {
                .insight-key-findings {
                    grid-template-columns: 1fr;
                }
                .engagement-type-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
                .growth-channel-grid {
                    grid-template-columns: 1fr;
                }
                .projection-grid {
                    grid-template-columns: 1fr;
                }
                .audience-stats-grid {
                    grid-template-columns: 1fr;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    showInsightDetails(insightId) {
        const insight = this.currentInsights?.find(i => i.id === insightId);
        if (!insight) return;

        const yourBrand = this.competitors[0];

        // Remove existing modal
        const existingModal = document.querySelector('.insight-modal');
        if (existingModal) existingModal.remove();

        // Get metric data for comparison
        const metricKey = insight.metric;
        const sortedCompetitors = [...this.competitors].sort((a, b) => {
            if (metricKey === 'sentiment') return b.sentiment - a.sentiment;
            if (metricKey === 'engagement') return b.engagement - a.engagement;
            if (metricKey === 'growth') return b.growth - a.growth;
            if (metricKey === 'reach') return b.reach - a.reach;
            return 0;
        });

        const getMetricValue = (comp) => {
            if (metricKey === 'sentiment') return comp.sentiment + '%';
            if (metricKey === 'engagement') return comp.engagement + '%';
            if (metricKey === 'growth') return '+' + comp.growth + '%';
            if (metricKey === 'reach') return (comp.reach / 1000000).toFixed(1) + 'M';
            return '';
        };

        const avgValue = this.competitors.reduce((sum, c) => {
            if (metricKey === 'sentiment') return sum + c.sentiment;
            if (metricKey === 'engagement') return sum + c.engagement;
            if (metricKey === 'growth') return sum + c.growth;
            if (metricKey === 'reach') return sum + c.reach;
            return sum;
        }, 0) / this.competitors.length;

        const formattedAvg = metricKey === 'reach'
            ? (avgValue / 1000000).toFixed(1) + 'M'
            : (metricKey === 'growth' ? '+' : '') + avgValue.toFixed(1) + '%';

        // Generate insight-specific detailed content
        const modalContent = insight.modalContent || {};

        // Generate Key Findings HTML
        const keyFindingsHtml = modalContent.keyFindings ? `
            <div class="insight-key-findings">
                ${modalContent.keyFindings.map(finding => `
                    <div class="insight-finding-card">
                        <div class="finding-icon"><i class="fas ${finding.icon}"></i></div>
                        <div class="finding-content">
                            <div class="finding-label">${finding.label}</div>
                            <div class="finding-value">${finding.value}</div>
                            <div class="finding-detail">${finding.detail}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        ` : '';

        // Generate Sentiment Breakdown HTML (for sentiment insight)
        const sentimentBreakdownHtml = modalContent.sentimentBreakdown ? `
            <div class="insight-breakdown-section">
                <h4 class="insight-modal-section-title">
                    <i class="fas fa-chart-pie"></i>
                    Sentiment Breakdown
                </h4>
                <div class="sentiment-breakdown-bars">
                    <div class="breakdown-bar-item">
                        <div class="breakdown-bar-header">
                            <span class="breakdown-label"><i class="fas fa-smile text-success"></i> Positive</span>
                            <span class="breakdown-value">${modalContent.sentimentBreakdown.positive}%</span>
                        </div>
                        <div class="breakdown-bar">
                            <div class="breakdown-bar-fill positive" style="width: ${modalContent.sentimentBreakdown.positive}%"></div>
                        </div>
                    </div>
                    <div class="breakdown-bar-item">
                        <div class="breakdown-bar-header">
                            <span class="breakdown-label"><i class="fas fa-meh text-warning"></i> Neutral</span>
                            <span class="breakdown-value">${modalContent.sentimentBreakdown.neutral}%</span>
                        </div>
                        <div class="breakdown-bar">
                            <div class="breakdown-bar-fill neutral" style="width: ${modalContent.sentimentBreakdown.neutral}%"></div>
                        </div>
                    </div>
                    <div class="breakdown-bar-item">
                        <div class="breakdown-bar-header">
                            <span class="breakdown-label"><i class="fas fa-frown text-danger"></i> Negative</span>
                            <span class="breakdown-value">${modalContent.sentimentBreakdown.negative}%</span>
                        </div>
                        <div class="breakdown-bar">
                            <div class="breakdown-bar-fill negative" style="width: ${modalContent.sentimentBreakdown.negative}%"></div>
                        </div>
                    </div>
                </div>
            </div>
        ` : '';

        // Generate Top Themes HTML (for sentiment insight)
        const topThemesHtml = modalContent.topThemes ? `
            <div class="insight-themes-section">
                <h4 class="insight-modal-section-title">
                    <i class="fas fa-tags"></i>
                    Top Discussion Themes
                </h4>
                <div class="themes-list">
                    ${modalContent.topThemes.map(theme => `
                        <div class="theme-item">
                            <div class="theme-info">
                                <span class="theme-name">${theme.theme}</span>
                                <span class="theme-sentiment ${theme.sentiment}">${theme.sentiment}</span>
                            </div>
                            <span class="theme-mentions">${theme.mentions.toLocaleString()} mentions</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : '';

        // Generate Engagement By Type HTML (for engagement insight)
        const engagementByTypeHtml = modalContent.engagementByType ? `
            <div class="insight-breakdown-section">
                <h4 class="insight-modal-section-title">
                    <i class="fas fa-hand-pointer"></i>
                    Engagement Distribution
                </h4>
                <div class="engagement-type-grid">
                    <div class="engagement-type-item">
                        <i class="fas fa-heart"></i>
                        <span class="type-value">${modalContent.engagementByType.likes}%</span>
                        <span class="type-label">Likes</span>
                    </div>
                    <div class="engagement-type-item">
                        <i class="fas fa-comment"></i>
                        <span class="type-value">${modalContent.engagementByType.comments}%</span>
                        <span class="type-label">Comments</span>
                    </div>
                    <div class="engagement-type-item">
                        <i class="fas fa-share"></i>
                        <span class="type-value">${modalContent.engagementByType.shares}%</span>
                        <span class="type-label">Shares</span>
                    </div>
                    <div class="engagement-type-item">
                        <i class="fas fa-bookmark"></i>
                        <span class="type-value">${modalContent.engagementByType.saves}%</span>
                        <span class="type-label">Saves</span>
                    </div>
                </div>
            </div>
        ` : '';

        // Generate Top Content Types HTML (for engagement insight)
        const topContentHtml = modalContent.topContentTypes ? `
            <div class="insight-content-section">
                <h4 class="insight-modal-section-title">
                    <i class="fas fa-star"></i>
                    Top Performing Content
                </h4>
                <div class="content-type-list">
                    ${modalContent.topContentTypes.map((content, idx) => `
                        <div class="content-type-item">
                            <div class="content-rank">${idx + 1}</div>
                            <div class="content-icon"><i class="fas ${content.icon}"></i></div>
                            <div class="content-info">
                                <span class="content-name">${content.type}</span>
                                <div class="content-bar">
                                    <div class="content-bar-fill" style="width: ${Math.min(content.engagement, 100)}%"></div>
                                </div>
                            </div>
                            <span class="content-engagement">${content.engagement}%</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : '';

        // Generate Audience Insights HTML (for engagement insight)
        const audienceInsightsHtml = modalContent.audienceInsights ? `
            <div class="insight-audience-section">
                <h4 class="insight-modal-section-title">
                    <i class="fas fa-users"></i>
                    Audience Behavior
                </h4>
                <div class="audience-stats-grid">
                    <div class="audience-stat">
                        <span class="audience-stat-label">Most Active Day</span>
                        <span class="audience-stat-value">${modalContent.audienceInsights.mostActiveDay}</span>
                    </div>
                    <div class="audience-stat">
                        <span class="audience-stat-label">Avg Session</span>
                        <span class="audience-stat-value">${modalContent.audienceInsights.avgSessionTime}</span>
                    </div>
                    <div class="audience-stat">
                        <span class="audience-stat-label">Return Rate</span>
                        <span class="audience-stat-value">${modalContent.audienceInsights.returnRate}</span>
                    </div>
                    <div class="audience-stat">
                        <span class="audience-stat-label">Peak Hours</span>
                        <span class="audience-stat-value">${modalContent.peakHours?.slice(0, 2).join(', ')}</span>
                    </div>
                </div>
            </div>
        ` : '';

        // Generate Growth By Channel HTML (for growth insight)
        const growthByChannelHtml = modalContent.growthByChannel ? `
            <div class="insight-breakdown-section">
                <h4 class="insight-modal-section-title">
                    <i class="fas fa-sitemap"></i>
                    Growth by Channel
                </h4>
                <div class="growth-channel-grid">
                    <div class="growth-channel-item">
                        <div class="channel-icon social"><i class="fas fa-share-alt"></i></div>
                        <div class="channel-info">
                            <span class="channel-name">Social</span>
                            <span class="channel-value">+${modalContent.growthByChannel.social}%</span>
                        </div>
                    </div>
                    <div class="growth-channel-item">
                        <div class="channel-icon organic"><i class="fas fa-search"></i></div>
                        <div class="channel-info">
                            <span class="channel-name">Organic</span>
                            <span class="channel-value">+${modalContent.growthByChannel.organic}%</span>
                        </div>
                    </div>
                    <div class="growth-channel-item">
                        <div class="channel-icon referral"><i class="fas fa-link"></i></div>
                        <div class="channel-info">
                            <span class="channel-name">Referral</span>
                            <span class="channel-value">+${modalContent.growthByChannel.referral}%</span>
                        </div>
                    </div>
                    <div class="growth-channel-item">
                        <div class="channel-icon direct"><i class="fas fa-mouse-pointer"></i></div>
                        <div class="channel-info">
                            <span class="channel-name">Direct</span>
                            <span class="channel-value">+${modalContent.growthByChannel.direct}%</span>
                        </div>
                    </div>
                </div>
            </div>
        ` : '';

        // Generate Growth Drivers HTML (for growth insight)
        const growthDriversHtml = modalContent.growthDrivers ? `
            <div class="insight-drivers-section">
                <h4 class="insight-modal-section-title">
                    <i class="fas fa-bolt"></i>
                    Key Growth Drivers
                </h4>
                <div class="drivers-list">
                    ${modalContent.growthDrivers.map(driver => `
                        <div class="driver-item">
                            <div class="driver-info">
                                <span class="driver-name">${driver.driver}</span>
                                <span class="driver-impact impact-${driver.impact.toLowerCase()}">${driver.impact} Impact</span>
                            </div>
                            <span class="driver-contribution">${driver.contribution}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : '';

        // Generate Projected Growth HTML (for growth insight)
        const projectedGrowthHtml = modalContent.projectedGrowth ? `
            <div class="insight-projection-section">
                <h4 class="insight-modal-section-title">
                    <i class="fas fa-crystal-ball"></i>
                    Growth Projection
                </h4>
                <div class="projection-grid">
                    <div class="projection-item">
                        <span class="projection-period">Next Month</span>
                        <span class="projection-value">+${modalContent.projectedGrowth.nextMonth}%</span>
                    </div>
                    <div class="projection-item">
                        <span class="projection-period">Next Quarter</span>
                        <span class="projection-value">+${modalContent.projectedGrowth.nextQuarter}%</span>
                    </div>
                    <div class="projection-item confidence">
                        <span class="projection-period">Confidence</span>
                        <span class="projection-value confidence-${modalContent.projectedGrowth.confidence.toLowerCase()}">${modalContent.projectedGrowth.confidence}</span>
                    </div>
                </div>
            </div>
        ` : '';

        // Generate Market Distribution HTML (for market insight)
        const marketDistributionHtml = modalContent.marketDistribution ? `
            <div class="insight-market-section">
                <h4 class="insight-modal-section-title">
                    <i class="fas fa-chart-pie"></i>
                    Market Share Distribution
                </h4>
                <div class="market-distribution-list">
                    ${modalContent.marketDistribution.map((brand, idx) => `
                        <div class="market-item ${brand.isYou ? 'is-you' : ''}">
                            <div class="market-item-info">
                                <span class="market-rank">#${idx + 1}</span>
                                <span class="market-name">${brand.name} ${brand.isYou ? '(You)' : ''}</span>
                            </div>
                            <div class="market-bar-container">
                                <div class="market-bar" style="width: ${brand.share * 2}%"></div>
                                <span class="market-share">${brand.share}%</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : '';

        // Generate Channel Presence HTML (for market insight)
        const channelPresenceHtml = modalContent.channelPresence ? `
            <div class="insight-channel-section">
                <h4 class="insight-modal-section-title">
                    <i class="fas fa-broadcast-tower"></i>
                    Platform Presence
                </h4>
                <div class="channel-presence-grid">
                    ${modalContent.channelPresence.map(channel => `
                        <div class="channel-presence-item">
                            <div class="channel-presence-icon"><i class="fab ${channel.icon}"></i></div>
                            <div class="channel-presence-info">
                                <span class="channel-presence-name">${channel.channel}</span>
                                <div class="channel-presence-bar">
                                    <div class="channel-presence-fill" style="width: ${channel.strength}%"></div>
                                </div>
                            </div>
                            <span class="channel-presence-value">${channel.strength}%</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : '';

        // Generate Competitive Gap HTML (for market insight)
        const competitiveGapHtml = modalContent.competitiveGap ? `
            <div class="insight-gap-section">
                <h4 class="insight-modal-section-title">
                    <i class="fas fa-balance-scale"></i>
                    Competitive Position
                </h4>
                <div class="competitive-gap-card">
                    <div class="gap-leader">
                        <span class="gap-label">Market Leader</span>
                        <span class="gap-value">${modalContent.competitiveGap.leader}</span>
                        <span class="gap-share">${modalContent.competitiveGap.leaderShare}% market share</span>
                    </div>
                    <div class="gap-divider"></div>
                    <div class="gap-info">
                        <span class="gap-text">${modalContent.competitiveGap.gapToLeader}</span>
                    </div>
                </div>
            </div>
        ` : '';

        // Generate Action Items HTML
        const actionItemsHtml = modalContent.actionItems ? `
            <div class="insight-actions-section">
                <h4 class="insight-modal-section-title">
                    <i class="fas fa-tasks"></i>
                    Recommended Actions
                </h4>
                <ul class="action-items-list">
                    ${modalContent.actionItems.map((item, idx) => `
                        <li class="action-item">
                            <span class="action-number">${idx + 1}</span>
                            <span class="action-text">${item}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        ` : '';

        const modalHtml = `
            <div class="insight-modal">
                <div class="insight-modal-content">
                    <div class="insight-modal-header">
                        <div class="insight-modal-header-left">
                            <div class="insight-modal-icon" style="background: linear-gradient(135deg, ${insight.iconColor}20 0%, ${insight.iconColor}10 100%);">
                                <i class="fas ${insight.icon}" style="color: ${insight.iconColor};"></i>
                            </div>
                            <div>
                                <h3 class="insight-modal-title">${insight.title}</h3>
                                <p class="insight-modal-subtitle">${yourBrand.name} Analysis</p>
                            </div>
                        </div>
                        <button class="insight-modal-close">&times;</button>
                    </div>
                    <div class="insight-modal-body">
                        <div class="insight-modal-stats">
                            <div class="insight-modal-stat">
                                <div class="insight-modal-stat-value">${insight.value}</div>
                                <div class="insight-modal-stat-label">Your Score</div>
                            </div>
                            <div class="insight-modal-stat">
                                <div class="insight-modal-stat-value">${formattedAvg}</div>
                                <div class="insight-modal-stat-label">Average</div>
                            </div>
                            <div class="insight-modal-stat">
                                <div class="insight-modal-stat-value">#${insight.rank}</div>
                                <div class="insight-modal-stat-label">Rank</div>
                            </div>
                        </div>

                        ${keyFindingsHtml}

                        ${sentimentBreakdownHtml}
                        ${topThemesHtml}

                        ${engagementByTypeHtml}
                        ${topContentHtml}
                        ${audienceInsightsHtml}

                        ${growthByChannelHtml}
                        ${growthDriversHtml}
                        ${projectedGrowthHtml}

                        ${marketDistributionHtml}
                        ${channelPresenceHtml}
                        ${competitiveGapHtml}

                        <div class="insight-modal-section">
                            <h4 class="insight-modal-section-title">
                                <i class="fas fa-trophy"></i>
                                Competitor Ranking
                            </h4>
                            <div class="insight-competitor-list">
                                ${sortedCompetitors.map((comp, idx) => `
                                    <div class="insight-competitor-item ${comp.id === yourBrand.id ? 'current' : ''}">
                                        <div class="insight-competitor-info">
                                            <div class="insight-competitor-avatar" style="background: ${comp.color || '#8b5cf6'};">
                                                ${comp.name.charAt(0)}
                                            </div>
                                            <span class="insight-competitor-name">${comp.name}</span>
                                        </div>
                                        <span class="insight-competitor-value">${getMetricValue(comp)}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        ${actionItemsHtml}
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);

        const modal = document.querySelector('.insight-modal');

        // Show modal with animation
        setTimeout(() => modal.classList.add('active'), 10);

        // Close handlers
        modal.querySelector('.insight-modal-close').addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                setTimeout(() => modal.remove(), 300);
            }
        });

        document.addEventListener('keydown', function closeOnEscape(e) {
            if (e.key === 'Escape') {
                modal.classList.remove('active');
                setTimeout(() => modal.remove(), 300);
                document.removeEventListener('keydown', closeOnEscape);
            }
        });
    }

    updateComparison() {
        const activeChips = document.querySelectorAll('.competitor-chip.active');
        this.selectedCompetitors = Array.from(activeChips).map(chip => chip.dataset.competitor);

        // Filter competitors based on selection
        const filteredCompetitors = this.competitors.filter(c => this.selectedCompetitors.includes(c.id));

        if (filteredCompetitors.length === 0) {
            if (window.notificationManager) {
                window.notificationManager.show('Please select at least one competitor to compare', 'warning');
            }
            return;
        }

        // Update all stats, charts and tables with filtered data
        this.updateStatsCardsWithSelection(filteredCompetitors);
        this.updateChartsWithSelection(filteredCompetitors);
        this.updateComparisonTable();
        this.updateInsightsGrid();

        if (window.notificationManager) {
            window.notificationManager.show(`Comparing ${filteredCompetitors.length} brands`, 'success');
        }
    }

    updateStatsCardsWithSelection(filteredCompetitors) {
        if (filteredCompetitors.length === 0) return;

        const yourBrand = filteredCompetitors[0];
        const allCompetitors = filteredCompetitors;

        // Calculate category averages
        const avgSentiment = (allCompetitors.reduce((s, c) => s + c.sentiment, 0) / allCompetitors.length).toFixed(1);
        const avgEngagement = (allCompetitors.reduce((s, c) => s + c.engagement, 0) / allCompetitors.length).toFixed(1);

        // Find ranks within selection
        const sortedBySov = [...allCompetitors].sort((a, b) => b.mentions - a.mentions);
        const sortedBySentiment = [...allCompetitors].sort((a, b) => b.sentiment - a.sentiment);
        const sortedByEngagement = [...allCompetitors].sort((a, b) => b.engagement - a.engagement);
        const sortedByGrowth = [...allCompetitors].sort((a, b) => b.growth - a.growth);

        const sovRank = sortedBySov.findIndex(c => c.id === yourBrand.id) + 1;
        const sentimentRank = sortedBySentiment.findIndex(c => c.id === yourBrand.id) + 1;
        const engagementRank = sortedByEngagement.findIndex(c => c.id === yourBrand.id) + 1;
        const growthRank = sortedByGrowth.findIndex(c => c.id === yourBrand.id) + 1;

        // Calculate share of voice
        const totalMentions = allCompetitors.reduce((s, c) => s + c.mentions, 0);
        const shareOfVoice = ((yourBrand.mentions / totalMentions) * 100).toFixed(1);

        // Update stat cards with animation
        const statCards = document.querySelectorAll('.stats-grid-4 .stat-card');
        statCards.forEach(card => card.classList.add('updating'));

        setTimeout(() => {
            if (statCards.length >= 4) {
                // Share of Voice
                const sovValue = statCards[0].querySelector('.competitor-card-value');
                const sovRankEl = statCards[0].querySelector('.competitor-card-rank');
                if (sovValue) sovValue.textContent = shareOfVoice + '%';
                if (sovRankEl) sovRankEl.textContent = `#${sovRank} of ${allCompetitors.length}`;

                // Sentiment
                const sentValue = statCards[1].querySelector('.competitor-card-value');
                const sentRankEl = statCards[1].querySelector('.competitor-card-rank');
                if (sentValue) sentValue.textContent = yourBrand.sentiment + '%';
                if (sentRankEl) sentRankEl.textContent = `#${sentimentRank} of ${allCompetitors.length}`;

                // Engagement
                const engValue = statCards[2].querySelector('.competitor-card-value');
                const engRankEl = statCards[2].querySelector('.competitor-card-rank');
                if (engValue) engValue.textContent = yourBrand.engagement + '%';
                if (engRankEl) engRankEl.textContent = `#${engagementRank} of ${allCompetitors.length}`;

                // Product Launches
                const launchValue = statCards[3].querySelector('.competitor-card-value');
                const launchRankEl = statCards[3].querySelector('.competitor-card-rank');
                const yourLaunches = 5;
                const compLaunches = (allCompetitors.length - 1) * 2;
                if (launchValue) launchValue.textContent = yourLaunches + compLaunches;
                if (launchRankEl) launchRankEl.textContent = `You: ${yourLaunches} | Competitors: ${compLaunches}`;
            }

            statCards.forEach(card => card.classList.remove('updating'));
        }, 300);
    }

    updateChartsWithSelection(filteredCompetitors) {
        // Recreate all charts with filtered data
        this.createShareOfVoiceChartWithData(filteredCompetitors);
        this.createSentimentComparisonChartWithData(filteredCompetitors);
        this.createEngagementChartWithData(filteredCompetitors);
        this.createPlatformChartWithData(filteredCompetitors);
    }

    createShareOfVoiceChartWithData(filteredCompetitors) {
        const ctx = document.getElementById('shareOfVoiceChart');
        if (!ctx || filteredCompetitors.length === 0) return;

        if (this.shareOfVoiceChart) this.shareOfVoiceChart.destroy();

        const chartColors = [
            { border: '#8b5cf6', gradient: ['rgba(139, 92, 246, 0.3)', 'rgba(139, 92, 246, 0.01)'] },
            { border: '#3b82f6', gradient: ['rgba(59, 130, 246, 0.3)', 'rgba(59, 130, 246, 0.01)'] },
            { border: '#ec4899', gradient: ['rgba(236, 72, 153, 0.3)', 'rgba(236, 72, 153, 0.01)'] },
            { border: '#f59e0b', gradient: ['rgba(245, 158, 11, 0.3)', 'rgba(245, 158, 11, 0.01)'] }
        ];

        const datasets = filteredCompetitors.slice(0, 4).map((comp, index) => {
            const baseValue = 25 + (comp.mentions / 1000);
            const colorSet = chartColors[index % chartColors.length];

            const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 300);
            gradient.addColorStop(0, colorSet.gradient[0]);
            gradient.addColorStop(1, colorSet.gradient[1]);

            return {
                label: comp.name,
                data: [
                    baseValue,
                    baseValue + (comp.growth * 0.5),
                    baseValue + (comp.growth * 0.8),
                    baseValue + comp.growth
                ],
                borderColor: comp.color || colorSet.border,
                backgroundColor: gradient,
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointRadius: 6,
                pointBackgroundColor: 'white',
                pointBorderColor: comp.color || colorSet.border,
                pointBorderWidth: 3,
                pointHoverRadius: 8
            };
        });

        this.shareOfVoiceChart = new Chart(ctx, {
            type: 'line',
            data: { labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], datasets },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: { intersect: false, mode: 'index' },
                plugins: {
                    legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20 } },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        titleColor: '#1f2937',
                        bodyColor: '#4b5563',
                        borderColor: '#e5e7eb',
                        borderWidth: 1,
                        padding: 12
                    }
                },
                scales: {
                    y: { beginAtZero: true, max: 100, grid: { color: 'rgba(0, 0, 0, 0.04)' }, ticks: { stepSize: 25, callback: v => v + '%' } },
                    x: { grid: { display: false } }
                },
                animation: { duration: 800 }
            }
        });
    }

    createSentimentComparisonChartWithData(filteredCompetitors) {
        const ctx = document.getElementById('sentimentComparisonChart');
        if (!ctx || filteredCompetitors.length === 0) return;

        if (this.sentimentChart) this.sentimentChart.destroy();

        const purpleShades = ['#c4b5fd', '#a78bfa', '#8b5cf6', '#6d28d9'];

        this.sentimentChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: filteredCompetitors.slice(0, 4).map(c => c.name),
                datasets: [{
                    label: 'Sentiment Score',
                    data: filteredCompetitors.slice(0, 4).map(c => c.sentiment),
                    backgroundColor: filteredCompetitors.slice(0, 4).map((c, i) => c.color || purpleShades[i % purpleShades.length]),
                    borderRadius: 8,
                    barThickness: 50
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, max: 100, grid: { color: 'rgba(0, 0, 0, 0.04)' }, ticks: { stepSize: 25, callback: v => v + '%' } },
                    x: { grid: { display: false } }
                },
                animation: { duration: 800 }
            }
        });
    }

    createEngagementChartWithData(filteredCompetitors) {
        const ctx = document.getElementById('engagementComparisonChart');
        if (!ctx || filteredCompetitors.length === 0) return;

        if (this.engagementChart) this.engagementChart.destroy();

        const chartStyles = [
            { border: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.2)' },
            { border: '#ec4899', bg: 'rgba(236, 72, 153, 0.2)' },
            { border: '#06b6d4', bg: 'rgba(6, 182, 212, 0.2)' },
            { border: '#f59e0b', bg: 'rgba(245, 158, 11, 0.2)' }
        ];

        const datasets = filteredCompetitors.slice(0, 2).map((comp, index) => ({
            label: comp.name,
            data: [
                Math.min(100, comp.sentiment + Math.round(Math.random() * 10)),
                Math.min(100, comp.engagement + Math.round(Math.random() * 15)),
                Math.min(100, Math.round(comp.mentions / 500)),
                Math.min(100, Math.round(comp.reach / 100000)),
                Math.min(100, comp.growth * 5)
            ],
            borderColor: comp.color || chartStyles[index % chartStyles.length].border,
            backgroundColor: chartStyles[index % chartStyles.length].bg,
            borderWidth: 3,
            pointRadius: 5,
            pointBackgroundColor: 'white',
            pointBorderColor: comp.color || chartStyles[index % chartStyles.length].border,
            pointBorderWidth: 3
        }));

        this.engagementChart = new Chart(ctx, {
            type: 'radar',
            data: { labels: ['Likes', 'Comments', 'Shares', 'Saves', 'Clicks'], datasets },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top', labels: { usePointStyle: true, padding: 20 } }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: { stepSize: 25, font: { size: 12 }, color: '#6b7280', backdropColor: 'transparent' },
                        grid: { color: 'rgba(139, 92, 246, 0.15)' },
                        angleLines: { color: 'rgba(139, 92, 246, 0.15)' },
                        pointLabels: { font: { size: 14, weight: '600' }, color: '#4b5563' }
                    }
                },
                animation: { duration: 800 }
            }
        });
    }

    createPlatformChartWithData(filteredCompetitors) {
        const ctx = document.getElementById('platformComparisonChart');
        if (!ctx || filteredCompetitors.length === 0) return;

        if (this.platformChart) this.platformChart.destroy();

        // Calculate platform distribution based on selected competitors
        const totalMentions = filteredCompetitors.reduce((s, c) => s + c.mentions, 0);

        this.platformChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Twitter', 'LinkedIn', 'Instagram', 'Facebook', 'Reddit'],
                datasets: [{
                    data: [
                        Math.round(35 + Math.random() * 10),
                        Math.round(20 + Math.random() * 10),
                        Math.round(20 + Math.random() * 10),
                        Math.round(10 + Math.random() * 5),
                        Math.round(5 + Math.random() * 5)
                    ],
                    backgroundColor: ['#1DA1F2', '#0A66C2', '#E4405F', '#1877F2', '#FF4500'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '60%',
                plugins: {
                    legend: { position: 'bottom', labels: { usePointStyle: true, padding: 15 } }
                },
                animation: { duration: 800 }
            }
        });
    }

    updateComparisonTable() {
        const thead = document.getElementById('comparisonTableHead');
        const tbody = document.getElementById('comparisonTableBody');
        if (!thead || !tbody) return;

        // Filter competitors based on selection
        const filteredCompetitors = this.competitors.filter(c => this.selectedCompetitors.includes(c.id));
        if (filteredCompetitors.length === 0) return;

        const comps = filteredCompetitors.slice(0, 4);

        // Create header row with dynamic brand names and explicit widths
        thead.innerHTML = `<tr>
            <th style="width: 180px; text-align: left;">Metric</th>
            ${comps.map(c => `<th style="text-align: center;">${c.name}</th>`).join('')}
            <th style="width: 120px; text-align: center;">Leader</th>
        </tr>`;

        const formatNum = (n) => {
            if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
            if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
            return n.toString();
        };
        const mentionsLeader = comps.reduce((a, b) => a.mentions > b.mentions ? a : b);
        const sentimentLeader = comps.reduce((a, b) => a.sentiment > b.sentiment ? a : b);
        const engagementLeader = comps.reduce((a, b) => a.engagement > b.engagement ? a : b);
        const reachLeader = comps.reduce((a, b) => a.reach > b.reach ? a : b);
        const growthLeader = comps.reduce((a, b) => a.growth > b.growth ? a : b);

        const metrics = [
            { name: 'Total Mentions', icon: 'fa-comment-dots', iconBg: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)', values: comps.map(c => formatNum(c.mentions)), leader: mentionsLeader.name },
            { name: 'Sentiment Score', icon: 'fa-smile', iconBg: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)', values: comps.map(c => c.sentiment + '%'), leader: sentimentLeader.name },
            { name: 'Engagement Rate', icon: 'fa-heart', iconBg: 'linear-gradient(135deg, #f43f5e 0%, #fb7185 100%)', values: comps.map(c => c.engagement + '%'), leader: engagementLeader.name },
            { name: 'Total Reach', icon: 'fa-users', iconBg: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)', values: comps.map(c => formatNum(c.reach)), leader: reachLeader.name },
            { name: 'Growth Rate', icon: 'fa-chart-line', iconBg: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)', values: comps.map(c => '+' + c.growth + '%'), leader: growthLeader.name },
            { name: 'Response Time', icon: 'fa-clock', iconBg: 'linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)', values: comps.map(() => (1.5 + Math.random() * 4).toFixed(1) + 'h'), leader: comps[0].name }
        ];

        tbody.innerHTML = metrics.map(metric => {
            const valueCells = metric.values.map((val, idx) => {
                const isLeader = comps[idx]?.name === metric.leader;
                return `<td class="value-cell ${isLeader ? 'value-leader' : ''}">${val}</td>`;
            }).join('');
            return `
                <tr class="comparison-row">
                    <td class="metric-cell">
                        <div class="metric-name">
                            <div class="metric-icon" style="background: ${metric.iconBg};">
                                <i class="fas ${metric.icon}" style="color: white; font-size: 0.75rem;"></i>
                            </div>
                            ${metric.name}
                        </div>
                    </td>
                    ${valueCells}
                    <td class="leader-cell"><span class="leader-badge">${metric.leader}</span></td>
                </tr>
            `;
        }).join('');
    }

    updateInsightsGrid() {
        const grid = document.getElementById('insightsGrid');
        if (!grid) return;

        const filteredCompetitors = this.competitors.filter(c => this.selectedCompetitors.includes(c.id));
        if (filteredCompetitors.length < 2) {
            grid.innerHTML = '<p class="text-muted">Select at least 2 competitors for insights</p>';
            return;
        }

        const yourBrand = filteredCompetitors[0];
        const otherCompetitors = filteredCompetitors.slice(1);

        const avgSentiment = otherCompetitors.reduce((sum, c) => sum + c.sentiment, 0) / otherCompetitors.length;
        const sentimentDiff = (yourBrand.sentiment - avgSentiment).toFixed(1);
        const isSentimentLeader = yourBrand.sentiment >= Math.max(...filteredCompetitors.map(c => c.sentiment));

        const maxEngagement = Math.max(...otherCompetitors.map(c => c.engagement));
        const engagementGap = (maxEngagement - yourBrand.engagement).toFixed(1);
        const engagementLeader = otherCompetitors.find(c => c.engagement === maxEngagement);

        const isGrowthLeader = yourBrand.growth >= Math.max(...otherCompetitors.map(c => c.growth));

        const insights = [
            {
                type: isSentimentLeader ? 'success' : sentimentDiff >= 0 ? 'info' : 'warning',
                iconClass: 'icon-sentiment',
                title: isSentimentLeader ? 'Sentiment Leader' : 'Sentiment Analysis',
                description: isSentimentLeader
                    ? `${yourBrand.name} leads with ${yourBrand.sentiment}% positive sentiment among ${filteredCompetitors.length} brands.`
                    : `${yourBrand.name} is ${Math.abs(sentimentDiff)}% ${sentimentDiff >= 0 ? 'above' : 'below'} competitor average.`
            },
            {
                type: engagementGap <= 0 ? 'success' : 'warning',
                iconClass: 'icon-engagement',
                title: 'Engagement Gap',
                description: engagementGap <= 0
                    ? `${yourBrand.name} leads in engagement at ${yourBrand.engagement}%.`
                    : `${engagementLeader?.name || 'Competitor'} leads by ${engagementGap}% in engagement.`
            },
            {
                type: isGrowthLeader ? 'success' : 'info',
                iconClass: 'icon-trending',
                title: 'Growth Trajectory',
                description: isGrowthLeader
                    ? `${yourBrand.name} shows fastest growth at +${yourBrand.growth}%.`
                    : `Growth rate of +${yourBrand.growth}% shows steady progress.`
            },
            {
                type: 'success',
                iconClass: 'icon-engagement',
                title: 'Market Position',
                description: `${yourBrand.name} competes with ${filteredCompetitors.length - 1} selected brands in this analysis.`
            }
        ];

        grid.innerHTML = insights.map(insight => `
            <div class="insight-card insight-${insight.type}">
                <div class="insight-icon"><span class="flat-icon lg ${insight.iconClass}"></span></div>
                <div class="insight-content">
                    <h4 class="insight-title">${insight.title}</h4>
                    <p class="insight-description">${insight.description}</p>
                </div>
            </div>
        `).join('');
    }

    exportAnalysis(format = 'json') {
        const timestamp = new Date().toISOString();
        const dateStr = new Date().toISOString().split('T')[0];

        if (format === 'json') {
            const analysis = {
                exportDate: timestamp,
                brand: this.currentBrand,
                competitors: this.competitors,
                summary: {
                    totalCompetitors: this.competitors.length,
                    avgSentiment: (this.competitors.reduce((s, c) => s + c.sentiment, 0) / this.competitors.length).toFixed(1),
                    avgEngagement: (this.competitors.reduce((s, c) => s + c.engagement, 0) / this.competitors.length).toFixed(1)
                }
            };

            if (typeof Utils !== 'undefined' && Utils.downloadFile) {
                Utils.downloadFile(
                    JSON.stringify(analysis, null, 2),
                    `competitor-analysis-${dateStr}.json`,
                    'application/json'
                );
            } else {
                this.downloadFile(JSON.stringify(analysis, null, 2), `competitor-analysis-${dateStr}.json`, 'application/json');
            }
        } else if (format === 'csv') {
            // Build CSV
            const headers = ['Name', 'Mentions', 'Sentiment', 'Engagement', 'Reach', 'Growth'];
            const rows = this.competitors.map(c => [
                c.name,
                c.mentions,
                c.sentiment + '%',
                c.engagement + '%',
                c.reach,
                '+' + c.growth + '%'
            ]);

            const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

            if (typeof Utils !== 'undefined' && Utils.downloadFile) {
                Utils.downloadFile(csv, `competitor-analysis-${dateStr}.csv`, 'text/csv');
            } else {
                this.downloadFile(csv, `competitor-analysis-${dateStr}.csv`, 'text/csv');
            }
        } else if (format === 'pdf') {
            // For PDF, we'll show a notification that it would generate a PDF report
            if (window.notificationManager) {
                window.notificationManager.show('PDF report generation requires server-side processing. Exporting as JSON instead.', 'info');
            }
            this.exportAnalysis('json');
            return;
        }

        if (window.notificationManager) {
            window.notificationManager.show(`Competitor analysis exported as ${format.toUpperCase()}`, 'success');
        } else if (typeof Notifications !== 'undefined') {
            Notifications.success(`Competitor analysis exported as ${format.toUpperCase()}`);
        }
    }

    downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // ===================================
    // Advanced Competitor Intelligence
    // ===================================

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

    hexToRgba(hex, alpha = 1) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    getContentTypeData() {
        const seed = this.getBrandSeed(this.currentBrand);
        return this.competitors.map((comp, idx) => ({
            brand: comp.name,
            color: comp.color || ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'][idx % 5],
            video: Math.round(15 + this.seededRandom(seed + idx * 20) * 25),
            image: Math.round(25 + this.seededRandom(seed + idx * 21) * 30),
            text: Math.round(15 + this.seededRandom(seed + idx * 22) * 20),
            stories: Math.round(10 + this.seededRandom(seed + idx * 23) * 15),
            reels: Math.round(5 + this.seededRandom(seed + idx * 24) * 15)
        }));
    }

    initContentTypeChart() {
        const ctx = document.getElementById('contentTypeChart');
        if (!ctx) return;

        if (this.contentTypeChart) {
            this.contentTypeChart.destroy();
        }

        const contentData = this.getContentTypeData();
        const contentTypes = ['Video', 'Image', 'Text', 'Stories', 'Reels'];
        const colors = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'];

        this.contentTypeChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: contentData.map(c => c.brand),
                datasets: contentTypes.map((type, idx) => ({
                    label: type,
                    data: contentData.map(c => c[type.toLowerCase()]),
                    backgroundColor: colors[idx],
                    borderRadius: 4
                }))
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top' }
                },
                scales: {
                    x: {
                        stacked: true,
                        max: 100,
                        title: { display: true, text: 'Content Mix (%)' }
                    },
                    y: { stacked: true }
                }
            }
        });
    }

    getPostingFrequencyData() {
        const seed = this.getBrandSeed(this.currentBrand);
        return this.competitors.map((comp, idx) => ({
            brand: comp.name,
            color: comp.color || ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'][idx % 5],
            postsPerDay: (1.5 + this.seededRandom(seed + idx * 30) * 4).toFixed(1),
            postsPerWeek: Math.round(10 + this.seededRandom(seed + idx * 31) * 18)
        }));
    }

    initPostingFrequencyChart() {
        const ctx = document.getElementById('postingFrequencyChart');
        if (!ctx) return;

        if (this.postingFrequencyChart) {
            this.postingFrequencyChart.destroy();
        }

        const freqData = this.getPostingFrequencyData();

        this.postingFrequencyChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: freqData.map(c => c.brand),
                datasets: [{
                    label: 'Posts per Week',
                    data: freqData.map(c => c.postsPerWeek),
                    backgroundColor: freqData.map(c => c.color),
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: 'Posts per Week' }
                    }
                }
            }
        });
    }

    generateActivityData() {
        const seed = this.getBrandSeed(this.currentBrand);
        const activityTypes = [
            { type: 'product_launch', icon: 'fa-rocket', color: '#8b5cf6', label: 'Product Launch' },
            { type: 'campaign', icon: 'fa-bullhorn', color: '#3b82f6', label: 'Campaign' },
            { type: 'viral_content', icon: 'fa-fire', color: '#f97316', label: 'Viral Content' },
            { type: 'partnership', icon: 'fa-handshake', color: '#10b981', label: 'Partnership' },
            { type: 'announcement', icon: 'fa-megaphone', color: '#06b6d4', label: 'Announcement' }
        ];

        const activities = [];
        for (let i = 0; i < 8; i++) {
            const compIdx = Math.floor(this.seededRandom(seed + i * 100) * this.competitors.length);
            const comp = this.competitors[compIdx];
            const typeIdx = Math.floor(this.seededRandom(seed + i * 101) * activityTypes.length);
            const actType = activityTypes[typeIdx];
            const daysAgo = Math.floor(this.seededRandom(seed + i * 102) * 21);

            activities.push({
                id: `act_${i}`,
                brand: comp.name,
                brandColor: comp.color || '#8b5cf6',
                type: actType.type,
                typeLabel: actType.label,
                icon: actType.icon,
                color: actType.color,
                title: this.generateActivityTitle(actType.type, comp.name, seed + i),
                engagement: Math.round(1000 + this.seededRandom(seed + i * 103) * 50000),
                reach: Math.round(50000 + this.seededRandom(seed + i * 104) * 500000),
                daysAgo: daysAgo
            });
        }

        return activities.sort((a, b) => a.daysAgo - b.daysAgo);
    }

    generateActivityTitle(type, brandName, seed) {
        const titles = {
            product_launch: [`${brandName} launches new product line`, `${brandName} unveils latest innovation`],
            campaign: [`${brandName} kicks off marketing campaign`, `${brandName} starts seasonal promotion`],
            viral_content: [`${brandName} post goes viral`, `${brandName} content trends on social`],
            partnership: [`${brandName} announces strategic partnership`, `${brandName} teams up with industry leader`],
            announcement: [`${brandName} shares quarterly update`, `${brandName} reveals product roadmap`]
        };
        const options = titles[type] || [`${brandName} activity detected`];
        return options[Math.floor(this.seededRandom(seed) * options.length)];
    }

    formatNumber(num) {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    }

    loadActivityTimeline(filterType = 'all') {
        const container = document.getElementById('activityTimeline');
        if (!container) return;

        let activities = this.generateActivityData();

        if (filterType !== 'all') {
            activities = activities.filter(a => a.type === filterType);
        }

        container.innerHTML = activities.map(activity => `
            <div class="timeline-item" style="--timeline-color: ${activity.color}">
                <div class="timeline-header">
                    <div class="timeline-brand">
                        <span class="timeline-brand-dot" style="background: ${activity.brandColor};"></span>
                        <span class="timeline-brand-name">${activity.brand}</span>
                    </div>
                    <span class="timeline-type-badge" style="background: ${activity.color}20; color: ${activity.color};">
                        <i class="fas ${activity.icon}"></i> ${activity.typeLabel}
                    </span>
                </div>
                <div class="timeline-title">${activity.title}</div>
                <div class="timeline-metrics">
                    <div class="timeline-metric">
                        <span class="timeline-metric-value">${this.formatNumber(activity.engagement)}</span>
                        <span class="timeline-metric-label">Engagement</span>
                    </div>
                    <div class="timeline-metric">
                        <span class="timeline-metric-value">${this.formatNumber(activity.reach)}</span>
                        <span class="timeline-metric-label">Reach</span>
                    </div>
                    <span class="timeline-time">${activity.daysAgo === 0 ? 'Today' : activity.daysAgo === 1 ? 'Yesterday' : activity.daysAgo + ' days ago'}</span>
                </div>
            </div>
        `).join('');

        // Add filter event listener
        const filterSelect = document.getElementById('timelineTypeFilter');
        if (filterSelect && !filterSelect.dataset.listenerAdded) {
            filterSelect.addEventListener('change', (e) => {
                this.loadActivityTimeline(e.target.value);
            });
            filterSelect.dataset.listenerAdded = 'true';
        }

        // Add SWOT refresh button listener
        const refreshBtn = document.getElementById('refreshSwotBtn');
        if (refreshBtn && !refreshBtn.dataset.listenerAdded) {
            refreshBtn.addEventListener('click', () => {
                this.loadSWOTAnalysis();
                if (window.notificationManager) {
                    window.notificationManager.show('SWOT Analysis refreshed', 'success');
                }
            });
            refreshBtn.dataset.listenerAdded = 'true';
        }
    }

    destroy() {
        // Cleanup
        if (this.contentTypeChart) this.contentTypeChart.destroy();
        if (this.postingFrequencyChart) this.postingFrequencyChart.destroy();
    }
}

// Create global instance for app.js
const Competitors = {
    instance: null,
    render() {
        this.instance = new CompetitorsPage();
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
window.Competitors = Competitors;
window.CompetitorsPage = CompetitorsPage;

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CompetitorsPage;
}
