// Main JavaScript file for SportStats with API integration
class SportStatsApp {
    constructor() {
        this.components = {};
        this.isLoaded = false;
        this.apiService = window.apiService;
        
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.onDOMLoaded();
            });
        } else {
            this.onDOMLoaded();
        }
    }

    async onDOMLoaded() {
        this.isLoaded = true;
        
        // Check API health
        const isApiHealthy = await this.apiService.healthCheck();
        if (!isApiHealthy) {
            console.warn('API is not available, falling back to mock data');
            this.showApiWarning();
        }

        this.initializeComponents();
        this.setupEventListeners();
        await this.loadInitialData();
        this.setupLiveUpdates();
    }

    showApiWarning() {
        const warningDiv = document.createElement('div');
        warningDiv.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: #f59e0b;
            color: white;
            padding: 0.5rem;
            text-align: center;
            z-index: 9999;
            font-size: 0.875rem;
        `;
        warningDiv.textContent = 'API não disponível - usando dados de demonstração';
        document.body.prepend(warningDiv);

        // Remove warning after 5 seconds
        setTimeout(() => {
            warningDiv.remove();
        }, 5000);
    }

    initializeComponents() {
        // Components are initialized in their respective files
        this.waitForComponents();
    }

    waitForComponents() {
        const checkComponents = () => {
            if (window.searchComponent && window.tabsComponent && window.chartsComponent) {
                this.components = {
                    search: window.searchComponent,
                    tabs: window.tabsComponent,
                    charts: window.chartsComponent
                };
                this.onComponentsReady();
            } else {
                setTimeout(checkComponents, 100);
            }
        };
        checkComponents();
    }

    onComponentsReady() {
        console.log('All components loaded successfully');
        this.setupCustomEventListeners();
    }

    setupEventListeners() {
        // Hero button
        const heroBtn = document.querySelector('.hero-btn');
        if (heroBtn) {
            heroBtn.addEventListener('click', () => {
                this.scrollToSection('.matches-section');
            });
        }

        // Navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleNavigation(e.target.textContent);
            });
        });

        // Mobile menu toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        // Sport cards
        const sportCards = document.querySelectorAll('.sport-card');
        sportCards.forEach(card => {
            card.addEventListener('click', () => {
                const sportName = card.querySelector('h3').textContent;
                this.handleSportSelection(sportName);
            });
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });

        // Scroll events for animations
        window.addEventListener('scroll', utils.debounce(() => {
            this.handleScroll();
        }, 100));
    }

    setupCustomEventListeners() {
        // Listen for search item selection
        document.addEventListener('searchItemSelected', (e) => {
            const { name, type } = e.detail;
            this.handleSearchSelection(name, type);
        });

        // Listen for match selection
        document.addEventListener('matchSelected', (e) => {
            const { match } = e.detail;
            this.handleMatchSelection(match);
        });
    }

    async loadInitialData() {
        try {
            await Promise.all([
                this.renderStatsCards(),
                this.renderStandingsTable(),
                this.renderTopScorers(),
                this.updateCharts()
            ]);
        } catch (error) {
            console.error('Error loading initial data:', error);
            // Fallback to mock data
            this.loadMockData();
        }
    }

    loadMockData() {
        // Fallback to original mock data implementation
        this.renderStatsCardsMock();
        this.renderStandingsTableMock();
        this.renderTopScorersMock();
    }

    async renderStatsCards() {
        try {
            const statsCards = await this.apiService.getStatsCards();
            const statsGrid = document.getElementById('statsGrid');
            if (!statsGrid) return;

            const statsHTML = statsCards.map(stat => this.createStatsCard(stat)).join('');
            statsGrid.innerHTML = statsHTML;
            this.animateStatsCards();
        } catch (error) {
            console.error('Error loading stats cards:', error);
            this.renderStatsCardsMock();
        }
    }

    renderStatsCardsMock() {
        const statsGrid = document.getElementById('statsGrid');
        if (!statsGrid) return;

        const statsHTML = mockData.stats.map(stat => this.createStatsCard(stat)).join('');
        statsGrid.innerHTML = statsHTML;
        this.animateStatsCards();
    }

    async renderStandingsTable() {
        try {
            // Get La Liga standings (competition ID 1)
            const standings = await this.apiService.getCompetitionStandings(1);
            const tableBody = document.querySelector('#standingsTable tbody');
            if (!tableBody) return;

            const standingsHTML = standings.map(team => this.createStandingsRow(team)).join('');
            tableBody.innerHTML = standingsHTML;
        } catch (error) {
            console.error('Error loading standings:', error);
            this.renderStandingsTableMock();
        }
    }

    renderStandingsTableMock() {
        const tableBody = document.querySelector('#standingsTable tbody');
        if (!tableBody) return;

        const standingsHTML = mockData.standings.map(team => this.createStandingsRow(team)).join('');
        tableBody.innerHTML = standingsHTML;
    }

    async renderTopScorers() {
        try {
            const topScorers = await this.apiService.getTopScorers(1, 5); // La Liga top 5
            const topScorersContainer = document.getElementById('topScorers');
            if (!topScorersContainer) return;

            const scorersHTML = topScorers.map(scorer => this.createScorerItem(scorer)).join('');
            topScorersContainer.innerHTML = scorersHTML;
        } catch (error) {
            console.error('Error loading top scorers:', error);
            this.renderTopScorersMock();
        }
    }

    renderTopScorersMock() {
        const topScorersContainer = document.getElementById('topScorers');
        if (!topScorersContainer) return;

        const scorersHTML = mockData.topScorers.map(scorer => this.createScorerItem(scorer)).join('');
        topScorersContainer.innerHTML = scorersHTML;
    }

    async updateCharts() {
        try {
            const [goalStats, resultStats] = await Promise.all([
                this.apiService.getGoalStatistics(1, 5), // La Liga top 5
                this.apiService.getResultStatistics(1) // La Liga results
            ]);

            if (this.components.charts) {
                this.components.charts.updateGoalsChart(goalStats);
                this.components.charts.updateResultsChart(resultStats);
            }
        } catch (error) {
            console.error('Error updating charts:', error);
            // Charts will use mock data from their initialization
        }
    }

    createStatsCard(stat) {
        const iconMap = {
            calendar: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>`,
            users: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>`,
            target: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="6"></circle>
                <circle cx="12" cy="12" r="2"></circle>
            </svg>`,
            trophy: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                <path d="M4 22h16"></path>
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
            </svg>`
        };

        const changeClass = stat.changeType === 'positive' ? 'positive' : 
                           stat.changeType === 'negative' ? 'negative' : '';

        return `
            <div class="stats-card" data-stat="${stat.title}">
                <div class="stats-card-header">
                    <div class="stats-card-title">${stat.title}</div>
                    <div class="stats-card-icon">${iconMap[stat.icon] || iconMap.target}</div>
                </div>
                <div class="stats-card-value">${stat.value}</div>
                <div class="stats-card-change ${changeClass}">
                    ${stat.changeType === 'positive' ? '↗' : stat.changeType === 'negative' ? '↘' : '→'} 
                    ${stat.change} vs. semana anterior
                </div>
            </div>
        `;
    }

    createStandingsRow(team) {
        const positionClass = this.getPositionClass(team.position);
        const goalDiffClass = team.goalDifference > 0 ? 'positive' : 
                             team.goalDifference < 0 ? 'negative' : '';
        const teamInitials = utils.getTeamInitials(team.name);

        return `
            <tr>
                <td>
                    <div class="position-indicator">
                        <span class="position-number">${team.position}</span>
                        <div class="position-bar ${positionClass}"></div>
                    </div>
                </td>
                <td>
                    <div class="team-info">
                        <div class="team-logo-small">${teamInitials}</div>
                        <span>${team.name}</span>
                    </div>
                </td>
                <td>${team.played}</td>
                <td>${team.wins}</td>
                <td>${team.draws}</td>
                <td>${team.losses}</td>
                <td>${team.goalsFor}</td>
                <td>${team.goalsAgainst}</td>
                <td class="goal-difference ${goalDiffClass}">
                    ${this.formatGoalDifference(team.goalDifference)}
                </td>
                <td>
                    <span class="points-badge">${team.points}</span>
                </td>
            </tr>
        `;
    }

    createScorerItem(scorer) {
        const playerInitials = utils.getTeamInitials(scorer.name);

        return `
            <div class="scorer-item">
                <div class="scorer-info">
                    <div class="scorer-position">${scorer.position}</div>
                    <div class="scorer-avatar">${playerInitials}</div>
                    <div class="scorer-details">
                        <h4>${scorer.name}</h4>
                        <p>${scorer.team}</p>
                    </div>
                </div>
                <div class="scorer-stats">
                    <div class="scorer-goals">${scorer.goals}</div>
                    <div class="scorer-matches">${scorer.matches} jogos</div>
                </div>
            </div>
        `;
    }

    getPositionClass(position) {
        if (position <= 4) return 'champions';
        if (position >= 9) return 'relegation';
        return 'normal';
    }

    formatGoalDifference(diff) {
        if (diff > 0) return `+${diff}`;
        return diff.toString();
    }

    animateStatsCards() {
        const cards = document.querySelectorAll('.stats-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    setupLiveUpdates() {
        // Update live data every 30 seconds
        setInterval(async () => {
            await this.updateLiveData();
        }, 30000);
    }

    async updateLiveData() {
        try {
            // Refresh tabs if we have the component
            if (this.components.tabs) {
                this.components.tabs.refreshActiveTab();
            }

            // Update stats cards
            await this.renderStatsCards();
        } catch (error) {
            console.error('Error updating live data:', error);
        }
    }

    handleNavigation(sport) {
        console.log(`Navigating to ${sport}`);
        
        // Update active nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.textContent === sport) {
                link.classList.add('active');
            }
        });

        this.filterBySport(sport);
    }

    filterBySport(sport) {
        console.log(`Filtering content by sport: ${sport}`);
        // This would filter matches, standings, etc. by sport
        // Implementation would depend on API endpoints for different sports
    }

    handleSportSelection(sport) {
        console.log(`Sport selected: ${sport}`);
        this.scrollToSection('.matches-section');
        this.handleNavigation(sport);
    }

    handleSearchSelection(name, type) {
        console.log(`Search selection: ${type} - ${name}`);
        
        if (type === 'team') {
            this.showTeamDetails(name);
        } else if (type === 'player') {
            this.showPlayerDetails(name);
        } else if (type === 'competition') {
            this.showCompetitionDetails(name);
        }
    }

    handleMatchSelection(match) {
        console.log(`Match selected:`, match);
    }

    handleKeyboardShortcuts(e) {
        // Ctrl/Cmd + K to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.focus();
            }
        }

        // Escape to clear search
        if (e.key === 'Escape') {
            if (this.components.search) {
                this.components.search.clearSearch();
            }
        }
    }

    handleScroll() {
        const scrollY = window.scrollY;
        
        // Add scroll effect to header
        const header = document.querySelector('.header');
        if (header) {
            if (scrollY > 100) {
                header.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
            } else {
                header.style.boxShadow = '0 1px 2px 0 rgb(0 0 0 / 0.05)';
            }
        }

        this.animateOnScroll();
    }

    animateOnScroll() {
        const elements = document.querySelectorAll('.card, .sport-card');
        
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && !element.classList.contains('animated')) {
                element.classList.add('animated');
                element.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }

    scrollToSection(selector) {
        const element = document.querySelector(selector);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    toggleMobileMenu() {
        const nav = document.querySelector('.nav');
        if (nav) {
            nav.classList.toggle('mobile-open');
        }
    }

    showTeamDetails(teamName) {
        console.log(`Showing details for team: ${teamName}`);
    }

    showPlayerDetails(playerName) {
        console.log(`Showing details for player: ${playerName}`);
    }

    showCompetitionDetails(competitionName) {
        console.log(`Showing details for competition: ${competitionName}`);
    }

    // Public API methods
    async refreshData() {
        await this.loadInitialData();
        if (this.components.tabs) {
            this.components.tabs.refreshActiveTab();
        }
    }

    async updateStats(newStats) {
        // This would update via API in a real implementation
        await this.renderStatsCards();
    }

    async updateMatches(newMatches) {
        // This would update via API in a real implementation
        if (this.components.tabs) {
            this.components.tabs.refreshActiveTab();
        }
    }
}

// Initialize the app
window.sportStatsApp = new SportStatsApp();

// Export for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SportStatsApp;
}

