/**
 * Real-Time Monitoring Page
 * Live mention feed, real-time alerts, and spike detection
 */

class RealtimePage {
    constructor() {
        this.updateInterval = null;
        this.isLive = true;
        this.mentionQueue = [];
        this.currentBrand = null;
        this.isAnimating = false;
        // Track sentiment counts for syncing cards
        this.sentimentCounts = {
            positive: 0,
            neutral: 0,
            negative: 0
        };
        this.totalMentions = 0;
        this.baselineVolume = 10; // baseline for volume spike calculation
    }

    render() {
        // Get current brand info
        const currentBrandId = typeof APIData !== 'undefined' ? APIData.currentBrand : 'apple';
        const brand = typeof APIData !== 'undefined' ? APIData.brands[currentBrandId] : null;
        const brandName = brand ? brand.name : 'Your Brand';

        return `
            <div class="realtime-container">
                <!-- Page Header -->
                <div class="page-header">
                    <div class="page-header-left">
                        <h1 class="page-title">Real-Time Monitoring</h1>
                        <p class="page-subtitle">Live mentions for <strong>${brandName}</strong></p>
                    </div>
                    <div class="page-header-right">
                        <button class="btn btn-secondary" id="pauseLiveBtn">
                            <i class="fas fa-pause"></i>
                            <span>Pause Live Feed</span>
                        </button>
                        <button class="btn btn-primary" id="exportRealtimeBtn">
                            <i class="fas fa-download"></i>
                            <span>Export Data</span>
                        </button>
                    </div>
                </div>

                <!-- Live Stats -->
                <div class="stats-grid realtime-stats-grid">
                    <div class="stat-card realtime-card live-card">
                        <div class="stat-card-bg">
                            <div class="stat-bg-shape shape-1"></div>
                            <div class="stat-bg-shape shape-2"></div>
                            <div class="stat-bg-shape shape-3"></div>
                        </div>
                        <div class="stat-header">
                            <span class="stat-title">Live Mentions</span>
                            <div class="live-indicator pulse">
                                <span class="live-dot"></span>
                                <span>LIVE</span>
                            </div>
                        </div>
                        <div class="stat-value" id="liveMentionsCount">0</div>
                        <div class="stat-change">
                            <span>Last 5 minutes</span>
                        </div>
                    </div>

                    <div class="stat-card realtime-card sentiment-card">
                        <div class="stat-card-bg">
                            <div class="stat-bg-shape shape-1"></div>
                            <div class="stat-bg-shape shape-2"></div>
                            <div class="stat-bg-shape shape-3"></div>
                        </div>
                        <div class="stat-header">
                            <span class="stat-title">Sentiment Now</span>
                            <div class="stat-icon"><span class="flat-icon icon-heart"></span></div>
                        </div>
                        <div class="sentiment-breakdown" id="sentimentBreakdown">
                            <div class="sentiment-item positive">
                                <span class="sentiment-icon"><i class="far fa-smile"></i></span>
                                <span class="sentiment-label">Positive</span>
                                <span class="sentiment-percent" id="positivePercent">0%</span>
                            </div>
                            <div class="sentiment-item neutral">
                                <span class="sentiment-icon"><i class="far fa-meh"></i></span>
                                <span class="sentiment-label">Neutral</span>
                                <span class="sentiment-percent" id="neutralPercent">0%</span>
                            </div>
                            <div class="sentiment-item negative">
                                <span class="sentiment-icon"><i class="far fa-frown"></i></span>
                                <span class="sentiment-label">Negative</span>
                                <span class="sentiment-percent" id="negativePercent">0%</span>
                            </div>
                        </div>
                    </div>

                    <div class="stat-card realtime-card volume-card">
                        <div class="stat-card-bg">
                            <div class="stat-bg-shape shape-1"></div>
                            <div class="stat-bg-shape shape-2"></div>
                            <div class="stat-bg-shape shape-3"></div>
                        </div>
                        <div class="stat-header">
                            <span class="stat-title">Volume Spike</span>
                            <div class="stat-icon"><span class="flat-icon icon-chart"></span></div>
                        </div>
                        <div class="stat-value" id="volumeSpikeValue">+0%</div>
                        <div class="stat-change warning" id="volumeSpikeStatus">
                            <span><span class="flat-icon icon-trending xs"></span> Monitoring activity</span>
                        </div>
                    </div>

                    <div class="stat-card realtime-card alerts-card">
                        <div class="stat-card-bg">
                            <div class="stat-bg-shape shape-1"></div>
                            <div class="stat-bg-shape shape-2"></div>
                            <div class="stat-bg-shape shape-3"></div>
                        </div>
                        <div class="stat-header">
                            <span class="stat-title">Active Alerts</span>
                            <div class="stat-icon"><span class="flat-icon icon-alert"></span></div>
                        </div>
                        <div class="stat-value" id="activeAlertsCount">2</div>
                        <div class="stat-change negative">
                            <span>Requires attention</span>
                        </div>
                    </div>
                </div>

                <!-- Main Content Grid -->
                <div class="realtime-grid">
                    <!-- Live Mention Feed -->
                    <div class="card live-feed-card">
                        <div class="card-header">
                            <h3 class="card-title">
                                <i class="fas fa-stream"></i>
                                Live Mention Stream
                            </h3>
                            <div class="card-actions">
                                <select id="platformFilterRealtime" class="form-select">
                                    <option value="all">All Platforms</option>
                                    <option value="x">X</option>
                                    <option value="instagram">Instagram</option>
                                    <option value="facebook">Facebook</option>
                                    <option value="linkedin">LinkedIn</option>
                                    <option value="youtube">YouTube</option>
                                    <option value="reddit">Reddit</option>
                                    <option value="tiktok">TikTok</option>
                                    <option value="pinterest">Pinterest</option>
                                </select>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="live-feed" id="liveFeed">
                                <!-- Mentions will be added here dynamically -->
                            </div>
                        </div>
                    </div>

                    <!-- Sidebar -->
                    <div class="realtime-sidebar">
                        <!-- Active Alerts -->
                        <div class="card alert-card">
                            <div class="card-header">
                                <h3 class="card-title">
                                    <i class="fas fa-bell"></i>
                                    Active Alerts
                                </h3>
                            </div>
                            <div class="card-body">
                                <div class="alert-list" id="alertList">
                                    <!-- Alerts populated by JS -->
                                </div>
                            </div>
                        </div>

                        <!-- Trending Now -->
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">
                                    <i class="fas fa-fire"></i>
                                    Trending Now
                                </h3>
                            </div>
                            <div class="card-body">
                                <div class="trending-list" id="trendingList">
                                    <!-- Trending topics populated by JS -->
                                </div>
                            </div>
                        </div>

                        <!-- Volume Chart -->
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">
                                    <i class="fas fa-chart-line"></i>
                                    <span id="volumeChartTitle">Volume (Last Hour)</span>
                                </h3>
                                <div class="card-actions">
                                    <select id="volumeTimeFilter" class="form-select">
                                        <option value="1">Last Hour</option>
                                        <option value="6">Last 6 Hours</option>
                                        <option value="12">Last 12 Hours</option>
                                        <option value="24">Last 24 Hours</option>
                                        <option value="48">Last 48 Hours</option>
                                        <option value="168">Last 7 Days</option>
                                    </select>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="chart-container" style="height: 200px;">
                                    <canvas id="volumeRealtimeChart"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    init() {
        this.currentBrand = typeof APIData !== 'undefined' ? APIData.currentBrand : 'apple';

        // Initialize real-time updates
        this.startLiveUpdates();

        // Load initial data
        this.loadAlerts();
        this.loadTrending();
        this.updateRealtimeStats();

        // Initialize charts
        this.initializeCharts();

        // Setup event listeners
        this.setupEventListeners();

        // Show welcome notification
        try {
            if (window.notificationManager) {
                window.notificationManager.show('Real-time monitoring active', 'success');
            }
        } catch (e) {
            console.warn('Notification failed:', e);
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

        // Clear existing feed
        const liveFeed = document.getElementById('liveFeed');
        if (liveFeed) {
            liveFeed.innerHTML = '';
        }

        // Reset counter
        const counter = document.getElementById('liveMentionsCount');
        if (counter) {
            counter.textContent = '0';
        }

        // Reload trending data for the new brand
        this.loadTrending();
        this.loadAlerts();
        this.initializeCharts();

        // Update stats with brand data
        this.updateRealtimeStats();

        // Update subtitle
        const brand = typeof APIData !== 'undefined' ? APIData.brands[brandId] : null;
        const subtitle = document.querySelector('.page-subtitle');
        if (subtitle && brand) {
            subtitle.innerHTML = `Live mentions for <strong>${brand.name}</strong>`;
        }

        try {
            if (window.notificationManager) {
                window.notificationManager.show(`Real-time monitoring updated for ${brand?.name || brandId}`, 'success');
            }
        } catch (e) {
            console.warn('Notification failed:', e);
        }

        this.isAnimating = false;
    }

    setupEventListeners() {
        // Pause/Resume button
        const pauseBtn = document.getElementById('pauseLiveBtn');
        if (pauseBtn) {
            pauseBtn.addEventListener('click', () => this.toggleLiveFeed());
        }

        // Export button
        const exportBtn = document.getElementById('exportRealtimeBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportData());
        }

        // Platform filter
        const platformFilter = document.getElementById('platformFilterRealtime');
        if (platformFilter) {
            platformFilter.addEventListener('change', (e) => {
                this.filterByPlatform(e.target.value);
            });
        }

        // Volume time filter
        const volumeTimeFilter = document.getElementById('volumeTimeFilter');
        if (volumeTimeFilter) {
            volumeTimeFilter.addEventListener('change', (e) => {
                this.updateVolumeChart(parseInt(e.target.value));
            });
        }
    }

    updateVolumeChart(hours) {
        // Update the chart title
        const titleEl = document.getElementById('volumeChartTitle');
        if (titleEl) {
            let titleText = 'Volume (Last Hour)';
            if (hours === 1) {
                titleText = 'Volume (Last Hour)';
            } else if (hours === 6) {
                titleText = 'Volume (Last 6 Hours)';
            } else if (hours === 12) {
                titleText = 'Volume (Last 12 Hours)';
            } else if (hours === 24) {
                titleText = 'Volume (Last 24 Hours)';
            } else if (hours === 48) {
                titleText = 'Volume (Last 48 Hours)';
            } else if (hours === 168) {
                titleText = 'Volume (Last 7 Days)';
            }
            titleEl.textContent = titleText;
        }

        // Update the chart with new data
        if (this.volumeChart && typeof MockData !== 'undefined') {
            const newData = MockData.getMentionsChartData('all', hours);
            this.volumeChart.data = newData;
            this.volumeChart.update('active');
        }
    }

    startLiveUpdates() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }

        // Function to schedule next mention with random delay
        const scheduleNextMention = () => {
            if (this.updateInterval) {
                clearTimeout(this.updateInterval);
            }
            this.updateInterval = setTimeout(() => {
                if (this.isLive) {
                    this.addNewMention();
                }
                scheduleNextMention();
            }, Utils.random(3000, 6000));
        };

        scheduleNextMention();
    }

    addNewMention() {
        const platforms = ['X', 'Instagram', 'Facebook', 'LinkedIn', 'YouTube', 'Reddit', 'TikTok', 'Pinterest'];
        const sentiments = ['positive', 'neutral', 'negative'];

        // Get brand-specific content
        const brand = typeof APIData !== 'undefined' ? APIData.brands[this.currentBrand] : null;
        const brandName = brand ? brand.name : 'the product';
        const products = brand ? brand.products : ['product'];
        const product = products[Math.floor(Math.random() * products.length)];

        const authors = ['@techguru', 'u/reviewer', '@brandlover', 'user123', '@happycustomer',
                        '@analyst', '@consumer_voice', 'u/honest_review', '@market_watcher'];

        const positiveContents = [
            `Just got the ${product} and it's amazing! Great work ${brandName}!`,
            `${brandName}'s ${product} is a game-changer. Highly recommend!`,
            `Loving my new ${product}. Best decision ever!`,
            `The innovation from ${brandName} is unmatched. ${product} delivers.`,
            `Customer service at ${brandName} was excellent. Quick resolution!`,
            `${product} exceeded my expectations. Worth every penny!`
        ];

        const neutralContents = [
            `Received my ${product} today. Will update after testing.`,
            `Comparing ${product} with alternatives. Interesting specs.`,
            `Anyone else using ${product}? Looking for opinions.`,
            `${brandName} announced updates for ${product}. Thoughts?`,
            `Testing ${product} for the first time. Stay tuned.`
        ];

        const negativeContents = [
            `Having issues with ${product}. ${brandName} support, please help.`,
            `Disappointed with the ${product} quality. Expected better from ${brandName}.`,
            `${product} update broke something. Waiting for ${brandName} to fix.`,
            `Not happy with ${product}. Might return it.`,
            `${brandName}'s ${product} didn't meet expectations.`
        ];

        const sentiment = sentiments[Utils.random(0, sentiments.length - 1)];
        const contentList = sentiment === 'positive' ? positiveContents :
                           sentiment === 'neutral' ? neutralContents : negativeContents;

        const mention = {
            id: Date.now(),
            platform: platforms[Utils.random(0, platforms.length - 1)],
            author: authors[Utils.random(0, authors.length - 1)],
            content: contentList[Utils.random(0, contentList.length - 1)],
            sentiment: sentiment,
            sentimentScore: sentiment === 'positive' ? Utils.random(70, 95) :
                           sentiment === 'neutral' ? Utils.random(50, 70) :
                           Utils.random(10, 50),
            timestamp: new Date(),
            engagement: Utils.random(10, 1000)
        };

        const liveFeed = document.getElementById('liveFeed');
        if (liveFeed) {
            const mentionElement = this.createMentionElement(mention);
            liveFeed.insertBefore(mentionElement, liveFeed.firstChild);

            // Remove old mentions (keep last 20)
            while (liveFeed.children.length > 20) {
                liveFeed.removeChild(liveFeed.lastChild);
            }

            // Update counter
            const counter = document.getElementById('liveMentionsCount');
            if (counter) {
                counter.textContent = parseInt(counter.textContent) + 1;
            }

            // Track sentiment for syncing cards
            this.totalMentions++;
            this.sentimentCounts[sentiment]++;

            // Update all synced cards
            this.updateSyncedCards();

            // Trigger animation
            setTimeout(() => mentionElement.classList.add('show'), 10);
        }
    }

    updateSyncedCards() {
        // Update Sentiment Now card
        const total = this.sentimentCounts.positive + this.sentimentCounts.neutral + this.sentimentCounts.negative;
        if (total > 0) {
            const positivePercent = Math.round((this.sentimentCounts.positive / total) * 100);
            const neutralPercent = Math.round((this.sentimentCounts.neutral / total) * 100);
            const negativePercent = Math.round((this.sentimentCounts.negative / total) * 100);

            const posEl = document.getElementById('positivePercent');
            const neuEl = document.getElementById('neutralPercent');
            const negEl = document.getElementById('negativePercent');

            if (posEl) posEl.textContent = positivePercent + '%';
            if (neuEl) neuEl.textContent = neutralPercent + '%';
            if (negEl) negEl.textContent = negativePercent + '%';
        }

        // Update Volume Spike card
        const volumeSpikeEl = document.getElementById('volumeSpikeValue');
        const volumeStatusEl = document.getElementById('volumeSpikeStatus');
        if (volumeSpikeEl && this.totalMentions > 0) {
            const volumeChange = Math.round(((this.totalMentions - this.baselineVolume) / this.baselineVolume) * 100);
            volumeSpikeEl.textContent = (volumeChange >= 0 ? '+' : '') + volumeChange + '%';

            if (volumeStatusEl) {
                if (volumeChange > 100) {
                    volumeStatusEl.innerHTML = '<span><span class="flat-icon icon-trending xs"></span> High activity detected</span>';
                    volumeStatusEl.className = 'stat-change warning';
                } else if (volumeChange > 50) {
                    volumeStatusEl.innerHTML = '<span><span class="flat-icon icon-trending xs"></span> Moderate activity</span>';
                    volumeStatusEl.className = 'stat-change warning';
                } else {
                    volumeStatusEl.innerHTML = '<span><span class="flat-icon icon-trending xs"></span> Normal activity</span>';
                    volumeStatusEl.className = 'stat-change';
                }
            }
        }

        // Update Active Alerts card based on negative sentiment
        const alertsEl = document.getElementById('activeAlertsCount');
        if (alertsEl) {
            // Generate alerts based on negative sentiment percentage
            const total = this.sentimentCounts.positive + this.sentimentCounts.neutral + this.sentimentCounts.negative;
            if (total > 0) {
                const negativePercent = (this.sentimentCounts.negative / total) * 100;
                let alerts = 0;
                if (negativePercent > 40) alerts = 3;
                else if (negativePercent > 25) alerts = 2;
                else if (negativePercent > 10) alerts = 1;
                alertsEl.textContent = alerts;
            }
        }
    }

    getPlatformIcon(platform) {
        const icons = {
            'X': 'fab fa-x-twitter',
            'Instagram': 'fab fa-instagram',
            'Facebook': 'fab fa-facebook',
            'LinkedIn': 'fab fa-linkedin',
            'YouTube': 'fab fa-youtube',
            'Reddit': 'fab fa-reddit',
            'TikTok': 'fab fa-tiktok',
            'Pinterest': 'fab fa-pinterest'
        };
        return icons[platform] || 'fas fa-globe';
    }

    getPlatformColor(platform) {
        const colors = {
            'X': '#000000',
            'Instagram': '#E4405F',
            'Facebook': '#1877F2',
            'LinkedIn': '#0A66C2',
            'YouTube': '#FF0000',
            'Reddit': '#FF4500',
            'TikTok': '#000000',
            'Pinterest': '#E60023'
        };
        return colors[platform] || '#6b7280';
    }

    createMentionElement(mention) {
        const div = document.createElement('div');
        div.className = `mention-item mention-${mention.sentiment}`;
        const platformIcon = this.getPlatformIcon(mention.platform);
        const platformColor = this.getPlatformColor(mention.platform);
        div.innerHTML = `
            <div class="mention-header">
                <div class="mention-platform">
                    <span class="platform-logo" style="color: ${platformColor};">
                        <i class="${platformIcon}"></i>
                    </span>
                    <strong>${mention.author}</strong>
                </div>
                <div class="mention-time">${Utils.formatDate(mention.timestamp, 'relative')}</div>
            </div>
            <div class="mention-content">${Utils.sanitizeHtml(mention.content)}</div>
            <div class="mention-footer">
                <span class="badge badge-${mention.sentiment}">
                    ${Utils.getSentimentIconHTML(mention.sentimentScore)}
                    ${Utils.getSentimentLabel(mention.sentimentScore)}
                </span>
                <span class="mention-engagement">
                    <i class="fas fa-heart"></i> ${Utils.formatNumber(mention.engagement)}
                </span>
            </div>
        `;
        return div;
    }

    toggleLiveFeed() {
        this.isLive = !this.isLive;
        const btn = document.getElementById('pauseLiveBtn');

        if (!btn) return;

        if (this.isLive) {
            // Feed is now running - show pause button
            btn.innerHTML = '<i class="fas fa-pause"></i><span>Pause Live Feed</span>';
            btn.classList.remove('btn-success');
            btn.classList.add('btn-secondary');
            if (typeof Notifications !== 'undefined') {
                Notifications.info('Live feed resumed');
            }
        } else {
            // Feed is now paused - show resume button
            btn.innerHTML = '<i class="fas fa-play"></i><span>Resume Live Feed</span>';
            btn.classList.remove('btn-secondary');
            btn.classList.add('btn-success');
            if (typeof Notifications !== 'undefined') {
                Notifications.warning('Live feed paused');
            }
        }
    }

    updateRealtimeStats() {
        // Get brand data and update the stat cards
        const brand = typeof APIData !== 'undefined' ? APIData.brands[this.currentBrand] : null;
        if (!brand) return;

        const metrics = brand.metrics;

        // Update sentiment value
        const sentimentEl = document.getElementById('currentSentiment');
        if (sentimentEl) {
            const sentiment = Math.round(metrics.avgSentiment * (0.95 + Math.random() * 0.1));
            sentimentEl.textContent = sentiment + '%';
        }

        // Update volume spike based on brand's growth rate
        const volumeSpikeEl = document.querySelector('.stat-card:nth-child(3) .stat-value');
        if (volumeSpikeEl) {
            const spike = Math.round(metrics.growthRate * 10 + Math.random() * 50);
            volumeSpikeEl.textContent = '+' + spike + '%';
        }

        // Update active alerts based on sentiment
        const alertsCountEl = document.getElementById('activeAlertsCount');
        if (alertsCountEl) {
            const alertCount = metrics.avgSentiment < 70 ? 3 : metrics.avgSentiment < 80 ? 2 : 1;
            alertsCountEl.textContent = alertCount;
        }
    }

    loadAlerts() {
        const alertList = document.getElementById('alertList');
        if (!alertList) return;

        const alerts = [
            {
                type: 'warning',
                title: 'Volume Spike Detected',
                message: 'Mentions increased by 156% in last 30 minutes',
                time: new Date(Date.now() - 300000)
            },
            {
                type: 'danger',
                title: 'Negative Sentiment Rise',
                message: 'Negative mentions up 45% - requires attention',
                time: new Date(Date.now() - 600000)
            }
        ];

        alertList.innerHTML = alerts.map(alert => `
            <div class="alert-item alert-${alert.type}">
                <div class="alert-icon">
                    <i class="fas fa-${alert.type === 'danger' ? 'exclamation-circle' : 'exclamation-triangle'}"></i>
                </div>
                <div class="alert-content">
                    <div class="alert-title">${alert.title}</div>
                    <div class="alert-message">${alert.message}</div>
                    <div class="alert-time">${Utils.formatDate(alert.time, 'relative')}</div>
                </div>
            </div>
        `).join('');
    }

    loadTrending() {
        const trendingList = document.getElementById('trendingList');
        if (!trendingList) return;

        // Get brand-specific trending topics
        const brand = typeof APIData !== 'undefined' ? APIData.brands[this.currentBrand] : null;
        let trending = [];

        if (brand && brand.trending) {
            trending = brand.trending.slice(0, 5).map((topic, index) => ({
                tag: topic,
                count: Math.floor(1240 - (index * 180) + Math.random() * 200),
                change: Math.floor(85 - (index * 12) + Math.random() * 15)
            }));
        } else {
            // Default trending topics based on brand name and products
            const brandName = brand ? brand.name.replace(/\s+/g, '') : 'Brand';
            const products = brand ? brand.products : ['Product'];
            const product = products[0] ? products[0].replace(/\s+/g, '') : 'Product';

            trending = [
                { tag: `#${brandName}`, count: 1240 + Math.floor(Math.random() * 200), change: 85 + Math.floor(Math.random() * 15) },
                { tag: `#${product}`, count: 890 + Math.floor(Math.random() * 150), change: 62 + Math.floor(Math.random() * 12) },
                { tag: '#CustomerService', count: 756 + Math.floor(Math.random() * 100), change: 45 + Math.floor(Math.random() * 10) },
                { tag: '#Innovation', count: 634 + Math.floor(Math.random() * 80), change: 38 + Math.floor(Math.random() * 8) },
                { tag: '#Quality', count: 521 + Math.floor(Math.random() * 60), change: 25 + Math.floor(Math.random() * 5) }
            ];
        }

        trendingList.innerHTML = trending.map((item, index) => `
            <div class="trending-item stagger-item" style="animation-delay: ${index * 0.1}s">
                <div class="trending-rank">${index + 1}</div>
                <div class="trending-content">
                    <div class="trending-tag">${item.tag}</div>
                    <div class="trending-meta">
                        <span class="trending-count">${Utils.formatNumber(item.count)} mentions</span>
                        <span class="trending-change positive">
                            <i class="fas fa-arrow-up"></i> ${item.change}%
                        </span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    initializeCharts() {
        // Destroy existing chart if it exists
        if (this.volumeChart) {
            this.volumeChart.destroy();
            this.volumeChart = null;
        }

        if (typeof Charts !== 'undefined') {
            // Volume chart showing last hour activity
            this.volumeChart = Charts.createMentionVolume('volumeRealtimeChart');
        }
    }

    filterByPlatform(platform) {
        const mentions = document.querySelectorAll('.mention-item');
        mentions.forEach(mention => {
            if (platform === 'all') {
                mention.style.display = 'block';
            } else {
                const platformBadge = mention.querySelector('.platform-badge');
                if (platformBadge && platformBadge.textContent === platform) {
                    mention.style.display = 'block';
                } else {
                    mention.style.display = 'none';
                }
            }
        });

        Notifications.info(`Filtered by ${platform === 'all' ? 'All Platforms' : platform}`);
    }

    exportData() {
        const data = {
            timestamp: new Date().toISOString(),
            mentions: this.mentionQueue,
            alerts: 2,
            sentiment: 72
        };

        Utils.downloadFile(
            JSON.stringify(data, null, 2),
            `realtime-data-${Date.now()}.json`,
            'application/json'
        );

        Notifications.success('Real-time data exported successfully');
    }

    destroy() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
    }
}

// Create global instance for app.js
const Realtime = {
    instance: null,
    render() {
        this.instance = new RealtimePage();
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
window.Realtime = Realtime;

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RealtimePage;
}
