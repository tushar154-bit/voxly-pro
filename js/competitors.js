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
                <div class="page-header">
                    <div class="page-header-left">
                        <h1 class="page-title">Competitor Analysis</h1>
                        <p class="page-subtitle">Compare <strong>${brandName}</strong> with market competitors</p>
                    </div>
                    <div class="page-header-right">
                        <button class="btn btn-secondary" id="addCompetitorBtn">
                            <i class="fas fa-plus"></i>
                            <span>Add Competitor</span>
                        </button>
                        <button class="btn btn-primary" id="exportCompetitorBtn">
                            <i class="fas fa-download"></i>
                            <span>Export Analysis</span>
                        </button>
                    </div>
                </div>

                <!-- Competitor Selection -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Select Competitors to Compare</h3>
                    </div>
                    <div class="card-body">
                        <div class="competitor-chips" id="competitorChips">
                            <!-- Chips will be dynamically populated -->
                        </div>
                    </div>
                </div>

                <!-- Comparison Overview -->
                <div class="stats-grid stats-grid-4">
                    <div class="stat-card">
                        <div class="stat-label">Share of Voice</div>
                        <div class="stat-value">42.3%</div>
                        <div class="stat-change positive">
                            <span>+5.2% Market Share</span>
                        </div>
                        <div class="stat-rank">#2 in category</div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-label">Sentiment Score</div>
                        <div class="stat-value">76.8%</div>
                        <div class="stat-change positive">
                            <span>Above avg (68.2%)</span>
                        </div>
                        <div class="stat-rank">#1 in category</div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-label">Engagement Rate</div>
                        <div class="stat-value">9.4%</div>
                        <div class="stat-change negative">
                            <span>Below avg (11.2%)</span>
                        </div>
                        <div class="stat-rank">#3 in category</div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-label">Growth Rate</div>
                        <div class="stat-value">+28.5%</div>
                        <div class="stat-change positive">
                            <span>Fastest growing</span>
                        </div>
                        <div class="stat-rank">#1 in category</div>
                    </div>
                </div>

                <!-- Charts Grid -->
                <div class="charts-grid-2">
                    <!-- Share of Voice -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Share of Voice Over Time</h3>
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
                            <h3 class="card-title">Sentiment Comparison</h3>
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
                            <h3 class="card-title">Engagement Metrics</h3>
                        </div>
                        <div class="card-body">
                            <div class="chart-container" style="height: 300px;">
                                <canvas id="engagementComparisonChart"></canvas>
                            </div>
                        </div>
                    </div>

                    <!-- Platform Distribution -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Platform Distribution</h3>
                        </div>
                        <div class="card-body">
                            <div class="chart-container" style="height: 300px;">
                                <canvas id="platformComparisonChart"></canvas>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Detailed Comparison Table -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Detailed Metrics Comparison</h3>
                    </div>
                    <div class="card-body">
                        <div class="table-container">
                            <table class="table table-striped">
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
                        <h3 class="card-title">
                            <i class="fas fa-lightbulb"></i>
                            Competitive Insights
                        </h3>
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
            addBtn.addEventListener('click', () => {
                if (window.notificationManager) {
                    window.notificationManager.show('Add competitor feature coming soon', 'info');
                }
            });
        }

        // Export
        const exportBtn = document.getElementById('exportCompetitorBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportAnalysis());
        }
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
        let chipsHtml = `
            <button class="competitor-chip active" data-competitor="${brandId}">
                <span class="chip-logo" style="background: ${brand.color}">${brand.name.charAt(0)}</span>
                <span>${brand.name}</span>
            </button>
        `;

        // Add competitor chips
        brand.competitors.forEach(compId => {
            const comp = typeof APIData !== 'undefined' ? APIData.brands[compId] : null;
            if (comp) {
                chipsHtml += `
                    <button class="competitor-chip" data-competitor="${compId}">
                        <span class="chip-logo" style="background: ${comp.color}">${comp.name.charAt(0)}</span>
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

        const colors = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'];
        const datasets = this.competitors.slice(0, 4).map((comp, index) => {
            // Generate some trending data
            const baseValue = 20 + Math.random() * 30;
            return {
                label: comp.name,
                data: [
                    baseValue,
                    baseValue + (Math.random() * 10 - 5),
                    baseValue + (Math.random() * 10 - 3),
                    baseValue + (Math.random() * 10 - 2)
                ],
                borderColor: comp.color || colors[index],
                backgroundColor: `${comp.color || colors[index]}20`,
                tension: 0.4
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
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: (value) => value + '%'
                        }
                    }
                }
            }
        });
    }

    createSentimentComparisonChart() {
        const ctx = document.getElementById('sentimentComparisonChart');
        if (!ctx) return;

        const colors = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'];

        this.sentimentChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.competitors.slice(0, 4).map(c => c.name),
                datasets: [{
                    label: 'Sentiment Score',
                    data: this.competitors.slice(0, 4).map(c => c.sentiment),
                    backgroundColor: this.competitors.slice(0, 4).map((c, i) => c.color || colors[i])
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: (value) => value + '%'
                        }
                    }
                }
            }
        });
    }

    createEngagementChart() {
        const ctx = document.getElementById('engagementComparisonChart');
        if (!ctx) return;

        const colors = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b'];
        const datasets = this.competitors.slice(0, 2).map((comp, index) => ({
            label: comp.name,
            data: [
                Math.round(60 + Math.random() * 35),
                Math.round(60 + Math.random() * 35),
                Math.round(60 + Math.random() * 35),
                Math.round(60 + Math.random() * 35),
                Math.round(60 + Math.random() * 35)
            ],
            borderColor: comp.color || colors[index],
            backgroundColor: `${comp.color || colors[index]}40`
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
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100
                    }
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

        // Create header row with dynamic brand names
        const headerCells = ['Metric', ...this.competitors.slice(0, 4).map(c => c.name), 'Leader'];
        thead.innerHTML = `<tr>${headerCells.map(h => `<th>${h}</th>`).join('')}</tr>`;

        // Helper to format numbers
        const formatNum = (n) => {
            if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
            if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
            return n.toString();
        };

        // Build metrics from competitor data
        const comps = this.competitors.slice(0, 4);

        // Find leaders for each metric
        const mentionsLeader = comps.reduce((a, b) => a.mentions > b.mentions ? a : b);
        const sentimentLeader = comps.reduce((a, b) => a.sentiment > b.sentiment ? a : b);
        const engagementLeader = comps.reduce((a, b) => a.engagement > b.engagement ? a : b);
        const reachLeader = comps.reduce((a, b) => a.reach > b.reach ? a : b);
        const growthLeader = comps.reduce((a, b) => a.growth > b.growth ? a : b);

        const metrics = [
            {
                name: 'Total Mentions',
                values: comps.map(c => formatNum(c.mentions)),
                leader: mentionsLeader.name
            },
            {
                name: 'Sentiment Score',
                values: comps.map(c => c.sentiment + '%'),
                leader: sentimentLeader.name
            },
            {
                name: 'Engagement Rate',
                values: comps.map(c => c.engagement + '%'),
                leader: engagementLeader.name
            },
            {
                name: 'Total Reach',
                values: comps.map(c => formatNum(c.reach)),
                leader: reachLeader.name
            },
            {
                name: 'Growth Rate',
                values: comps.map(c => '+' + c.growth + '%'),
                leader: growthLeader.name
            },
            {
                name: 'Response Time',
                values: comps.map(() => (1.5 + Math.random() * 4).toFixed(1) + 'h'),
                leader: comps[0].name // Your brand is usually fastest
            }
        ];

        tbody.innerHTML = metrics.map(metric => {
            const valueCells = metric.values.map((val, idx) => {
                const isLeader = comps[idx]?.name === metric.leader;
                return `<td class="${isLeader ? 'text-success font-weight-bold' : ''}">${val}</td>`;
            }).join('');

            return `
                <tr>
                    <td><strong>${metric.name}</strong></td>
                    ${valueCells}
                    <td><span class="badge badge-success">${metric.leader}</span></td>
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

        const maxEngagement = Math.max(...otherCompetitors.map(c => c.engagement));
        const engagementGap = (maxEngagement - yourBrand.engagement).toFixed(1);
        const engagementLeader = otherCompetitors.find(c => c.engagement === maxEngagement);

        const maxGrowth = Math.max(...otherCompetitors.map(c => c.growth));
        const isGrowthLeader = yourBrand.growth >= maxGrowth;
        const growthDiff = (yourBrand.growth - maxGrowth).toFixed(1);

        const insights = [
            {
                type: isSentimentLeader ? 'success' : 'warning',
                iconClass: 'icon-broadcast',
                title: isSentimentLeader ? 'Sentiment Leader' : 'Sentiment Challenge',
                description: isSentimentLeader
                    ? `${yourBrand.name} has the highest sentiment score (${yourBrand.sentiment}%), ${sentimentDiff > 0 ? '+' : ''}${sentimentDiff}% above the category average.`
                    : `${yourBrand.name}'s sentiment (${yourBrand.sentiment}%) is ${Math.abs(sentimentDiff)}% below the category average. Focus on customer satisfaction.`
            },
            {
                type: engagementGap > 0 ? 'warning' : 'success',
                iconClass: 'icon-analytics',
                title: engagementGap > 0 ? 'Engagement Gap' : 'Engagement Leader',
                description: engagementGap > 0
                    ? `Engagement rate is ${engagementGap}% below ${engagementLeader?.name || 'competitors'}. Focus on interactive content to close the gap.`
                    : `${yourBrand.name} leads with ${yourBrand.engagement}% engagement rate, outperforming all competitors.`
            },
            {
                type: isGrowthLeader ? 'success' : 'info',
                iconClass: 'icon-chart',
                title: isGrowthLeader ? 'Fastest Growing' : 'Growth Opportunity',
                description: isGrowthLeader
                    ? `${yourBrand.name}'s growth rate (${yourBrand.growth}%) is ${growthDiff}% higher than the nearest competitor.`
                    : `Growth rate of ${yourBrand.growth}% shows potential. Top competitor is growing at ${maxGrowth}%.`
            },
            {
                type: 'success',
                iconClass: 'icon-engagement',
                title: 'Market Position',
                description: `${yourBrand.name} maintains a strong presence with ${(yourBrand.reach / 1000000).toFixed(1)}M reach and ${(yourBrand.mentions / 1000).toFixed(1)}K monthly mentions.`
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

    updateComparison() {
        const activeChips = document.querySelectorAll('.competitor-chip.active');
        this.selectedCompetitors = Array.from(activeChips).map(chip => chip.dataset.competitor);
        
        Notifications.info(`Comparing ${this.selectedCompetitors.length} brands`);
    }

    exportAnalysis() {
        const analysis = {
            timestamp: new Date().toISOString(),
            competitors: this.competitors,
            insights: 'Competitive analysis data'
        };

        Utils.downloadFile(
            JSON.stringify(analysis, null, 2),
            `competitor-analysis-${Date.now()}.json`,
            'application/json'
        );

        Notifications.success('Competitor analysis exported');
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
