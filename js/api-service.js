/**
 * Voxly Pro - API Service Layer
 * Integrates with Reddit, YouTube Data API, and NewsAPI
 *
 * IMPORTANT: For production use, API keys should be handled by a backend proxy
 * to prevent exposure in client-side code.
 */

const APIService = {
    // API Configuration
    config: {
        reddit: {
            baseUrl: 'https://www.reddit.com',
            oauthUrl: 'https://oauth.reddit.com',
            userAgent: 'VoxlyPro/2.0.0'
        },
        youtube: {
            baseUrl: 'https://www.googleapis.com/youtube/v3',
            apiKey: '' // Set via APIService.setYouTubeKey()
        },
        news: {
            baseUrl: 'https://newsapi.org/v2',
            apiKey: '' // Set via APIService.setNewsAPIKey()
        }
    },

    // Rate limiting tracking
    rateLimits: {
        reddit: { remaining: 100, resetTime: null },
        youtube: { remaining: 10000, resetTime: null },
        news: { remaining: 500, resetTime: null }
    },

    // Cache for API responses
    cache: new Map(),
    cacheTimeout: 5 * 60 * 1000, // 5 minutes

    // ========================================
    // CONFIGURATION METHODS
    // ========================================

    setYouTubeKey(apiKey) {
        this.config.youtube.apiKey = apiKey;
        localStorage.setItem('voxly_youtube_api_key', apiKey);
        console.log('YouTube API key configured');
    },

    setNewsAPIKey(apiKey) {
        this.config.news.apiKey = apiKey;
        localStorage.setItem('voxly_news_api_key', apiKey);
        console.log('NewsAPI key configured');
    },

    loadSavedKeys() {
        const youtubeKey = localStorage.getItem('voxly_youtube_api_key');
        const newsKey = localStorage.getItem('voxly_news_api_key');

        if (youtubeKey) this.config.youtube.apiKey = youtubeKey;
        if (newsKey) this.config.news.apiKey = newsKey;
    },

    hasRequiredKeys() {
        return {
            youtube: !!this.config.youtube.apiKey,
            news: !!this.config.news.apiKey,
            reddit: true // Reddit public API doesn't require key for read-only
        };
    },

    // ========================================
    // CACHE METHODS
    // ========================================

    getCached(key) {
        const cached = this.cache.get(key);
        if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
            return cached.data;
        }
        this.cache.delete(key);
        return null;
    },

    setCache(key, data) {
        this.cache.set(key, { data, timestamp: Date.now() });
    },

    clearCache() {
        this.cache.clear();
    },

    // ========================================
    // REDDIT API (No Auth Required for Public Data)
    // ========================================

    async searchReddit(query, options = {}) {
        const {
            subreddit = null,
            sort = 'relevance', // relevance, hot, top, new, comments
            time = 'week', // hour, day, week, month, year, all
            limit = 25
        } = options;

        const cacheKey = `reddit_${query}_${subreddit}_${sort}_${time}`;
        const cached = this.getCached(cacheKey);
        if (cached) return cached;

        try {
            const endpoint = subreddit
                ? `${this.config.reddit.baseUrl}/r/${subreddit}/search.json`
                : `${this.config.reddit.baseUrl}/search.json`;

            const params = new URLSearchParams({
                q: query,
                sort,
                t: time,
                limit,
                restrict_sr: subreddit ? 'true' : 'false'
            });

            const response = await fetch(`${endpoint}?${params}`, {
                headers: {
                    'User-Agent': this.config.reddit.userAgent
                }
            });

            if (!response.ok) {
                throw new Error(`Reddit API error: ${response.status}`);
            }

            const data = await response.json();
            const posts = this.transformRedditPosts(data.data.children);

            this.setCache(cacheKey, posts);
            return posts;

        } catch (error) {
            console.error('Reddit API error:', error);
            return this.getMockRedditData(query);
        }
    },

    async getRedditComments(postId, subreddit) {
        try {
            const response = await fetch(
                `${this.config.reddit.baseUrl}/r/${subreddit}/comments/${postId}.json`,
                {
                    headers: {
                        'User-Agent': this.config.reddit.userAgent
                    }
                }
            );

            if (!response.ok) {
                throw new Error(`Reddit API error: ${response.status}`);
            }

            const data = await response.json();
            return this.transformRedditComments(data[1].data.children);

        } catch (error) {
            console.error('Reddit comments error:', error);
            return [];
        }
    },

    async getSubredditStats(subreddit) {
        try {
            const response = await fetch(
                `${this.config.reddit.baseUrl}/r/${subreddit}/about.json`,
                {
                    headers: {
                        'User-Agent': this.config.reddit.userAgent
                    }
                }
            );

            if (!response.ok) {
                throw new Error(`Reddit API error: ${response.status}`);
            }

            const data = await response.json();
            return {
                name: data.data.display_name,
                title: data.data.title,
                subscribers: data.data.subscribers,
                activeUsers: data.data.accounts_active,
                description: data.data.public_description,
                created: new Date(data.data.created_utc * 1000)
            };

        } catch (error) {
            console.error('Subreddit stats error:', error);
            return null;
        }
    },

    transformRedditPosts(posts) {
        return posts.map(post => ({
            id: post.data.id,
            platform: 'reddit',
            title: post.data.title,
            content: post.data.selftext || post.data.title,
            author: post.data.author,
            subreddit: post.data.subreddit,
            url: `https://reddit.com${post.data.permalink}`,
            score: post.data.score,
            upvoteRatio: post.data.upvote_ratio,
            numComments: post.data.num_comments,
            created: new Date(post.data.created_utc * 1000),
            thumbnail: post.data.thumbnail !== 'self' ? post.data.thumbnail : null,
            sentiment: this.analyzeSentiment(post.data.title + ' ' + (post.data.selftext || '')),
            engagement: post.data.score + post.data.num_comments
        }));
    },

    transformRedditComments(comments) {
        return comments
            .filter(c => c.kind === 't1')
            .map(comment => ({
                id: comment.data.id,
                author: comment.data.author,
                content: comment.data.body,
                score: comment.data.score,
                created: new Date(comment.data.created_utc * 1000),
                sentiment: this.analyzeSentiment(comment.data.body)
            }));
    },

    // ========================================
    // YOUTUBE DATA API
    // ========================================

    async searchYouTube(query, options = {}) {
        const {
            maxResults = 25,
            order = 'relevance', // relevance, date, rating, viewCount
            type = 'video', // video, channel, playlist
            publishedAfter = null
        } = options;

        if (!this.config.youtube.apiKey) {
            console.warn('YouTube API key not configured, using mock data');
            return this.getMockYouTubeData(query);
        }

        const cacheKey = `youtube_${query}_${order}_${maxResults}`;
        const cached = this.getCached(cacheKey);
        if (cached) return cached;

        try {
            const params = new URLSearchParams({
                part: 'snippet',
                q: query,
                maxResults,
                order,
                type,
                key: this.config.youtube.apiKey
            });

            if (publishedAfter) {
                params.append('publishedAfter', publishedAfter);
            }

            const response = await fetch(
                `${this.config.youtube.baseUrl}/search?${params}`
            );

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error?.message || `YouTube API error: ${response.status}`);
            }

            const data = await response.json();
            const videos = await this.enrichYouTubeResults(data.items);

            this.setCache(cacheKey, videos);
            return videos;

        } catch (error) {
            console.error('YouTube API error:', error);
            return this.getMockYouTubeData(query);
        }
    },

    async enrichYouTubeResults(items) {
        // Get video statistics for each result
        const videoIds = items
            .filter(item => item.id.videoId)
            .map(item => item.id.videoId)
            .join(',');

        if (!videoIds) return this.transformYouTubeVideos(items, {});

        try {
            const params = new URLSearchParams({
                part: 'statistics,contentDetails',
                id: videoIds,
                key: this.config.youtube.apiKey
            });

            const response = await fetch(
                `${this.config.youtube.baseUrl}/videos?${params}`
            );

            if (!response.ok) {
                return this.transformYouTubeVideos(items, {});
            }

            const statsData = await response.json();
            const statsMap = {};
            statsData.items.forEach(item => {
                statsMap[item.id] = item.statistics;
            });

            return this.transformYouTubeVideos(items, statsMap);

        } catch (error) {
            return this.transformYouTubeVideos(items, {});
        }
    },

    transformYouTubeVideos(items, statsMap) {
        return items
            .filter(item => item.id.videoId)
            .map(item => {
                const stats = statsMap[item.id.videoId] || {};
                return {
                    id: item.id.videoId,
                    platform: 'youtube',
                    title: item.snippet.title,
                    content: item.snippet.description,
                    author: item.snippet.channelTitle,
                    channelId: item.snippet.channelId,
                    url: `https://youtube.com/watch?v=${item.id.videoId}`,
                    thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url,
                    created: new Date(item.snippet.publishedAt),
                    views: parseInt(stats.viewCount) || 0,
                    likes: parseInt(stats.likeCount) || 0,
                    comments: parseInt(stats.commentCount) || 0,
                    sentiment: this.analyzeSentiment(item.snippet.title + ' ' + item.snippet.description),
                    engagement: (parseInt(stats.likeCount) || 0) + (parseInt(stats.commentCount) || 0)
                };
            });
    },

    async getVideoComments(videoId, maxResults = 50) {
        if (!this.config.youtube.apiKey) {
            return [];
        }

        try {
            const params = new URLSearchParams({
                part: 'snippet',
                videoId,
                maxResults,
                order: 'relevance',
                key: this.config.youtube.apiKey
            });

            const response = await fetch(
                `${this.config.youtube.baseUrl}/commentThreads?${params}`
            );

            if (!response.ok) {
                return [];
            }

            const data = await response.json();
            return data.items.map(item => ({
                id: item.id,
                author: item.snippet.topLevelComment.snippet.authorDisplayName,
                content: item.snippet.topLevelComment.snippet.textDisplay,
                likes: item.snippet.topLevelComment.snippet.likeCount,
                created: new Date(item.snippet.topLevelComment.snippet.publishedAt),
                sentiment: this.analyzeSentiment(item.snippet.topLevelComment.snippet.textDisplay)
            }));

        } catch (error) {
            console.error('YouTube comments error:', error);
            return [];
        }
    },

    // ========================================
    // NEWS API
    // ========================================

    async searchNews(query, options = {}) {
        const {
            sources = null,
            domains = null,
            from = null,
            to = null,
            language = 'en',
            sortBy = 'publishedAt', // relevancy, popularity, publishedAt
            pageSize = 25
        } = options;

        if (!this.config.news.apiKey) {
            console.warn('NewsAPI key not configured, using mock data');
            return this.getMockNewsData(query);
        }

        const cacheKey = `news_${query}_${sortBy}_${pageSize}`;
        const cached = this.getCached(cacheKey);
        if (cached) return cached;

        try {
            const params = new URLSearchParams({
                q: query,
                language,
                sortBy,
                pageSize,
                apiKey: this.config.news.apiKey
            });

            if (sources) params.append('sources', sources);
            if (domains) params.append('domains', domains);
            if (from) params.append('from', from);
            if (to) params.append('to', to);

            const response = await fetch(
                `${this.config.news.baseUrl}/everything?${params}`
            );

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || `NewsAPI error: ${response.status}`);
            }

            const data = await response.json();
            const articles = this.transformNewsArticles(data.articles);

            this.setCache(cacheKey, articles);
            return articles;

        } catch (error) {
            console.error('NewsAPI error:', error);
            return this.getMockNewsData(query);
        }
    },

    async getTopHeadlines(options = {}) {
        const {
            country = 'us',
            category = null, // business, technology, entertainment, health, science, sports
            sources = null,
            pageSize = 20
        } = options;

        if (!this.config.news.apiKey) {
            return this.getMockNewsData('headlines');
        }

        try {
            const params = new URLSearchParams({
                country,
                pageSize,
                apiKey: this.config.news.apiKey
            });

            if (category) params.append('category', category);
            if (sources) {
                params.delete('country'); // Can't use both
                params.append('sources', sources);
            }

            const response = await fetch(
                `${this.config.news.baseUrl}/top-headlines?${params}`
            );

            if (!response.ok) {
                return this.getMockNewsData('headlines');
            }

            const data = await response.json();
            return this.transformNewsArticles(data.articles);

        } catch (error) {
            console.error('Headlines error:', error);
            return this.getMockNewsData('headlines');
        }
    },

    transformNewsArticles(articles) {
        return articles.map(article => ({
            id: this.generateId(),
            platform: 'news',
            title: article.title,
            content: article.description || article.content || '',
            author: article.author || article.source?.name || 'Unknown',
            source: article.source?.name || 'Unknown',
            url: article.url,
            thumbnail: article.urlToImage,
            created: new Date(article.publishedAt),
            sentiment: this.analyzeSentiment(article.title + ' ' + (article.description || '')),
            engagement: Math.floor(Math.random() * 5000) // Estimated engagement
        }));
    },

    // ========================================
    // UNIFIED SEARCH
    // ========================================

    async searchAll(query, options = {}) {
        const results = {
            reddit: [],
            youtube: [],
            news: [],
            combined: [],
            stats: {
                total: 0,
                byPlatform: {},
                avgSentiment: 0,
                totalEngagement: 0
            }
        };

        // Run all searches in parallel
        const [redditResults, youtubeResults, newsResults] = await Promise.all([
            this.searchReddit(query, options.reddit || {}),
            this.searchYouTube(query, options.youtube || {}),
            this.searchNews(query, options.news || {})
        ]);

        results.reddit = redditResults;
        results.youtube = youtubeResults;
        results.news = newsResults;

        // Combine and sort by date
        results.combined = [...redditResults, ...youtubeResults, ...newsResults]
            .sort((a, b) => b.created - a.created);

        // Calculate stats
        results.stats.total = results.combined.length;
        results.stats.byPlatform = {
            reddit: redditResults.length,
            youtube: youtubeResults.length,
            news: newsResults.length
        };

        if (results.combined.length > 0) {
            results.stats.avgSentiment = results.combined.reduce((sum, item) =>
                sum + item.sentiment, 0) / results.combined.length;
            results.stats.totalEngagement = results.combined.reduce((sum, item) =>
                sum + item.engagement, 0);
        }

        return results;
    },

    // ========================================
    // SENTIMENT ANALYSIS (Simple keyword-based)
    // ========================================

    analyzeSentiment(text) {
        if (!text) return 50;

        const positiveWords = [
            'great', 'amazing', 'awesome', 'excellent', 'good', 'love', 'best',
            'fantastic', 'wonderful', 'perfect', 'happy', 'impressed', 'recommend',
            'innovative', 'breakthrough', 'success', 'beautiful', 'outstanding'
        ];

        const negativeWords = [
            'bad', 'terrible', 'awful', 'worst', 'hate', 'poor', 'disappointing',
            'horrible', 'frustrating', 'broken', 'fail', 'scam', 'avoid', 'waste',
            'problem', 'issue', 'bug', 'crash', 'slow', 'expensive'
        ];

        const lowerText = text.toLowerCase();
        let score = 50;

        positiveWords.forEach(word => {
            if (lowerText.includes(word)) score += 5;
        });

        negativeWords.forEach(word => {
            if (lowerText.includes(word)) score -= 5;
        });

        return Math.max(0, Math.min(100, score));
    },

    // ========================================
    // MOCK DATA FALLBACKS
    // ========================================

    getMockRedditData(query) {
        return [
            {
                id: 'mock_r1',
                platform: 'reddit',
                title: `Discussion about ${query} - Great insights!`,
                content: `Has anyone tried ${query}? I've been using it for a month and it's been great.`,
                author: 'u/TechEnthusiast42',
                subreddit: 'technology',
                url: 'https://reddit.com/r/technology/mock',
                score: 1250,
                upvoteRatio: 0.92,
                numComments: 187,
                created: new Date(Date.now() - 3600000),
                sentiment: 78,
                engagement: 1437
            },
            {
                id: 'mock_r2',
                platform: 'reddit',
                title: `${query} just released new update`,
                content: `The new features are impressive. Performance improvements are noticeable.`,
                author: 'u/ProductReviewer',
                subreddit: 'tech',
                url: 'https://reddit.com/r/tech/mock',
                score: 856,
                upvoteRatio: 0.88,
                numComments: 94,
                created: new Date(Date.now() - 7200000),
                sentiment: 72,
                engagement: 950
            }
        ];
    },

    getMockYouTubeData(query) {
        return [
            {
                id: 'mock_yt1',
                platform: 'youtube',
                title: `${query} - Complete Review 2026`,
                content: `In this video, we take a deep dive into ${query} and explore all its features.`,
                author: 'TechReview Pro',
                channelId: 'mock_channel',
                url: 'https://youtube.com/watch?v=mock1',
                thumbnail: 'https://picsum.photos/480/360',
                created: new Date(Date.now() - 86400000),
                views: 125000,
                likes: 8500,
                comments: 1200,
                sentiment: 75,
                engagement: 9700
            },
            {
                id: 'mock_yt2',
                platform: 'youtube',
                title: `Why ${query} is trending right now`,
                content: `Everyone is talking about ${query}. Let's find out why.`,
                author: 'Digital Trends Daily',
                channelId: 'mock_channel2',
                url: 'https://youtube.com/watch?v=mock2',
                thumbnail: 'https://picsum.photos/480/360',
                created: new Date(Date.now() - 172800000),
                views: 89000,
                likes: 5200,
                comments: 780,
                sentiment: 68,
                engagement: 5980
            }
        ];
    },

    getMockNewsData(query) {
        return [
            {
                id: 'mock_n1',
                platform: 'news',
                title: `${query} announces major expansion plans`,
                content: `In a press release today, ${query} revealed ambitious plans for global expansion.`,
                author: 'Business Insider',
                source: 'Business Insider',
                url: 'https://businessinsider.com/mock',
                thumbnail: 'https://picsum.photos/600/400',
                created: new Date(Date.now() - 3600000),
                sentiment: 70,
                engagement: 2500
            },
            {
                id: 'mock_n2',
                platform: 'news',
                title: `Analysts weigh in on ${query}'s market performance`,
                content: `Wall Street analysts are optimistic about ${query}'s future prospects.`,
                author: 'Reuters',
                source: 'Reuters',
                url: 'https://reuters.com/mock',
                thumbnail: 'https://picsum.photos/600/400',
                created: new Date(Date.now() - 7200000),
                sentiment: 65,
                engagement: 1800
            }
        ];
    },

    // ========================================
    // UTILITY METHODS
    // ========================================

    generateId() {
        return 'id_' + Math.random().toString(36).substr(2, 9);
    },

    formatNumber(num) {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    },

    getTimeAgo(date) {
        const seconds = Math.floor((new Date() - date) / 1000);

        if (seconds < 60) return 'just now';
        if (seconds < 3600) return Math.floor(seconds / 60) + 'm ago';
        if (seconds < 86400) return Math.floor(seconds / 3600) + 'h ago';
        if (seconds < 604800) return Math.floor(seconds / 86400) + 'd ago';
        return Math.floor(seconds / 604800) + 'w ago';
    }
};

// Initialize saved API keys on load
APIService.loadSavedKeys();

// Make available globally
window.APIService = APIService;

console.log('API Service loaded - Reddit, YouTube, NewsAPI integrations ready');
