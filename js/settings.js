/**
 * Settings Page
 * Application configuration and user preferences
 */

class SettingsPage {
    constructor() {
        this.settings = this.loadSettings();
    }

    render() {
        return `
            <div class="settings-container">
                <!-- Page Header -->
                <div class="page-header">
                    <div class="page-header-left">
                        <h1 class="page-title">Settings</h1>
                        <p class="page-subtitle">Manage your preferences and configuration</p>
                    </div>
                    <div class="page-header-right">
                        <button class="btn btn-secondary" id="resetSettingsBtn">
                            <i class="fas fa-undo"></i>
                            <span>Reset to Defaults</span>
                        </button>
                        <button class="btn btn-primary" id="saveSettingsBtn">
                            <i class="fas fa-save"></i>
                            <span>Save Changes</span>
                        </button>
                    </div>
                </div>

                <!-- Settings Tabs -->
                <div class="settings-layout">
                    <!-- Sidebar Menu -->
                    <div class="settings-sidebar">
                        <div class="settings-menu" id="settingsMenu">
                            <button class="settings-menu-item active" data-section="general">
                                <i class="fas fa-cog"></i>
                                <span>General</span>
                            </button>
                            <button class="settings-menu-item" data-section="brands">
                                <i class="fas fa-building"></i>
                                <span>Brands</span>
                            </button>
                            <button class="settings-menu-item" data-section="platforms">
                                <i class="fas fa-share-alt"></i>
                                <span>Platforms</span>
                            </button>
                            <button class="settings-menu-item" data-section="alerts">
                                <i class="fas fa-bell"></i>
                                <span>Alerts & Notifications</span>
                            </button>
                            <button class="settings-menu-item" data-section="integrations">
                                <i class="fas fa-plug"></i>
                                <span>Integrations</span>
                            </button>
                            <button class="settings-menu-item" data-section="team">
                                <i class="fas fa-users"></i>
                                <span>Team</span>
                            </button>
                            <button class="settings-menu-item" data-section="appearance">
                                <i class="fas fa-palette"></i>
                                <span>Appearance</span>
                            </button>
                            <button class="settings-menu-item" data-section="privacy">
                                <i class="fas fa-shield-alt"></i>
                                <span>Privacy & Security</span>
                            </button>
                        </div>
                    </div>

                    <!-- Settings Content -->
                    <div class="settings-content">
                        <div id="settingsContentArea">
                            <!-- Content loaded dynamically -->
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    init() {
        this.loadSection('general');
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Menu items
        const menuItems = document.querySelectorAll('.settings-menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                menuItems.forEach(mi => mi.classList.remove('active'));
                item.classList.add('active');
                this.loadSection(item.dataset.section);
            });
        });

        // Save button
        const saveBtn = document.getElementById('saveSettingsBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.saveSettings());
        }

        // Reset button
        const resetBtn = document.getElementById('resetSettingsBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetSettings());
        }
    }

    loadSection(section) {
        const contentArea = document.getElementById('settingsContentArea');
        if (!contentArea) return;

        switch(section) {
            case 'general':
                contentArea.innerHTML = this.renderGeneralSettings();
                break;
            case 'brands':
                contentArea.innerHTML = this.renderBrandsSettings();
                break;
            case 'platforms':
                contentArea.innerHTML = this.renderPlatformsSettings();
                break;
            case 'alerts':
                contentArea.innerHTML = this.renderAlertsSettings();
                break;
            case 'integrations':
                contentArea.innerHTML = this.renderIntegrationsSettings();
                break;
            case 'team':
                contentArea.innerHTML = this.renderTeamSettings();
                break;
            case 'appearance':
                contentArea.innerHTML = this.renderAppearanceSettings();
                break;
            case 'privacy':
                contentArea.innerHTML = this.renderPrivacySettings();
                break;
        }

        this.attachSectionEventListeners(section);
    }

    renderGeneralSettings() {
        return `
            <div class="settings-section">
                <h2 class="settings-section-title">General Settings</h2>
                <p class="settings-section-description">Configure basic application preferences</p>

                <div class="card">
                    <div class="card-body">
                        <div class="form-group">
                            <label class="form-label">Application Name</label>
                            <input type="text" class="form-input" value="VoxlyPro" id="appName">
                            <small class="form-helper">Customize your application name</small>
                        </div>

                        <div class="form-group">
                            <label class="form-label">Language</label>
                            <select class="form-select" id="language">
                                <option value="en" selected>English</option>
                                <option value="es">Spanish</option>
                                <option value="fr">French</option>
                                <option value="de">German</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label class="form-label">Timezone</label>
                            <select class="form-select" id="timezone">
                                <option value="UTC">UTC</option>
                                <option value="America/New_York" selected>Eastern Time</option>
                                <option value="America/Los_Angeles">Pacific Time</option>
                                <option value="Europe/London">London</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label class="form-label">Date Format</label>
                            <select class="form-select" id="dateFormat">
                                <option value="MM/DD/YYYY" selected>MM/DD/YYYY</option>
                                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <div class="form-checkbox">
                                <input type="checkbox" id="autoRefresh" checked>
                                <label for="autoRefresh">Auto-refresh data every 5 minutes</label>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="form-checkbox">
                                <input type="checkbox" id="soundNotifications">
                                <label for="soundNotifications">Enable sound notifications</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderBrandsSettings() {
        return `
            <div class="settings-section">
                <h2 class="settings-section-title">Brand Management</h2>
                <p class="settings-section-description">Add and manage brands to monitor</p>

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Active Brands</h3>
                        <button class="btn btn-sm btn-primary" id="addBrandBtn">
                            <i class="fas fa-plus"></i> Add Brand
                        </button>
                    </div>
                    <div class="card-body">
                        <div class="brands-list">
                            <div class="brand-item">
                                <div class="brand-info">
                                    <h4>TechCorp</h4>
                                    <p>Technology Industry</p>
                                    <div class="brand-keywords">
                                        <span class="badge badge-primary">techcorp</span>
                                        <span class="badge badge-primary">@techcorp</span>
                                        <span class="badge badge-primary">#techcorp</span>
                                    </div>
                                </div>
                                <div class="brand-actions">
                                    <button class="btn btn-sm btn-secondary">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-sm btn-danger">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderPlatformsSettings() {
        return `
            <div class="settings-section">
                <h2 class="settings-section-title">Platform Settings</h2>
                <p class="settings-section-description">Configure social media platform monitoring</p>

                <div class="card">
                    <div class="card-body">
                        <div class="platform-toggles">
                            ${['Twitter', 'Reddit', 'YouTube', 'LinkedIn', 'Facebook', 'Instagram'].map(platform => `
                                <div class="platform-toggle-item">
                                    <div class="platform-info">
                                        <h4>${platform}</h4>
                                        <p>Monitor mentions on ${platform}</p>
                                    </div>
                                    <label class="toggle-switch">
                                        <input type="checkbox" checked>
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderAlertsSettings() {
        return `
            <div class="settings-section">
                <h2 class="settings-section-title">Alerts & Notifications</h2>
                <p class="settings-section-description">Configure when and how you receive alerts</p>

                <div class="card">
                    <div class="card-body">
                        <div class="form-group">
                            <label class="form-label">Volume Spike Threshold</label>
                            <input type="range" class="form-range" min="10" max="100" value="50" id="volumeThreshold">
                            <div class="range-value">50% increase</div>
                            <small class="form-helper">Alert when mention volume spikes above this percentage</small>
                        </div>

                        <div class="form-group">
                            <label class="form-label">Sentiment Drop Threshold</label>
                            <input type="range" class="form-range" min="10" max="50" value="30" id="sentimentThreshold">
                            <div class="range-value">30% drop</div>
                            <small class="form-helper">Alert when sentiment drops below this threshold</small>
                        </div>

                        <div class="form-group">
                            <h4>Email Notifications</h4>
                            <div class="form-checkbox">
                                <input type="checkbox" id="emailDaily" checked>
                                <label for="emailDaily">Daily summary report</label>
                            </div>
                            <div class="form-checkbox">
                                <input type="checkbox" id="emailWeekly" checked>
                                <label for="emailWeekly">Weekly analytics report</label>
                            </div>
                            <div class="form-checkbox">
                                <input type="checkbox" id="emailAlerts" checked>
                                <label for="emailAlerts">Instant alerts for critical issues</label>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="form-label">Alert Email</label>
                            <input type="email" class="form-input" value="user@example.com" id="alertEmail">
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderIntegrationsSettings() {
        return `
            <div class="settings-section">
                <h2 class="settings-section-title">Integrations</h2>
                <p class="settings-section-description">Connect with third-party services</p>

                <div class="integrations-grid">
                    ${[
                        { name: 'Slack', icon: 'fab fa-slack', connected: true },
                        { name: 'Microsoft Teams', icon: 'fab fa-microsoft', connected: false },
                        { name: 'Google Analytics', icon: 'fab fa-google', connected: true },
                        { name: 'Salesforce', icon: 'fas fa-cloud', connected: false },
                        { name: 'HubSpot', icon: 'fab fa-hubspot', connected: false },
                        { name: 'Zapier', icon: 'fas fa-bolt', connected: true }
                    ].map(integration => `
                        <div class="integration-card ${integration.connected ? 'connected' : ''}">
                            <div class="integration-icon">
                                <i class="${integration.icon}"></i>
                            </div>
                            <h4>${integration.name}</h4>
                            <p>${integration.connected ? 'Connected' : 'Not connected'}</p>
                            <button class="btn btn-sm ${integration.connected ? 'btn-danger' : 'btn-primary'}">
                                ${integration.connected ? 'Disconnect' : 'Connect'}
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderTeamSettings() {
        return `
            <div class="settings-section">
                <h2 class="settings-section-title">Team Management</h2>
                <p class="settings-section-description">Manage team members and permissions</p>

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Team Members</h3>
                        <button class="btn btn-sm btn-primary">
                            <i class="fas fa-user-plus"></i> Invite Member
                        </button>
                    </div>
                    <div class="card-body">
                        <div class="table-container">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>John Doe</strong></td>
                                        <td>john@example.com</td>
                                        <td><span class="badge badge-primary">Admin</span></td>
                                        <td><span class="badge badge-success">Active</span></td>
                                        <td>
                                            <button class="btn btn-sm btn-secondary"><i class="fas fa-edit"></i></button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><strong>Jane Smith</strong></td>
                                        <td>jane@example.com</td>
                                        <td><span class="badge badge-info">Editor</span></td>
                                        <td><span class="badge badge-success">Active</span></td>
                                        <td>
                                            <button class="btn btn-sm btn-secondary"><i class="fas fa-edit"></i></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderAppearanceSettings() {
        return `
            <div class="settings-section">
                <h2 class="settings-section-title">Appearance</h2>
                <p class="settings-section-description">Customize the look and feel</p>

                <div class="card">
                    <div class="card-body">
                        <div class="form-group">
                            <label class="form-label">Theme</label>
                            <div class="theme-options">
                                <label class="theme-option">
                                    <input type="radio" name="theme" value="light" checked>
                                    <div class="theme-preview theme-light">
                                        <span>Light</span>
                                    </div>
                                </label>
                                <label class="theme-option">
                                    <input type="radio" name="theme" value="dark">
                                    <div class="theme-preview theme-dark">
                                        <span>Dark</span>
                                    </div>
                                </label>
                                <label class="theme-option">
                                    <input type="radio" name="theme" value="auto">
                                    <div class="theme-preview theme-auto">
                                        <span>Auto</span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="form-label">Primary Color</label>
                            <div class="color-picker">
                                <input type="color" value="#8b5cf6" id="primaryColor">
                                <span class="color-value">#8b5cf6</span>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="form-label">Dashboard Layout</label>
                            <select class="form-select" id="dashboardLayout">
                                <option value="default" selected>Default</option>
                                <option value="compact">Compact</option>
                                <option value="comfortable">Comfortable</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderPrivacySettings() {
        return `
            <div class="settings-section">
                <h2 class="settings-section-title">Privacy & Security</h2>
                <p class="settings-section-description">Manage your data and security settings</p>

                <div class="card">
                    <div class="card-body">
                        <div class="form-group">
                            <h4>Data Collection</h4>
                            <div class="form-checkbox">
                                <input type="checkbox" id="analyticsTracking" checked>
                                <label for="analyticsTracking">Enable usage analytics</label>
                            </div>
                            <div class="form-checkbox">
                                <input type="checkbox" id="errorReporting" checked>
                                <label for="errorReporting">Send error reports</label>
                            </div>
                        </div>

                        <div class="form-group">
                            <h4>Security</h4>
                            <div class="form-checkbox">
                                <input type="checkbox" id="twoFactor">
                                <label for="twoFactor">Enable two-factor authentication</label>
                            </div>
                            <div class="form-checkbox">
                                <input type="checkbox" id="sessionTimeout" checked>
                                <label for="sessionTimeout">Auto-logout after 30 minutes of inactivity</label>
                            </div>
                        </div>

                        <div class="form-group">
                            <button class="btn btn-danger">
                                <i class="fas fa-trash"></i>
                                Delete All Data
                            </button>
                            <small class="form-helper text-danger">This action cannot be undone</small>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    attachSectionEventListeners(section) {
        // Add specific event listeners based on section
        if (section === 'brands') {
            const addBrandBtn = document.getElementById('addBrandBtn');
            if (addBrandBtn) {
                addBrandBtn.addEventListener('click', () => {
                    Notifications.info('Add brand feature coming soon');
                });
            }
        }

        if (section === 'appearance') {
            const colorPicker = document.getElementById('primaryColor');
            if (colorPicker) {
                colorPicker.addEventListener('change', (e) => {
                    document.documentElement.style.setProperty('--primary-color', e.target.value);
                    Notifications.success('Primary color updated');
                });
            }
        }
    }

    loadSettings() {
        // Load from localStorage or use defaults
        return JSON.parse(localStorage.getItem('voxly_settings') || '{}');
    }

    saveSettings() {
        // Collect all settings from form inputs
        const settings = {
            appName: document.getElementById('appName')?.value,
            language: document.getElementById('language')?.value,
            timezone: document.getElementById('timezone')?.value,
            // ... collect other settings
            savedAt: new Date().toISOString()
        };

        localStorage.setItem('voxly_settings', JSON.stringify(settings));
        Notifications.success('Settings saved successfully');
    }

    resetSettings() {
        if (confirm('Are you sure you want to reset all settings to default?')) {
            localStorage.removeItem('voxly_settings');
            this.settings = {};
            this.loadSection('general');
            Notifications.success('Settings reset to defaults');
        }
    }

    destroy() {
        // Cleanup
    }
}

// Create global instance for app.js
const Settings = {
    instance: null,
    render() {
        this.instance = new SettingsPage();
        return this.instance.render();
    },
    init() {
        if (this.instance) {
            this.instance.init();
        }
    },
    async handleBrandChange(brandId, force = false) {
        // Settings page doesn't need brand-specific updates
        // but we add this for consistency across all pages
        if (typeof APIData !== 'undefined') {
            APIData.setActiveBrand(brandId);
        }
    },
    destroy() {
        if (this.instance) {
            this.instance.destroy();
        }
    }
};

// Make available globally
window.Settings = Settings;
window.SettingsPage = SettingsPage;

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SettingsPage;
}
