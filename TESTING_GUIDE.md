# 🧪 VoxlyPro Testing Guide

## Quick Feature Tests

### 1. Test the Dashboard
1. Open `index.html` in your browser
2. Wait for loading screen to complete
3. **Expected**: See dashboard with 4 stat cards and multiple charts
4. **Check**: All charts render correctly

### 2. Test Platform Filters
1. Click on different platform filter chips (Twitter, Reddit, etc.)
2. **Expected**: Chip highlights and notification appears
3. **Expected**: Dashboard updates (simulated)

### 3. Test Sidebar Navigation
1. Click the hamburger menu icon (☰) in top-left
2. **Expected**: Sidebar collapses to icon-only mode
3. Click again to expand
4. **Expected**: Full sidebar appears

### 4. Test Responsive Design
1. Resize browser window to mobile size (< 640px)
2. **Expected**: 
   - Sidebar becomes overlay
   - Stats grid becomes single column
   - Tables become scrollable
   - Header search hides

### 5. Test Browser Console Features

Open browser console (F12) and try these commands:

#### Test Notifications:
```javascript
// Success notification
Notifications.success('Data updated successfully!');

// Error notification
Notifications.error('Something went wrong!');

// Warning notification
Notifications.warning('High negative sentiment detected!');

// Info notification
Notifications.info('New mentions available');

// Loading notification (manual dismiss)
const loadingId = Notifications.loading('Processing data...');
// Dismiss after 3 seconds
setTimeout(() => Notifications.dismiss(loadingId), 3000);

// Notification with action button
Notifications.withAction({
    type: 'info',
    title: 'New Report Ready',
    message: 'Your weekly report is ready to download',
    action: {
        label: 'Download',
        callback: () => alert('Downloading report!')
    },
    duration: 0 // Won't auto-dismiss
});
```

#### Test Utilities:
```javascript
// Number formatting
console.log(Utils.formatNumber(1234));      // "1.2K"
console.log(Utils.formatNumber(156789));    // "156.8K"
console.log(Utils.formatNumber(2500000));   // "2.5M"
console.log(Utils.formatNumber(3400000000)); // "3.4B"

// Percentage formatting
console.log(Utils.formatPercentage(12.5));   // "+12.5%"
console.log(Utils.formatPercentage(-8.2));   // "-8.2%"

// Date formatting
const now = new Date();
console.log(Utils.formatDate(now, 'short'));    // "Dec 15, 2024"
console.log(Utils.formatDate(now, 'long'));     // "Friday, December 15, 2024"
console.log(Utils.formatDate(now, 'time'));     // "2:30 PM"
console.log(Utils.formatDate(now, 'relative')); // "Just now"

const twoHoursAgo = new Date(Date.now() - 7200000);
console.log(Utils.formatDate(twoHoursAgo, 'relative')); // "2h ago"

// Sentiment helpers
console.log(Utils.getSentimentColor(85));  // "#10b981" (green)
console.log(Utils.getSentimentColor(55));  // "#f59e0b" (orange)
console.log(Utils.getSentimentColor(30));  // "#ef4444" (red)

console.log(Utils.getSentimentLabel(85));  // "Positive"
console.log(Utils.getSentimentLabel(55));  // "Neutral"
console.log(Utils.getSentimentLabel(30));  // "Negative"

// Text utilities
console.log(Utils.truncate('This is a very long text that needs truncating', 20));
// "This is a very long..."

console.log(Utils.sanitizeHtml('<script>alert("xss")</script>'));
// Sanitized output

// Array utilities
const data = [
    { platform: 'Twitter', sentiment: 75 },
    { platform: 'Reddit', sentiment: 60 },
    { platform: 'Twitter', sentiment: 80 }
];

console.log(Utils.groupBy(data, 'platform'));
// Groups by platform

console.log(Utils.sortBy(data, 'sentiment', 'desc'));
// Sorts by sentiment descending

console.log(Utils.unique(data, 'platform'));
// Gets unique platforms
```

#### Test Data Manager:
```javascript
// Get all data
console.log(DataMgr.data);

// Get filtered data
const filtered = DataMgr.getFilteredData();
console.log('Filtered mentions:', filtered.mentions.length);
console.log('Statistics:', filtered.stats);

// Update filters
DataMgr.updatePlatformFilters(['Twitter', 'Reddit']);
console.log('Active filters:', DataMgr.filters.platforms);

// Clear filters
DataMgr.clearFilters();
console.log('Filters cleared:', DataMgr.filters);

// Search mentions
const results = DataMgr.search('sample');
console.log('Search results:', results.length);

// Subscribe to filter changes
const unsubscribe = DataMgr.subscribe('filterChange', (filters) => {
    console.log('Filters changed:', filters);
    Notifications.info('Filters updated!');
});

// Test the subscription
DataMgr.setFilter('sentiment', 'positive');

// Unsubscribe when done
// unsubscribe();

// Get statistics
const stats = DataMgr.calculateStats(DataMgr.data.mentions);
console.log('Total mentions:', stats.totalMentions);
console.log('Sentiment breakdown:', stats.sentiment);
console.log('Platform breakdown:', stats.platforms);
console.log('Engagement:', stats.engagement);

// Export data
const jsonData = DataMgr.exportToJSON('mentions');
console.log('Exported JSON:', jsonData.substring(0, 100) + '...');
```

#### Test Chart Manager:
```javascript
// Create a custom sentiment chart
Charts.createSentimentTrend('sentimentChart', {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [{
        label: 'Positive',
        data: [65, 70, 75, 80, 85],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)'
    }]
});

// Create platform distribution
Charts.createPlatformDistribution('platformChart', {
    labels: ['Twitter', 'Reddit', 'Facebook'],
    datasets: [{
        data: [45, 30, 25],
        backgroundColor: ['#1da1f2', '#ff4500', '#1877f2']
    }]
});

// Update chart data
Charts.updateChart('sentimentChart', {
    labels: ['Day 1', 'Day 2', 'Day 3'],
    datasets: [{
        label: 'Sentiment',
        data: [60, 65, 70]
    }]
});

// Export chart as image
const imageData = Charts.exportAsImage('sentimentChart');
console.log('Chart image data:', imageData.substring(0, 50) + '...');

// Destroy specific chart
// Charts.destroyChart('sentimentChart');

// Destroy all charts
// Charts.destroyAll();
```

### 6. Test Keyboard Shortcuts

Try these keyboard shortcuts:
- **Ctrl + K**: Open global search (if implemented)
- **Ctrl + B**: Toggle sidebar

### 7. Test Animations

Watch for these animations:
- ✅ Loading screen fade-in/fade-out
- ✅ Page transition animations
- ✅ Notification slide-in from right
- ✅ Hover effects on cards and buttons
- ✅ Smooth chart rendering

### 8. Test Component Styles

#### In HTML, add test components:
```html
<!-- Add to page content -->
<div class="card">
    <div class="card-header">
        <h3 class="card-title">Test Card</h3>
    </div>
    <div class="card-body">
        <p>This is a test card component</p>
        
        <!-- Test buttons -->
        <div class="btn-group">
            <button class="btn btn-primary">Primary</button>
            <button class="btn btn-secondary">Secondary</button>
            <button class="btn btn-success">Success</button>
            <button class="btn btn-danger">Danger</button>
        </div>
        
        <!-- Test badges -->
        <div style="margin-top: 16px;">
            <span class="badge badge-positive">Positive</span>
            <span class="badge badge-neutral">Neutral</span>
            <span class="badge badge-negative">Negative</span>
            <span class="badge badge-primary">Primary</span>
        </div>
        
        <!-- Test progress bar -->
        <div class="progress" style="margin-top: 16px;">
            <div class="progress-bar" style="width: 75%"></div>
        </div>
        
        <!-- Test alert -->
        <div class="alert alert-success" style="margin-top: 16px;">
            <div class="alert-icon">✓</div>
            <div class="alert-content">
                <div class="alert-title">Success!</div>
                <div>This is a success alert message.</div>
            </div>
        </div>
    </div>
</div>
```

### 9. Performance Tests

#### Check Loading Time:
```javascript
// In console after page load
console.log('Page load time:', performance.now() + 'ms');

// Check resource timing
const resources = performance.getEntriesByType('resource');
console.log('Resources loaded:', resources.length);

// Check memory usage (Chrome only)
if (performance.memory) {
    console.log('JS Heap Size:', 
        (performance.memory.usedJSHeapSize / 1048576).toFixed(2) + ' MB'
    );
}
```

### 10. Mobile Device Testing

#### Using Chrome DevTools:
1. Press F12 to open DevTools
2. Click "Toggle device toolbar" (Ctrl+Shift+M)
3. Select device:
   - iPhone SE (375px)
   - iPad (768px)
   - Desktop (1920px)
4. Test all features in each size

#### Expected Mobile Behavior:
- ✅ Sidebar becomes overlay
- ✅ Stats stack vertically
- ✅ Tables scroll horizontally
- ✅ Touch targets are 44px minimum
- ✅ No horizontal scroll on body

### 11. Accessibility Tests

#### Keyboard Navigation:
1. Press Tab to navigate through interactive elements
2. **Expected**: Clear focus indicators
3. Press Enter/Space on buttons
4. **Expected**: Actions trigger correctly

#### Screen Reader Test (Optional):
1. Enable screen reader (NVDA/JAWS on Windows, VoiceOver on Mac)
2. Navigate through page
3. **Expected**: All content is announced properly

### 12. Browser Compatibility

Test in these browsers:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Edge (latest)
- ✅ Safari (latest)

**Note**: Project uses modern JavaScript (ES6+), requires recent browsers.

---

## Common Issues & Solutions

### Issue: Charts not rendering
**Solution**: 
1. Check browser console for errors
2. Verify Chart.js CDN is loaded
3. Ensure canvas elements have correct IDs

### Issue: Notifications not appearing
**Solution**:
1. Check if notifications.js is loaded
2. Verify notification container exists
3. Check z-index conflicts

### Issue: Styles not applying
**Solution**:
1. Verify CSS files are loaded (check Network tab)
2. Check for file path errors
3. Clear browser cache (Ctrl+Shift+R)

### Issue: Data not loading
**Solution**:
1. Check data/brands.json exists
2. Verify file path is correct
3. Check CORS if loading from file://
4. Use mock data fallback (automatic)

### Issue: Responsive layout broken
**Solution**:
1. Verify responsive.css is loaded
2. Check viewport meta tag in HTML
3. Test in different device sizes

---

## Browser Console Debugging

### Enable verbose logging:
```javascript
// Add to console for detailed logs
localStorage.setItem('debug', 'true');
location.reload();
```

### Check module loading:
```javascript
console.log('Utils loaded:', typeof Utils !== 'undefined');
console.log('Notifications loaded:', typeof Notifications !== 'undefined');
console.log('Charts loaded:', typeof Charts !== 'undefined');
console.log('DataMgr loaded:', typeof DataMgr !== 'undefined');
console.log('Config loaded:', typeof CONFIG !== 'undefined');
```

### Monitor events:
```javascript
// Track all notification events
const originalShow = Notifications.show;
Notifications.show = function(...args) {
    console.log('Notification shown:', args);
    return originalShow.apply(this, args);
};

// Track filter changes
DataMgr.subscribe('filterChange', (filters) => {
    console.log('Filters changed:', filters);
});
```

---

## Performance Benchmarks

Expected performance:
- **Initial load**: < 2 seconds
- **Page navigation**: < 500ms
- **Chart rendering**: < 1 second
- **Filter update**: < 100ms
- **Notification display**: Instant

---

## Success Checklist

After testing, you should see:
- ✅ Dashboard loads without errors
- ✅ All 4 stat cards display
- ✅ Charts render correctly
- ✅ Platform filters work
- ✅ Notifications appear
- ✅ Sidebar toggles
- ✅ Responsive on mobile
- ✅ No console errors
- ✅ Smooth animations
- ✅ Data formatting works

---

**If all tests pass, congratulations! Your VoxlyPro dashboard is working perfectly! 🎉**
