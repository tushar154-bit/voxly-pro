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
            </div>
        `;
    }

    init() {
        this.currentBrand = typeof APIData !== 'undefined' ? APIData.currentBrand : 'apple';
        this.loadCompetitorData();
        this.renderCompetitorChips();
        this.initializeCharts();
        this.loadComparisonTable();
        this.loadInsights();
        this.setupEventListeners();
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
        const marketRank = [...this.competitors].sort((a, b) => b.reach - a.reach).findIndex(c => c.id === yourBrand.id) + 1;

        const insights = [
            {
                id: 'sentiment',
                type: isSentimentLeader ? 'success' : parseFloat(sentimentDiff) >= -5 ? 'warning' : 'danger',
                icon: isSentimentLeader ? 'fa-smile-beam' : 'fa-meh',
                iconColor: isSentimentLeader ? '#10b981' : '#f59e0b',
                title: isSentimentLeader ? 'Sentiment Leader' : 'Sentiment Challenge',
                value: yourBrand.sentiment + '%',
                change: sentimentDiff,
                changeType: parseFloat(sentimentDiff) >= 0 ? 'positive' : 'negative',
                rank: sentimentRank,
                total: this.competitors.length,
                progress: yourBrand.sentiment,
                description: isSentimentLeader
                    ? `Leading with ${yourBrand.sentiment}% positive sentiment`
                    : `${Math.abs(sentimentDiff)}% below category average`,
                tips: isSentimentLeader
                    ? ['Maintain quality engagement', 'Continue monitoring trends', 'Leverage positive momentum']
                    : ['Improve response times', 'Address customer concerns', 'Enhance product quality'],
                metric: 'sentiment'
            },
            {
                id: 'engagement',
                type: engagementGap <= 0 ? 'success' : parseFloat(engagementGap) <= 2 ? 'warning' : 'danger',
                icon: engagementGap <= 0 ? 'fa-fire' : 'fa-chart-bar',
                iconColor: engagementGap <= 0 ? '#ec4899' : '#3b82f6',
                title: engagementGap <= 0 ? 'Engagement Leader' : 'Engagement Gap',
                value: yourBrand.engagement + '%',
                change: engagementGap <= 0 ? '+' + Math.abs(engagementGap) : '-' + engagementGap,
                changeType: engagementGap <= 0 ? 'positive' : 'negative',
                rank: engagementRank,
                total: this.competitors.length,
                progress: engagementScore,
                description: engagementGap <= 0
                    ? `Outperforming competitors by ${Math.abs(engagementGap)}%`
                    : `${engagementGap}% behind ${engagementLeader?.name || 'leader'}`,
                tips: engagementGap <= 0
                    ? ['Scale successful content types', 'Experiment with new formats', 'Optimize posting times']
                    : ['Create interactive content', 'Respond faster to comments', 'Use more visual content'],
                metric: 'engagement'
            },
            {
                id: 'growth',
                type: isGrowthLeader ? 'success' : parseFloat(growthDiff) >= -5 ? 'info' : 'warning',
                icon: isGrowthLeader ? 'fa-rocket' : 'fa-chart-line',
                iconColor: isGrowthLeader ? '#8b5cf6' : '#f97316',
                title: isGrowthLeader ? 'Fastest Growing' : 'Growth Opportunity',
                value: '+' + yourBrand.growth + '%',
                change: growthDiff,
                changeType: parseFloat(growthDiff) >= 0 ? 'positive' : 'negative',
                rank: growthRank,
                total: this.competitors.length,
                progress: growthScore,
                description: isGrowthLeader
                    ? `Leading growth at +${yourBrand.growth}% rate`
                    : `Top competitor growing at +${maxGrowth}%`,
                tips: isGrowthLeader
                    ? ['Capitalize on momentum', 'Expand to new channels', 'Increase content frequency']
                    : ['Analyze competitor strategies', 'Test new approaches', 'Focus on viral content'],
                metric: 'growth'
            },
            {
                id: 'market',
                type: marketRank === 1 ? 'success' : marketRank <= 2 ? 'info' : 'warning',
                icon: 'fa-globe',
                iconColor: '#06b6d4',
                title: 'Market Position',
                value: marketShare + '%',
                change: marketRank === 1 ? 'Leader' : '#' + marketRank,
                changeType: marketRank <= 2 ? 'positive' : 'neutral',
                rank: marketRank,
                total: this.competitors.length,
                progress: parseFloat(marketShare),
                description: `${(yourBrand.reach / 1000000).toFixed(1)}M reach · ${(yourBrand.mentions / 1000).toFixed(1)}K mentions`,
                tips: ['Expand platform presence', 'Partner with influencers', 'Run targeted campaigns'],
                metric: 'reach'
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
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                animation: insightFadeIn 0.5s ease forwards;
                opacity: 0;
                transform: translateY(10px);
                overflow: hidden;
                color: white;
            }

            @keyframes insightFadeIn {
                to { opacity: 1; transform: translateY(0); }
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
                background: linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%) !important;
                animation: insightFadeIn 0.5s ease forwards, glowSentimentInsight 3s ease-in-out infinite alternate !important;
                border: none !important;
            }
            .insight-sentiment-card:hover {
                transform: translateY(-8px) scale(1.02) !important;
                background: linear-gradient(135deg, #4ade80 0%, #22c55e 50%, #16a34a 100%) !important;
                box-shadow: 0 20px 40px -15px rgba(34, 197, 94, 0.5), 0 0 30px rgba(34, 197, 94, 0.4) !important;
            }
            @keyframes glowSentimentInsight {
                0% { box-shadow: 0 4px 15px rgba(34, 197, 94, 0.2); }
                100% { box-shadow: 0 6px 25px rgba(34, 197, 94, 0.4); }
            }

            /* Engagement Card - Blue (like alerts-card style) */
            .insight-engagement-card {
                background: linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%) !important;
                animation: insightFadeIn 0.5s ease forwards, glowEngagementInsight 3s ease-in-out infinite alternate !important;
                border: none !important;
            }
            .insight-engagement-card:hover {
                transform: translateY(-8px) scale(1.02) !important;
                background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%) !important;
                box-shadow: 0 20px 40px -15px rgba(59, 130, 246, 0.5), 0 0 30px rgba(59, 130, 246, 0.4) !important;
            }
            @keyframes glowEngagementInsight {
                0% { box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2); }
                100% { box-shadow: 0 6px 25px rgba(59, 130, 246, 0.4); }
            }

            /* Growth Card - Orange (like volume-card style) */
            .insight-growth-card {
                background: linear-gradient(135deg, #f97316 0%, #ea580c 50%, #c2410c 100%) !important;
                animation: insightFadeIn 0.5s ease forwards, glowGrowthInsight 3s ease-in-out infinite alternate !important;
                border: none !important;
            }
            .insight-growth-card:hover {
                transform: translateY(-8px) scale(1.02) !important;
                background: linear-gradient(135deg, #fb923c 0%, #f97316 50%, #ea580c 100%) !important;
                box-shadow: 0 20px 40px -15px rgba(249, 115, 22, 0.5), 0 0 30px rgba(249, 115, 22, 0.4) !important;
            }
            @keyframes glowGrowthInsight {
                0% { box-shadow: 0 4px 15px rgba(249, 115, 22, 0.2); }
                100% { box-shadow: 0 6px 25px rgba(249, 115, 22, 0.4); }
            }

            /* Market Card - Cyan/Teal (like sentiment-card green style) */
            .insight-market-card {
                background: linear-gradient(135deg, #06b6d4 0%, #0891b2 50%, #0e7490 100%) !important;
                animation: insightFadeIn 0.5s ease forwards, glowMarketInsight 3s ease-in-out infinite alternate !important;
                border: none !important;
            }
            .insight-market-card:hover {
                transform: translateY(-8px) scale(1.02) !important;
                background: linear-gradient(135deg, #22d3ee 0%, #06b6d4 50%, #0891b2 100%) !important;
                box-shadow: 0 20px 40px -15px rgba(6, 182, 212, 0.5), 0 0 30px rgba(6, 182, 212, 0.4) !important;
            }
            @keyframes glowMarketInsight {
                0% { box-shadow: 0 4px 15px rgba(6, 182, 212, 0.2); }
                100% { box-shadow: 0 6px 25px rgba(6, 182, 212, 0.4); }
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
                max-width: 500px;
                max-height: 85vh;
                overflow-y: auto;
                transform: scale(0.9) translateY(20px);
                transition: all 0.3s ease;
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

                        <div class="insight-modal-section">
                            <h4 class="insight-modal-section-title">
                                <i class="fas fa-lightbulb"></i>
                                Recommendations
                            </h4>
                            <ul class="insight-tips-list">
                                ${insight.tips.map(tip => `<li>${tip}</li>`).join('')}
                            </ul>
                        </div>
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

    destroy() {
        // Cleanup
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
