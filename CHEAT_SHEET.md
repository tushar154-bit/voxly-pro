# 🎯 VoxlyPro - Command Cheat Sheet

## 🚀 Launch Commands

### Quick Launch:
```powershell
# Option 1: Double-click
launch.bat

# Option 2: PowerShell
.\launch.bat

# Option 3: Direct browser
start index.html
```

### Using Local Server:
```powershell
# Python
python -m http.server 8000
# Open: http://localhost:8000

# Node.js
npx http-server -p 8000
# Open: http://localhost:8000
```

---

## 🧪 Browser Console Commands

### Notifications:
```javascript
// Success
Notifications.success('Welcome to VoxlyPro!');

// Error
Notifications.error('Something went wrong!');

// Warning
Notifications.warning('High negative sentiment detected!');

// Info
Notifications.info('New mentions available');

// Loading (manual dismiss)
const id = Notifications.loading('Processing...');
setTimeout(() => Notifications.dismiss(id), 3000);

// With action button
Notifications.withAction({
    type: 'info',
    title: 'New Update',
    message: 'Version 2.0 is available',
    action: {
        label: 'Update',
        callback: () => alert('Updating!')
    }
});
```

### Utilities:
```javascript
// Format numbers
Utils.formatNumber(1234);        // "1.2K"
Utils.formatNumber(156789);      // "156.8K"
Utils.formatNumber(2500000);     // "2.5M"

// Format percentages
Utils.formatPercentage(12.5);    // "+12.5%"

// Format dates
Utils.formatDate(new Date(), 'short');    // "Nov 25, 2025"
Utils.formatDate(new Date(), 'relative'); // "Just now"

// Sentiment helpers
Utils.getSentimentColor(75);     // "#10b981"
Utils.getSentimentLabel(75);     // "Positive"
Utils.getSentimentIcon(75);      // "😊"

// Text utilities
Utils.truncate('Long text...', 20);
Utils.sanitizeHtml('<script>alert("xss")</script>');

// Array utilities
Utils.groupBy(array, 'platform');
Utils.sortBy(array, 'sentiment', 'desc');
Utils.unique(array, 'platform');
```

### Data Manager:
```javascript
// Get filtered data
const data = DataMgr.getFilteredData();
console.log(data);

// Update filters
DataMgr.updatePlatformFilters(['Twitter', 'Reddit']);
DataMgr.setFilter('sentiment', 'positive');
DataMgr.setFilter('dateRange', 'last30days');

// Clear filters
DataMgr.clearFilters();

// Search
const results = DataMgr.search('product');

// Subscribe to changes
const unsubscribe = DataMgr.subscribe('filterChange', (filters) => {
    console.log('Filters:', filters);
});

// Export data
const json = DataMgr.exportToJSON('mentions');
```

### Chart Manager:
```javascript
// Create charts
Charts.createSentimentTrend('canvasId');
Charts.createPlatformDistribution('canvasId');
Charts.createMentionVolume('canvasId');
Charts.createEngagementChart('canvasId');

// Update chart
Charts.updateChart('chartId', newData);

// Destroy chart
Charts.destroyChart('chartId');

// Export as image
const img = Charts.exportAsImage('chartId');
```

### System Check:
```javascript
// Check loaded modules
console.log('Utils:', typeof Utils !== 'undefined');
console.log('Notifications:', typeof Notifications !== 'undefined');
console.log('Charts:', typeof Charts !== 'undefined');
console.log('DataMgr:', typeof DataMgr !== 'undefined');
console.log('CONFIG:', typeof CONFIG !== 'undefined');

// Get all data
console.log('Brands:', DataMgr.data.brands);
console.log('Mentions:', DataMgr.data.mentions);

// Performance
console.log('Load time:', performance.now() + 'ms');
```

---

## ⌨️ Keyboard Shortcuts

```
F12              → Open DevTools
Ctrl + Shift + M → Toggle device toolbar
Ctrl + Shift + R → Hard reload (clear cache)
Ctrl + Shift + I → Open DevTools
Ctrl + K         → Global search (if implemented)
Ctrl + B         → Toggle sidebar (if implemented)
```

---

## 🛠️ PowerShell Commands

### File Operations:
```powershell
# Navigate to project
Set-Location "D:\Rushikesh\VoxlyPro"

# List files
Get-ChildItem
Get-ChildItem -Recurse  # Include subfolders
Get-ChildItem -Name     # Names only

# Count files
(Get-ChildItem -Recurse -File).Count

# Get total size
Get-ChildItem -Recurse -File | 
  Measure-Object -Property Length -Sum
```

### File Search:
```powershell
# Find files by name
Get-ChildItem -Recurse -Filter "*.js"
Get-ChildItem -Recurse -Filter "*.css"

# Search in files
Select-String -Path "*.js" -Pattern "function"
```

### Project Info:
```powershell
# Count lines of code
Get-ChildItem -Recurse -Include *.js,*.css,*.html | 
  Get-Content | 
  Measure-Object -Line
```

---

## 📁 File Paths Quick Reference

### Key Files:
```
index.html                    # Main app file
launch.bat                    # Launch script
START_HERE.md                 # Quick start guide
TESTING_GUIDE.md              # Testing instructions
FINAL_REPORT.md               # This session's work
```

### CSS Files:
```
css/main.css                  # Core styles
css/dashboard.css             # Dashboard styles
css/charts.css                # Chart styles
css/components.css            # UI components
css/animations.css            # Animations
css/responsive.css            # Responsive design
```

### JavaScript Files:
```
js/config.js                  # Configuration
js/app.js                     # Main application
js/dashboard.js               # Dashboard page
js/utils.js                   # Utilities
js/notifications.js           # Notifications
js/charts.js                  # Chart manager
js/data-manager.js            # Data manager
```

### Data Files:
```
data/brands.json              # Sample brands
```

---

## 🎨 Quick Customization

### Change Primary Color:
```css
/* In css/main.css */
:root {
    --primary-color: #8b5cf6;  /* Change this */
}
```

### Add Your Brand:
```json
// In data/brands.json
{
    "id": 4,
    "name": "YourBrand",
    "industry": "Technology",
    "keywords": ["yourbrand", "@yourbrand"],
    "active": true
}
```

### Update App Name:
```javascript
// In js/config.js
const CONFIG = {
    app: {
        name: 'Your App Name',
        version: '1.0.0'
    }
}
```

---

## 🐛 Debugging Commands

### Check Console Errors:
```javascript
// Clear console
console.clear();

// Check for errors
console.log('No errors? Check Network tab!');

// Log current state
console.log('State:', {
    utils: typeof Utils,
    notifications: typeof Notifications,
    charts: typeof Charts,
    data: typeof DataMgr
});
```

### Network Debugging:
```javascript
// Check loaded resources
performance.getEntriesByType('resource')
    .forEach(r => console.log(r.name));

// Check failed resources
performance.getEntriesByType('resource')
    .filter(r => r.transferSize === 0)
    .forEach(r => console.error('Failed:', r.name));
```

### Memory Usage:
```javascript
// Chrome only
if (performance.memory) {
    console.log('Heap Size:', 
        (performance.memory.usedJSHeapSize / 1048576).toFixed(2) + ' MB'
    );
}
```

---

## 📊 Quick Stats Commands

```javascript
// Get mention statistics
const stats = DataMgr.calculateStats(DataMgr.data.mentions);
console.table(stats);

// Get platform breakdown
const platforms = Utils.groupBy(DataMgr.data.mentions, 'platform');
Object.keys(platforms).forEach(p => {
    console.log(`${p}: ${platforms[p].length} mentions`);
});

// Get sentiment breakdown
const sentiments = Utils.groupBy(DataMgr.data.mentions, 'sentiment');
console.table(sentiments);
```

---

## 🎯 Testing Commands

```javascript
// Test all notifications
['success', 'error', 'warning', 'info'].forEach((type, i) => {
    setTimeout(() => {
        Notifications[type](`Test ${type} notification`);
    }, i * 500);
});

// Test all utilities
const tests = [
    Utils.formatNumber(156789),
    Utils.formatPercentage(12.5),
    Utils.formatDate(new Date(), 'relative'),
    Utils.getSentimentLabel(75)
];
console.table(tests);

// Stress test notifications
for (let i = 0; i < 10; i++) {
    Notifications.info(`Test notification ${i + 1}`);
}
```

---

## 📖 Documentation Commands

```powershell
# View documentation
notepad START_HERE.md
notepad TESTING_GUIDE.md
notepad ROADMAP.md
notepad FINAL_REPORT.md

# Or use default editor
ii START_HERE.md
```

---

## 🔥 Pro Tips

### Quick Test Suite:
```javascript
// Run this in console to test everything
function quickTest() {
    console.log('🧪 Running Quick Tests...\n');
    
    // Test 1: Modules loaded
    console.log('✓ Utils loaded:', typeof Utils !== 'undefined');
    console.log('✓ Notifications loaded:', typeof Notifications !== 'undefined');
    console.log('✓ Charts loaded:', typeof Charts !== 'undefined');
    console.log('✓ DataMgr loaded:', typeof DataMgr !== 'undefined');
    
    // Test 2: Notifications
    Notifications.success('✓ Notifications working!');
    
    // Test 3: Utilities
    console.log('✓ Format number:', Utils.formatNumber(156789));
    
    // Test 4: Data
    console.log('✓ Total mentions:', DataMgr.data.mentions.length);
    
    console.log('\n✅ All tests passed!');
}

quickTest();
```

### Reset Everything:
```javascript
// Clear filters
DataMgr.clearFilters();

// Dismiss all notifications
Notifications.dismissAll();

// Destroy all charts
Charts.destroyAll();

// Reload page
location.reload();
```

---

## 🎉 Success Commands

```javascript
// Celebrate!
Notifications.success('🎉 VoxlyPro is awesome!');
console.log('%c🚀 VoxlyPro Dashboard', 'font-size: 24px; color: #8b5cf6;');
console.log('%cProduction Demo Ready!', 'font-size: 16px; color: #10b981;');
```

---

**Quick Reference for VoxlyPro**  
**Keep this handy for fast testing and debugging!**
