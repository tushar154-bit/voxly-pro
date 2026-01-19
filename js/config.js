/**
 * Voxly Pro - Configuration
 * Central configuration file for the application
 */

const VoxlyConfig = {
    // Application Settings
    app: {
        name: 'Voxly Pro',
        version: '2.0.0',
        environment: 'production', // 'development' | 'production'
        debug: false
    },

    // API Endpoints
    api: {
        baseUrl: 'https://api.voxlypro.com/v1',
        timeout: 30000,
        retryAttempts: 3,
        
        endpoints: {
            twitter: 'https://api.twitter.com/2/',
            reddit: 'https://oauth.reddit.com/',
            youtube: 'https://www.googleapis.com/youtube/v3/',
            linkedin: 'https://api.linkedin.com/v2/',
            facebook: 'https://graph.facebook.com/v18.0/',
            instagram: 'https://graph.instagram.com/v18.0/',
            news: 'https://newsapi.org/v2/',
            reviews: 'https://api.reviewsapi.com/v1/'
        }
    },

    // Platform Configuration
    platforms: [
        { id: 'all', name: 'All Platforms', icon: '🌐', color: '#6366f1' },
        { id: 'twitter', name: 'Twitter', icon: '🐦', color: '#1DA1F2' },
        { id: 'reddit', name: 'Reddit', icon: '🤖', color: '#FF4500' },
        { id: 'youtube', name: 'YouTube', icon: '▶️', color: '#FF0000' },
        { id: 'linkedin', name: 'LinkedIn', icon: '💼', color: '#0077B5' },
        { id: 'facebook', name: 'Facebook', icon: '📘', color: '#1877F2' },
        { id: 'instagram', name: 'Instagram', icon: '📸', color: '#E4405F' },
        { id: 'news', name: 'News', icon: '📰', color: '#4B5563' },
        { id: 'reviews', name: 'Reviews', icon: '⭐', color: '#F59E0B' }
    ],

    // Chart Configuration
    charts: {
        defaultColors: [
            '#6366f1', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444',
            '#ec4899', '#14b8a6', '#f97316', '#84cc16', '#06b6d4'
        ],
        
        animationDuration: 1500,
        animationEasing: 'easeInOutQuart',
        
        responsive: true,
        maintainAspectRatio: false,
        
        defaultFontFamily: 'Inter, -apple-system, sans-serif',
        defaultFontSize: 12
    },

    // Sentiment Configuration
    sentiment: {
        positive: {
            threshold: 70,
            color: '#10b981',
            iconClass: 'icon-happy'
        },
        neutral: {
            threshold: 50,
            color: '#6366f1',
            iconClass: 'icon-neutral'
        },
        negative: {
            threshold: 0,
            color: '#ef4444',
            iconClass: 'icon-sad'
        }
    },

    // Alert Configuration
    alerts: {
        thresholds: {
            volumeSpike: 50, // % increase
            sentimentDrop: 30, // % drop
            crisisTrigger: 40 // negative sentiment %
        },
        
        severityLevels: {
            low: { color: '#f59e0b', icon: '⚠️' },
            medium: { color: '#f97316', icon: '🚨' },
            high: { color: '#ef4444', icon: '🔴' },
            critical: { color: '#dc2626', icon: '💥' }
        },
        
        checkInterval: 60000, // 1 minute
        enabled: true
    },

    // Real-time Configuration
    realtime: {
        enabled: true,
        updateInterval: 5000, // 5 seconds
        maxUpdates: 100,
        autoRefresh: true
    },

    // Export Configuration
    export: {
        formats: ['pdf', 'excel', 'powerpoint'],
        includeBranding: true,
        includeCharts: true,
        includeTimestamp: true,
        
        pdf: {
            format: 'a4',
            orientation: 'portrait',
            quality: 0.95
        },
        
        excel: {
            sheetNames: ['Summary', 'Posts', 'Influencers', 'Trends'],
            includeFormulas: true
        },
        
        powerpoint: {
            slideSize: 'screen16x9',
            theme: 'modern'
        }
    },

    // Storage Configuration
    storage: {
        type: 'localStorage', // 'localStorage' | 'sessionStorage' | 'indexedDB'
        prefix: 'voxly_',
        
        keys: {
            userPreferences: 'user_preferences',
            savedSearches: 'saved_searches',
            dashboardLayout: 'dashboard_layout',
            alertSettings: 'alert_settings'
        },
        
        expirationDays: 30
    },

    // Notification Configuration
    notifications: {
        enabled: true,
        position: 'top-right', // 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
        duration: 3000,
        maxVisible: 5,
        
        types: {
            success: { color: '#10b981', icon: '✓' },
            error: { color: '#ef4444', icon: '✗' },
            warning: { color: '#f59e0b', icon: '⚠' },
            info: { color: '#3b82f6', icon: 'ℹ' }
        }
    },

    // Pagination Configuration
    pagination: {
        defaultPageSize: 20,
        pageSizeOptions: [10, 20, 50, 100],
        showPageSizeSelector: true
    },

    // Date/Time Configuration
    datetime: {
        timezone: 'UTC',
        format: 'YYYY-MM-DD HH:mm:ss',
        displayFormat: 'MMM DD, YYYY',
        
        ranges: [
            { label: 'Last 24 Hours', value: '24h' },
            { label: 'Last 7 Days', value: '7d' },
            { label: 'Last 30 Days', value: '30d' },
            { label: 'Last 90 Days', value: '90d' },
            { label: 'Last Year', value: '1y' },
            { label: 'Custom', value: 'custom' }
        ]
    },

    // Feature Flags
    features: {
        competitorAnalysis: true,
        influencerHub: true,
        trendDiscovery: true,
        realtimeMonitoring: true,
        advancedAnalytics: true,
        reportScheduling: true,
        teamCollaboration: false, // Coming soon
        sentimentAPI: true,
        mlPredictions: false // Coming soon
    },

    // Demo Mode Configuration
    demo: {
        enabled: true,
        sampleBrands: ['google', 'nvidia', 'iphone17'],
        defaultBrand: 'google',
        autoPlayInterval: 10000,
        showDemoBanner: true
    },

    // Performance Configuration
    performance: {
        lazyLoadImages: true,
        virtualScrolling: true,
        debounceDelay: 300,
        throttleDelay: 100,
        
        caching: {
            enabled: true,
            maxAge: 300000 // 5 minutes
        }
    },

    // Security Configuration
    security: {
        apiKeyEncryption: true,
        csrfProtection: true,
        rateLimiting: {
            enabled: true,
            maxRequests: 100,
            windowMs: 60000 // 1 minute
        }
    },

    // Error Handling
    errorHandling: {
        showUserFriendlyMessages: true,
        logErrors: true,
        reportErrors: false, // Send to error tracking service
        fallbackToDemo: true
    }
};

// Freeze configuration to prevent modifications
Object.freeze(VoxlyConfig);

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VoxlyConfig;
}

console.log('⚙️ Voxly Pro Configuration Loaded');
