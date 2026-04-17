# 🎧 Voxly Pro - Advanced Social Listening Platform

> A comprehensive, multi-page social listening and analytics platform built with modern web technologies.

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![Status](https://img.shields.io/badge/status-in--development-orange)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 🚀 Local development

Voxly Pro is now a full-stack app: a Node.js + Express API backed by PostgreSQL, serving the `client/` frontend.

### Prerequisites
- **Node.js ≥ 18.18**
- **Docker Desktop** (used to run a local Postgres) — or a local Postgres if you prefer.

### First-time setup
```bash
# 1. Start Postgres
docker-compose up -d

# 2. Install backend deps
cd server
npm install

# 3. Configure env
cp .env.example .env
# (optional) edit .env and replace JWT_SECRET with the output of:
#   openssl rand -base64 32

# 4. Apply the schema & seed demo users
npm run db:migrate
npm run seed
```

One-shot alternative from the repo root:
```bash
npm run setup      # db:up + install + migrate + seed
```

### Run
```bash
npm run dev        # from repo root — starts the API + serves the frontend
# open http://localhost:3000
```

### Demo credentials
| email | password | role |
|---|---|---|
| `demo@voxly.pro`  | `demo1234`  | user |
| `admin@voxly.pro` | `admin1234` | admin |

### Useful commands (from repo root)
| Command | What it does |
|---|---|
| `npm run dev` | Start the server in watch mode |
| `npm run db:up` / `npm run db:down` | Start / stop Postgres |
| `npm run db:migrate` | Apply pending migrations |
| `npm run db:studio` | Open Prisma Studio (DB browser) |
| `npm run db:reset` | **Destructive** — drops & reseeds the DB |
| `npm run seed` | Re-run seed script |
| `npm test` | Run backend tests |

### Project layout
```
voxly-pro/
├─ client/              Static frontend (HTML / CSS / vanilla JS)
├─ server/
│  ├─ src/              Express app (routes, controllers, middleware, utils)
│  ├─ prisma/           schema.prisma + seed.js
│  └─ package.json
├─ docker-compose.yml   Local Postgres
└─ package.json         Orchestration scripts
```

### Phase status
- [x] **Phase 1** — Auth foundation (signup / login / logout / me, demo seed users)
- [x] **Phase 2** — Core data models + realistic seed data
- [x] **Phase 3** — Dashboard / Realtime / Analytics APIs + frontend wiring
- [x] **Phase 4** — Competitors / Influencers / Journey APIs + pinned-influencers persisted to DB
- [x] **Phase 5** — Reports / Settings / Trends APIs + frontend wiring
- [ ] Phase 6 — Production polish (rate-limit, CI, Docker, observability)

### What Phase 2 adds
- **Schema** — `Brand`, `Mention`, `Keyword`, `Influencer`, `BrandInfluencer`, `CompetitorRelation`, `PinnedInfluencer`, `JourneyStage`, `Alert`, `Report`, `UserSettings` (in addition to Phase 1's `User`).
- **Seed** — 10 brands (Apple, Google, Microsoft, Nvidia, Samsung, Amazon, Tesla, Ford, BMW, Mercedes), ~5,000 mentions, ~300 keywords, 25 influencers (linked to brands), competitor relations, 50 journey stages, 80 alerts. Deterministic (seeded RNG) — the same seed produces the same data each run.

### What Phase 3 adds
All endpoints below require an authenticated session cookie (set by `/api/auth/login`). `:slug` is a brand slug or id (e.g. `apple`, `tesla`).

| Endpoint | Purpose |
|---|---|
| `GET /api/brands` | List all brands with aggregate counts |
| `GET /api/brands/:slug` | Full brand detail + competitors + journey stages |
| `GET /api/dashboard/:slug/stats?period=` | Mentions / sentiment / engagement / reach / authors with Δ vs prev period |
| `GET /api/dashboard/:slug/posts?period=&platform=&limit=` | Top posts ordered by reach |
| `GET /api/dashboard/:slug/activity?limit=` | Recent mentions + latest alerts |
| `GET /api/dashboard/:slug/platforms?period=` | Platform-level mention breakdown |
| `GET /api/analytics/:slug/overview?period=` | Awareness score, totals, deltas |
| `GET /api/analytics/:slug/keywords?kind=word\|hashtag&limit=` | Top keywords or hashtags |
| `GET /api/analytics/:slug/platforms?period=` | Detailed per-platform metrics |
| `GET /api/analytics/:slug/sentiment?period=&granularity=day\|week` | Sentiment time-series |
| `GET /api/analytics/:slug/swot` | Auto-computed SWOT from 30d metrics |
| `GET /api/realtime/:slug/feed?since=&limit=` | Polling-based live mention feed |
| `GET /api/realtime/:slug/pulse` | Mentions/min + current sentiment summary |

**Frontend**: `client/js/services/api.js` exposes `window.API.*`. Both `dashboard.js` and `analytics.js` now hydrate from live data on init and fall back silently to mock data if the backend is unreachable.

**Period syntax**: pass `?period=7d|30d|90d|thismonth|lastmonth` OR `?from=ISO&to=ISO` for a custom range. All endpoints that accept `period` compare against the previous equivalent window for deltas.

### What Phase 4 adds
| Endpoint | Purpose |
|---|---|
| `GET /api/competitors/:slug?period=` | Focus brand + competitors with side-by-side metrics (mentions, sentiment, engagement, reach, authors) for current and previous period |
| `GET /api/competitors/:slug/compare?metric=mentions\|sentiment\|engagement\|reach&period=` | Single-metric comparison across focus + competitors, ranked high-to-low |
| `GET /api/influencers?brand=&tier=&platform=&sort=&limit=` | Influencer list. `sort` = `followers\|engagement\|influence\|mentions\|sentiment`. Response includes `isPinned` for the current user. |
| `GET /api/influencers/:id` | Full influencer detail + linked brands + `isPinned` |
| `GET /api/influencers/pinned` | Current user's pinned influencers |
| `POST /api/influencers/:id/pin` | Pin to current user's dashboard |
| `DELETE /api/influencers/:id/pin` | Unpin |
| `GET /api/journey/:slug` | Customer-journey funnel (5 stages) + summary metrics |

**Frontend**:
- `window.PinnedInfluencers` is now backed by `/api/influencers/pinned` with a synchronous cache — existing UI code keeps working, pins survive across browsers/devices. Legacy `localStorage` pins are read once for migration.
- `competitors.js`, `influencers.js`, `journey.js` each call their API on init and fall back silently to mock data if the backend is unreachable.

### What Phase 5 adds
| Endpoint | Purpose |
|---|---|
| `GET /api/reports` | Current user's reports (with brand join) |
| `POST /api/reports` | Create a new report (metadata only — file generated on download) |
| `GET /api/reports/:id` | Report detail |
| `DELETE /api/reports/:id` | Delete |
| `GET /api/reports/:id/download` | Streams a CSV or JSON of the brand's last-30-day keywords + mentions |
| `GET /api/settings` | Current user's settings (auto-provisions defaults on first request) |
| `PATCH /api/settings` | Update theme / language / timezone / alert prefs / default brand (Zod-validated, brand id verified to exist) |
| `GET /api/trends?brand=&kind=word\|hashtag&sort=count\|growth&limit=` | Trending keywords for one brand or all |
| `GET /api/trends/hashtags?brand=&limit=` | Trending hashtags shortcut |
| `GET /api/trends/rising?brand=&limit=` | Fastest-growing keywords (sorted by growth %) |
| `GET /api/trends/topics?kind=&limit=` | Cross-brand topic aggregation (same term summed across all brands) |

**Frontend**:
- `reports.js` lists live reports, exposes `Reports.createLive(form)` / `Reports.deleteLive(id)`, and renders a download button that points at `/api/reports/:id/download`.
- `settings.js` hydrates form fields from `/api/settings` on load and persists changes via `PATCH /api/settings` (mirrors to `localStorage` for offline resilience).
- `trends.js` populates the trending-hashtags and rising-trends panels from `/api/trends/*`.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Pages & Components](#pages--components)
- [Technologies](#technologies)
- [Customization](#customization)
- [API Integration](#api-integration)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## 🌟 Overview

**Voxly Pro** is a next-generation social listening platform that helps marketers, brands, and agencies monitor, analyze, and respond to online conversations across multiple platforms including Twitter, Reddit, YouTube, LinkedIn, Facebook, Instagram, News sites, and E-commerce reviews.

### Key Capabilities:
- ✅ **Real-time monitoring** across 8+ platforms
- ✅ **Advanced sentiment analysis** with emotion detection
- ✅ **Competitor benchmarking** and share of voice
- ✅ **Influencer identification** and impact scoring
- ✅ **Trend discovery** with predictive analytics
- ✅ **Crisis detection** with automated alerts
- ✅ **Comprehensive reporting** (PDF, Excel, PowerPoint)
- ✅ **Interactive dashboards** with 15+ chart types

---

## 🚀 Features

### 📊 Dashboard
- **Overview Statistics**: Sentiment, mentions, engagement, alerts
- **Sentiment Trend Chart**: Line chart with positive/negative tracking
- **Platform Distribution**: Radar chart showing engagement across platforms
- **Mentions Volume**: Bar chart with daily/weekly view
- **Emotion Analysis**: Doughnut chart with 5+ emotions
- **Word Cloud**: Interactive trending topics visualization
- **Activity Feed**: Real-time updates stream
- **Top Posts Table**: Sortable, filterable post performance

### 🔴 Real-Time Monitor
- **Live Mention Stream**: Auto-updating feed with new mentions
- **Alert Timeline**: Crisis detection with threshold alerts
- **Volume Surge Detection**: Spike identification and analysis
- **Geographic Heatmap**: Real-time conversation density
- **Trending Topics Tracker**: Racing bar chart animation
- **Sentiment Gauge**: Real-time sentiment scoring

### 📈 Advanced Analytics
- **Customer Journey Funnel**: Conversion tracking
- **Sentiment Heatmap**: Time-based sentiment patterns
- **Demographics Dashboard**: Audience breakdown
- **Content Performance Matrix**: BCG-style quadrant analysis
- **Engagement Rate Trends**: Multi-metric line charts
- **Topic Correlation Network**: Relationship visualization
- **Hashtag Performance**: Ranked by engagement metrics

### ⚔️ Competitor Analysis
- **Share of Voice**: Stacked area chart over time
- **Competitive Sentiment Matrix**: 2x2 positioning
- **Feature Comparison Radar**: Multi-brand attribute comparison
- **Mention Growth Comparison**: Side-by-side trends
- **Platform Strategy**: Where competitors are winning

### 👥 Influencer Hub
- **Influencer Network Graph**: Connection mapping
- **Impact Score Ranking**: Multi-metric scoring
- **Sentiment Influence**: Positive vs negative drivers
- **Audience Overlap Venn**: Shared follower analysis
- **Engagement Quality**: Response rates and authenticity

### 🔥 Trend Discovery
- **Topic Lifecycle Tracking**: Emerging → Peak → Declining
- **Seasonality Patterns**: Year-over-year comparison
- **Viral Content Analysis**: Share propagation trees
- **Predictive Forecasting**: ML-powered trend prediction
- **Keyword Trend River**: Streamgraph visualization

### 📄 Reports
- **Automated Report Generation**: Schedule daily/weekly/monthly
- **Multi-format Export**: PDF, Excel, PowerPoint
- **Custom Templates**: Brand-specific designs
- **Email Distribution**: Stakeholder notifications
- **Historical Comparisons**: Period-over-period analysis

### ⚙️ Settings
- **Platform Connections**: Social media API integration
- **Alert Configuration**: Custom threshold settings
- **User Management**: Team access control
- **Notification Preferences**: Email, push, in-app
- **Data Retention**: Compliance and archival settings

---

## 📁 Project Structure

```
VoxlyPro/
│
├── index.html                 # Main HTML entry point
│
├── css/                       # Stylesheets
│   ├── main.css              # Core styles, variables, layout
│   ├── dashboard.css         # Dashboard-specific styles
│   ├── charts.css            # Chart visualizations
│   ├── components.css        # Reusable components
│   ├── animations.css        # Animations and transitions
│   └── responsive.css        # Mobile responsiveness
│
├── js/                        # JavaScript modules
│   ├── app.js                # Main application entry
│   ├── config.js             # Configuration settings
│   ├── utils.js              # Utility functions
│   ├── api.js                # API client
│   ├── data-manager.js       # Data state management
│   ├── charts.js             # Chart creation utilities
│   ├── dashboard.js          # Dashboard page
│   ├── realtime.js           # Real-time monitor page
│   ├── analytics.js          # Advanced analytics page
│   ├── competitors.js        # Competitor analysis page
│   ├── influencers.js        # Influencer hub page
│   ├── trends.js             # Trend discovery page
│   ├── reports.js            # Reports page
│   ├── settings.js           # Settings page
│   ├── navigation.js         # Navigation manager
│   └── notifications.js      # Notification system
│
├── data/                      # Data files
│   ├── brands.json           # Brand data
│   ├── platforms.json        # Platform configurations
│   ├── competitors.json      # Competitor data
│   └── sample-data.json      # Demo/sample data
│
├── assets/                    # Static assets
│   ├── images/               # Image files
│   ├── icons/                # Icon files
│   └── fonts/                # Custom fonts
│
├── components/                # Reusable HTML components
│   ├── modals/               # Modal templates
│   ├── cards/                # Card components
│   └── widgets/              # Dashboard widgets
│
├── README.md                  # This file
├── package.json              # Dependencies (optional)
└── LICENSE                    # License file
```

---

## 🛠️ Installation

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### Quick Start

1. **Clone or Download** the project:
   ```bash
   git clone https://github.com/yourusername/voxly-pro.git
   cd voxly-pro
   ```

2. **Open in Browser**:
   - Simply open `index.html` in your browser, or
   - Use a local server:
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Node.js
     npx serve
     
     # PHP
     php -S localhost:8000
     ```

3. **Access Dashboard**:
   Navigate to `http://localhost:8000` in your browser

### No Build Required!
This is a pure HTML/CSS/JavaScript application with no build step needed.

---

## 🎯 Usage

### Basic Navigation

1. **Sidebar Menu**: Click any menu item to navigate between pages
2. **Search Bar**: Global search across all brands, topics, and mentions
3. **Platform Filters**: Click filter chips to view platform-specific data
4. **Export**: Use export buttons to generate PDF, Excel, or PowerPoint reports

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + K` | Focus search bar |
| `Ctrl/Cmd + B` | Toggle sidebar |
| `Esc` | Close modals |

### Platform Filtering

1. Click any platform chip (Twitter, Reddit, YouTube, etc.)
2. All charts and data update automatically
3. View platform-specific insights and metrics

### Exporting Data

1. Click the export button (📊) in header
2. Select format: PDF, Excel, or PowerPoint
3. Report generates and downloads automatically

---

## 📄 Pages & Components

### 1. Dashboard (`dashboard.js`)
**Purpose**: Main overview with key metrics and charts

**Components**:
- Stats Grid (4 cards)
- Sentiment Trend Chart
- Platform Distribution Chart
- Mentions Volume Chart
- Emotion Analysis Chart
- Word Cloud
- Activity Feed
- Top Posts Table

### 2. Real-Time Monitor (`realtime.js`)
**Purpose**: Live monitoring and crisis detection

**Components**:
- Live Mention Stream
- Alert Timeline
- Crisis Severity Gauge
- Volume Surge Chart
- Geographic Heatmap
- Trending Topics (Live)

### 3. Advanced Analytics (`analytics.js`)
**Purpose**: Deep-dive analysis and insights

**Components**:
- Customer Journey Funnel
- Sentiment Heatmap (Time-based)
- Demographics Dashboard
- Content Performance Matrix
- Engagement Trends
- Topic Correlation Network

### 4. Competitor Analysis (`competitors.js`)
**Purpose**: Competitive intelligence

**Components**:
- Share of Voice Chart
- Competitive Sentiment Matrix
- Feature Comparison Radar
- Platform Strategy Breakdown
- Mention Growth Comparison

### 5. Influencer Hub (`influencers.js`)
**Purpose**: Influencer identification and management

**Components**:
- Influencer Network Graph
- Impact Score Ranking
- Sentiment Influence Chart
- Audience Overlap Venn Diagram
- Engagement Quality Metrics

### 6. Trend Discovery (`trends.js`)
**Purpose**: Emerging trends and predictions

**Components**:
- Topic Lifecycle Curve
- Seasonality Patterns
- Viral Content Analysis
- Predictive Forecasting
- Keyword Trend River

### 7. Reports (`reports.js`)
**Purpose**: Report generation and scheduling

**Components**:
- Report Templates
- Scheduled Reports
- Export History
- Custom Report Builder

### 8. Settings (`settings.js`)
**Purpose**: Configuration and preferences

**Components**:
- Platform Connections
- Alert Configuration
- User Management
- Notification Preferences

---

## 🔧 Technologies

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)**: Vanilla JS, no frameworks
- **Chart.js**: Main charting library
- **D3.js**: Advanced visualizations
- **ApexCharts**: Additional chart types

### Libraries (CDN)
- Chart.js 4.4.0
- D3.js 7.8.5
- jsPDF 2.5.1
- html2canvas 1.4.1
- XLSX 0.18.5
- PptxGenJS 3.12.0
- ApexCharts (latest)

### Architecture Pattern
- **MVC-inspired**: Separation of concerns
- **Component-based**: Reusable page components
- **Event-driven**: Custom event system
- **Modular**: Each page is a self-contained module

---

## 🎨 Customization

### Colors & Branding

Edit `css/main.css` variables:

```css
:root {
    --primary: #6366f1;          /* Your brand color */
    --secondary: #10b981;
    --accent-purple: #8b5cf6;
    /* ... more variables */
}
```

### Adding New Charts

1. Create chart in `js/charts.js`:
```javascript
ChartManager.createMyCustomChart = function(canvasId) {
    // Chart configuration
};
```

2. Add to page component:
```javascript
this.charts.myChart = ChartManager.createMyCustomChart('myChartCanvas');
```

### Adding New Pages

1. Create new file: `js/my-page.js`
2. Define page class:
```javascript
class MyPage {
    render() {
        return `<div>My content</div>`;
    }
    
    init() {
        // Initialize logic
    }
}
```

3. Add route in `app.js`:
```javascript
case 'mypage':
    const myPage = new MyPage();
    content = myPage.render();
    setTimeout(() => myPage.init(), 100);
    break;
```

4. Add nav item in `index.html`:
```html
<a href="#" class="nav-item" data-page="mypage">
    <span class="nav-icon">🎯</span>
    <span class="nav-label">My Page</span>
</a>
```

---

## 🔌 API Integration

### Connecting to Real APIs

Edit `js/api.js` to add your API credentials:

```javascript
class SocialListeningAPI {
    constructor() {
        this.config = {
            twitter: {
                apiKey: 'YOUR_TWITTER_API_KEY',
                endpoint: 'https://api.twitter.com/2/'
            },
            // ... other platforms
        };
    }
    
    async searchTwitter(query) {
        // Implement real API call
        const response = await fetch(`${this.config.twitter.endpoint}tweets/search`, {
            headers: {
                'Authorization': `Bearer ${this.config.twitter.apiKey}`
            }
        });
        return response.json();
    }
}
```

### Supported Platforms
- Twitter API v2
- Reddit API
- YouTube Data API v3
- LinkedIn API
- Facebook Graph API
- News API

---

## 🚀 Deployment

### Static Hosting (Recommended)

Deploy to any static hosting service:

**Vercel**:
```bash
vercel deploy
```

**Netlify**:
```bash
netlify deploy
```

**GitHub Pages**:
1. Push to GitHub repository
2. Enable GitHub Pages in settings
3. Select main branch

### Server Deployment

Upload files to your web server:
```bash
scp -r * user@yourserver.com:/var/www/voxly-pro
```

### Environment Variables

For production, use environment variables for API keys:
- Create `.env` file (not tracked in git)
- Load in `js/config.js`

---

## 📚 Documentation

- [User Guide](docs/USER_GUIDE.md) - How to use features
- [API Reference](docs/API_REFERENCE.md) - API documentation
- [Chart Guide](docs/CHARTS.md) - Available chart types
- [Theming Guide](docs/THEMING.md) - Customization guide

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📝 License

MIT License - feel free to use for personal or commercial projects.

---

## 🆘 Support

- **Documentation**: See `/docs` folder
- **Issues**: GitHub Issues
- **Email**: support@voxlypro.com

---

## 🎉 Acknowledgments

- Chart.js team
- D3.js community
- All open-source contributors

---

**Built with ❤️ by the Voxly Pro Team**

Version 2.0.0 | Last Updated: November 2025
