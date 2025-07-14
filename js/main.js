// Main JavaScript file for SportStats
class SportStatsApp {
    constructor() {
        this.components = {};
        this.isLoaded = false;
        
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

    onDOMLoaded() {
        this.isLoaded = true;
        this.initializeComponents();
        this.setupEventListeners();
        this.loadInitialData();
        this.setupLiveUpdates();
    }

    initializeComponents() {
        // Components are initialized in their respective files
        // We just need to wait for them to be ready
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

    loadInitialData() {
        this.renderStatsCards();
        this.renderStandingsTable();
        this.renderTopScorers();
    }

    renderStatsCards() {
        const statsGrid = document.getElementById('statsGrid');
        if (!statsGrid) return;

        const statsHTML = mockData.stats.map(stat => this.createStatsCard(stat)).join('');
        statsGrid.innerHTML = statsHTML;

        // Add animation
        this.animateStatsCards();
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

    renderStandingsTable() {
        const tableBody = document.querySelector('#standingsTable tbody');
        if (!tableBody) return;

        const standingsHTML = mockData.standings.map(team => this.createStandingsRow(team)).join('');
        tableBody.innerHTML = standingsHTML;
    }

    createStandingsRow(team) {
        const positionClass = utils.getPositionClass(team.position);
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
                    ${utils.formatGoalDifference(team.goalDifference)}
                </td>
                <td>
                    <span class="points-badge">${team.points}</span>
                </td>
            </tr>
        `;
    }

    renderTopScorers() {
        const topScorersContainer = document.getElementById('topScorers');
        if (!topScorersContainer) return;

        const scorersHTML = mockData.topScorers.map(scorer => this.createScorerItem(scorer)).join('');
        topScorersContainer.innerHTML = scorersHTML;
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
        // Simulate live updates every 30 seconds
        setInterval(() => {
            this.updateLiveData();
        }, 30000);
    }

    updateLiveData() {
        // Simulate live score updates
        const liveMatches = mockData.matches.filter(match => match.status === 'live');
        
        liveMatches.forEach(match => {
            // Randomly update scores
            if (Math.random() > 0.7) {
                if (Math.random() > 0.5) {
                    match.homeScore++;
                } else {
                    match.awayScore++;
                }
                
                // Update time
                match.time = Math.min(parseInt(match.time) + Math.floor(Math.random() * 5), 90).toString();
            }
        });

        // Refresh tabs if we have the component
        if (this.components.tabs) {
            this.components.tabs.refreshActiveTab();
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

        // Here you could filter content by sport
        this.filterBySport(sport);
    }

    filterBySport(sport) {
        // This would filter matches, standings, etc. by sport
        // For now, we'll just log it
        console.log(`Filtering content by sport: ${sport}`);
    }

    handleSportSelection(sport) {
        console.log(`Sport selected: ${sport}`);
        this.scrollToSection('.matches-section');
        this.handleNavigation(sport);
    }

    handleSearchSelection(name, type) {
        console.log(`Search selection: ${type} - ${name}`);
        
        // Here you could navigate to specific pages or filter content
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
        // Match modal is handled by the tabs component
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

        // Animate elements on scroll
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
        // Simple mobile menu toggle
        const nav = document.querySelector('.nav');
        if (nav) {
            nav.classList.toggle('mobile-open');
        }
    }

    showTeamDetails(teamName) {
        // Placeholder for team details
        console.log(`Showing details for team: ${teamName}`);
    }

    showPlayerDetails(playerName) {
        // Placeholder for player details
        console.log(`Showing details for player: ${playerName}`);
    }

    showCompetitionDetails(competitionName) {
        // Placeholder for competition details
        console.log(`Showing details for competition: ${competitionName}`);
    }

    // Public API methods
    refreshData() {
        this.loadInitialData();
        if (this.components.tabs) {
            this.components.tabs.refreshActiveTab();
        }
        if (this.components.charts) {
            this.components.charts.updateGoalsChart(mockData.goalStats);
            this.components.charts.updateResultsChart(mockData.winPercentage);
        }
    }

    updateStats(newStats) {
        mockData.stats = newStats;
        this.renderStatsCards();
    }

    updateMatches(newMatches) {
        mockData.matches = newMatches;
        if (this.components.tabs) {
            this.components.tabs.refreshActiveTab();
        }
    }
}

// Add CSS animations
const animationStyles = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animated {
        animation-fill-mode: both;
    }
    
    .nav.mobile-open {
        display: flex !important;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        flex-direction: column;
        padding: 1rem;
        box-shadow: var(--shadow-lg);
        border-top: 1px solid var(--gray-200);
    }
    
    @media (max-width: 768px) {
        .nav {
            display: none;
        }
    }
`;

// Inject animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// Initialize the app
window.sportStatsApp = new SportStatsApp();

// Export for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SportStatsApp;
}

