/* ===================================
   Voxly Pro - Influencers Module
   Influencer Discovery & Analysis
   =================================== */

// Shared store for pinned influencers.
// Phase 4: backed by the server (/api/influencers/pinned). A local cache keeps
// isPinned()/getAll() synchronous so existing render code doesn't need to await.
// LEGACY_KEY preserves any Phase-3 localStorage pins during migration.
window.PinnedInfluencers = (() => {
    const LEGACY_KEY = 'voxly_pinned_influencers';

    const state = {
        cache: [],
        loaded: false,
    };

    const emit = () => window.dispatchEvent(new CustomEvent('pinnedInfluencersChanged'));

    const readLegacy = () => {
        try {
            return JSON.parse(localStorage.getItem(LEGACY_KEY)) || [];
        } catch { return []; }
    };

    const toSnapshot = (inf) => ({
        id: inf.id,
        name: inf.name,
        handle: inf.handle,
        avatar: inf.avatar,
        image: inf.image ?? inf.avatarUrl,
        avatarUrl: inf.avatarUrl ?? inf.image,
        platform: inf.platform,
        tier: inf.tier,
        followers: inf.followers,
        engagement: inf.engagement,
        reach: inf.reach,
        mentions: inf.mentions,
        sentiment: inf.sentiment,
        influence: inf.influence,
        topics: inf.topics || [],
        verified: !!inf.verified,
        pinnedAt: inf.pinnedAt ?? Date.now(),
    });

    const api = {
        async init() {
            if (typeof window.API === 'undefined') {
                state.cache = readLegacy();
                state.loaded = true;
                emit();
                return;
            }
            try {
                const { pinned } = await window.API.influencers.pinned();
                state.cache = (pinned || []).map(toSnapshot);
                state.loaded = true;
                emit();
            } catch {
                // Offline / not logged in — fall back to any legacy localStorage data.
                state.cache = readLegacy();
                state.loaded = true;
                emit();
            }
        },

        getAll()   { return state.cache; },
        isPinned(id) { return state.cache.some((inf) => inf.id === id); },

        async pin(influencer) {
            if (this.isPinned(influencer.id)) return false;
            const snap = toSnapshot(influencer);
            state.cache.push(snap);
            emit();
            try {
                if (typeof window.API !== 'undefined') {
                    await window.API.influencers.pin(influencer.id);
                } else {
                    localStorage.setItem(LEGACY_KEY, JSON.stringify(state.cache));
                }
                return true;
            } catch (err) {
                // Roll back local state on API failure.
                state.cache = state.cache.filter((x) => x.id !== influencer.id);
                emit();
                throw err;
            }
        },

        async unpin(id) {
            const prev = state.cache;
            state.cache = state.cache.filter((inf) => inf.id !== id);
            emit();
            try {
                if (typeof window.API !== 'undefined') {
                    await window.API.influencers.unpin(id);
                } else {
                    localStorage.setItem(LEGACY_KEY, JSON.stringify(state.cache));
                }
            } catch (err) {
                state.cache = prev;
                emit();
                throw err;
            }
        },

        async toggle(influencer) {
            if (this.isPinned(influencer.id)) {
                await this.unpin(influencer.id);
                return false;
            }
            await this.pin(influencer);
            return true;
        },
    };

    return api;
})();

// Load pinned influencers as soon as the session cookie is available.
window.addEventListener('DOMContentLoaded', () => {
    // Auth.init() runs on DOMContentLoaded too — defer slightly so the API call
    // runs after the session check completes (and the cookie is set).
    setTimeout(() => window.PinnedInfluencers.init(), 300);
});

const Influencers = {
    name: 'Influencers',
    currentView: 'all', // all, tier1, tier2, tier3
    currentSort: 'influence-desc',
    selectedInfluencers: [],
    currentBrand: null,
    isAnimating: false,

    // Dynamic influencer data - populated based on brand
    influencers: [],

    // Influencer templates pool with diverse names and images
    influencerPool: {
        // Female influencers
        female: [
            { name: 'Sarah Johnson', handle: 'sarahjtech', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face' },
            { name: 'Emma Rodriguez', handle: 'emmar_digital', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
            { name: 'Lisa Anderson', handle: 'lisaanderson', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face' },
            { name: 'Jennifer Lee', handle: 'jenniferlee', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face' },
            { name: 'Maria Garcia', handle: 'mariagarcia', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=face' },
            { name: 'Rachel Green', handle: 'rachelgreen', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face' },
            { name: 'Amanda White', handle: 'amandawhite', image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&h=150&fit=crop&crop=face' },
            { name: 'Nicole Brown', handle: 'nicolebrown', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face' },
            { name: 'Jessica Taylor', handle: 'jesstaylor', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face' },
            { name: 'Sophia Martinez', handle: 'sophiamtz', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face' }
        ],
        // Male influencers
        male: [
            { name: 'Mike Chen', handle: 'mikechen', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
            { name: 'David Kim', handle: 'davidkim_tech', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
            { name: 'Alex Turner', handle: 'alexturner', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' },
            { name: 'James Wilson', handle: 'jameswilson', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face' },
            { name: 'Ryan Cooper', handle: 'ryancooper', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face' },
            { name: 'Chris Martinez', handle: 'chrismtz', image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop&crop=face' },
            { name: 'Daniel Park', handle: 'danielpark', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop&crop=face' },
            { name: 'Kevin Zhang', handle: 'kevinzhang', image: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face' },
            { name: 'Marcus Johnson', handle: 'marcusj', image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&h=150&fit=crop&crop=face' },
            { name: 'Brian Lee', handle: 'brianlee', image: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=150&h=150&fit=crop&crop=face' }
        ]
    },

    // Industry-specific topics
    industryTopics: {
        technology: ['Tech Reviews', 'Innovation', 'AI', 'Gadgets', 'Software', 'Mobile Tech', 'Future Tech'],
        automotive: ['Car Reviews', 'EVs', 'Automotive', 'Mobility', 'Sustainability', 'Racing', 'Car Tech'],
        it_services: ['IT Solutions', 'Cloud', 'Enterprise', 'Digital Transform', 'Consulting', 'DevOps', 'Security'],
        retail: ['Shopping', 'E-commerce', 'Fashion', 'Brands', 'Consumer', 'Lifestyle', 'Deals'],
        entertainment: ['Entertainment', 'Media', 'Streaming', 'Movies', 'Gaming', 'Music', 'Pop Culture'],
        finance: ['Finance', 'Fintech', 'Investing', 'Banking', 'Crypto', 'Trading', 'Personal Finance']
    },

    // Brand-specific seed for consistent random generation
    getBrandSeed(brandId) {
        let seed = 0;
        for (let i = 0; i < brandId.length; i++) {
            seed = ((seed << 5) - seed) + brandId.charCodeAt(i);
            seed = seed & seed;
        }
        return Math.abs(seed);
    },

    // Seeded random number generator
    seededRandom(seed) {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    },

    render() {
        // Get current brand info
        const currentBrandId = typeof APIData !== 'undefined' ? APIData.currentBrand : 'apple';
        const brand = typeof APIData !== 'undefined' ? APIData.brands[currentBrandId] : null;
        const brandName = brand ? brand.name : 'Your Brand';

        // Generate influencers if not already generated for this brand
        if (this.influencers.length === 0 || this.currentBrand !== currentBrandId) {
            this.currentBrand = currentBrandId;
            this.generateBrandInfluencers();
        }

        // Generate dynamic stat changes based on brand seed
        const seed = this.getBrandSeed(currentBrandId);
        const newInfluencers = Math.floor(1 + this.seededRandom(seed + 100) * 5);
        const reachChange = (5 + this.seededRandom(seed + 101) * 15).toFixed(1);
        const engagementChange = (1 + this.seededRandom(seed + 102) * 4).toFixed(1);
        const mentionsChange = (3 + this.seededRandom(seed + 103) * 12).toFixed(1);

        // Calculate stats
        const totalInfluencers = this.influencers.length;
        const totalReach = this.influencers.reduce((sum, i) => sum + i.reach, 0);
        const avgEngagement = totalInfluencers > 0 ? (this.influencers.reduce((sum, i) => sum + i.engagement, 0) / totalInfluencers).toFixed(1) : '0.0';
        const totalMentions = this.influencers.reduce((sum, i) => sum + i.mentions, 0);

        return `
            <div class="influencers-page">
                <!-- Header Section -->
                <div class="influencer-page-hero">
                    <div class="hero-bg-shapes">
                        <div class="hero-shape shape-1"></div>
                        <div class="hero-shape shape-2"></div>
                        <div class="hero-shape shape-3"></div>
                    </div>
                    <div class="hero-content">
                        <div class="hero-icon-box">
                            <span class="material-icons">groups</span>
                        </div>
                        <div class="hero-text">
                            <h1>Influencers for <span class="brand-highlight">${brandName}</span></h1>
                            <p>Discover and connect with top influencers mentioning your brand</p>
                        </div>
                    </div>
                </div>
                <div class="influencers-header">
                    <div class="header-stats">
                        <div class="stat-card influencer-vibrant-card influencer-purple">
                            <div class="influencer-card-bg">
                                <div class="influencer-circle circle-1"></div>
                                <div class="influencer-circle circle-2"></div>
                                <div class="influencer-circle circle-3"></div>
                                <div class="influencer-circle circle-4"></div>
                                <div class="influencer-circle circle-5"></div>
                            </div>
                            <div class="stat-icon">
                                <span class="material-icons">people</span>
                            </div>
                            <div class="stat-content">
                                <div class="stat-label">Total Influencers</div>
                                <div class="stat-value">${totalInfluencers}</div>
                                <div class="stat-change positive">+${newInfluencers} this week</div>
                            </div>
                        </div>
                        <div class="stat-card influencer-vibrant-card influencer-green">
                            <div class="influencer-card-bg">
                                <div class="influencer-circle circle-1"></div>
                                <div class="influencer-circle circle-2"></div>
                                <div class="influencer-circle circle-3"></div>
                                <div class="influencer-circle circle-4"></div>
                                <div class="influencer-circle circle-5"></div>
                            </div>
                            <div class="stat-icon">
                                <span class="material-icons">visibility</span>
                            </div>
                            <div class="stat-content">
                                <div class="stat-label">Total Reach</div>
                                <div class="stat-value">${Utils.formatNumber(totalReach)}</div>
                                <div class="stat-change positive">+${reachChange}%</div>
                            </div>
                        </div>
                        <div class="stat-card influencer-vibrant-card influencer-orange">
                            <div class="influencer-card-bg">
                                <div class="influencer-circle circle-1"></div>
                                <div class="influencer-circle circle-2"></div>
                                <div class="influencer-circle circle-3"></div>
                                <div class="influencer-circle circle-4"></div>
                                <div class="influencer-circle circle-5"></div>
                            </div>
                            <div class="stat-icon">
                                <span class="material-icons">trending_up</span>
                            </div>
                            <div class="stat-content">
                                <div class="stat-label">Avg. Engagement</div>
                                <div class="stat-value">${avgEngagement}%</div>
                                <div class="stat-change positive">+${engagementChange}%</div>
                            </div>
                        </div>
                        <div class="stat-card influencer-vibrant-card influencer-pink">
                            <div class="influencer-card-bg">
                                <div class="influencer-circle circle-1"></div>
                                <div class="influencer-circle circle-2"></div>
                                <div class="influencer-circle circle-3"></div>
                                <div class="influencer-circle circle-4"></div>
                                <div class="influencer-circle circle-5"></div>
                            </div>
                            <div class="stat-icon">
                                <span class="material-icons">campaign</span>
                            </div>
                            <div class="stat-content">
                                <div class="stat-label">Total Mentions</div>
                                <div class="stat-value">${totalMentions}</div>
                                <div class="stat-change positive">+${mentionsChange}%</div>
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
                        <div class="custom-dropdown" id="sortDropdown">
                            <button class="dropdown-toggle" id="dropdownToggle">
                                <span class="dropdown-text">Influence Score (High to Low)</span>
                                <span class="material-icons dropdown-arrow">expand_more</span>
                            </button>
                            <div class="dropdown-menu" id="dropdownMenu">
                                <div class="dropdown-item active" data-value="influence-desc">Influence Score (High to Low)</div>
                                <div class="dropdown-item" data-value="influence-asc">Influence Score (Low to High)</div>
                                <div class="dropdown-item" data-value="followers-desc">Followers (High to Low)</div>
                                <div class="dropdown-item" data-value="followers-asc">Followers (Low to High)</div>
                                <div class="dropdown-item" data-value="engagement-desc">Engagement (High to Low)</div>
                                <div class="dropdown-item" data-value="engagement-asc">Engagement (Low to High)</div>
                                <div class="dropdown-item" data-value="mentions-desc">Mentions (High to Low)</div>
                                <div class="dropdown-item" data-value="mentions-asc">Mentions (Low to High)</div>
                            </div>
                        </div>
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

                <!-- Add Influencer Modal -->
                <div class="modal-overlay" id="addInfluencerModal" style="display: none;">
                    <div class="modal-content add-influencer-modal">
                        <div class="modal-header">
                            <h3><span class="material-icons" style="vertical-align: middle; margin-right: 8px;">person_add</span>Add New Influencer</h3>
                            <button class="modal-close" onclick="Influencers.closeAddModal()">
                                <span class="material-icons">close</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form id="addInfluencerForm" class="add-influencer-form">
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="influencerName">Full Name *</label>
                                        <input type="text" id="influencerName" name="name" placeholder="e.g. John Smith" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="influencerHandle">Handle *</label>
                                        <input type="text" id="influencerHandle" name="handle" placeholder="e.g. @johnsmith" required>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="influencerPlatform">Platform *</label>
                                        <select id="influencerPlatform" name="platform" required>
                                            <option value="">Select Platform</option>
                                            <option value="twitter">Twitter/X</option>
                                            <option value="linkedin">LinkedIn</option>
                                            <option value="instagram">Instagram</option>
                                            <option value="facebook">Facebook</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="influencerTier">Tier *</label>
                                        <select id="influencerTier" name="tier" required>
                                            <option value="">Select Tier</option>
                                            <option value="tier1">Tier 1 (1M+ followers)</option>
                                            <option value="tier2">Tier 2 (100K-1M followers)</option>
                                            <option value="tier3">Tier 3 (<100K followers)</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="influencerFollowers">Followers *</label>
                                        <input type="number" id="influencerFollowers" name="followers" placeholder="e.g. 50000" min="0" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="influencerEngagement">Engagement Rate (%)</label>
                                        <input type="number" id="influencerEngagement" name="engagement" placeholder="e.g. 5.5" min="0" max="100" step="0.1">
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="influencerReach">Estimated Reach</label>
                                        <input type="number" id="influencerReach" name="reach" placeholder="e.g. 100000" min="0">
                                    </div>
                                    <div class="form-group">
                                        <label for="influencerInfluence">Influence Score (0-100)</label>
                                        <input type="number" id="influencerInfluence" name="influence" placeholder="e.g. 75" min="0" max="100">
                                    </div>
                                </div>
                                <div class="form-group full-width">
                                    <label for="influencerTopics">Topics (comma separated)</label>
                                    <input type="text" id="influencerTopics" name="topics" placeholder="e.g. Technology, AI, Innovation">
                                </div>
                                <div class="form-group full-width">
                                    <label class="checkbox-label">
                                        <input type="checkbox" id="influencerVerified" name="verified">
                                        <span>Verified Account</span>
                                    </label>
                                </div>
                                <div class="form-actions">
                                    <button type="button" class="btn-cancel" onclick="Influencers.closeAddModal()">Cancel</button>
                                    <button type="submit" class="btn-submit">
                                        <span class="material-icons">add</span>
                                        Add Influencer
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    init() {
        console.log('Influencers module initialized');
        this.currentBrand = typeof APIData !== 'undefined' ? APIData.currentBrand : 'apple';
        this.addInfluencerCircleStyles();
        this.generateBrandInfluencers();
        this.loadInfluencers();
        this.attachEventListeners();

        // Phase 4: replace generated influencers with live API data when available.
        this.loadLiveData();
    },

    async loadLiveData() {
        if (typeof window.API === 'undefined') return;
        const slug = this.currentBrand || 'apple';
        try {
            const { influencers } = await window.API.influencers.list({ brand: slug, limit: 50 });
            if (!Array.isArray(influencers) || !influencers.length) return;
            // Normalize shape so the existing renderers keep working.
            this.influencers = influencers.map((i) => ({
                ...i,
                image: i.avatarUrl ?? i.image,
                avatar: i.avatar ?? (i.name || '?').split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase(),
                lastMention: i.lastMentionAt ? new Date(i.lastMentionAt) : (i.lastMention ?? null),
            }));
            // Make sure the pinned cache is up to date before re-rendering.
            if (window.PinnedInfluencers && !window.PinnedInfluencers.getAll().length) {
                await window.PinnedInfluencers.init();
            }
            this.loadInfluencers();
            console.log(`✓ Influencers hydrated from API (${this.influencers.length})`);
        } catch (err) {
            console.warn('Influencers live data unavailable, using mock fallback:', err.message);
        }
    },

    addInfluencerCircleStyles() {
        // Remove existing styles if present
        const existingStyles = document.getElementById('influencer-circle-styles');
        if (existingStyles) existingStyles.remove();

        const styles = document.createElement('style');
        styles.id = 'influencer-circle-styles';
        styles.textContent = `
            /* Hero Header Section */
            .influencer-page-hero {
                position: relative !important;
                background: white !important;
                border-radius: 16px !important;
                padding: 24px 28px !important;
                margin-bottom: 24px !important;
                overflow: hidden !important;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06) !important;
                border: 1px solid #e5e7eb !important;
            }

            .influencer-page-hero .hero-bg-shapes {
                display: none !important;
            }

            .influencer-page-hero .hero-content {
                position: relative !important;
                z-index: 2 !important;
                display: flex !important;
                align-items: center !important;
                gap: 18px !important;
            }

            .influencer-page-hero .hero-icon-box {
                width: 56px !important;
                height: 56px !important;
                background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important;
                border-radius: 14px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                flex-shrink: 0 !important;
                box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3) !important;
            }

            .influencer-page-hero .hero-icon-box .material-icons {
                font-size: 28px !important;
                color: white !important;
            }

            .influencer-page-hero .hero-text h1 {
                font-size: 1.5rem !important;
                font-weight: 700 !important;
                color: #1e293b !important;
                margin: 0 0 4px 0 !important;
            }

            .influencer-page-hero .hero-text .brand-highlight {
                color: #6366f1 !important;
                font-weight: 700 !important;
            }

            .influencer-page-hero .hero-text p {
                font-size: 0.95rem !important;
                color: #64748b !important;
                margin: 0 !important;
            }

            /* Hide original header title */
            .influencers-header .header-title {
                display: none !important;
            }

            /* Enhanced Controls Section */
            .influencers-controls {
                background: white !important;
                border-radius: 16px !important;
                padding: 20px 24px !important;
                margin-bottom: 24px !important;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06) !important;
                border: 1px solid #e5e7eb !important;
                display: flex !important;
                justify-content: space-between !important;
                align-items: center !important;
                flex-wrap: wrap !important;
                gap: 16px !important;
            }

            .influencers-controls .filter-chips {
                display: flex !important;
                gap: 10px !important;
                flex-wrap: wrap !important;
            }

            .influencers-controls .filter-chip {
                display: flex !important;
                align-items: center !important;
                gap: 6px !important;
                padding: 10px 18px !important;
                border-radius: 25px !important;
                border: 2px solid #e5e7eb !important;
                background: white !important;
                color: #64748b !important;
                font-size: 0.9rem !important;
                font-weight: 500 !important;
                cursor: pointer !important;
                transition: all 0.2s ease !important;
            }

            .influencers-controls .filter-chip:hover {
                border-color: #6366f1 !important;
                color: #6366f1 !important;
                background: #f5f3ff !important;
            }

            .influencers-controls .filter-chip.active {
                background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important;
                border-color: transparent !important;
                color: white !important;
                box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3) !important;
            }

            .influencers-controls .filter-chip .material-icons {
                font-size: 18px !important;
            }

            .influencers-controls .control-actions {
                display: flex !important;
                gap: 12px !important;
                align-items: center !important;
                flex-wrap: wrap !important;
            }

            /* Custom Dropdown with Curved Corners */
            .custom-dropdown {
                position: relative !important;
                min-width: 260px !important;
            }

            .custom-dropdown .dropdown-toggle {
                display: flex !important;
                align-items: center !important;
                justify-content: space-between !important;
                width: 100% !important;
                padding: 12px 16px !important;
                border-radius: 12px !important;
                border: 2px solid #e5e7eb !important;
                background: white !important;
                font-size: 0.9rem !important;
                font-weight: 500 !important;
                color: #1e293b !important;
                cursor: pointer !important;
                transition: all 0.2s ease !important;
            }

            .custom-dropdown .dropdown-toggle:hover {
                border-color: #6366f1 !important;
                color: #6366f1 !important;
                background: #f5f3ff !important;
            }

            .custom-dropdown.open .dropdown-toggle {
                border-color: #6366f1 !important;
                box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15) !important;
            }

            .custom-dropdown .dropdown-arrow {
                font-size: 20px !important;
                color: #6366f1 !important;
                transition: transform 0.2s ease !important;
            }

            .custom-dropdown.open .dropdown-arrow {
                transform: rotate(180deg) !important;
            }

            .custom-dropdown .dropdown-menu {
                position: absolute !important;
                top: calc(100% + 8px) !important;
                left: 0 !important;
                right: 0 !important;
                background: white !important;
                border-radius: 16px !important;
                border: 1px solid #e5e7eb !important;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12) !important;
                z-index: 1000 !important;
                opacity: 0 !important;
                visibility: hidden !important;
                transform: translateY(-10px) !important;
                transition: all 0.2s ease !important;
                overflow: hidden !important;
            }

            .custom-dropdown.open .dropdown-menu {
                opacity: 1 !important;
                visibility: visible !important;
                transform: translateY(0) !important;
            }

            .custom-dropdown .dropdown-item {
                padding: 12px 18px !important;
                font-size: 0.9rem !important;
                font-weight: 500 !important;
                color: #1e293b !important;
                cursor: pointer !important;
                transition: all 0.15s ease !important;
            }

            .custom-dropdown .dropdown-item:hover {
                background: #f5f3ff !important;
                color: #6366f1 !important;
            }

            .custom-dropdown .dropdown-item.active {
                background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important;
                color: white !important;
            }

            .custom-dropdown .dropdown-item:first-child {
                border-radius: 16px 16px 0 0 !important;
            }

            .custom-dropdown .dropdown-item:last-child {
                border-radius: 0 0 16px 16px !important;
            }

            .custom-dropdown .dropdown-item:only-child {
                border-radius: 16px !important;
            }

            /* Enhanced Buttons */
            .influencers-controls .btn-primary {
                display: flex !important;
                align-items: center !important;
                gap: 8px !important;
                padding: 12px 20px !important;
                border-radius: 12px !important;
                border: 2px solid #e5e7eb !important;
                background: white !important;
                color: #64748b !important;
                font-size: 0.9rem !important;
                font-weight: 600 !important;
                cursor: pointer !important;
                transition: all 0.2s ease !important;
                box-shadow: none !important;
            }

            .influencers-controls .btn-primary:hover {
                border-color: #6366f1 !important;
                color: #6366f1 !important;
                background: #f5f3ff !important;
            }

            .influencers-controls .btn-primary .material-icons {
                font-size: 20px !important;
            }

            .influencers-controls .btn-secondary {
                display: flex !important;
                align-items: center !important;
                gap: 8px !important;
                padding: 12px 20px !important;
                border-radius: 12px !important;
                border: 2px solid #e5e7eb !important;
                background: white !important;
                color: #64748b !important;
                font-size: 0.9rem !important;
                font-weight: 600 !important;
                cursor: pointer !important;
                transition: all 0.2s ease !important;
            }

            .influencers-controls .btn-secondary:hover {
                border-color: #6366f1 !important;
                color: #6366f1 !important;
                background: #f5f3ff !important;
            }

            .influencers-controls .btn-secondary .material-icons {
                font-size: 20px !important;
            }

            /* Vibrant stat cards for Influencers page */
            .influencers-header .stat-card.influencer-vibrant-card {
                position: relative !important;
                overflow: hidden !important;
                border: none !important;
                color: white !important;
                min-height: 140px !important;
            }

            .influencers-header .stat-card.influencer-vibrant-card .stat-content {
                position: relative !important;
                z-index: 2 !important;
            }

            .influencers-header .stat-card.influencer-vibrant-card .stat-label {
                color: rgba(255, 255, 255, 0.9) !important;
                font-weight: 500 !important;
            }

            .influencers-header .stat-card.influencer-vibrant-card .stat-value {
                color: white !important;
                font-size: 2rem !important;
                font-weight: 700 !important;
            }

            .influencers-header .stat-card.influencer-vibrant-card .stat-change {
                background: rgba(255, 255, 255, 0.2) !important;
                color: white !important;
                padding: 4px 10px !important;
                border-radius: 20px !important;
                font-size: 0.8rem !important;
                font-weight: 600 !important;
                display: inline-block !important;
                margin-top: 8px !important;
            }

            .influencers-header .stat-card.influencer-vibrant-card .stat-icon {
                position: absolute !important;
                top: 16px !important;
                right: 16px !important;
                width: 50px !important;
                height: 50px !important;
                border-radius: 12px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                background: rgba(255, 255, 255, 0.2) !important;
                z-index: 2 !important;
            }

            .influencers-header .stat-card.influencer-vibrant-card .stat-icon .material-icons {
                color: white !important;
                font-size: 24px !important;
            }

            /* Card gradient backgrounds */
            .influencers-header .stat-card.influencer-vibrant-card.influencer-purple {
                background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important;
            }

            .influencers-header .stat-card.influencer-vibrant-card.influencer-green {
                background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
            }

            .influencers-header .stat-card.influencer-vibrant-card.influencer-orange {
                background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%) !important;
            }

            .influencers-header .stat-card.influencer-vibrant-card.influencer-pink {
                background: linear-gradient(135deg, #ec4899 0%, #db2777 100%) !important;
            }

            /* Background container for circles */
            .influencer-card-bg {
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
            .influencers-header .influencer-vibrant-card .influencer-circle {
                position: absolute !important;
                border-radius: 50% !important;
                pointer-events: none !important;
                background: rgba(255, 255, 255, 0.2) !important;
                opacity: 0.25 !important;
            }

            /* Large circle - top right */
            .influencers-header .influencer-vibrant-card .influencer-circle.circle-1 {
                width: 140px !important;
                height: 140px !important;
                top: -50px !important;
                right: -50px !important;
                background: rgba(255, 255, 255, 0.25) !important;
                animation: influencerFloat 5s ease-in-out infinite, influencerPulse 4s ease-in-out infinite !important;
            }

            /* Medium circle - bottom left */
            .influencers-header .influencer-vibrant-card .influencer-circle.circle-2 {
                width: 100px !important;
                height: 100px !important;
                bottom: -30px !important;
                left: -30px !important;
                background: rgba(255, 255, 255, 0.2) !important;
                animation: influencerFloat 6s ease-in-out infinite, influencerPulse 5s ease-in-out infinite !important;
                animation-delay: -2s, -1s !important;
            }

            /* Small circle - center right */
            .influencers-header .influencer-vibrant-card .influencer-circle.circle-3 {
                width: 70px !important;
                height: 70px !important;
                top: 35% !important;
                right: 15% !important;
                background: rgba(255, 255, 255, 0.18) !important;
                animation: influencerFloat 5.5s ease-in-out infinite, influencerPulse 6s ease-in-out infinite !important;
                animation-delay: -3s, -2s !important;
            }

            /* Extra small circle - top left */
            .influencers-header .influencer-vibrant-card .influencer-circle.circle-4 {
                width: 50px !important;
                height: 50px !important;
                top: 20px !important;
                left: 20% !important;
                background: rgba(255, 255, 255, 0.15) !important;
                animation: influencerFloat 7s ease-in-out infinite, influencerPulse 5.5s ease-in-out infinite !important;
                animation-delay: -1s, -0.5s !important;
            }

            /* Medium circle - bottom right */
            .influencers-header .influencer-vibrant-card .influencer-circle.circle-5 {
                width: 80px !important;
                height: 80px !important;
                bottom: 0 !important;
                right: 5% !important;
                background: rgba(255, 255, 255, 0.12) !important;
                animation: influencerFloat 8s ease-in-out infinite, influencerPulse 6.5s ease-in-out infinite !important;
                animation-delay: -4s, -3s !important;
            }

            @keyframes influencerFloat {
                0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
                25% { transform: translate(-8px, 6px) scale(1.08) rotate(4deg); }
                50% { transform: translate(-12px, 10px) scale(1.12) rotate(0deg); }
                75% { transform: translate(-5px, 4px) scale(1.05) rotate(-4deg); }
            }

            @keyframes influencerPulse {
                0%, 100% { opacity: 0.25; }
                50% { opacity: 0.45; }
            }

            /* Add Influencer Modal Styles */
            .add-influencer-modal {
                max-width: 600px !important;
                width: 95% !important;
            }

            .add-influencer-modal .modal-header {
                background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important;
                color: white !important;
                padding: 20px 24px !important;
                border-radius: 16px 16px 0 0 !important;
            }

            .add-influencer-modal .modal-header h3 {
                color: white !important;
                margin: 0 !important;
                font-size: 1.25rem !important;
                display: flex !important;
                align-items: center !important;
            }

            .add-influencer-modal .modal-close {
                background: rgba(255, 255, 255, 0.2) !important;
                border: none !important;
                color: white !important;
                border-radius: 8px !important;
                width: 36px !important;
                height: 36px !important;
                cursor: pointer !important;
                transition: background 0.2s ease !important;
            }

            .add-influencer-modal .modal-close:hover {
                background: rgba(255, 255, 255, 0.3) !important;
            }

            .add-influencer-form {
                padding: 24px !important;
            }

            .add-influencer-form .form-row {
                display: grid !important;
                grid-template-columns: 1fr 1fr !important;
                gap: 16px !important;
                margin-bottom: 16px !important;
            }

            .add-influencer-form .form-group {
                display: flex !important;
                flex-direction: column !important;
                gap: 6px !important;
            }

            .add-influencer-form .form-group.full-width {
                grid-column: span 2 !important;
                margin-bottom: 16px !important;
            }

            .add-influencer-form label {
                font-size: 0.875rem !important;
                font-weight: 600 !important;
                color: #374151 !important;
            }

            .add-influencer-form input,
            .add-influencer-form select {
                padding: 12px 14px !important;
                border: 2px solid #e5e7eb !important;
                border-radius: 10px !important;
                font-size: 0.9rem !important;
                color: #1e293b !important;
                background: white !important;
                transition: all 0.2s ease !important;
            }

            .add-influencer-form input:focus,
            .add-influencer-form select:focus {
                outline: none !important;
                border-color: #6366f1 !important;
                box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15) !important;
            }

            .add-influencer-form input::placeholder {
                color: #9ca3af !important;
            }

            .add-influencer-form .checkbox-label {
                display: flex !important;
                align-items: center !important;
                gap: 10px !important;
                cursor: pointer !important;
                font-weight: 500 !important;
            }

            .add-influencer-form .checkbox-label input[type="checkbox"] {
                width: 20px !important;
                height: 20px !important;
                accent-color: #6366f1 !important;
                cursor: pointer !important;
            }

            .add-influencer-form .form-actions {
                display: flex !important;
                justify-content: flex-end !important;
                gap: 12px !important;
                margin-top: 24px !important;
                padding-top: 20px !important;
                border-top: 1px solid #e5e7eb !important;
            }

            .add-influencer-form .btn-cancel {
                padding: 12px 24px !important;
                border: 2px solid #e5e7eb !important;
                background: white !important;
                color: #64748b !important;
                border-radius: 10px !important;
                font-size: 0.9rem !important;
                font-weight: 600 !important;
                cursor: pointer !important;
                transition: all 0.2s ease !important;
            }

            .add-influencer-form .btn-cancel:hover {
                border-color: #6366f1 !important;
                color: #6366f1 !important;
                background: #f5f3ff !important;
            }

            .add-influencer-form .btn-submit {
                display: flex !important;
                align-items: center !important;
                gap: 8px !important;
                padding: 12px 24px !important;
                border: none !important;
                background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important;
                color: white !important;
                border-radius: 10px !important;
                font-size: 0.9rem !important;
                font-weight: 600 !important;
                cursor: pointer !important;
                transition: all 0.2s ease !important;
                box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25) !important;
            }

            .add-influencer-form .btn-submit:hover {
                transform: translateY(-2px) !important;
                box-shadow: 0 6px 16px rgba(99, 102, 241, 0.35) !important;
            }

            .add-influencer-form .btn-submit .material-icons {
                font-size: 18px !important;
            }

            @media (max-width: 600px) {
                .add-influencer-form .form-row {
                    grid-template-columns: 1fr !important;
                }

                .add-influencer-form .form-group.full-width {
                    grid-column: span 1 !important;
                }
            }

            /* Avatar Image Styles */
            .influencer-avatar.has-image {
                background: transparent !important;
                padding: 0 !important;
                overflow: hidden !important;
            }

            .influencer-avatar .avatar-image {
                width: 100% !important;
                height: 100% !important;
                object-fit: cover !important;
                border-radius: inherit !important;
            }

            .influencer-card .influencer-avatar {
                width: 80px !important;
                height: 80px !important;
                border-radius: 16px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                font-size: 1.5rem !important;
                font-weight: 700 !important;
                color: white !important;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
            }

            /* Detail modal avatar with image */
            .detail-avatar.has-image {
                background: transparent !important;
                padding: 0 !important;
                overflow: hidden !important;
            }

            .detail-avatar .avatar-image {
                width: 100% !important;
                height: 100% !important;
                object-fit: cover !important;
                border-radius: inherit !important;
            }

            /* Action Button Styles */
            .influencers-page .influencer-card .influencer-actions .action-btn {
                width: 36px !important;
                height: 36px !important;
                border-radius: 50% !important;
                border: 1px solid #e5e7eb !important;
                background: white !important;
                cursor: pointer !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                transition: all 0.2s ease !important;
                transform: none !important;
            }

            .influencers-page .influencer-card .influencer-actions .action-btn .material-icons {
                font-size: 18px !important;
                color: #64748b !important;
                transition: color 0.2s ease !important;
            }

            .influencers-page .influencer-card .influencer-actions .action-btn:hover {
                border-color: #6366f1 !important;
                background: #f5f3ff !important;
                transform: none !important;
            }

            .influencers-page .influencer-card .influencer-actions .action-btn:hover .material-icons {
                color: #6366f1 !important;
            }
        `;
        document.head.appendChild(styles);
    },

    generateBrandInfluencers() {
        // Generate brand-specific influencer data
        const brandId = this.currentBrand || 'apple';
        const brand = typeof APIData !== 'undefined' ? APIData.brands[brandId] : null;
        const industry = brand ? brand.industry : 'technology';
        const brandName = brand ? brand.name : 'Brand';

        // Get seed for consistent random generation per brand
        const seed = this.getBrandSeed(brandId);

        // Get industry topics
        const topics = this.industryTopics[industry] || this.industryTopics.technology;

        // Platforms with weights
        const platforms = ['twitter', 'linkedin', 'instagram', 'twitter', 'linkedin', 'instagram', 'facebook'];

        // Generate 7-10 influencers based on brand
        const numInfluencers = 7 + Math.floor(this.seededRandom(seed) * 4);
        const newInfluencers = [];

        // Shuffle and select from pool based on brand seed
        const femalePool = [...this.influencerPool.female];
        const malePool = [...this.influencerPool.male];

        // Shuffle pools based on seed
        for (let i = femalePool.length - 1; i > 0; i--) {
            const j = Math.floor(this.seededRandom(seed + i) * (i + 1));
            [femalePool[i], femalePool[j]] = [femalePool[j], femalePool[i]];
        }
        for (let i = malePool.length - 1; i > 0; i--) {
            const j = Math.floor(this.seededRandom(seed + i + 100) * (i + 1));
            [malePool[i], malePool[j]] = [malePool[j], malePool[i]];
        }

        for (let i = 0; i < numInfluencers; i++) {
            const localSeed = seed + i * 17;

            // Alternate between male and female
            const isFemale = i % 2 === 0;
            const pool = isFemale ? femalePool : malePool;
            const poolIndex = Math.floor(i / 2) % pool.length;
            const template = pool[poolIndex];

            // Determine tier based on position and randomness
            let tier;
            if (i < 2) tier = 'tier1';
            else if (i < 5) tier = 'tier2';
            else tier = 'tier3';

            // Generate stats based on tier and seed
            const tierMultiplier = tier === 'tier1' ? 1 : tier === 'tier2' ? 0.5 : 0.2;
            const variance = 0.7 + this.seededRandom(localSeed + 1) * 0.6;

            // Followers must land inside the tier's labeled range
            // tier1: 1M–10M, tier2: 100K–1M, tier3: 10K–100K
            const tierRange = tier === 'tier1'
                ? { min: 1_000_000, max: 10_000_000 }
                : tier === 'tier2'
                    ? { min: 100_000, max: 1_000_000 }
                    : { min: 10_000, max: 100_000 };
            const followers = Math.round(tierRange.min + this.seededRandom(localSeed + 2) * (tierRange.max - tierRange.min));
            const engagement = parseFloat((5 + this.seededRandom(localSeed + 3) * 12).toFixed(1));
            const reach = Math.round(followers * (1.2 + this.seededRandom(localSeed + 4) * 0.8));
            const mentions = Math.round((20 + this.seededRandom(localSeed + 5) * 100) * tierMultiplier);
            const sentiment = Math.round(65 + this.seededRandom(localSeed + 6) * 30);
            const influence = Math.round((50 + this.seededRandom(localSeed + 7) * 45) * (tier === 'tier1' ? 1.1 : tier === 'tier2' ? 0.9 : 0.7));

            // Get platform based on seed
            const platformIndex = Math.floor(this.seededRandom(localSeed + 8) * platforms.length);
            const platform = platforms[platformIndex];

            // Get topics based on seed
            const topicIndices = [
                Math.floor(this.seededRandom(localSeed + 9) * topics.length),
                Math.floor(this.seededRandom(localSeed + 10) * topics.length),
                Math.floor(this.seededRandom(localSeed + 11) * topics.length)
            ];
            const influencerTopics = [...new Set(topicIndices.map(idx => topics[idx]))].slice(0, 3);

            // Add brand name to some topics
            if (this.seededRandom(localSeed + 12) > 0.5) {
                influencerTopics[0] = brandName;
            }

            // Generate avatar initials
            const nameParts = template.name.split(' ');
            const avatar = nameParts[0][0] + nameParts[nameParts.length - 1][0];

            newInfluencers.push({
                id: i + 1,
                name: template.name,
                handle: '@' + template.handle,
                avatar: avatar,
                image: template.image,
                platform: platform,
                tier: tier,
                followers: followers,
                engagement: engagement,
                reach: reach,
                mentions: mentions,
                sentiment: sentiment,
                influence: Math.min(influence, 99),
                topics: influencerTopics,
                verified: tier === 'tier1' || (tier === 'tier2' && this.seededRandom(localSeed + 13) > 0.5),
                lastMention: new Date(Date.now() - Math.floor(this.seededRandom(localSeed + 14) * 86400000 * 3))
            });
        }

        // Sort by influence descending
        newInfluencers.sort((a, b) => b.influence - a.influence);

        // Update IDs after sorting
        newInfluencers.forEach((inf, idx) => inf.id = idx + 1);

        this.influencers = newInfluencers;
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

        // Update hero header title
        const heroTitle = document.querySelector('.influencer-page-hero .hero-text h1');
        if (heroTitle && brand) {
            heroTitle.innerHTML = `Influencers for <span class="brand-highlight">${brand.name}</span>`;
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

        // Custom Sort dropdown
        const dropdown = document.getElementById('sortDropdown');
        const dropdownToggle = document.getElementById('dropdownToggle');
        const dropdownMenu = document.getElementById('dropdownMenu');

        if (dropdown && dropdownToggle && dropdownMenu) {
            // Toggle dropdown
            dropdownToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdown.classList.toggle('open');
            });

            // Handle item selection
            dropdownMenu.querySelectorAll('.dropdown-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    const value = item.dataset.value;
                    const text = item.textContent;

                    // Update selected text
                    dropdownToggle.querySelector('.dropdown-text').textContent = text;

                    // Update active state
                    dropdownMenu.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('active'));
                    item.classList.add('active');

                    // Close dropdown
                    dropdown.classList.remove('open');

                    // Update sort
                    this.currentSort = value;
                    this.loadInfluencers();
                });
            });

            // Close on outside click
            document.addEventListener('click', (e) => {
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove('open');
                }
            });

            // Set initial active state based on currentSort
            const activeItem = dropdownMenu.querySelector(`[data-value="${this.currentSort}"]`);
            if (activeItem) {
                dropdownMenu.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('active'));
                activeItem.classList.add('active');
                dropdownToggle.querySelector('.dropdown-text').textContent = activeItem.textContent;
            }
        }

        // Add influencer
        const addBtn = document.getElementById('addInfluencer');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                this.openAddModal();
            });
        }

        // Add influencer form submission
        const addForm = document.getElementById('addInfluencerForm');
        if (addForm) {
            addForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleAddInfluencer(e.target);
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

        // Move pinned influencers to the top (preserving the sorted order inside each group)
        const pinnedIds = new Set((window.PinnedInfluencers?.getAll() || []).map(p => p.id));
        const pinned = filtered.filter(i => pinnedIds.has(i.id));
        const unpinned = filtered.filter(i => !pinnedIds.has(i.id));
        filtered = [...pinned, ...unpinned];

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

        const avatarContent = influencer.image
            ? `<img src="${influencer.image}" alt="${influencer.name}" class="avatar-image">`
            : influencer.avatar;

        const isPinned = window.PinnedInfluencers?.isPinned(influencer.id);

        return `
            <div class="influencer-card ${isPinned ? 'is-pinned' : ''}" data-id="${influencer.id}">
                ${isPinned ? `
                <div class="pin-indicator-top" title="Pinned to Dashboard">
                    <span class="material-icons">push_pin</span>
                </div>` : ''}
                <div class="influencer-card-header">
                    <div class="influencer-avatar ${influencer.image ? 'has-image' : ''}" style="${!influencer.image ? `background: linear-gradient(135deg, #${this.getColorHash(influencer.id)} 0%, #${this.getColorHash(influencer.id + 100)} 100%);` : ''}">
                        ${avatarContent}
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
                        <button class="action-btn pin-btn ${isPinned ? 'is-pinned' : ''}" data-influencer-id="${influencer.id}" title="${isPinned ? 'Unpin from Dashboard' : 'Pin to Dashboard'}" onclick="event.stopPropagation(); Influencers.togglePin('${influencer.id}', this)">
                            <span class="material-icons">push_pin</span>
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

    async togglePin(id, btnEl, updateLabel = false) {
        const influencer = this.influencers.find(i => i.id === id);
        if (!influencer) return;

        // Optimistic: cache updates + event fires synchronously inside toggle().
        const wasPinned = window.PinnedInfluencers.isPinned(id);
        let nowPinned = !wasPinned;

        try {
            nowPinned = await window.PinnedInfluencers.toggle(influencer);
        } catch (err) {
            if (typeof Notifications !== 'undefined') {
                Notifications.error(`Could not ${wasPinned ? 'unpin' : 'pin'} ${influencer.name}`);
            }
            this.loadInfluencers();
            return;
        }

        if (updateLabel && btnEl) {
            btnEl.classList.toggle('is-pinned', nowPinned);
            const label = btnEl.querySelector('.pin-label');
            if (label) label.textContent = nowPinned ? 'Pinned to Dashboard' : 'Pin to Dashboard';
        }

        if (typeof Notifications !== 'undefined') {
            Notifications.success(nowPinned
                ? `${influencer.name} pinned to Dashboard`
                : `${influencer.name} unpinned from Dashboard`);
        }

        // Re-render the grid so pinned cards bubble to the top
        this.loadInfluencers();
    },

    showDetails(id) {
        const influencer = this.influencers.find(i => i.id === id);
        if (!influencer) return;

        const modal = document.getElementById('influencerModal');
        const details = document.getElementById('influencerDetails');
        
        if (!modal || !details) return;

        const detailAvatarContent = influencer.image
            ? `<img src="${influencer.image}" alt="${influencer.name}" class="avatar-image">`
            : influencer.avatar;

        details.innerHTML = `
            <div class="influencer-detail-header">
                <div class="detail-avatar ${influencer.image ? 'has-image' : ''}" style="${!influencer.image ? `background: linear-gradient(135deg, #${this.getColorHash(influencer.id)} 0%, #${this.getColorHash(influencer.id + 100)} 100%);` : ''}">
                    ${detailAvatarContent}
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
                <button class="btn-primary pin-action-btn ${window.PinnedInfluencers.isPinned(influencer.id) ? 'is-pinned' : ''}" onclick="Influencers.togglePin('${influencer.id}', this, true)">
                    <span class="material-icons">push_pin</span>
                    <span class="pin-label">${window.PinnedInfluencers.isPinned(influencer.id) ? 'Pinned to Dashboard' : 'Pin to Dashboard'}</span>
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

    openAddModal() {
        const modal = document.getElementById('addInfluencerModal');
        if (modal) {
            modal.style.display = 'flex';
            // Reset form
            const form = document.getElementById('addInfluencerForm');
            if (form) form.reset();
        }
    },

    closeAddModal() {
        const modal = document.getElementById('addInfluencerModal');
        if (modal) {
            modal.style.display = 'none';
        }
    },

    handleAddInfluencer(form) {
        const formData = new FormData(form);

        // Get form values
        const name = formData.get('name').trim();
        const handle = formData.get('handle').trim();
        const platform = formData.get('platform');
        const tier = formData.get('tier');
        const followers = parseInt(formData.get('followers')) || 0;
        const engagement = parseFloat(formData.get('engagement')) || Math.random() * 10 + 3;
        const reach = parseInt(formData.get('reach')) || Math.round(followers * 1.5);
        const influence = parseInt(formData.get('influence')) || Math.round(50 + Math.random() * 40);
        const topicsStr = formData.get('topics') || '';
        const verified = formData.get('verified') === 'on';

        // Validate required fields
        if (!name || !handle || !platform || !tier) {
            Notifications.error('Please fill in all required fields');
            return;
        }

        // Format handle
        const formattedHandle = handle.startsWith('@') ? handle : '@' + handle;

        // Parse topics
        const topics = topicsStr ? topicsStr.split(',').map(t => t.trim()).filter(t => t) : ['General'];

        // Generate avatar initials
        const nameParts = name.split(' ');
        const avatar = nameParts.length > 1
            ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
            : name.substring(0, 2).toUpperCase();

        // Create new influencer object
        const newInfluencer = {
            id: this.influencers.length + 1 + Date.now(),
            name: name,
            handle: formattedHandle,
            avatar: avatar,
            platform: platform,
            tier: tier,
            followers: followers,
            engagement: parseFloat(engagement.toFixed(1)),
            reach: reach,
            mentions: Math.round(followers / 10000) || 1,
            sentiment: Math.round(70 + Math.random() * 25),
            influence: influence,
            topics: topics.slice(0, 3),
            verified: verified,
            lastMention: new Date()
        };

        // Add to influencers array
        this.influencers.unshift(newInfluencer);

        // Close modal and refresh grid
        this.closeAddModal();
        this.loadInfluencers();
        this.updateHeaderStats();

        // Show success notification
        Notifications.success(`${name} has been added to your influencer list`);
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
