/* ===================================
   Voxly Pro - Influencers Module
   Influencer Discovery & Analysis
   =================================== */

const Influencers = {
    name: 'Influencers',
    currentView: 'all', // all, tier1, tier2, tier3
    currentSort: 'influence-desc',
    selectedInfluencers: [],
    currentBrand: null,
    isAnimating: false,
    
    // Mock influencer data
    influencers: [
        {
            id: 1,
            name: 'Sarah Johnson',
            handle: '@sarahjtech',
            avatar: 'SJ',
            platform: 'twitter',
            tier: 'tier1',
            followers: 856000,
            engagement: 8.5,
            reach: 1200000,
            mentions: 124,
            sentiment: 85,
            influence: 94,
            topics: ['Technology', 'Innovation', 'AI'],
            verified: true,
            lastMention: new Date(Date.now() - 3600000 * 2)
        },
        {
            id: 2,
            name: 'Mike Chen',
            handle: '@mikechen',
            avatar: 'MC',
            platform: 'linkedin',
            tier: 'tier1',
            followers: 425000,
            engagement: 6.8,
            reach: 680000,
            mentions: 89,
            sentiment: 78,
            influence: 88,
            topics: ['Business', 'Marketing', 'Growth'],
            verified: true,
            lastMention: new Date(Date.now() - 3600000 * 5)
        },
        {
            id: 3,
            name: 'Emma Rodriguez',
            handle: '@emmar_digital',
            avatar: 'ER',
            platform: 'instagram',
            tier: 'tier2',
            followers: 156000,
            engagement: 12.3,
            reach: 320000,
            mentions: 67,
            sentiment: 92,
            influence: 76,
            topics: ['Design', 'UX', 'Creativity'],
            verified: true,
            lastMention: new Date(Date.now() - 3600000 * 8)
        },
        {
            id: 4,
            name: 'David Kim',
            handle: '@davidkim_tech',
            avatar: 'DK',
            platform: 'twitter',
            tier: 'tier2',
            followers: 98000,
            engagement: 9.2,
            reach: 180000,
            mentions: 52,
            sentiment: 81,
            influence: 72,
            topics: ['Tech', 'Startups', 'SaaS'],
            verified: false,
            lastMention: new Date(Date.now() - 3600000 * 12)
        },
        {
            id: 5,
            name: 'Lisa Anderson',
            handle: '@lisaanderson',
            avatar: 'LA',
            platform: 'linkedin',
            tier: 'tier2',
            followers: 75000,
            engagement: 7.5,
            reach: 125000,
            mentions: 45,
            sentiment: 88,
            influence: 68,
            topics: ['Leadership', 'Strategy', 'Management'],
            verified: true,
            lastMention: new Date(Date.now() - 3600000 * 15)
        },
        {
            id: 6,
            name: 'Alex Turner',
            handle: '@alexturner',
            avatar: 'AT',
            platform: 'twitter',
            tier: 'tier3',
            followers: 34000,
            engagement: 11.8,
            reach: 58000,
            mentions: 28,
            sentiment: 76,
            influence: 54,
            topics: ['Marketing', 'Content', 'Social Media'],
            verified: false,
            lastMention: new Date(Date.now() - 3600000 * 20)
        },
        {
            id: 7,
            name: 'Jennifer Lee',
            handle: '@jenniferlee',
            avatar: 'JL',
            platform: 'instagram',
            tier: 'tier3',
            followers: 28000,
            engagement: 15.2,
            reach: 45000,
            mentions: 21,
            sentiment: 84,
            influence: 48,
            topics: ['Design', 'Branding', 'Visual'],
            verified: false,
            lastMention: new Date(Date.now() - 3600000 * 24)
        }
    ],

    render() {
        // Get current brand info
        const currentBrandId = typeof APIData !== 'undefined' ? APIData.currentBrand : 'apple';
        const brand = typeof APIData !== 'undefined' ? APIData.brands[currentBrandId] : null;
        const brandName = brand ? brand.name : 'Your Brand';

        return `
            <div class="influencers-page">
                <!-- Header Section -->
                <div class="influencers-header">
                    <div class="header-title">
                        <h2>Influencers for <strong>${brandName}</strong></h2>
                    </div>
                    <div class="header-stats">
                        <div class="stat-card">
                            <div class="stat-icon" style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);">
                                <span class="material-icons">people</span>
                            </div>
                            <div class="stat-content">
                                <div class="stat-label">Total Influencers</div>
                                <div class="stat-value">${this.influencers.length}</div>
                                <div class="stat-change positive">+3 this week</div>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);">
                                <span class="material-icons">visibility</span>
                            </div>
                            <div class="stat-content">
                                <div class="stat-label">Total Reach</div>
                                <div class="stat-value">${Utils.formatNumber(this.influencers.reduce((sum, i) => sum + i.reach, 0))}</div>
                                <div class="stat-change positive">+12.5%</div>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);">
                                <span class="material-icons">trending_up</span>
                            </div>
                            <div class="stat-content">
                                <div class="stat-label">Avg. Engagement</div>
                                <div class="stat-value">${(this.influencers.reduce((sum, i) => sum + i.engagement, 0) / this.influencers.length).toFixed(1)}%</div>
                                <div class="stat-change positive">+2.3%</div>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon" style="background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);">
                                <span class="material-icons">campaign</span>
                            </div>
                            <div class="stat-content">
                                <div class="stat-label">Total Mentions</div>
                                <div class="stat-value">${this.influencers.reduce((sum, i) => sum + i.mentions, 0)}</div>
                                <div class="stat-change positive">+8.7%</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Filters & Actions -->
                <div class="influencers-controls">
                    <div class="filter-chips">
                        <button class="filter-chip ${this.currentView === 'all' ? 'active' : ''}" data-view="all">
                            <span class="material-icons">people</span>
                            All Influencers
                        </button>
                        <button class="filter-chip ${this.currentView === 'tier1' ? 'active' : ''}" data-view="tier1">
                            <span class="material-icons">star</span>
                            Tier 1 (1M+)
                        </button>
                        <button class="filter-chip ${this.currentView === 'tier2' ? 'active' : ''}" data-view="tier2">
                            <span class="material-icons">star_half</span>
                            Tier 2 (100K-1M)
                        </button>
                        <button class="filter-chip ${this.currentView === 'tier3' ? 'active' : ''}" data-view="tier3">
                            <span class="material-icons">star_outline</span>
                            Tier 3 (<100K)
                        </button>
                    </div>
                    
                    <div class="control-actions">
                        <select class="sort-select" id="influencerSort">
                            <option value="influence-desc">Influence Score (High to Low)</option>
                            <option value="influence-asc">Influence Score (Low to High)</option>
                            <option value="followers-desc">Followers (High to Low)</option>
                            <option value="followers-asc">Followers (Low to High)</option>
                            <option value="engagement-desc">Engagement (High to Low)</option>
                            <option value="engagement-asc">Engagement (Low to High)</option>
                            <option value="mentions-desc">Mentions (High to Low)</option>
                            <option value="mentions-asc">Mentions (Low to High)</option>
                        </select>
                        <button class="btn-primary" id="addInfluencer">
                            <span class="material-icons">add</span>
                            Add Influencer
                        </button>
                        <button class="btn-secondary" id="exportInfluencers">
                            <span class="material-icons">download</span>
                            Export
                        </button>
                    </div>
                </div>

                <!-- Influencers Grid -->
                <div class="influencers-grid" id="influencersGrid">
                    <!-- Populated by loadInfluencers() -->
                </div>

                <!-- Influencer Details Modal -->
                <div class="modal-overlay" id="influencerModal" style="display: none;">
                    <div class="modal-content influencer-modal">
                        <div class="modal-header">
                            <h3>Influencer Details</h3>
                            <button class="modal-close" onclick="Influencers.closeModal()">
                                <span class="material-icons">close</span>
                            </button>
                        </div>
                        <div class="modal-body" id="influencerDetails">
                            <!-- Populated by showDetails() -->
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    init() {
        console.log('Influencers module initialized');
        this.currentBrand = typeof APIData !== 'undefined' ? APIData.currentBrand : 'apple';
        this.generateBrandInfluencers();
        this.loadInfluencers();
        this.attachEventListeners();
    },

    generateBrandInfluencers() {
        // Generate brand-specific influencer data
        const brand = typeof APIData !== 'undefined' ? APIData.brands[this.currentBrand] : null;
        if (!brand) return;

        const industry = brand.industry;
        const brandName = brand.name;

        // Update influencer topics based on brand industry
        const industryTopics = {
            technology: ['Tech', 'Innovation', 'AI', 'Gadgets', 'Software'],
            automotive: ['Cars', 'EVs', 'Automotive', 'Mobility', 'Sustainability'],
            it_services: ['IT', 'Digital', 'Cloud', 'Enterprise', 'Consulting'],
            retail: ['Retail', 'Shopping', 'E-commerce', 'Brands', 'Consumer'],
            entertainment: ['Entertainment', 'Media', 'Streaming', 'Content', 'Digital'],
            finance: ['Finance', 'Banking', 'Fintech', 'Investing', 'Digital Banking']
        };

        const topics = industryTopics[industry] || ['Business', 'Technology', 'Innovation'];

        // Update some influencer topics to be brand-relevant
        this.influencers.forEach((inf, index) => {
            inf.topics = [
                topics[index % topics.length],
                topics[(index + 1) % topics.length],
                topics[(index + 2) % topics.length]
            ];
            // Vary the stats based on brand metrics
            const variance = 0.8 + Math.random() * 0.4;
            inf.mentions = Math.round(inf.mentions * variance);
            inf.engagement = parseFloat((inf.engagement * variance).toFixed(1));
        });
    },

    updateHeaderStats() {
        // Update the stat cards in the header
        const statCards = document.querySelectorAll('.influencers-header .stat-card');
        if (statCards.length < 4) return;

        const totalInfluencers = this.influencers.length;
        const totalReach = this.influencers.reduce((sum, i) => sum + i.reach, 0);
        const avgEngagement = (this.influencers.reduce((sum, i) => sum + i.engagement, 0) / totalInfluencers).toFixed(1);
        const totalMentions = this.influencers.reduce((sum, i) => sum + i.mentions, 0);

        // Total Influencers
        const infValue = statCards[0].querySelector('.stat-value');
        if (infValue) infValue.textContent = totalInfluencers;

        // Total Reach
        const reachValue = statCards[1].querySelector('.stat-value');
        if (reachValue) reachValue.textContent = Utils.formatNumber(totalReach);

        // Avg Engagement
        const engValue = statCards[2].querySelector('.stat-value');
        if (engValue) engValue.textContent = avgEngagement + '%';

        // Total Mentions
        const mentionsValue = statCards[3].querySelector('.stat-value');
        if (mentionsValue) mentionsValue.textContent = totalMentions;
    },

    async handleBrandChange(brandId, force = false) {
        if (this.isAnimating) return;
        if (!force && brandId === this.currentBrand) return;

        this.isAnimating = true;
        this.currentBrand = brandId;

        if (typeof APIData !== 'undefined') {
            APIData.setActiveBrand(brandId);
        }

        // Regenerate brand-specific influencer data
        this.generateBrandInfluencers();
        this.loadInfluencers();
        this.updateHeaderStats();

        // Update header
        const brand = typeof APIData !== 'undefined' ? APIData.brands[brandId] : null;
        const headerTitle = document.querySelector('.influencers-header .header-title h2');
        if (headerTitle && brand) {
            headerTitle.innerHTML = `Influencers for <strong>${brand.name}</strong>`;
        }

        try {
            if (window.notificationManager) {
                window.notificationManager.show(`Influencers updated for ${brand?.name || brandId}`, 'success');
            }
        } catch (e) {
            console.warn('Notification failed:', e);
        }

        this.isAnimating = false;
    },

    attachEventListeners() {
        // Filter chips
        document.querySelectorAll('.filter-chip').forEach(chip => {
            chip.addEventListener('click', (e) => {
                const view = e.currentTarget.dataset.view;
                this.currentView = view;
                document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.loadInfluencers();
            });
        });

        // Sort dropdown
        const sortSelect = document.getElementById('influencerSort');
        if (sortSelect) {
            sortSelect.value = this.currentSort;
            sortSelect.addEventListener('change', (e) => {
                this.currentSort = e.target.value;
                this.loadInfluencers();
            });
        }

        // Add influencer
        const addBtn = document.getElementById('addInfluencer');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                Notifications.info('Add influencer feature coming soon');
            });
        }

        // Export
        const exportBtn = document.getElementById('exportInfluencers');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportData());
        }
    },

    loadInfluencers() {
        const grid = document.getElementById('influencersGrid');
        if (!grid) return;

        // Filter influencers
        let filtered = this.influencers;
        if (this.currentView !== 'all') {
            filtered = this.influencers.filter(i => i.tier === this.currentView);
        }

        // Sort influencers
        filtered = this.sortInfluencers(filtered, this.currentSort);

        // Render grid
        grid.innerHTML = filtered.map(influencer => this.renderInfluencerCard(influencer)).join('');

        // Attach card click events
        document.querySelectorAll('.influencer-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.influencer-actions')) {
                    const id = parseInt(card.dataset.id);
                    this.showDetails(id);
                }
            });
        });
    },

    renderInfluencerCard(influencer) {
        const platformIcons = {
            twitter: 'fab fa-twitter',
            linkedin: 'fab fa-linkedin',
            instagram: 'fab fa-instagram',
            facebook: 'fab fa-facebook'
        };

        return `
            <div class="influencer-card" data-id="${influencer.id}">
                <div class="influencer-card-header">
                    <div class="influencer-avatar" style="background: linear-gradient(135deg, #${this.getColorHash(influencer.id)} 0%, #${this.getColorHash(influencer.id + 100)} 100%);">
                        ${influencer.avatar}
                    </div>
                    <div class="influencer-badge tier-${influencer.tier}">
                        ${influencer.tier === 'tier1' ? 'Tier 1' : influencer.tier === 'tier2' ? 'Tier 2' : 'Tier 3'}
                    </div>
                </div>
                
                <div class="influencer-info">
                    <h3 class="influencer-name">
                        ${influencer.name}
                        ${influencer.verified ? '<span class="material-icons verified">verified</span>' : ''}
                    </h3>
                    <div class="influencer-handle">
                        <i class="${platformIcons[influencer.platform]}"></i>
                        ${influencer.handle}
                    </div>
                </div>

                <div class="influencer-stats">
                    <div class="stat-item">
                        <div class="stat-label">Followers</div>
                        <div class="stat-value">${Utils.formatNumber(influencer.followers)}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Engagement</div>
                        <div class="stat-value">${influencer.engagement}%</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Mentions</div>
                        <div class="stat-value">${influencer.mentions}</div>
                    </div>
                </div>

                <div class="influencer-metrics">
                    <div class="metric-row">
                        <span class="metric-label">Influence Score</span>
                        <div class="metric-bar">
                            <div class="metric-fill" style="width: ${influencer.influence}%; background: linear-gradient(90deg, #6366f1, #8b5cf6);"></div>
                            <span class="metric-value">${influencer.influence}</span>
                        </div>
                    </div>
                    <div class="metric-row">
                        <span class="metric-label">Sentiment</span>
                        <div class="metric-bar">
                            <div class="metric-fill" style="width: ${influencer.sentiment}%; background: ${Utils.getSentimentColor(influencer.sentiment)};"></div>
                            <span class="metric-value">${influencer.sentiment}%</span>
                        </div>
                    </div>
                </div>

                <div class="influencer-topics">
                    ${influencer.topics.map(topic => `<span class="topic-tag">${topic}</span>`).join('')}
                </div>

                <div class="influencer-footer">
                    <div class="last-mention">
                        <span class="material-icons">schedule</span>
                        ${Utils.formatDate(influencer.lastMention, 'relative')}
                    </div>
                    <div class="influencer-actions">
                        <button class="action-btn" title="View Profile" onclick="event.stopPropagation(); Notifications.info('Opening profile...')">
                            <span class="material-icons">person</span>
                        </button>
                        <button class="action-btn" title="Send Message" onclick="event.stopPropagation(); Notifications.info('Message feature coming soon')">
                            <span class="material-icons">mail</span>
                        </button>
                        <button class="action-btn" title="Track" onclick="event.stopPropagation(); Notifications.success('Now tracking ${influencer.name}')">
                            <span class="material-icons">bookmark_border</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    sortInfluencers(influencers, sortBy) {
        const [field, direction] = sortBy.split('-');
        const multiplier = direction === 'desc' ? -1 : 1;
        
        return [...influencers].sort((a, b) => {
            return (a[field] - b[field]) * multiplier;
        });
    },

    showDetails(id) {
        const influencer = this.influencers.find(i => i.id === id);
        if (!influencer) return;

        const modal = document.getElementById('influencerModal');
        const details = document.getElementById('influencerDetails');
        
        if (!modal || !details) return;

        details.innerHTML = `
            <div class="influencer-detail-header">
                <div class="detail-avatar" style="background: linear-gradient(135deg, #${this.getColorHash(influencer.id)} 0%, #${this.getColorHash(influencer.id + 100)} 100%);">
                    ${influencer.avatar}
                </div>
                <div class="detail-info">
                    <h2>${influencer.name} ${influencer.verified ? '<span class="material-icons verified">verified</span>' : ''}</h2>
                    <p class="detail-handle">${influencer.handle}</p>
                    <div class="detail-badges">
                        <span class="badge-tier tier-${influencer.tier}">${influencer.tier.toUpperCase()}</span>
                        <span class="badge-platform">${influencer.platform}</span>
                    </div>
                </div>
            </div>

            <div class="detail-metrics-grid">
                <div class="detail-metric">
                    <span class="material-icons">people</span>
                    <div class="metric-info">
                        <div class="metric-label">Followers</div>
                        <div class="metric-value">${Utils.formatNumber(influencer.followers)}</div>
                    </div>
                </div>
                <div class="detail-metric">
                    <span class="material-icons">trending_up</span>
                    <div class="metric-info">
                        <div class="metric-label">Engagement Rate</div>
                        <div class="metric-value">${influencer.engagement}%</div>
                    </div>
                </div>
                <div class="detail-metric">
                    <span class="material-icons">visibility</span>
                    <div class="metric-info">
                        <div class="metric-label">Reach</div>
                        <div class="metric-value">${Utils.formatNumber(influencer.reach)}</div>
                    </div>
                </div>
                <div class="detail-metric">
                    <span class="material-icons">forum</span>
                    <div class="metric-info">
                        <div class="metric-label">Mentions</div>
                        <div class="metric-value">${influencer.mentions}</div>
                    </div>
                </div>
            </div>

            <div class="detail-section">
                <h4>Influence & Sentiment</h4>
                <div class="detail-bars">
                    <div class="detail-bar-item">
                        <label>Influence Score</label>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${influencer.influence}%; background: linear-gradient(90deg, #6366f1, #8b5cf6);"></div>
                        </div>
                        <span class="bar-value">${influencer.influence}/100</span>
                    </div>
                    <div class="detail-bar-item">
                        <label>Sentiment Score</label>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${influencer.sentiment}%; background: ${Utils.getSentimentColor(influencer.sentiment)};"></div>
                        </div>
                        <span class="bar-value">${influencer.sentiment}%</span>
                    </div>
                </div>
            </div>

            <div class="detail-section">
                <h4>Topics of Interest</h4>
                <div class="detail-topics">
                    ${influencer.topics.map(topic => `<span class="topic-badge">${topic}</span>`).join('')}
                </div>
            </div>

            <div class="detail-actions">
                <button class="btn-primary" onclick="Notifications.success('Started tracking ${influencer.name}')">
                    <span class="material-icons">add</span>
                    Track Influencer
                </button>
                <button class="btn-secondary" onclick="Notifications.info('Contact feature coming soon')">
                    <span class="material-icons">mail</span>
                    Send Message
                </button>
                <button class="btn-secondary" onclick="window.open('https://${influencer.platform}.com/${influencer.handle.substring(1)}', '_blank')">
                    <span class="material-icons">open_in_new</span>
                    View Profile
                </button>
            </div>
        `;

        modal.style.display = 'flex';
    },

    closeModal() {
        const modal = document.getElementById('influencerModal');
        if (modal) {
            modal.style.display = 'none';
        }
    },

    getColorHash(id) {
        const colors = ['6366f1', '8b5cf6', '10b981', 'f59e0b', 'ec4899', '06b6d4', 'ef4444'];
        return colors[id % colors.length];
    },

    exportData() {
        const data = {
            exportDate: new Date().toISOString(),
            totalInfluencers: this.influencers.length,
            influencers: this.influencers.map(i => ({
                name: i.name,
                handle: i.handle,
                platform: i.platform,
                tier: i.tier,
                followers: i.followers,
                engagement: i.engagement,
                reach: i.reach,
                mentions: i.mentions,
                sentiment: i.sentiment,
                influence: i.influence,
                topics: i.topics
            }))
        };

        Utils.downloadFile(
            JSON.stringify(data, null, 2),
            `influencers-${Utils.formatDate(new Date(), 'YYYY-MM-DD')}.json`,
            'application/json'
        );

        Notifications.success('Influencer data exported successfully');
    },

    destroy() {
        console.log('Influencers module destroyed');
    }
};

// Make available globally
window.Influencers = Influencers;
