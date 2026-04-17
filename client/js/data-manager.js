/**
 * DataManager.js - Centralized Data State Management
 * Handles data loading, filtering, caching, and state management
 */

class DataManager {
    constructor() {
        this.data = {
            brands: [],
            mentions: [],
            sentiments: [],
            platforms: [],
            influencers: [],
            trends: [],
            competitors: []
        };
        
        this.filters = {
            platforms: [],
            dateRange: 'last7days',
            sentiment: 'all',
            brands: []
        };
        
        this.cache = new Map();
        this.listeners = new Map();
        this.isLoading = false;
    }

    /**
     * Initialize data manager and load initial data
     */
    async init() {
        try {
            this.isLoading = true;
            await this.loadBrands();
            await this.loadMentions();
            this.isLoading = false;
            this.notify('init', this.data);
        } catch (error) {
            console.error('Error initializing data:', error);
            this.isLoading = false;
            throw error;
        }
    }

    /**
     * Load brands data
     */
    async loadBrands() {
        try {
            const response = await fetch('data/brands.json');
            if (!response.ok) {
                // If file doesn't exist, use mock data
                this.data.brands = this.getMockBrands();
                return;
            }
            this.data.brands = await response.json();
            this.cache.set('brands', this.data.brands);
        } catch (error) {
            console.warn('Using mock brands data:', error);
            this.data.brands = this.getMockBrands();
        }
    }

    /**
     * Load mentions data
     */
    async loadMentions() {
        try {
            const response = await fetch('data/mentions.json');
            if (!response.ok) {
                this.data.mentions = this.getMockMentions();
                return;
            }
            this.data.mentions = await response.json();
            this.cache.set('mentions', this.data.mentions);
        } catch (error) {
            console.warn('Using mock mentions data:', error);
            this.data.mentions = this.getMockMentions();
        }
    }

    /**
     * Get filtered data based on current filters
     * @returns {Object} Filtered data
     */
    getFilteredData() {
        let filteredMentions = [...this.data.mentions];

        // Filter by platforms
        if (this.filters.platforms.length > 0) {
            filteredMentions = filteredMentions.filter(m => 
                this.filters.platforms.includes(m.platform)
            );
        }

        // Filter by sentiment
        if (this.filters.sentiment !== 'all') {
            filteredMentions = filteredMentions.filter(m => 
                m.sentiment === this.filters.sentiment
            );
        }

        // Filter by date range
        const dateRange = this.getDateRange(this.filters.dateRange);
        filteredMentions = filteredMentions.filter(m => {
            const mentionDate = new Date(m.timestamp);
            return mentionDate >= dateRange.start && mentionDate <= dateRange.end;
        });

        return {
            mentions: filteredMentions,
            stats: this.calculateStats(filteredMentions)
        };
    }

    /**
     * Calculate statistics from mentions
     * @param {Array} mentions - Mentions array
     * @returns {Object} Statistics object
     */
    calculateStats(mentions) {
        const total = mentions.length;
        
        const sentimentCounts = mentions.reduce((acc, m) => {
            acc[m.sentiment] = (acc[m.sentiment] || 0) + 1;
            return acc;
        }, {});

        const platformCounts = mentions.reduce((acc, m) => {
            acc[m.platform] = (acc[m.platform] || 0) + 1;
            return acc;
        }, {});

        const totalEngagement = mentions.reduce((sum, m) => 
            sum + (m.likes || 0) + (m.comments || 0) + (m.shares || 0), 0
        );

        const avgSentiment = mentions.length > 0
            ? mentions.reduce((sum, m) => sum + m.sentimentScore, 0) / mentions.length
            : 0;

        return {
            totalMentions: total,
            sentiment: {
                positive: sentimentCounts.positive || 0,
                neutral: sentimentCounts.neutral || 0,
                negative: sentimentCounts.negative || 0,
                avgScore: avgSentiment
            },
            platforms: platformCounts,
            engagement: {
                total: totalEngagement,
                average: total > 0 ? totalEngagement / total : 0
            }
        };
    }

    /**
     * Set filter
     * @param {string} filterType - Filter type
     * @param {*} value - Filter value
     */
    setFilter(filterType, value) {
        this.filters[filterType] = value;
        this.notify('filterChange', this.filters);
    }

    /**
     * Update platform filters
     * @param {Array} platforms - Platform names array
     */
    updatePlatformFilters(platforms) {
        this.filters.platforms = platforms;
        this.notify('filterChange', this.filters);
    }

    /**
     * Clear all filters
     */
    clearFilters() {
        this.filters = {
            platforms: [],
            dateRange: 'last7days',
            sentiment: 'all',
            brands: []
        };
        this.notify('filterChange', this.filters);
    }

    /**
     * Get date range from filter string
     * @param {string} range - Range string (e.g., 'last7days')
     * @returns {Object} Start and end dates
     */
    getDateRange(range) {
        const end = new Date();
        let start = new Date();

        switch (range) {
            case 'today':
                start.setHours(0, 0, 0, 0);
                break;
            case 'yesterday':
                start.setDate(start.getDate() - 1);
                start.setHours(0, 0, 0, 0);
                end.setDate(end.getDate() - 1);
                end.setHours(23, 59, 59, 999);
                break;
            case 'last7days':
                start.setDate(start.getDate() - 7);
                break;
            case 'last30days':
                start.setDate(start.getDate() - 30);
                break;
            case 'last90days':
                start.setDate(start.getDate() - 90);
                break;
            case 'thisMonth':
                start.setDate(1);
                start.setHours(0, 0, 0, 0);
                break;
            case 'lastMonth':
                start.setMonth(start.getMonth() - 1);
                start.setDate(1);
                start.setHours(0, 0, 0, 0);
                end = new Date(start);
                end.setMonth(end.getMonth() + 1);
                end.setDate(0);
                end.setHours(23, 59, 59, 999);
                break;
            default:
                start.setDate(start.getDate() - 7);
        }

        return { start, end };
    }

    /**
     * Subscribe to data changes
     * @param {string} event - Event name
     * @param {Function} callback - Callback function
     * @returns {Function} Unsubscribe function
     */
    subscribe(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(callback);

        // Return unsubscribe function
        return () => {
            const callbacks = this.listeners.get(event);
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        };
    }

    /**
     * Notify listeners of data changes
     * @param {string} event - Event name
     * @param {*} data - Event data
     */
    notify(event, data) {
        if (this.listeners.has(event)) {
            this.listeners.get(event).forEach(callback => callback(data));
        }
    }

    /**
     * Get mock brands data
     * @returns {Array} Mock brands
     */
    getMockBrands() {
        return [
            {
                id: 1,
                name: 'TechCorp',
                industry: 'Technology',
                keywords: ['techcorp', '@techcorp', '#techcorp'],
                active: true
            },
            {
                id: 2,
                name: 'BrandX',
                industry: 'Consumer Goods',
                keywords: ['brandx', '@brandx', '#brandx'],
                active: true
            }
        ];
    }

    /**
     * Get mock mentions data
     * @returns {Array} Mock mentions
     */
    getMockMentions() {
        const platforms = ['Twitter', 'Reddit', 'YouTube', 'LinkedIn', 'Facebook'];
        const sentiments = ['positive', 'neutral', 'negative'];
        const mentions = [];

        for (let i = 0; i < 100; i++) {
            const timestamp = new Date();
            timestamp.setHours(timestamp.getHours() - Math.floor(Math.random() * 168)); // Last 7 days

            const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
            let sentimentScore;
            if (sentiment === 'positive') sentimentScore = 70 + Math.random() * 30;
            else if (sentiment === 'neutral') sentimentScore = 50 + Math.random() * 20;
            else sentimentScore = Math.random() * 50;

            mentions.push({
                id: i + 1,
                platform: platforms[Math.floor(Math.random() * platforms.length)],
                author: `User${i + 1}`,
                content: `This is a sample mention #${i + 1}`,
                timestamp: timestamp.toISOString(),
                sentiment: sentiment,
                sentimentScore: Math.round(sentimentScore),
                likes: Math.floor(Math.random() * 1000),
                comments: Math.floor(Math.random() * 100),
                shares: Math.floor(Math.random() * 50),
                reach: Math.floor(Math.random() * 10000)
            });
        }

        return mentions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }

    /**
     * Export data to JSON
     * @param {string} type - Data type to export
     * @returns {string} JSON string
     */
    exportToJSON(type = 'all') {
        const exportData = type === 'all' ? this.data : this.data[type];
        return JSON.stringify(exportData, null, 2);
    }

    /**
     * Search mentions
     * @param {string} query - Search query
     * @returns {Array} Matching mentions
     */
    search(query) {
        const lowerQuery = query.toLowerCase();
        return this.data.mentions.filter(m => 
            m.content.toLowerCase().includes(lowerQuery) ||
            m.author.toLowerCase().includes(lowerQuery) ||
            m.platform.toLowerCase().includes(lowerQuery)
        );
    }
}

// Create global instance
const DataMgr = new DataManager();

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.DataMgr = DataMgr;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = DataManager;
}
