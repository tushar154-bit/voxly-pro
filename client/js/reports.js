/* ===================================
   Voxly Pro - Reports Module
   Report Generation & Scheduling
   =================================== */

const Reports = {
    name: 'Reports',
    currentTab: 'create', // create, scheduled, history
    currentBrand: null,
    selectedSubtype: 'summary', // reflects which Report Type card is selected
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

        // Phase 5: hydrate from live backend API (non-blocking fallback to mock).
        this.loadLiveData();
    },

    async loadLiveData() {
        if (typeof window.API === 'undefined') return;
        try {
            const { reports } = await window.API.reports.list();
            this.liveReports = reports || [];
            // Merge live reports into the History tab list so the existing UI picks them up.
            this.reportHistory = this.liveReports.map((r) => ({
                id: r.id,
                name: r.name,
                type: r.type,
                format: r.format,
                generatedDate: r.createdAt,
                generatedBy: 'You',
                size: '—',
                downloads: 0,
                isLive: true,
            }));
            if (this.currentTab === 'history' || !this.currentTab) {
                this.loadTabContent();
            }
            console.log(`✓ Reports hydrated from API (${this.liveReports.length})`);
        } catch (err) {
            console.warn('Reports live data unavailable, using mock fallback:', err.message);
        }
    },

    async previewLive(id) {
        if (typeof window.API === 'undefined') return;
        try {
            const data = await window.API.reports.preview(id);
            this.openPreviewModal(data);
        } catch (err) {
            if (typeof Notifications !== 'undefined') {
                Notifications.error(`Preview unavailable: ${err.message}`);
            }
        }
    },

    openPreviewModal(data) {
        const { report, period, summary, keywords, mentions } = data;
        const fmtNum = (n) => {
            if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
            if (n >= 1_000)     return (n / 1_000).toFixed(1) + 'K';
            return String(n);
        };
        const fmtDate = (d) => new Date(d).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
        const fmtDateTime = (d) => new Date(d).toLocaleString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        const sentimentTag = (label) => {
            const map = { positive: '#10b981', neutral: '#64748b', negative: '#ef4444' };
            return `<span style="color:${map[label] || '#64748b'};font-weight:600;text-transform:capitalize;">${label}</span>`;
        };

        const mix = summary.sentimentMix;
        const mixTotal = Math.max(1, mix.positive + mix.neutral + mix.negative);
        const mixPct = (n) => Math.round((n / mixTotal) * 100);

        const downloadHref = window.API.reports.downloadUrl(report.id);

        const existing = document.getElementById('reportPreviewModal');
        if (existing) existing.remove();

        const modal = document.createElement('div');
        modal.id = 'reportPreviewModal';
        modal.innerHTML = `
            <div class="rp-backdrop" onclick="Reports.closePreview()"></div>
            <div class="rp-modal" role="dialog" aria-modal="true">
                <div class="rp-header">
                    <div>
                        <div class="rp-title">${report.name}</div>
                        <div class="rp-meta">
                            ${report.brand ? `<span>${report.brand.name}</span><span>·</span>` : ''}
                            <span style="text-transform:capitalize;">${report.type}</span>
                            <span>·</span>
                            <span>${report.format.toUpperCase()}</span>
                            <span>·</span>
                            <span>Generated ${fmtDate(report.createdAt)}</span>
                        </div>
                        <div class="rp-period">Period: ${fmtDate(period.from)} → ${fmtDate(period.to)} (${period.days} days)</div>
                    </div>
                    <div class="rp-actions">
                        <a class="rp-btn primary" href="${downloadHref}" download>
                            <span class="material-icons" style="font-size:18px;">download</span>
                            Download ${report.format.toUpperCase()}
                        </a>
                        <button class="rp-btn" onclick="Reports.closePreview()">
                            <span class="material-icons">close</span>
                        </button>
                    </div>
                </div>

                <div class="rp-body">
                    <div class="rp-stats-grid">
                        <div class="rp-stat"><div class="rp-stat-label">Total Mentions</div><div class="rp-stat-value">${fmtNum(summary.totalMentions)}</div></div>
                        <div class="rp-stat"><div class="rp-stat-label">Unique Authors</div><div class="rp-stat-value">${fmtNum(summary.uniqueAuthors)}</div></div>
                        <div class="rp-stat"><div class="rp-stat-label">Avg Sentiment</div><div class="rp-stat-value">${summary.avgSentiment}/100</div></div>
                        <div class="rp-stat"><div class="rp-stat-label">Avg Engagement</div><div class="rp-stat-value">${summary.avgEngagement}%</div></div>
                        <div class="rp-stat"><div class="rp-stat-label">Total Reach</div><div class="rp-stat-value">${fmtNum(summary.totalReach)}</div></div>
                        <div class="rp-stat"><div class="rp-stat-label">Engagement Volume</div><div class="rp-stat-value">${fmtNum(summary.totalLikes + summary.totalShares + summary.totalComments)}</div></div>
                    </div>

                    <div class="rp-sentiment-bar">
                        <div class="rp-sentiment-bar-row">
                            <span class="rp-sb-label">Sentiment Breakdown</span>
                            <div class="rp-sb-track">
                                <div style="width:${mixPct(mix.positive)}%;background:#10b981;"></div>
                                <div style="width:${mixPct(mix.neutral)}%;background:#94a3b8;"></div>
                                <div style="width:${mixPct(mix.negative)}%;background:#ef4444;"></div>
                            </div>
                        </div>
                        <div class="rp-sb-legend">
                            <span><span class="rp-sb-dot" style="background:#10b981;"></span>Positive ${mixPct(mix.positive)}%</span>
                            <span><span class="rp-sb-dot" style="background:#94a3b8;"></span>Neutral ${mixPct(mix.neutral)}%</span>
                            <span><span class="rp-sb-dot" style="background:#ef4444;"></span>Negative ${mixPct(mix.negative)}%</span>
                        </div>
                    </div>

                    <div class="rp-section">
                        <h4>Top Keywords</h4>
                        <table class="rp-table">
                            <thead><tr><th>Term</th><th>Kind</th><th>Count</th><th>Sentiment</th><th>Growth</th></tr></thead>
                            <tbody>
                                ${keywords.length === 0 ? '<tr><td colspan="5" style="text-align:center;color:#64748b;padding:1rem;">No keywords in this period.</td></tr>' : keywords.map((k) => `
                                    <tr>
                                        <td><strong>${k.term}</strong></td>
                                        <td><span class="rp-kind-tag">${k.kind}</span></td>
                                        <td>${fmtNum(k.count)}</td>
                                        <td>${k.sentiment}/100</td>
                                        <td style="color:${k.growth >= 0 ? '#10b981' : '#ef4444'};">${k.growth >= 0 ? '+' : ''}${k.growth}%</td>
                                    </tr>`).join('')}
                            </tbody>
                        </table>
                    </div>

                    <div class="rp-section">
                        <h4>Recent Mentions (${mentions.length})</h4>
                        <div class="rp-mentions">
                            ${mentions.length === 0 ? '<div style="text-align:center;color:#64748b;padding:1rem;">No mentions in this period.</div>' : mentions.map((m) => `
                                <div class="rp-mention">
                                    <div class="rp-mention-head">
                                        <div>
                                            <strong>${m.authorName}</strong>
                                            <span style="color:#64748b;">${m.authorHandle}</span>
                                            <span class="rp-platform-tag">${m.platform}</span>
                                            ${sentimentTag(m.sentimentLabel)}
                                        </div>
                                        <div style="color:#94a3b8;font-size:0.75rem;">${fmtDateTime(m.postedAt)}</div>
                                    </div>
                                    <div class="rp-mention-body">${m.content}</div>
                                    <div class="rp-mention-footer">
                                        <span>❤ ${fmtNum(m.likes)}</span>
                                        <span>↻ ${fmtNum(m.shares)}</span>
                                        <span>💬 ${fmtNum(m.comments)}</span>
                                        <span>👁 ${fmtNum(m.reach)}</span>
                                    </div>
                                </div>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
    },

    closePreview() {
        const modal = document.getElementById('reportPreviewModal');
        if (modal) modal.remove();
        document.body.style.overflow = '';
    },

    async createLive(form) {
        if (typeof window.API === 'undefined') return null;
        try {
            const { report } = await window.API.reports.create({
                name: form.name || `Report ${new Date().toLocaleDateString()}`,
                type: form.type || 'custom',
                format: form.format || 'csv',
                brandSlug: form.brandSlug || this.currentBrand,
            });
            this.liveReports = [report, ...(this.liveReports || [])];
            this.loadLiveData();
            if (typeof Notifications !== 'undefined') {
                Notifications.success('Report generated');
            }
            return report;
        } catch (err) {
            if (typeof Notifications !== 'undefined') {
                Notifications.error(`Could not create report: ${err.message}`);
            }
            return null;
        }
    },

    async deleteLive(id) {
        if (typeof window.API === 'undefined') return;
        try {
            await window.API.reports.remove(id);
            this.liveReports = (this.liveReports || []).filter((r) => r.id !== id);
            this.loadLiveData();
            if (typeof Notifications !== 'undefined') Notifications.success('Report deleted');
        } catch (err) {
            if (typeof Notifications !== 'undefined') Notifications.error(err.message);
        }
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
                                <div class="icon-wrapper">
                                    <span class="material-icons">summarize</span>
                                </div>
                                <h4>Brand Summary</h4>
                                <p>Overview of brand mentions, sentiment, and engagement</p>
                            </div>
                            <div class="report-type-card" data-type="analytics">
                                <div class="icon-wrapper">
                                    <span class="material-icons">analytics</span>
                                </div>
                                <h4>Analytics Deep Dive</h4>
                                <p>Detailed analytics with charts and metrics</p>
                            </div>
                            <div class="report-type-card" data-type="sentiment">
                                <div class="icon-wrapper">
                                    <span class="material-icons">mood</span>
                                </div>
                                <h4>Sentiment Analysis</h4>
                                <p>Comprehensive sentiment breakdown and trends</p>
                            </div>
                            <div class="report-type-card" data-type="competitors">
                                <div class="icon-wrapper">
                                    <span class="material-icons">groups</span>
                                </div>
                                <h4>Competitor Analysis</h4>
                                <p>Compare your brand against competitors</p>
                            </div>
                            <div class="report-type-card" data-type="influencers">
                                <div class="icon-wrapper">
                                    <span class="material-icons">stars</span>
                                </div>
                                <h4>Influencer Report</h4>
                                <p>Top influencers and their impact</p>
                            </div>
                            <div class="report-type-card" data-type="trends">
                                <div class="icon-wrapper">
                                    <span class="material-icons">trending_up</span>
                                </div>
                                <h4>Trends Report</h4>
                                <p>Trending topics, hashtags, and keywords</p>
                            </div>
                            <div class="report-type-card" data-type="comprehensive">
                                <div class="icon-wrapper">
                                    <span class="material-icons">description</span>
                                </div>
                                <h4>Comprehensive Report</h4>
                                <p>All-in-one report with complete insights</p>
                            </div>
                            <div class="report-type-card" data-type="custom">
                                <div class="icon-wrapper">
                                    <span class="material-icons">tune</span>
                                </div>
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

                            <div class="form-group" id="customSectionsGroup">
                                <label>
                                    Include Sections
                                    <span id="customSectionsHint" style="margin-left:8px;color:#94a3b8;font-size:0.75rem;font-weight:normal;">(applies only to Custom Report — other types include their default sections automatically)</span>
                                </label>
                                <div class="checkbox-grid">
                                    <label class="checkbox-label">
                                        <input type="checkbox" class="report-section" data-section="summary" checked> Top Mentions &amp; Keywords
                                    </label>
                                    <label class="checkbox-label">
                                        <input type="checkbox" class="report-section" data-section="analytics" checked> Platform Analytics
                                    </label>
                                    <label class="checkbox-label">
                                        <input type="checkbox" class="report-section" data-section="sentiment" checked> Sentiment Analysis
                                    </label>
                                    <label class="checkbox-label">
                                        <input type="checkbox" class="report-section" data-section="competitors"> Competitor Comparison
                                    </label>
                                    <label class="checkbox-label">
                                        <input type="checkbox" class="report-section" data-section="influencers"> Top Influencers
                                    </label>
                                    <label class="checkbox-label">
                                        <input type="checkbox" class="report-section" data-section="trends"> Trends &amp; Hashtags
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
        // Wrap the id in quotes so string CUIDs (live reports) don't become invalid JS identifiers in inline onclick.
        const quotedId = `'${String(report.id).replace(/'/g, "\\'")}'`;

        const previewAttr = report.isLive
            ? `onclick="Reports.previewLive(${quotedId})"`
            : `onclick="Notifications.info('Preview available for generated reports only')"`;

        const downloadAttr = report.isLive
            ? `href="${window.API?.reports ? window.API.reports.downloadUrl(report.id) : '#'}" download`
            : `href="#" onclick="event.preventDefault(); Reports.downloadReport(${quotedId});"`;

        const deleteAttr = report.isLive
            ? `onclick="Reports.deleteLive(${quotedId})"`
            : `onclick="Reports.deleteReport(${quotedId})"`;

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
                        <button class="action-btn" title="Preview" ${previewAttr}>
                            <span class="material-icons">visibility</span>
                        </button>
                        <a class="action-btn" title="Download" ${downloadAttr}>
                            <span class="material-icons">download</span>
                        </a>
                        <button class="action-btn" title="Share" onclick="Reports.shareReport(${quotedId})">
                            <span class="material-icons">share</span>
                        </button>
                        <button class="action-btn danger" title="Delete" ${deleteAttr}>
                            <span class="material-icons">delete</span>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    },

    attachCreateTabEvents() {
        // Report type selection — remember which subtype the user picked.
        // data-type values come from the HTML template; we map a couple to the
        // API's enum so they stay in sync with backend REPORT_SUBTYPES.
        const SUBTYPE_ALIASES = { summary: 'summary' };
        document.querySelectorAll('.report-type-card').forEach(card => {
            card.addEventListener('click', (e) => {
                document.querySelectorAll('.report-type-card').forEach(c => c.classList.remove('selected'));
                e.currentTarget.classList.add('selected');
                const raw = e.currentTarget.dataset.type;
                this.selectedSubtype = SUBTYPE_ALIASES[raw] || raw || 'summary';
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

    async previewReport() {
        const preview = document.getElementById('reportPreview');
        const content = preview?.querySelector('.preview-content');
        if (!preview || !content) return;

        preview.style.display = 'block';
        content.innerHTML = `
            <div class="preview-message">
                <span class="material-icons" style="animation: spin 1s linear infinite;">autorenew</span>
                <h4>Generating preview…</h4>
            </div>`;

        if (typeof window.API === 'undefined') {
            content.innerHTML = `
                <div class="preview-message">
                    <span class="material-icons">error_outline</span>
                    <h4>Preview unavailable</h4>
                    <p>API client not loaded. Please refresh.</p>
                </div>`;
            return;
        }

        const brandSlug = document.getElementById('reportBrand')?.value
                       || this.currentBrand
                       || (typeof APIData !== 'undefined' ? APIData.currentBrand : 'apple');

        try {
            const data = await window.API.reports.previewForBrand({
                brandSlug,
                period: '30d',
            });
            this.renderCreatePreview(content, data, brandSlug);
        } catch (err) {
            content.innerHTML = `
                <div class="preview-message">
                    <span class="material-icons">error_outline</span>
                    <h4>Preview unavailable</h4>
                    <p>${err.message}</p>
                </div>`;
        }
    },

    renderCreatePreview(container, data, brandSlug) {
        const fmtNum = (n) => {
            if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
            if (n >= 1_000)     return (n / 1_000).toFixed(1) + 'K';
            return String(n);
        };
        const fmtDate = (d) => new Date(d).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
        const brandName = data.brand?.name || brandSlug;
        const mix = data.summary.sentimentMix;
        const total = Math.max(1, mix.positive + mix.neutral + mix.negative);
        const pct = (n) => Math.round((n / total) * 100);

        container.innerHTML = `
            <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:1rem;margin-bottom:1rem;">
                <div>
                    <h3 style="margin:0 0 4px;">${brandName} — Report Preview</h3>
                    <div style="color:#64748b;font-size:0.85rem;">
                        ${fmtDate(data.period.from)} → ${fmtDate(data.period.to)} · ${data.period.days} days · real-time data
                    </div>
                </div>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:0.75rem;margin-bottom:1rem;">
                <div class="preview-stat"><div class="preview-stat-label">Total Mentions</div><div class="preview-stat-value">${fmtNum(data.summary.totalMentions)}</div></div>
                <div class="preview-stat"><div class="preview-stat-label">Unique Authors</div><div class="preview-stat-value">${fmtNum(data.summary.uniqueAuthors)}</div></div>
                <div class="preview-stat"><div class="preview-stat-label">Avg Sentiment</div><div class="preview-stat-value">${data.summary.avgSentiment}/100</div></div>
                <div class="preview-stat"><div class="preview-stat-label">Avg Engagement</div><div class="preview-stat-value">${data.summary.avgEngagement}%</div></div>
                <div class="preview-stat"><div class="preview-stat-label">Total Reach</div><div class="preview-stat-value">${fmtNum(data.summary.totalReach)}</div></div>
                <div class="preview-stat"><div class="preview-stat-label">Engagement Volume</div><div class="preview-stat-value">${fmtNum(data.summary.totalLikes + data.summary.totalShares + data.summary.totalComments)}</div></div>
            </div>

            <div style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:10px;padding:0.75rem 1rem;margin-bottom:1rem;">
                <div style="display:flex;align-items:center;gap:0.9rem;">
                    <span style="font-weight:600;color:#334155;font-size:0.85rem;flex-shrink:0;">Sentiment</span>
                    <div style="flex:1;display:flex;height:10px;border-radius:999px;overflow:hidden;background:#e2e8f0;">
                        <div style="width:${pct(mix.positive)}%;background:#10b981;"></div>
                        <div style="width:${pct(mix.neutral)}%;background:#94a3b8;"></div>
                        <div style="width:${pct(mix.negative)}%;background:#ef4444;"></div>
                    </div>
                </div>
                <div style="display:flex;gap:1.25rem;margin-top:0.5rem;font-size:0.8125rem;color:#475569;">
                    <span><span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:#10b981;margin-right:5px;"></span>Positive ${pct(mix.positive)}%</span>
                    <span><span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:#94a3b8;margin-right:5px;"></span>Neutral ${pct(mix.neutral)}%</span>
                    <span><span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:#ef4444;margin-right:5px;"></span>Negative ${pct(mix.negative)}%</span>
                </div>
            </div>

            <h4 style="margin:0 0 0.5rem;font-size:0.9rem;text-transform:uppercase;letter-spacing:0.4px;color:#0f172a;">Top Keywords</h4>
            <table style="width:100%;border-collapse:collapse;font-size:0.85rem;margin-bottom:1rem;">
                <thead><tr style="background:#f8fafc;">
                    <th style="text-align:left;padding:0.5rem 0.6rem;border-bottom:1px solid #e5e7eb;">Term</th>
                    <th style="text-align:left;padding:0.5rem 0.6rem;border-bottom:1px solid #e5e7eb;">Kind</th>
                    <th style="text-align:left;padding:0.5rem 0.6rem;border-bottom:1px solid #e5e7eb;">Count</th>
                    <th style="text-align:left;padding:0.5rem 0.6rem;border-bottom:1px solid #e5e7eb;">Growth</th>
                </tr></thead>
                <tbody>
                    ${data.keywords.length === 0
                        ? '<tr><td colspan="4" style="text-align:center;padding:0.75rem;color:#64748b;">No keywords</td></tr>'
                        : data.keywords.slice(0, 8).map((k) => `
                        <tr>
                            <td style="padding:0.45rem 0.6rem;border-bottom:1px solid #f1f5f9;"><strong>${k.term}</strong></td>
                            <td style="padding:0.45rem 0.6rem;border-bottom:1px solid #f1f5f9;text-transform:capitalize;">${k.kind}</td>
                            <td style="padding:0.45rem 0.6rem;border-bottom:1px solid #f1f5f9;">${fmtNum(k.count)}</td>
                            <td style="padding:0.45rem 0.6rem;border-bottom:1px solid #f1f5f9;color:${k.growth >= 0 ? '#10b981' : '#ef4444'};">${k.growth >= 0 ? '+' : ''}${k.growth}%</td>
                        </tr>`).join('')}
                </tbody>
            </table>

            <h4 style="margin:0 0 0.5rem;font-size:0.9rem;text-transform:uppercase;letter-spacing:0.4px;color:#0f172a;">Recent Mentions (sample)</h4>
            <div style="display:flex;flex-direction:column;gap:0.5rem;">
                ${data.mentions.slice(0, 5).map((m) => `
                    <div style="background:#fafbff;border:1px solid #e5e7eb;border-radius:8px;padding:0.6rem 0.8rem;">
                        <div style="display:flex;justify-content:space-between;font-size:0.8rem;color:#64748b;margin-bottom:4px;">
                            <div>
                                <strong style="color:#0f172a;">${m.authorName}</strong>
                                <span style="text-transform:capitalize;margin-left:8px;">${m.platform}</span>
                            </div>
                            <div>${new Date(m.postedAt).toLocaleDateString()}</div>
                        </div>
                        <div style="color:#1f2937;font-size:0.875rem;line-height:1.5;">${m.content}</div>
                    </div>`).join('')}
            </div>

            <style>@keyframes spin { from { transform: rotate(0); } to { transform: rotate(360deg); } }
                   .preview-stat{background:#f8fafc;border:1px solid #e5e7eb;border-radius:10px;padding:0.6rem 0.8rem;}
                   .preview-stat-label{font-size:0.7rem;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:0.4px;}
                   .preview-stat-value{font-size:1.2rem;font-weight:700;color:#0f172a;margin-top:2px;}
            </style>
        `;

        if (typeof Notifications !== 'undefined') {
            Notifications.success(`Preview ready for ${brandName}`);
        }
    },

    async generateReport() {
        const subtype = this.selectedSubtype || 'summary';
        const subtypeLabel = {
            summary: 'Brand Summary',
            analytics: 'Analytics Deep Dive',
            sentiment: 'Sentiment Analysis',
            competitors: 'Competitor Analysis',
            influencers: 'Influencer Report',
            trends: 'Trends Report',
            comprehensive: 'Comprehensive Report',
            custom: 'Custom Report',
        }[subtype] || 'Report';

        const userName = document.getElementById('reportName')?.value?.trim();
        const reportName = userName || `${subtypeLabel} — ${new Date().toLocaleDateString()}`;
        const format = (document.getElementById('reportFormat')?.value || 'pdf').toLowerCase();
        const brandSlug = document.getElementById('reportBrand')?.value
                       || this.currentBrand
                       || (typeof APIData !== 'undefined' ? APIData.currentBrand : 'apple');
        const typeSelect = document.getElementById('reportType');
        const type = ['weekly', 'monthly', 'custom'].includes(typeSelect?.value) ? typeSelect.value : 'custom';

        if (!['pdf', 'csv', 'json'].includes(format)) {
            Notifications.error(`Unsupported format: ${format}`);
            return;
        }
        if (typeof window.API === 'undefined') {
            Notifications.error('API client not loaded');
            return;
        }

        // For Custom Report, collect the checked sections from the UI.
        let sections;
        if (subtype === 'custom') {
            sections = Array.from(document.querySelectorAll('.report-section:checked'))
                .map((el) => el.dataset.section)
                .filter(Boolean);
            if (sections.length === 0) {
                Notifications.error('Select at least one section for Custom Report');
                return;
            }
        }

        Notifications.info(`Generating ${subtypeLabel}...`);

        try {
            const { report } = await window.API.reports.create({
                name: reportName,
                type,
                subtype,
                format,
                brandSlug,
                ...(sections ? { sections } : {}),
            });

            // Trigger the browser download of the just-created report.
            const url = window.API.reports.downloadUrl(report.id);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${reportName.replace(/\s+/g, '-').toLowerCase()}.${format}`;
            document.body.appendChild(a);
            a.click();
            a.remove();

            // Refresh the history tab so the new report appears there.
            if (typeof this.loadLiveData === 'function') this.loadLiveData();

            Notifications.success('Report generated — check your downloads folder');
        } catch (err) {
            Notifications.error(`Report generation failed: ${err.message}`);
        }
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
