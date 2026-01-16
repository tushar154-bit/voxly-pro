# 🚀 Voxly Pro - Quick Start Guide

## Welcome to Voxly Pro!

This guide will help you get the advanced social listening platform up and running in minutes.

---

## 📦 What's Included

Your Voxly Pro project contains:

✅ **8 Complete Pages**:
- Dashboard (Main overview)
- Real-Time Monitor (Live tracking)
- Advanced Analytics (Deep insights)
- Competitor Analysis (Benchmarking)
- Influencer Hub (Influencer management)
- Trend Discovery (Emerging trends)
- Reports (Export & scheduling)
- Settings (Configuration)

✅ **15+ Interactive Charts**:
- Line charts, bar charts, radar charts
- Doughnut charts, heatmaps, gauges
- Word clouds, network graphs, funnels
- Scatter plots, comparison charts, and more

✅ **Modular Architecture**:
- Separate files for each component
- Easy to customize and extend
- Well-documented code

✅ **Export Functionality**:
- PDF reports
- Excel spreadsheets
- PowerPoint presentations

---

## 🏃 Quick Start (3 Steps)

### Step 1: Open the Project

Navigate to your project folder:
```bash
cd d:\Rushikesh\VoxlyPro
```

### Step 2: Start a Local Server

Choose one method:

**Option A - Python** (if installed):
```bash
python -m http.server 8000
```

**Option B - Node.js** (if installed):
```bash
npx serve
```

**Option C - PHP** (if installed):
```bash
php -S localhost:8000
```

**Option D - No Server Needed**:
Just open `index.html` directly in your browser!

### Step 3: Open in Browser

Navigate to:
```
http://localhost:8000
```

Or simply double-click `index.html`

---

## 🎯 First Steps

### 1. Explore the Dashboard
- **Main page** loads automatically
- See **4 stat cards** at the top
- Explore **interactive charts** below
- Try **platform filters** (Twitter, Reddit, etc.)

### 2. Navigate Pages
- Click **sidebar menu items**
- Each page has unique features
- Try the **Real-Time Monitor** for live data

### 3. Test Features
- **Search bar**: Type brand names
- **Filter chips**: Click to filter data
- **Export button**: Generate reports
- **Chart interactions**: Hover, click, zoom

---

## 🛠️ Customization

### Change Brand Colors

Edit `css/main.css`:
```css
:root {
    --primary: #6366f1;  /* Change to your brand color */
}
```

### Add Your Logo

Replace `.logo-icon` content in `index.html`:
```html
<div class="logo-icon">
    <img src="your-logo.png" alt="Logo">
</div>
```

### Connect Real APIs

Edit `js/api.js`:
```javascript
const API_CONFIG = {
    twitter: {
        apiKey: 'YOUR_API_KEY',
        endpoint: 'https://api.twitter.com/2/'
    }
};
```

### Add Custom Data

Edit `data/brands.json`:
```json
{
    "yourbrand": {
        "sentiment": 75,
        "mentions": 10000,
        "platforms": { ... }
    }
}
```

---

## 📊 Understanding the Files

### HTML Files
- **index.html** - Main entry point with navigation

### CSS Files (in `/css`)
- **main.css** - Core styles, variables, layout
- **dashboard.css** - Dashboard components
- **charts.css** - Chart-specific styles
- **components.css** - Reusable UI components
- **animations.css** - Animations & transitions
- **responsive.css** - Mobile responsiveness

### JavaScript Files (in `/js`)
- **app.js** - Main application logic
- **config.js** - Configuration settings
- **dashboard.js** - Dashboard page
- **realtime.js** - Real-time monitoring
- **analytics.js** - Advanced analytics
- **competitors.js** - Competitor analysis
- **influencers.js** - Influencer hub
- **trends.js** - Trend discovery
- **reports.js** - Report generation
- **settings.js** - Settings page
- **utils.js** - Utility functions
- **charts.js** - Chart creation
- **api.js** - API integration
- **navigation.js** - Page navigation
- **notifications.js** - Notification system
- **data-manager.js** - Data management

---

## 🔧 Configuration

### Basic Settings

Edit `js/config.js`:

```javascript
const VoxlyConfig = {
    app: {
        name: 'Your App Name',
        version: '1.0.0'
    },
    
    demo: {
        enabled: true,  // Set to false for production
        defaultBrand: 'google'
    },
    
    alerts: {
        enabled: true,
        volumeSpike: 50  // % threshold
    }
};
```

### Platform Configuration

Add/remove platforms in `config.js`:

```javascript
platforms: [
    { id: 'twitter', name: 'Twitter', icon: '🐦', color: '#1DA1F2' },
    { id: 'custom', name: 'Custom Platform', icon: '🎯', color: '#6366f1' }
]
```

---

## 📱 Mobile Responsiveness

The dashboard automatically adapts to mobile devices:

- **Sidebar** collapses on small screens
- **Charts** resize responsively
- **Tables** become scrollable
- **Touch-friendly** interactions

Test mobile view:
- Press `F12` in browser
- Click device toggle icon
- Select mobile device

---

## 🚀 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel deploy
```

### Deploy to Netlify

1. Drag folder to netlify.com/drop
2. Or use CLI:
```bash
netlify deploy
```

### Deploy to GitHub Pages

1. Push to GitHub
2. Settings → Pages
3. Select main branch
4. Save

Your site will be at:
`https://yourusername.github.io/voxly-pro`

---

## 🐛 Troubleshooting

### Charts Not Showing
**Problem**: Charts appear blank
**Solution**: 
- Check browser console for errors
- Ensure Chart.js library loaded
- Verify canvas elements exist

### Data Not Loading
**Problem**: No data appears
**Solution**:
- Check `data/brands.json` exists
- Verify JSON syntax is valid
- Enable demo mode in `config.js`

### Sidebar Not Working
**Problem**: Sidebar doesn't toggle
**Solution**:
- Check `app.js` loaded
- Verify event listeners attached
- Check browser console for errors

### Export Not Working
**Problem**: Export buttons don't work
**Solution**:
- Ensure export libraries loaded (jsPDF, XLSX, PptxGenJS)
- Check browser allows downloads
- Try different browser

---

## 📚 Next Steps

1. ✅ **Read Full Documentation**: See `README.md`
2. ✅ **Explore Example Data**: Check `data/` folder
3. ✅ **Customize Branding**: Edit colors in `main.css`
4. ✅ **Connect APIs**: Follow API guide in `README.md`
5. ✅ **Deploy**: Choose hosting platform
6. ✅ **Share**: Get feedback from users

---

## 💡 Pro Tips

### Keyboard Shortcuts
- `Ctrl/Cmd + K` - Focus search
- `Ctrl/Cmd + B` - Toggle sidebar
- `Esc` - Close modals

### Performance
- Keep demo mode OFF in production
- Enable caching in config
- Lazy load images

### Customization
- Use CSS variables for theming
- Add custom charts in `charts.js`
- Create new pages following existing pattern

---

## 🆘 Need Help?

- **Documentation**: See `/docs` folder
- **Examples**: Check `/examples` folder
- **Issues**: Create GitHub issue
- **Email**: support@voxlypro.com

---

## 🎉 You're Ready!

Your Voxly Pro platform is set up and ready to use.

**Enjoy building amazing social listening experiences!** 🚀

---

Built with ❤️ by the Voxly Pro Team
