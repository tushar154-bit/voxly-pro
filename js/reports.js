/* ===================================
   Voxly Pro - Reports Module
   Report Generation & Scheduling
   =================================== */

const Reports = {
    name: 'Reports',
    currentTab: 'create', // create, scheduled, history
    currentBrand: null,
    isAnimating: false,
    
    // Mock saved reports
    scheduledReports: [
        {
            id: 1,
            name: 'Weekly Brand Summary',
            type: 'summary',
            frequency: 'weekly',
            schedule: 'Every Monday at 9:00 AM',
            recipients: ['marketing@company.com', 'team@company.com'],
            lastSent: new Date(Date.now() - 7 * 24 * 3600000),
            status: 'active'
        },
        {
            id: 2,
            name: 'Monthly Analytics Report',
            type: 'analytics',
            frequency: 'monthly',
            schedule: '1st of every month at 10:00 AM',
            recipients: ['ceo@company.com', 'analytics@company.com'],
            lastSent: new Date(Date.now() - 30 * 24 * 3600000),
            status: 'active'
        },
        {
            id: 3,
            name: 'Daily Sentiment Check',
            type: 'sentiment',
            frequency: 'daily',
            schedule: 'Every day at 8:00 AM',
            recipients: ['support@company.com'],
            lastSent: new Date(Date.now() - 24 * 3600000),
            status: 'paused'
        }
    ],

    reportHistory: [
        {
            id: 101,
            name: 'Q4 2024 Comprehensive Report',
            type: 'comprehensive',
            generatedDate: new Date(Date.now() - 2 * 24 * 3600000),
            generatedBy: 'John Doe',
            format: 'PDF',
            size: '2.4 MB',
            downloads: 12
        },
        {
            id: 102,
            name: 'November Competitor Analysis',
            type: 'competitors',
            generatedDate: new Date(Date.now() - 5 * 24 * 3600000),
            generatedBy: 'Sarah Johnson',
            format: 'PDF',
            size: '1.8 MB',
            downloads: 8
        },
        {
            id: 103,
            name: 'Influencer Campaign Report',
            type: 'influencers',
            generatedDate: new Date(Date.now() - 10 * 24 * 3600000),
            generatedBy: 'Mike Chen',
            format: 'Excel',
            size: '856 KB',
            downloads: 15
        },
        {
            id: 104,
            name: 'Weekly Trends Summary',
            type: 'trends',
            generatedDate: new Date(Date.now() - 14 * 24 * 3600000),
            generatedBy: 'Auto-generated',
            format: 'PDF',
            size: '1.2 MB',
            downloads: 5
        }
    ],

    render() {
        // Get current brand info
        const currentBrandId = typeof APIData !== 'undefined' ? APIData.currentBrand : 'apple';
        const brand = typeof APIData !== 'undefined' ? APIData.brands[currentBrandId] : null;
        const brandName = brand ? brand.name : 'Your Brand';

        return `
            <div class="reports-page">
                <!-- Header -->
                <div class="reports-header">
                    <div class="header-content">
                        <h1>Reports</h1>
                        <p>Generate reports for <strong>${brandName}</strong></p>
                    </div>
                </div>

                <!-- Tabs -->
                <div class="reports-tabs">
                    <button class="tab-btn ${this.currentTab === 'create' ? 'active' : ''}" data-tab="create">
                        <span class="material-icons">add_circle</span>
                        Create Report
                    </button>
                    <button class="tab-btn ${this.currentTab === 'scheduled' ? 'active' : ''}" data-tab="scheduled">
                        <span class="material-icons">schedule</span>
                        Scheduled Reports (${this.scheduledReports.length})
                    </button>
                    <button class="tab-btn ${this.currentTab === 'history' ? 'active' : ''}" data-tab="history">
                        <span class="material-icons">history</span>
                        Report History (${this.reportHistory.length})
                    </button>
                </div>

                <!-- Tab Content -->
                <div class="reports-content" id="reportsContent">
                    <!-- Populated by loadTabContent() -->
                </div>
            </div>
        `;
    },

    init() {
        console.log('Reports module initialized');
        this.currentBrand = typeof APIData !== 'undefined' ? APIData.currentBrand : 'apple';
        this.loadTabContent();
        this.attachEventListeners();
        this.updateBrandSelector();
    },

    updateBrandSelector() {
        // Update the brand dropdown in the create report form
        const brandSelect = document.getElementById('reportBrand');
        if (!brandSelect || typeof APIData === 'undefined') return;

        const brand = APIData.brands[this.currentBrand];
        const competitors = brand?.competitors || [];

        let options = `<option value="${this.currentBrand}">${brand?.name || 'Current Brand'} (Current)</option>`;
        competitors.forEach(compId => {
            const comp = APIData.brands[compId];
            if (comp) {
                options += `<option value="${compId}">${comp.name}</option>`;
            }
        });
        options += `<option value="all">All Brands</option>`;

        brandSelect.innerHTML = options;
    },

    async handleBrandChange(brandId, force = false) {
        if (this.isAnimating) return;
        if (!force && brandId === this.currentBrand) return;

        this.isAnimating = true;
        this.currentBrand = brandId;

        if (typeof APIData !== 'undefined') {
            APIData.setActiveBrand(brandId);
        }

        // Update brand selector
        this.updateBrandSelector();
        this.loadTabContent();

        // Update header
        const brand = typeof APIData !== 'undefined' ? APIData.brands[brandId] : null;
        const headerContent = document.querySelector('.reports-header .header-content p');
        if (headerContent && brand) {
            headerContent.innerHTML = `Generate reports for <strong>${brand.name}</strong>`;
        }

        try {
            if (window.notificationManager) {
                window.notificationManager.show(`Reports page updated for ${brand?.name || brandId}`, 'success');
            }
        } catch (e) {
            console.warn('Notification failed:', e);
        }

        this.isAnimating = false;
    },

    attachEventListeners() {
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.currentTab = e.currentTarget.dataset.tab;
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.loadTabContent();
            });
        });
    },

    loadTabContent() {
        const content = document.getElementById('reportsContent');
        if (!content) return;

        if (this.currentTab === 'create') {
            content.innerHTML = this.renderCreateTab();
            this.attachCreateTabEvents();
        } else if (this.currentTab === 'scheduled') {
            content.innerHTML = this.renderScheduledTab();
            this.attachScheduledTabEvents();
        } else if (this.currentTab === 'history') {
            content.innerHTML = this.renderHistoryTab();
            this.attachHistoryTabEvents();
        }
    },

    renderCreateTab() {
        return `
            <div class="create-report-container">
                <div class="report-builder">
                    <div class="builder-section">
                        <h3>1. Select Report Type</h3>
                        <div class="report-types-grid">
                            <div class="report-type-card" data-type="summary">
                                <span class="material-icons">summarize</span>
                                <h4>Brand Summary</h4>
                                <p>Overview of brand mentions, sentiment, and engagement</p>
                            </div>
                            <div class="report-type-card" data-type="analytics">
                                <span class="material-icons">analytics</span>
                                <h4>Analytics Deep Dive</h4>
                                <p>Detailed analytics with charts and metrics</p>
                            </div>
                            <div class="report-type-card" data-type="sentiment">
                                <span class="material-icons">mood</span>
                                <h4>Sentiment Analysis</h4>
                                <p>Comprehensive sentiment breakdown and trends</p>
                            </div>
                            <div class="report-type-card" data-type="competitors">
                                <span class="material-icons">groups</span>
                                <h4>Competitor Analysis</h4>
                                <p>Compare your brand against competitors</p>
                            </div>
                            <div class="report-type-card" data-type="influencers">
                                <span class="material-icons">stars</span>
                                <h4>Influencer Report</h4>
                                <p>Top influencers and their impact</p>
                            </div>
                            <div class="report-type-card" data-type="trends">
                                <span class="material-icons">trending_up</span>
                                <h4>Trends Report</h4>
                                <p>Trending topics, hashtags, and keywords</p>
                            </div>
                            <div class="report-type-card" data-type="comprehensive">
                                <span class="material-icons">description</span>
                                <h4>Comprehensive Report</h4>
                                <p>All-in-one report with complete insights</p>
                            </div>
                            <div class="report-type-card" data-type="custom">
                                <span class="material-icons">tune</span>
                                <h4>Custom Report</h4>
                                <p>Build a custom report with selected sections</p>
                            </div>
                        </div>
                    </div>

                    <div class="builder-section">
                        <h3>2. Configure Report Settings</h3>
                        <div class="settings-form">
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Report Name</label>
                                    <input type="text" id="reportName" placeholder="e.g., Q4 2024 Summary" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Date Range</label>
                                    <select id="reportDateRange" class="form-control">
                                        <option value="7">Last 7 days</option>
                                        <option value="30">Last 30 days</option>
                                        <option value="90">Last 90 days</option>
                                        <option value="thisMonth">This month</option>
                                        <option value="lastMonth">Last month</option>
                                        <option value="thisQuarter">This quarter</option>
                                        <option value="lastQuarter">Last quarter</option>
                                        <option value="thisYear">This year</option>
                                        <option value="custom">Custom range</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group">
                                    <label>Brand/Topic</label>
                                    <select id="reportBrand" class="form-control">
                                        <option value="all">All Brands</option>
                                        <option value="main">Main Brand</option>
                                        <option value="brand2">Brand 2</option>
                                        <option value="brand3">Brand 3</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Export Format</label>
                                    <select id="reportFormat" class="form-control">
                                        <option value="pdf">PDF Document</option>
                                        <option value="excel">Excel Spreadsheet</option>
                                        <option value="pptx">PowerPoint Presentation</option>
                                        <option value="json">JSON Data</option>
                                        <option value="csv">CSV File</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label>Include Sections</label>
                                <div class="checkbox-grid">
                                    <label class="checkbox-label">
                                        <input type="checkbox" checked> Executive Summary
                                    </label>
                                    <label class="checkbox-label">
                                        <input type="checkbox" checked> Key Metrics
                                    </label>
                                    <label class="checkbox-label">
                                        <input type="checkbox" checked> Sentiment Analysis
                                    </label>
                                    <label class="checkbox-label">
                                        <input type="checkbox" checked> Platform Breakdown
                                    </label>
                                    <label class="checkbox-label">
                                        <input type="checkbox"> Competitor Comparison
                                    </label>
                                    <label class="checkbox-label">
                                        <input type="checkbox"> Top Influencers
                                    </label>
                                    <label class="checkbox-label">
                                        <input type="checkbox"> Trending Topics
                                    </label>
                                    <label class="checkbox-label">
                                        <input type="checkbox"> Charts & Graphs
                                    </label>
                                </div>
                            </div>

                            <div class="form-group">
                                <label>
                                    <input type="checkbox" id="scheduleReport"> Schedule this report
                                </label>
                            </div>

                            <div id="scheduleSettings" style="display: none;" class="schedule-settings">
                                <div class="form-row">
                                    <div class="form-group">
                                        <label>Frequency</label>
                                        <select id="scheduleFrequency" class="form-control">
                                            <option value="daily">Daily</option>
                                            <option value="weekly">Weekly</option>
                                            <option value="monthly">Monthly</option>
                                            <option value="quarterly">Quarterly</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>Send Time</label>
                                        <input type="time" id="scheduleTime" class="form-control" value="09:00">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>Email Recipients (comma-separated)</label>
                                    <input type="text" id="scheduleRecipients" class="form-control" placeholder="email1@company.com, email2@company.com">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="builder-actions">
                        <button class="btn-secondary" onclick="Reports.previewReport()">
                            <span class="material-icons">visibility</span>
                            Preview Report
                        </button>
                        <button class="btn-primary" onclick="Reports.generateReport()">
                            <span class="material-icons">download</span>
                            Generate & Download
                        </button>
                    </div>
                </div>

                <!-- Report Preview Panel -->
                <div class="report-preview-panel" id="reportPreview" style="display: none;">
                    <h3>Report Preview</h3>
                    <div class="preview-content">
                        <!-- Preview will be populated here -->
                    </div>
                </div>
            </div>
        `;
    },

    renderScheduledTab() {
        return `
            <div class="scheduled-reports-container">
                <div class="section-header">
                    <h3>Scheduled Reports</h3>
                    <button class="btn-primary" onclick="Reports.currentTab='create'; Reports.loadTabContent();">
                        <span class="material-icons">add</span>
                        New Scheduled Report
                    </button>
                </div>

                <div class="scheduled-reports-list">
                    ${this.scheduledReports.map(report => this.renderScheduledReportCard(report)).join('')}
                </div>
            </div>
        `;
    },

    renderScheduledReportCard(report) {
        return `
            <div class="scheduled-report-card">
                <div class="report-card-header">
                    <div class="report-info">
                        <h4>${report.name}</h4>
                        <div class="report-meta">
                            <span class="report-type">${report.type}</span>
                            <span class="report-frequency">${report.frequency}</span>
                            <span class="report-status status-${report.status}">${report.status}</span>
                        </div>
                    </div>
                    <div class="report-actions">
                        <button class="action-btn" title="Edit" onclick="Reports.editScheduledReport(${report.id})">
                            <span class="material-icons">edit</span>
                        </button>
                        <button class="action-btn" title="${report.status === 'active' ? 'Pause' : 'Resume'}" onclick="Reports.toggleReportStatus(${report.id})">
                            <span class="material-icons">${report.status === 'active' ? 'pause' : 'play_arrow'}</span>
                        </button>
                        <button class="action-btn danger" title="Delete" onclick="Reports.deleteScheduledReport(${report.id})">
                            <span class="material-icons">delete</span>
                        </button>
                    </div>
                </div>

                <div class="report-card-body">
                    <div class="report-detail">
                        <span class="material-icons">schedule</span>
                        <div>
                            <div class="detail-label">Schedule</div>
                            <div class="detail-value">${report.schedule}</div>
                        </div>
                    </div>
                    <div class="report-detail">
                        <span class="material-icons">email</span>
                        <div>
                            <div class="detail-label">Recipients</div>
                            <div class="detail-value">${report.recipients.length} recipients</div>
                        </div>
                    </div>
                    <div class="report-detail">
                        <span class="material-icons">history</span>
                        <div>
                            <div class="detail-label">Last Sent</div>
                            <div class="detail-value">${Utils.formatDate(report.lastSent, 'relative')}</div>
                        </div>
                    </div>
                </div>

                <div class="report-card-footer">
                    <button class="btn-text" onclick="Reports.sendReportNow(${report.id})">
                        <span class="material-icons">send</span>
                        Send Now
                    </button>
                    <button class="btn-text" onclick="Reports.viewReportLog(${report.id})">
                        <span class="material-icons">description</span>
                        View Log
                    </button>
                </div>
            </div>
        `;
    },

    renderHistoryTab() {
        return `
            <div class="report-history-container">
                <div class="section-header">
                    <h3>Report History</h3>
                    <div class="header-controls">
                        <input type="search" placeholder="Search reports..." class="search-input">
                        <select class="filter-select">
                            <option value="all">All Types</option>
                            <option value="summary">Summary</option>
                            <option value="analytics">Analytics</option>
                            <option value="sentiment">Sentiment</option>
                            <option value="competitors">Competitors</option>
                            <option value="influencers">Influencers</option>
                            <option value="trends">Trends</option>
                            <option value="comprehensive">Comprehensive</option>
                        </select>
                    </div>
                </div>

                <div class="report-history-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Report Name</th>
                                <th>Type</th>
                                <th>Generated Date</th>
                                <th>Generated By</th>
                                <th>Format</th>
                                <th>Size</th>
                                <th>Downloads</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.reportHistory.map(report => this.renderHistoryRow(report)).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },

    renderHistoryRow(report) {
        return `
            <tr>
                <td><strong>${report.name}</strong></td>
                <td><span class="type-badge">${report.type}</span></td>
                <td>${Utils.formatDate(report.generatedDate, 'MMM DD, YYYY')}</td>
                <td>${report.generatedBy}</td>
                <td><span class="format-badge">${report.format}</span></td>
                <td>${report.size}</td>
                <td>${report.downloads}</td>
                <td>
                    <div class="table-actions">
                        <button class="action-btn" title="Download" onclick="Reports.downloadReport(${report.id})">
                            <span class="material-icons">download</span>
                        </button>
                        <button class="action-btn" title="Share" onclick="Reports.shareReport(${report.id})">
                            <span class="material-icons">share</span>
                        </button>
                        <button class="action-btn danger" title="Delete" onclick="Reports.deleteReport(${report.id})">
                            <span class="material-icons">delete</span>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    },

    attachCreateTabEvents() {
        // Report type selection
        document.querySelectorAll('.report-type-card').forEach(card => {
            card.addEventListener('click', (e) => {
                document.querySelectorAll('.report-type-card').forEach(c => c.classList.remove('selected'));
                e.currentTarget.classList.add('selected');
            });
        });

        // Schedule checkbox toggle
        const scheduleCheckbox = document.getElementById('scheduleReport');
        const scheduleSettings = document.getElementById('scheduleSettings');
        
        if (scheduleCheckbox && scheduleSettings) {
            scheduleCheckbox.addEventListener('change', (e) => {
                scheduleSettings.style.display = e.target.checked ? 'block' : 'none';
            });
        }
    },

    attachScheduledTabEvents() {
        // Events are attached via onclick in the HTML
    },

    attachHistoryTabEvents() {
        // Events are attached via onclick in the HTML
    },

    previewReport() {
        const preview = document.getElementById('reportPreview');
        if (preview) {
            preview.style.display = 'block';
            preview.querySelector('.preview-content').innerHTML = `
                <div class="preview-message">
                    <span class="material-icons">visibility</span>
                    <h4>Report Preview</h4>
                    <p>Preview functionality coming soon. The report will include all selected sections with real-time data.</p>
                </div>
            `;
        }
        Notifications.info('Preview feature coming soon');
    },

    generateReport() {
        const reportName = document.getElementById('reportName')?.value || 'Untitled Report';
        const format = document.getElementById('reportFormat')?.value || 'pdf';
        
        Notifications.info('Generating report... This may take a moment');
        
        setTimeout(() => {
            // Simulate report generation
            const mockData = {
                reportName: reportName,
                generatedDate: new Date().toISOString(),
                format: format,
                sections: ['Executive Summary', 'Key Metrics', 'Sentiment Analysis', 'Platform Breakdown']
            };

            Utils.downloadFile(
                JSON.stringify(mockData, null, 2),
                `${reportName.replace(/\s+/g, '-').toLowerCase()}.${format}`,
                format === 'json' ? 'application/json' : 'application/octet-stream'
            );

            Notifications.success('Report generated successfully!');
        }, 2000);
    },

    editScheduledReport(id) {
        Notifications.info(`Editing scheduled report #${id}`);
        // Switch to create tab with pre-filled data
        this.currentTab = 'create';
        this.loadTabContent();
    },

    toggleReportStatus(id) {
        const report = this.scheduledReports.find(r => r.id === id);
        if (report) {
            report.status = report.status === 'active' ? 'paused' : 'active';
            this.loadTabContent();
            Notifications.success(`Report ${report.status === 'active' ? 'resumed' : 'paused'}`);
        }
    },

    deleteScheduledReport(id) {
        if (confirm('Are you sure you want to delete this scheduled report?')) {
            this.scheduledReports = this.scheduledReports.filter(r => r.id !== id);
            this.loadTabContent();
            Notifications.success('Scheduled report deleted');
        }
    },

    sendReportNow(id) {
        const report = this.scheduledReports.find(r => r.id === id);
        if (report) {
            Notifications.info(`Sending "${report.name}" to ${report.recipients.length} recipients...`);
            setTimeout(() => {
                report.lastSent = new Date();
                Notifications.success('Report sent successfully!');
            }, 1500);
        }
    },

    viewReportLog(id) {
        Notifications.info('Opening report log...');
    },

    downloadReport(id) {
        const report = this.reportHistory.find(r => r.id === id);
        if (report) {
            report.downloads++;
            Notifications.success(`Downloading "${report.name}"`);
            this.loadTabContent();
        }
    },

    shareReport(id) {
        const report = this.reportHistory.find(r => r.id === id);
        if (report) {
            Notifications.info(`Share options for "${report.name}" coming soon`);
        }
    },

    deleteReport(id) {
        if (confirm('Are you sure you want to delete this report from history?')) {
            this.reportHistory = this.reportHistory.filter(r => r.id !== id);
            this.loadTabContent();
            Notifications.success('Report deleted from history');
        }
    },

    destroy() {
        console.log('Reports module destroyed');
    }
};

// Make available globally
window.Reports = Reports;
