/* ===================================
   Voxly Pro - Trends Module
   Trend Discovery & Analysis
   =================================== */

const Trends = {
    name: 'Trends',
    currentPeriod: '24h', // 24h, 7d, 30d
    currentCategory: 'all', // all, hashtags, keywords, topics
    currentBrand: null,
    isAnimating: false,
    
    // Mock trending data
    trendingData: {
        hashtags: [
            { tag: '#Innovation', mentions: 3456, change: 145, sentiment: 82, velocity: 'rising' },
            { tag: '#TechTrends', mentions: 2890, change: 98, sentiment: 76, velocity: 'rising' },
            { tag: '#DigitalTransformation', mentions: 2341, change: 67, sentiment: 88, velocity: 'rising' },
            { tag: '#AI', mentions: 1987, change: -12, sentiment: 74, velocity: 'declining' },
            { tag: '#Sustainability', mentions: 1765, change: 234, sentiment: 91, velocity: 'rising' },
            { tag: '#FutureOfWork', mentions: 1543, change: 156, sentiment: 79, velocity: 'rising' },
            { tag: '#CloudComputing', mentions: 1298, change: 45, sentiment: 81, velocity: 'stable' },
            { tag: '#Cybersecurity', mentions: 1156, change: 23, sentiment: 68, velocity: 'stable' }
        ],
        keywords: [
            { word: 'innovation', mentions: 5678, change: 189, sentiment: 84, contexts: ['product', 'technology', 'strategy'] },
            { word: 'customer experience', mentions: 4321, change: 234, sentiment: 88, contexts: ['service', 'satisfaction', 'journey'] },
            { word: 'sustainability', mentions: 3890, change: 312, sentiment: 92, contexts: ['environment', 'green', 'future'] },
            { word: 'digital', mentions: 3456, change: 167, sentiment: 79, contexts: ['transformation', 'marketing', 'platform'] },
            { word: 'data-driven', mentions: 2987, change: 145, sentiment: 81, contexts: ['analytics', 'insights', 'decisions'] },
            { word: 'AI-powered', mentions: 2654, change: 98, sentiment: 76, contexts: ['automation', 'intelligence', 'tools'] }
        ],
        topics: [
            { 
                topic: 'Product Innovation', 
                mentions: 8934, 
                change: 267, 
                sentiment: 86,
                description: 'Discussions around new product features and innovations',
                relatedTags: ['#Innovation', '#ProductDesign', '#UX']
            },
            { 
                topic: 'Customer Success', 
                mentions: 7654, 
                change: 345, 
                sentiment: 89,
                description: 'Customer satisfaction and success stories',
                relatedTags: ['#CustomerExperience', '#Success', '#Satisfaction']
            },
            { 
                topic: 'Market Expansion', 
                mentions: 6543, 
                change: 198, 
                sentiment: 82,
                description: 'Business growth and market opportunities',
                relatedTags: ['#Growth', '#Markets', '#Expansion']
            },
            { 
                topic: 'Competitive Analysis', 
                mentions: 5432, 
                change: -45, 
                sentiment: 71,
                description: 'Competitor comparisons and industry positioning',
                relatedTags: ['#Competition', '#Analysis', '#Market']
            }
        ]
    },

    render() {
        // Get current brand info
        const currentBrandId = typeof APIData !== 'undefined' ? APIData.currentBrand : 'apple';
        const brand = typeof APIData !== 'undefined' ? APIData.brands[currentBrandId] : null;
        const brandName = brand ? brand.name : 'Your Brand';

        return `
            <div class="trends-page">
                <!-- Header Section -->
                <div class="trends-header">
                    <div class="header-content">
                        <h1>Trending Now</h1>
                        <p>Discover trends for <strong>${brandName}</strong> in your industry</p>
                    </div>
                    
                    <div class="header-controls">
                        <div class="period-selector">
                            <button class="period-btn ${this.currentPeriod === '24h' ? 'active' : ''}" data-period="24h">Last 24 Hours</button>
                            <button class="period-btn ${this.currentPeriod === '7d' ? 'active' : ''}" data-period="7d">Last 7 Days</button>
                            <button class="period-btn ${this.currentPeriod === '30d' ? 'active' : ''}" data-period="30d">Last 30 Days</button>
                        </div>
                    </div>
                </div>

                <!-- Stats Overview -->
                <div class="trends-stats">
                    <div class="stat-card">
                        <div class="stat-icon" style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);">
                            <span class="material-icons">trending_up</span>
                        </div>
                        <div class="stat-content">
                            <div class="stat-label">Trending Topics</div>
                            <div class="stat-value">${this.trendingData.topics.length}</div>
                            <div class="stat-change positive">+3 new today</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);">
                            <span class="material-icons">tag</span>
                        </div>
                        <div class="stat-content">
                            <div class="stat-label">Trending Hashtags</div>
                            <div class="stat-value">${this.trendingData.hashtags.length}</div>
                            <div class="stat-change positive">+5 rising</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);">
                            <span class="material-icons">rocket_launch</span>
                        </div>
                        <div class="stat-content">
                            <div class="stat-label">Hot Keywords</div>
                            <div class="stat-value">${this.trendingData.keywords.length}</div>
                            <div class="stat-change positive">+2 emerging</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon" style="background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);">
                            <span class="material-icons">speed</span>
                        </div>
                        <div class="stat-content">
                            <div class="stat-label">Velocity Score</div>
                            <div class="stat-value">8.7/10</div>
                            <div class="stat-change positive">High activity</div>
                        </div>
                    </div>
                </div>

                <!-- Category Tabs -->
                <div class="trends-tabs">
                    <button class="tab-btn ${this.currentCategory === 'all' ? 'active' : ''}" data-category="all">
                        <span class="material-icons">dashboard</span>
                        All Trends
                    </button>
                    <button class="tab-btn ${this.currentCategory === 'hashtags' ? 'active' : ''}" data-category="hashtags">
                        <span class="material-icons">tag</span>
                        Hashtags
                    </button>
                    <button class="tab-btn ${this.currentCategory === 'keywords' ? 'active' : ''}" data-category="keywords">
                        <span class="material-icons">font_download</span>
                        Keywords
                    </button>
                    <button class="tab-btn ${this.currentCategory === 'topics' ? 'active' : ''}" data-category="topics">
                        <span class="material-icons">category</span>
                        Topics
                    </button>
                </div>

                <!-- Trends Content -->
                <div class="trends-content" id="trendsContent">
                    <!-- Populated by loadTrendsContent() -->
                </div>

                <!-- Trend Details Modal -->
                <div class="modal-overlay" id="trendModal" style="display: none;">
                    <div class="modal-content trend-modal">
                        <div class="modal-header">
                            <h3>Trend Details</h3>
                            <button class="modal-close" onclick="Trends.closeModal()">
                                <span class="material-icons">close</span>
                            </button>
                        </div>
                        <div class="modal-body" id="trendDetails">
                            <!-- Populated by showTrendDetails() -->
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    init() {
        console.log('Trends module initialized');
        this.currentBrand = typeof APIData !== 'undefined' ? APIData.currentBrand : 'apple';
        this.updateTrendingData();
        this.loadTrendsContent();
        this.attachEventListeners();
    },

    updateStatsCards() {
        // Update the stats cards with new data
        const statCards = document.querySelectorAll('.trends-stats .stat-card');
        if (statCards.length < 4) return;

        // Trending Topics
        const topicsValue = statCards[0].querySelector('.stat-value');
        if (topicsValue) topicsValue.textContent = this.trendingData.topics.length;

        // Trending Hashtags
        const hashtagsValue = statCards[1].querySelector('.stat-value');
        const risingCount = this.trendingData.hashtags.filter(h => h.velocity === 'rising').length;
        if (hashtagsValue) hashtagsValue.textContent = this.trendingData.hashtags.length;
        const hashtagsChange = statCards[1].querySelector('.stat-change');
        if (hashtagsChange) hashtagsChange.textContent = `+${risingCount} rising`;

        // Hot Keywords
        const keywordsValue = statCards[2].querySelector('.stat-value');
        if (keywordsValue) keywordsValue.textContent = this.trendingData.keywords.length;

        // Velocity Score - based on average change
        const avgChange = this.trendingData.hashtags.reduce((s, h) => s + h.change, 0) / this.trendingData.hashtags.length;
        const velocityScore = Math.min(10, Math.max(1, (avgChange / 20 + 5).toFixed(1)));
        const velocityValue = statCards[3].querySelector('.stat-value');
        if (velocityValue) velocityValue.textContent = velocityScore + '/10';
    },

    updateTrendingData() {
        // Generate brand-specific trending data
        const brand = typeof APIData !== 'undefined' ? APIData.brands[this.currentBrand] : null;
        if (!brand) return;

        const brandName = brand.name.replace(/\s+/g, '');
        const products = brand.products || [];
        const industry = brand.industry;

        // Update hashtags based on brand
        if (brand.trending && brand.trending.length > 0) {
            this.trendingData.hashtags = brand.trending.slice(0, 8).map((tag, index) => ({
                tag: tag,
                mentions: Math.floor(3456 - (index * 400) + Math.random() * 300),
                change: Math.floor(145 - (index * 20) + Math.random() * 30),
                sentiment: Math.floor(75 + Math.random() * 17),
                velocity: index < 3 ? 'rising' : (index < 6 ? 'stable' : 'declining')
            }));
        } else {
            this.trendingData.hashtags = [
                { tag: `#${brandName}`, mentions: 3456 + Math.floor(Math.random() * 500), change: 145, sentiment: 82, velocity: 'rising' },
                { tag: `#${products[0]?.replace(/\s+/g, '') || 'Product'}`, mentions: 2890 + Math.floor(Math.random() * 400), change: 98, sentiment: 76, velocity: 'rising' },
                { tag: '#Innovation', mentions: 2341 + Math.floor(Math.random() * 300), change: 67, sentiment: 88, velocity: 'rising' },
                { tag: '#CustomerService', mentions: 1987 + Math.floor(Math.random() * 200), change: -12, sentiment: 74, velocity: 'declining' },
                { tag: '#Quality', mentions: 1765 + Math.floor(Math.random() * 200), change: 234, sentiment: 91, velocity: 'rising' }
            ];
        }

        // Update topics based on brand industry
        const industryTopics = {
            technology: ['Product Innovation', 'Tech Updates', 'User Experience', 'Market Trends'],
            automotive: ['EV Technology', 'Sustainable Mobility', 'Design Innovation', 'Safety Features'],
            it_services: ['Digital Transformation', 'Cloud Solutions', 'Enterprise Tech', 'Consulting'],
            retail: ['Customer Experience', 'Product Launches', 'Brand Loyalty', 'Market Expansion'],
            entertainment: ['Content Strategy', 'Streaming Trends', 'User Engagement', 'Media Innovation'],
            finance: ['Digital Banking', 'Fintech Innovation', 'Customer Trust', 'Regulatory Updates']
        };

        const topicNames = industryTopics[industry] || ['Product Innovation', 'Customer Success', 'Market Expansion', 'Competitive Analysis'];

        this.trendingData.topics = topicNames.map((topicName, index) => ({
            topic: topicName,
            mentions: Math.floor(8934 - (index * 1200) + Math.random() * 500),
            change: Math.floor(267 - (index * 50) + Math.random() * 60),
            sentiment: Math.floor(82 - (index * 4) + Math.random() * 8),
            description: `Discussions about ${topicName.toLowerCase()} for ${brand.name}`,
            relatedTags: [`#${brandName}`, `#${topicName.replace(/\s+/g, '')}`, '#Industry']
        }));
    },

    async handleBrandChange(brandId, force = false) {
        if (this.isAnimating) return;
        if (!force && brandId === this.currentBrand) return;

        this.isAnimating = true;
        this.currentBrand = brandId;

        if (typeof APIData !== 'undefined') {
            APIData.setActiveBrand(brandId);
        }

        // Update trending data for the new brand
        this.updateTrendingData();
        this.loadTrendsContent();
        this.updateStatsCards();

        // Update header
        const brand = typeof APIData !== 'undefined' ? APIData.brands[brandId] : null;
        const headerContent = document.querySelector('.trends-header .header-content p');
        if (headerContent && brand) {
            headerContent.innerHTML = `Discover trends for <strong>${brand.name}</strong> in your industry`;
        }

        try {
            if (window.notificationManager) {
                window.notificationManager.show(`Trends updated for ${brand?.name || brandId}`, 'success');
            }
        } catch (e) {
            console.warn('Notification failed:', e);
        }

        this.isAnimating = false;
    },

    attachEventListeners() {
        // Period selector
        document.querySelectorAll('.period-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.currentPeriod = e.target.dataset.period;
                document.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.loadTrendsContent();
                Notifications.info(`Showing trends for ${this.currentPeriod}`);
            });
        });

        // Category tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.currentCategory = e.currentTarget.dataset.category;
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.loadTrendsContent();
            });
        });
    },

    loadTrendsContent() {
        const content = document.getElementById('trendsContent');
        if (!content) return;

        if (this.currentCategory === 'all') {
            content.innerHTML = this.renderAllTrends();
        } else if (this.currentCategory === 'hashtags') {
            content.innerHTML = this.renderHashtags();
        } else if (this.currentCategory === 'keywords') {
            content.innerHTML = this.renderKeywords();
        } else if (this.currentCategory === 'topics') {
            content.innerHTML = this.renderTopics();
        }

        // Attach click events for trend items
        this.attachTrendClickEvents();
    },

    renderAllTrends() {
        return `
            <div class="all-trends-layout">
                <!-- Top Topics -->
                <div class="trends-section">
                    <div class="section-header">
                        <h3><span class="material-icons">category</span> Top Topics</h3>
                        <button class="btn-text" onclick="Trends.currentCategory='topics'; Trends.loadTrendsContent();">View All</button>
                    </div>
                    <div class="topics-grid">
                        ${this.trendingData.topics.slice(0, 4).map(topic => this.renderTopicCard(topic)).join('')}
                    </div>
                </div>

                <!-- Trending Hashtags & Keywords -->
                <div class="trends-dual-section">
                    <!-- Hashtags -->
                    <div class="trends-section">
                        <div class="section-header">
                            <h3><span class="material-icons">tag</span> Trending Hashtags</h3>
                            <button class="btn-text" onclick="Trends.currentCategory='hashtags'; Trends.loadTrendsContent();">View All</button>
                        </div>
                        <div class="hashtags-list">
                            ${this.trendingData.hashtags.slice(0, 6).map((tag, idx) => this.renderHashtagItem(tag, idx + 1)).join('')}
                        </div>
                    </div>

                    <!-- Keywords -->
                    <div class="trends-section">
                        <div class="section-header">
                            <h3><span class="material-icons">font_download</span> Hot Keywords</h3>
                            <button class="btn-text" onclick="Trends.currentCategory='keywords'; Trends.loadTrendsContent();">View All</button>
                        </div>
                        <div class="keywords-list">
                            ${this.trendingData.keywords.slice(0, 6).map((kw, idx) => this.renderKeywordItem(kw, idx + 1)).join('')}
                        </div>
                    </div>
                </div>

                <!-- Trend Velocity Chart -->
                <div class="trends-section">
                    <div class="section-header">
                        <h3><span class="material-icons">show_chart</span> Trend Velocity</h3>
                    </div>
                    <div class="chart-container">
                        <canvas id="velocityChart"></canvas>
                    </div>
                </div>
            </div>
        `;
    },

    renderHashtags() {
        return `
            <div class="hashtags-full-view">
                <div class="view-header">
                    <h3>Trending Hashtags - ${this.currentPeriod}</h3>
                    <button class="btn-secondary" onclick="Trends.exportTrends('hashtags')">
                        <span class="material-icons">download</span>
                        Export
                    </button>
                </div>
                <div class="hashtags-grid">
                    ${this.trendingData.hashtags.map((tag, idx) => this.renderHashtagCard(tag, idx + 1)).join('')}
                </div>
            </div>
        `;
    },

    renderKeywords() {
        return `
            <div class="keywords-full-view">
                <div class="view-header">
                    <h3>Hot Keywords - ${this.currentPeriod}</h3>
                    <button class="btn-secondary" onclick="Trends.exportTrends('keywords')">
                        <span class="material-icons">download</span>
                        Export
                    </button>
                </div>
                <div class="keywords-grid">
                    ${this.trendingData.keywords.map((kw, idx) => this.renderKeywordCard(kw, idx + 1)).join('')}
                </div>
            </div>
        `;
    },

    renderTopics() {
        return `
            <div class="topics-full-view">
                <div class="view-header">
                    <h3>Trending Topics - ${this.currentPeriod}</h3>
                    <button class="btn-secondary" onclick="Trends.exportTrends('topics')">
                        <span class="material-icons">download</span>
                        Export
                    </button>
                </div>
                <div class="topics-grid">
                    ${this.trendingData.topics.map(topic => this.renderTopicCard(topic)).join('')}
                </div>
            </div>
        `;
    },

    renderTopicCard(topic) {
        const changeClass = topic.change >= 0 ? 'positive' : 'negative';
        const changeIcon = topic.change >= 0 ? 'trending_up' : 'trending_down';
        
        return `
            <div class="topic-card" data-type="topic" data-name="${topic.topic}">
                <div class="topic-header">
                    <h4>${topic.topic}</h4>
                    <span class="topic-mentions">${Utils.formatNumber(topic.mentions)} mentions</span>
                </div>
                <p class="topic-description">${topic.description}</p>
                <div class="topic-metrics">
                    <div class="metric">
                        <span class="material-icons ${changeClass}">${changeIcon}</span>
                        <span class="${changeClass}">${topic.change >= 0 ? '+' : ''}${topic.change}</span>
                    </div>
                    <div class="metric sentiment">
                        <span class="material-icons">sentiment_satisfied</span>
                        <span>${topic.sentiment}% positive</span>
                    </div>
                </div>
                <div class="topic-tags">
                    ${topic.relatedTags.map(tag => `<span class="mini-tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
    },

    renderHashtagItem(tag, rank) {
        const velocityIcons = {
            rising: { icon: 'trending_up', class: 'rising' },
            declining: { icon: 'trending_down', class: 'declining' },
            stable: { icon: 'remove', class: 'stable' }
        };
        const velocity = velocityIcons[tag.velocity];
        
        return `
            <div class="hashtag-item" data-type="hashtag" data-name="${tag.tag}">
                <div class="item-rank">${rank}</div>
                <div class="item-content">
                    <div class="item-name">${tag.tag}</div>
                    <div class="item-stats">
                        <span>${Utils.formatNumber(tag.mentions)} mentions</span>
                        <span class="sentiment" style="color: ${Utils.getSentimentColor(tag.sentiment)}">
                            ${tag.sentiment}% positive
                        </span>
                    </div>
                </div>
                <div class="item-velocity ${velocity.class}">
                    <span class="material-icons">${velocity.icon}</span>
                    <span>${tag.change >= 0 ? '+' : ''}${tag.change}</span>
                </div>
            </div>
        `;
    },

    renderHashtagCard(tag, rank) {
        const velocityIcons = {
            rising: { icon: 'trending_up', class: 'rising' },
            declining: { icon: 'trending_down', class: 'declining' },
            stable: { icon: 'remove', class: 'stable' }
        };
        const velocity = velocityIcons[tag.velocity];
        
        return `
            <div class="hashtag-card" data-type="hashtag" data-name="${tag.tag}">
                <div class="card-rank">#${rank}</div>
                <div class="card-content">
                    <h4>${tag.tag}</h4>
                    <div class="card-stats">
                        <div class="stat-item">
                            <span class="material-icons">forum</span>
                            <span>${Utils.formatNumber(tag.mentions)}</span>
                        </div>
                        <div class="stat-item">
                            <span class="material-icons ${velocity.class}">${velocity.icon}</span>
                            <span>${tag.change >= 0 ? '+' : ''}${tag.change}</span>
                        </div>
                    </div>
                    <div class="sentiment-bar">
                        <div class="sentiment-fill" style="width: ${tag.sentiment}%; background: ${Utils.getSentimentColor(tag.sentiment)}"></div>
                    </div>
                    <div class="sentiment-label">${tag.sentiment}% positive sentiment</div>
                </div>
            </div>
        `;
    },

    renderKeywordItem(kw, rank) {
        return `
            <div class="keyword-item" data-type="keyword" data-name="${kw.word}">
                <div class="item-rank">${rank}</div>
                <div class="item-content">
                    <div class="item-name">${kw.word}</div>
                    <div class="item-stats">
                        <span>${Utils.formatNumber(kw.mentions)} mentions</span>
                        <span class="contexts">${kw.contexts.join(', ')}</span>
                    </div>
                </div>
                <div class="item-change positive">
                    <span class="material-icons">trending_up</span>
                    <span>+${kw.change}</span>
                </div>
            </div>
        `;
    },

    renderKeywordCard(kw, rank) {
        return `
            <div class="keyword-card" data-type="keyword" data-name="${kw.word}">
                <div class="card-rank">#${rank}</div>
                <div class="card-content">
                    <h4>${kw.word}</h4>
                    <div class="card-stats">
                        <div class="stat-item">
                            <span class="material-icons">forum</span>
                            <span>${Utils.formatNumber(kw.mentions)}</span>
                        </div>
                        <div class="stat-item positive">
                            <span class="material-icons">trending_up</span>
                            <span>+${kw.change}</span>
                        </div>
                    </div>
                    <div class="sentiment-bar">
                        <div class="sentiment-fill" style="width: ${kw.sentiment}%; background: ${Utils.getSentimentColor(kw.sentiment)}"></div>
                    </div>
                    <div class="contexts-list">
                        ${kw.contexts.map(ctx => `<span class="context-tag">${ctx}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    },

    attachTrendClickEvents() {
        document.querySelectorAll('[data-type]').forEach(item => {
            item.addEventListener('click', () => {
                const type = item.dataset.type;
                const name = item.dataset.name;
                this.showTrendDetails(type, name);
            });
        });

        // Initialize velocity chart if present
        const velocityCanvas = document.getElementById('velocityChart');
        if (velocityCanvas) {
            this.createVelocityChart();
        }
    },

    createVelocityChart() {
        const ctx = document.getElementById('velocityChart');
        if (!ctx) return;

        const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
        const data1 = Array.from({ length: 24 }, () => Math.floor(Math.random() * 100) + 50);
        const data2 = Array.from({ length: 24 }, () => Math.floor(Math.random() * 80) + 30);
        const data3 = Array.from({ length: 24 }, () => Math.floor(Math.random() * 60) + 20);

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: hours,
                datasets: [
                    {
                        label: '#Innovation',
                        data: data1,
                        borderColor: '#6366f1',
                        backgroundColor: 'rgba(99, 102, 241, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: '#TechTrends',
                        data: data2,
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: '#DigitalTransformation',
                        data: data3,
                        borderColor: '#f59e0b',
                        backgroundColor: 'rgba(245, 158, 11, 0.1)',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: 'Trend Velocity Over Last 24 Hours'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Mentions per Hour'
                        }
                    }
                }
            }
        });
    },

    showTrendDetails(type, name) {
        const modal = document.getElementById('trendModal');
        const details = document.getElementById('trendDetails');
        
        if (!modal || !details) return;

        let item;
        if (type === 'hashtag') {
            item = this.trendingData.hashtags.find(h => h.tag === name);
        } else if (type === 'keyword') {
            item = this.trendingData.keywords.find(k => k.word === name);
        } else if (type === 'topic') {
            item = this.trendingData.topics.find(t => t.topic === name);
        }

        if (!item) return;

        details.innerHTML = `
            <div class="trend-detail-header">
                <h2>${type === 'topic' ? item.topic : type === 'hashtag' ? item.tag : item.word}</h2>
                <span class="detail-badge">${type}</span>
            </div>

            <div class="detail-metrics-grid">
                <div class="detail-metric">
                    <span class="material-icons">forum</span>
                    <div class="metric-info">
                        <div class="metric-label">Total Mentions</div>
                        <div class="metric-value">${Utils.formatNumber(item.mentions)}</div>
                    </div>
                </div>
                <div class="detail-metric">
                    <span class="material-icons">trending_up</span>
                    <div class="metric-info">
                        <div class="metric-label">Change</div>
                        <div class="metric-value ${item.change >= 0 ? 'positive' : 'negative'}">
                            ${item.change >= 0 ? '+' : ''}${item.change}
                        </div>
                    </div>
                </div>
                <div class="detail-metric">
                    <span class="material-icons">sentiment_satisfied</span>
                    <div class="metric-info">
                        <div class="metric-label">Sentiment</div>
                        <div class="metric-value">${item.sentiment}%</div>
                    </div>
                </div>
                <div class="detail-metric">
                    <span class="material-icons">speed</span>
                    <div class="metric-info">
                        <div class="metric-label">Velocity</div>
                        <div class="metric-value">${type === 'hashtag' ? item.velocity : 'Rising'}</div>
                    </div>
                </div>
            </div>

            ${type === 'topic' ? `
                <div class="detail-section">
                    <h4>Description</h4>
                    <p>${item.description}</p>
                </div>
                <div class="detail-section">
                    <h4>Related Tags</h4>
                    <div class="detail-tags">
                        ${item.relatedTags.map(tag => `<span class="tag-badge">${tag}</span>`).join('')}
                    </div>
                </div>
            ` : ''}

            ${type === 'keyword' ? `
                <div class="detail-section">
                    <h4>Common Contexts</h4>
                    <div class="detail-contexts">
                        ${item.contexts.map(ctx => `<span class="context-badge">${ctx}</span>`).join('')}
                    </div>
                </div>
            ` : ''}

            <div class="detail-chart">
                <h4>Trend Over Time</h4>
                <canvas id="detailTrendChart"></canvas>
            </div>

            <div class="detail-actions">
                <button class="btn-primary" onclick="Notifications.success('Now tracking: ${name}')">
                    <span class="material-icons">bookmark</span>
                    Track This Trend
                </button>
                <button class="btn-secondary" onclick="Notifications.info('Creating alert for: ${name}')">
                    <span class="material-icons">notifications</span>
                    Create Alert
                </button>
            </div>
        `;

        modal.style.display = 'flex';

        // Create detail chart
        setTimeout(() => this.createDetailChart(item), 100);
    },

    createDetailChart(item) {
        const ctx = document.getElementById('detailTrendChart');
        if (!ctx) return;

        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const data = Array.from({ length: 7 }, () => Math.floor(Math.random() * item.mentions / 7) + (item.mentions / 14));

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: days,
                datasets: [{
                    label: 'Mentions',
                    data: data,
                    backgroundColor: 'rgba(99, 102, 241, 0.8)',
                    borderColor: '#6366f1',
                    borderWidth: 1
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
                        beginAtZero: true
                    }
                }
            }
        });
    },

    closeModal() {
        const modal = document.getElementById('trendModal');
        if (modal) {
            modal.style.display = 'none';
        }
    },

    exportTrends(category) {
        let data;
        if (category === 'hashtags') {
            data = this.trendingData.hashtags;
        } else if (category === 'keywords') {
            data = this.trendingData.keywords;
        } else if (category === 'topics') {
            data = this.trendingData.topics;
        }

        const exportData = {
            exportDate: new Date().toISOString(),
            period: this.currentPeriod,
            category: category,
            data: data
        };

        Utils.downloadFile(
            JSON.stringify(exportData, null, 2),
            `trends-${category}-${Utils.formatDate(new Date(), 'YYYY-MM-DD')}.json`,
            'application/json'
        );

        Notifications.success(`${category} trends exported successfully`);
    },

    destroy() {
        console.log('Trends module destroyed');
    }
};

// Make available globally
window.Trends = Trends;
