/**
 * Voxly Pro - Main Application
 * Entry point for the application
 */

class VoxlyApp {
    constructor() {
        this.currentPage = 'dashboard';
        this.sidebarCollapsed = false;
        this.init();
    }

    async init() {
        console.log('🚀 Initializing Voxly Pro...');
        
        // Show loading screen
        this.showLoadingScreen();
        
        // Initialize components
        await this.initializeComponents();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Load initial page
        await this.loadPage('dashboard');
        
        // Hide loading screen
        setTimeout(() => {
            this.hideLoadingScreen();
        }, 1500);
        
        console.log('✅ Voxly Pro initialized successfully!');
    }    async initializeComponents() {
        // Initialize data manager
        if (typeof DataMgr !== 'undefined') {
            await DataMgr.init();
            console.log('✓ Data Manager initialized');
        }
        
        // Initialize notification system (already initialized globally)
        if (typeof Notifications !== 'undefined') {
            console.log('✓ Notification system ready');
        }
        
        // Initialize chart manager (already initialized globally)
        if (typeof Charts !== 'undefined') {
            console.log('✓ Chart Manager ready');
        }
    }

    setupEventListeners() {
        // Sidebar toggle
        const sidebarToggle = document.getElementById('sidebarToggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => this.toggleSidebar());
        }

        // Navigation items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const page = item.dataset.page;
                this.navigateToPage(page);
            });
        });

        // Global search
        const searchInput = document.getElementById('globalSearch');
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performGlobalSearch(searchInput.value);
                }
            });

            // Initialize search autocomplete
            this.initSearchAutocomplete();
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Notification button
        const notificationBtn = document.getElementById('notificationBtn');
        if (notificationBtn) {
            notificationBtn.addEventListener('click', () => {
                this.showNotifications();
            });
        }

        // Quick actions button
        const quickActionsBtn = document.getElementById('quickActionsBtn');
        if (quickActionsBtn) {
            quickActionsBtn.addEventListener('click', () => {
                this.showQuickActions();
            });
        }

        // User menu button
        const userMenuBtn = document.getElementById('userMenuBtn');
        if (userMenuBtn) {
            userMenuBtn.addEventListener('click', () => {
                this.showUserMenu();
            });
        }
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.toggle('collapsed');
            this.sidebarCollapsed = !this.sidebarCollapsed;
            
            // Save preference
            localStorage.setItem('sidebarCollapsed', this.sidebarCollapsed);
            
            // Trigger resize event for charts
            window.dispatchEvent(new Event('resize'));
        }
    }

    async navigateToPage(page) {
        if (this.currentPage === page) return;
        
        // Update active nav item
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const activeItem = document.querySelector(`[data-page="${page}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }
        
        // Load page content
        await this.loadPage(page);
    }

    async loadPage(page) {
        const pageContent = document.getElementById('pageContent');
        const pageTitle = document.getElementById('pageTitle');
        const breadcrumbCurrent = document.getElementById('breadcrumbCurrent');
        
        if (!pageContent) return;
        
        this.currentPage = page;
        
        // Show loading state
        pageContent.innerHTML = '<div class="loading-state">Loading...</div>';
        
        try {
            let content = '';
            let title = '';
            // Destroy previous page if it has cleanup
            if (this.currentPageInstance && typeof this.currentPageInstance.destroy === 'function') {
                this.currentPageInstance.destroy();
            }

            switch (page) {
                case 'dashboard':
                    title = 'Dashboard';
                    if (typeof DashboardPage !== 'undefined') {
                        this.currentPageInstance = new DashboardPage();
                        content = this.currentPageInstance.render();
                        setTimeout(() => this.currentPageInstance.init(), 100);
                    }
                    break;

                case 'realtime':
                    title = 'Real-Time Monitor';
                    if (typeof Realtime !== 'undefined') {
                        this.currentPageInstance = Realtime;
                        content = Realtime.render();
                        setTimeout(() => Realtime.init(), 100);
                    }
                    break;

                case 'analytics':
                    title = 'Advanced Analytics';
                    if (typeof Analytics !== 'undefined') {
                        this.currentPageInstance = Analytics;
                        content = Analytics.render();
                        setTimeout(() => Analytics.init(), 100);
                    }
                    break;

                case 'competitors':
                    title = 'Competitor Analysis';
                    if (typeof Competitors !== 'undefined') {
                        this.currentPageInstance = Competitors;
                        content = Competitors.render();
                        setTimeout(() => Competitors.init(), 100);
                    }
                    break;

                case 'influencers':
                    title = 'Influencer Hub';
                    if (typeof Influencers !== 'undefined') {
                        this.currentPageInstance = Influencers;
                        content = Influencers.render();
                        setTimeout(() => Influencers.init(), 100);
                    }
                    break;

                case 'trends':
                    title = 'Trend Discovery';
                    if (typeof Trends !== 'undefined') {
                        this.currentPageInstance = Trends;
                        content = Trends.render();
                        setTimeout(() => Trends.init(), 100);
                    }
                    break;

                case 'reports':
                    title = 'Reports';
                    if (typeof Reports !== 'undefined') {
                        this.currentPageInstance = Reports;
                        content = Reports.render();
                        setTimeout(() => Reports.init(), 100);
                    }
                    break;

                case 'settings':
                    title = 'Settings';
                    if (typeof Settings !== 'undefined') {
                        this.currentPageInstance = Settings;
                        content = Settings.render();
                        setTimeout(() => Settings.init(), 100);
                    }
                    break;

                default:
                    content = '<div class="empty-state"><h2>Page not found</h2></div>';
            }
            
            pageContent.innerHTML = content;
            if (pageTitle) pageTitle.textContent = title;
            if (breadcrumbCurrent) breadcrumbCurrent.textContent = title;
            
        } catch (error) {
            console.error('Error loading page:', error);
            pageContent.innerHTML = '<div class="error-state">Error loading page</div>';
        }
    }

    async performGlobalSearch(query) {
        if (!query || query.trim() === '') return;

        console.log('🔍 Searching for:', query);
        const searchTerm = query.trim().toLowerCase();

        // Check if searching for a brand
        if (typeof APIData !== 'undefined') {
            const brands = Object.values(APIData.brands);

            // Priority 1: Exact brand name or ID match
            let matchedBrand = brands.find(brand =>
                brand.name.toLowerCase() === searchTerm ||
                brand.id.toLowerCase() === searchTerm
            );

            // Priority 2: Partial brand name or ID match
            if (!matchedBrand) {
                matchedBrand = brands.find(brand =>
                    brand.name.toLowerCase().includes(searchTerm) ||
                    brand.id.toLowerCase().includes(searchTerm)
                );
            }

            // Priority 3: Product match (lowest priority)
            if (!matchedBrand) {
                matchedBrand = brands.find(brand =>
                    brand.products.some(p => p.toLowerCase().includes(searchTerm))
                );
            }

            if (matchedBrand) {
                console.log(`🔍 Brand matched: ${matchedBrand.name} (${matchedBrand.id})`);

                // Set the active brand
                APIData.setActiveBrand(matchedBrand.id);
                console.log(`✓ APIData.currentBrand set to: ${APIData.currentBrand}`);

                // Update dashboard if it's the current page
                console.log(`📋 currentPageInstance:`, this.currentPageInstance);
                console.log(`📋 Has handleBrandChange:`, typeof this.currentPageInstance?.handleBrandChange);

                if (this.currentPageInstance && this.currentPageInstance.handleBrandChange) {
                    console.log(`🚀 Calling handleBrandChange for ${matchedBrand.id}...`);
                    await this.currentPageInstance.handleBrandChange(matchedBrand.id, true);
                    console.log(`✅ handleBrandChange completed`);
                } else {
                    console.warn('⚠️ No currentPageInstance or handleBrandChange method');
                }

                // Show notification
                if (window.notificationManager) {
                    window.notificationManager.show(`Now monitoring ${matchedBrand.name}`, 'success');
                }

                // Clear search input
                const searchInput = document.getElementById('globalSearch');
                if (searchInput) {
                    searchInput.value = '';
                    searchInput.placeholder = `Monitoring: ${matchedBrand.name}`;
                }

                return;
            }
        }

        // If no brand match, show regular search notification
        if (window.notificationManager) {
            window.notificationManager.show(`Searching for "${query}"...`, 'info');
        }
    }

    /**
     * Initialize search autocomplete with brand suggestions
     */
    initSearchAutocomplete() {
        const searchInput = document.getElementById('globalSearch');
        if (!searchInput || typeof APIData === 'undefined') return;

        // Create dropdown container
        let dropdown = document.getElementById('searchDropdown');
        if (!dropdown) {
            dropdown = document.createElement('div');
            dropdown.id = 'searchDropdown';
            dropdown.className = 'search-dropdown';
            searchInput.parentNode.appendChild(dropdown);
        }

        // Handle input changes
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (query.length < 1) {
                dropdown.classList.remove('active');
                return;
            }

            const brands = Object.values(APIData.brands);

            // Prioritize brand name/id matches over product matches
            const nameMatches = brands.filter(brand =>
                brand.name.toLowerCase().includes(query) ||
                brand.id.toLowerCase().includes(query)
            );

            const productMatches = brands.filter(brand =>
                !brand.name.toLowerCase().includes(query) &&
                !brand.id.toLowerCase().includes(query) &&
                brand.products.some(p => p.toLowerCase().includes(query))
            );

            // Combine with name matches first
            const matches = [...nameMatches, ...productMatches];

            if (matches.length > 0) {
                dropdown.innerHTML = matches.map(brand => {
                    // Use Clearbit for high-quality logos (with size parameter)
                    const domain = brand.logo.replace('https://logo.clearbit.com/', '');
                    const clearbitLogo = `https://logo.clearbit.com/${domain}?size=128`;
                    const googleFavicon = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

                    return `
                    <div class="search-suggestion" data-brand="${brand.id}">
                        <div class="suggestion-logo-wrapper">
                            <img src="${clearbitLogo}" class="suggestion-logo-img" alt="${brand.name}"
                                onerror="this.onerror=null; this.src='${googleFavicon}';"
                                loading="eager">
                            <div class="suggestion-logo-fallback" style="background: ${brand.color};">
                                ${brand.name.charAt(0)}
                            </div>
                        </div>
                        <div class="suggestion-info">
                            <span class="suggestion-name">${brand.name}</span>
                            <span class="suggestion-industry">${APIData.industries[brand.industry]?.name || brand.industry}</span>
                        </div>
                    </div>
                `}).join('');
                dropdown.classList.add('active');

                // Add click handlers
                dropdown.querySelectorAll('.search-suggestion').forEach(item => {
                    item.addEventListener('click', () => {
                        this.performGlobalSearch(item.dataset.brand);
                        dropdown.classList.remove('active');
                    });
                });
            } else {
                dropdown.classList.remove('active');
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    }

    handleKeyboardShortcuts(e) {
        // Ctrl/Cmd + K: Focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('globalSearch');
            if (searchInput) searchInput.focus();
        }
        
        // Ctrl/Cmd + B: Toggle sidebar
        if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
            e.preventDefault();
            this.toggleSidebar();
        }
        
        // Escape: Close modals
        if (e.key === 'Escape') {
            const modal = document.querySelector('.modal-container.active');
            if (modal) {
                modal.classList.remove('active');
            }
        }
    }

    handleResize() {
        // Handle responsive behavior
        const width = window.innerWidth;
        
        if (width < 768) {
            // Mobile: auto-collapse sidebar
            const sidebar = document.getElementById('sidebar');
            if (sidebar && !this.sidebarCollapsed) {
                sidebar.classList.add('collapsed');
            }
        }
    }

    showLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.remove('hidden');
        }
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            
            // Remove from DOM after animation
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }

    showNotifications() {
        console.log('📬 Showing notifications');
        // Implement notifications panel
        if (window.notificationManager) {
            window.notificationManager.showPanel();
        }
    }

    showQuickActions() {
        console.log('⚡ Showing quick actions');
        // Implement quick actions menu
    }

    showUserMenu() {
        console.log('👤 Showing user menu');
        // Implement user menu
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.voxlyApp = new VoxlyApp();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VoxlyApp;
}
