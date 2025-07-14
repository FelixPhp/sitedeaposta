// Tabs functionality for matches section
class TabsComponent {
    constructor() {
        this.tabTriggers = document.querySelectorAll('.tab-trigger');
        this.tabPanels = document.querySelectorAll('.tab-panel');
        this.activeTab = 'live';
        
        this.init();
    }

    init() {
        if (this.tabTriggers.length === 0) return;

        // Add click event listeners to tab triggers
        this.tabTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                const tabId = e.target.dataset.tab;
                this.switchTab(tabId);
            });
        });

        // Load initial content
        this.loadTabContent(this.activeTab);
    }

    switchTab(tabId) {
        if (tabId === this.activeTab) return;

        // Update active tab
        this.activeTab = tabId;

        // Update tab triggers
        this.tabTriggers.forEach(trigger => {
            trigger.classList.remove('active');
            if (trigger.dataset.tab === tabId) {
                trigger.classList.add('active');
            }
        });

        // Update tab panels
        this.tabPanels.forEach(panel => {
            panel.classList.remove('active');
            if (panel.id === `${tabId}Matches`) {
                panel.classList.add('active');
            }
        });

        // Load content for the active tab
        this.loadTabContent(tabId);
    }

    loadTabContent(tabId) {
        const matches = utils.filterMatches(mockData.matches, tabId);
        const panel = document.getElementById(`${tabId}Matches`);
        
        if (!panel) return;

        if (matches.length === 0) {
            panel.innerHTML = this.createEmptyState(tabId);
        } else {
            const matchesHTML = matches.map(match => this.createMatchCard(match)).join('');
            panel.innerHTML = `<div class="matches-grid">${matchesHTML}</div>`;
        }

        // Add click handlers to match cards
        this.addMatchClickHandlers(panel);
    }

    createMatchCard(match) {
        const homeInitials = utils.getTeamInitials(match.homeTeam);
        const awayInitials = utils.getTeamInitials(match.awayTeam);
        
        let scoreDisplay = '';
        let timeDisplay = '';
        let liveBadge = '';

        if (match.status === 'live') {
            scoreDisplay = `${match.homeScore} - ${match.awayScore}`;
            timeDisplay = `
                <div class="match-time">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12,6 12,12 16,14"></polyline>
                    </svg>
                    ${utils.formatTime(match.time)}
                </div>
            `;
            liveBadge = '<span class="match-live-badge">AO VIVO</span>';
        } else if (match.status === 'finished') {
            scoreDisplay = `${match.homeScore} - ${match.awayScore}`;
            timeDisplay = `
                <div class="match-time">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12,6 12,12 16,14"></polyline>
                    </svg>
                    ${match.time}
                </div>
            `;
        } else {
            scoreDisplay = 'vs';
            timeDisplay = `
                <div class="match-time">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12,6 12,12 16,14"></polyline>
                    </svg>
                    ${match.time}
                </div>
            `;
        }

        return `
            <div class="match-card" data-match-id="${match.id}">
                <div class="match-header">
                    <div class="match-competition">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        ${match.competition}
                    </div>
                    ${liveBadge}
                </div>
                
                <div class="match-content">
                    <div class="match-team">
                        <div class="team-logo">${homeInitials}</div>
                        <div class="team-name">${match.homeTeam}</div>
                    </div>
                    
                    <div class="match-score">
                        <div class="score-display">${scoreDisplay}</div>
                        ${timeDisplay}
                    </div>
                    
                    <div class="match-team away">
                        <div class="team-logo">${awayInitials}</div>
                        <div class="team-name">${match.awayTeam}</div>
                    </div>
                </div>
            </div>
        `;
    }

    createEmptyState(tabId) {
        const messages = {
            live: {
                title: 'Nenhuma partida ao vivo',
                description: 'Não há partidas acontecendo no momento. Volte mais tarde para acompanhar os jogos ao vivo.'
            },
            today: {
                title: 'Nenhuma partida hoje',
                description: 'Não há partidas programadas para hoje. Confira as próximas partidas na aba "Próximas".'
            },
            upcoming: {
                title: 'Nenhuma partida próxima',
                description: 'Não há partidas programadas para os próximos dias. Volte mais tarde para ver a programação.'
            }
        };

        const message = messages[tabId] || messages.live;

        return `
            <div class="empty-state" style="text-align: center; padding: 3rem 1rem; color: var(--gray-500);">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" style="margin-bottom: 1rem; opacity: 0.5;">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <h3 style="font-size: var(--font-size-lg); font-weight: 600; margin-bottom: 0.5rem; color: var(--gray-700);">
                    ${message.title}
                </h3>
                <p style="font-size: var(--font-size-sm); max-width: 24rem; margin: 0 auto;">
                    ${message.description}
                </p>
            </div>
        `;
    }

    addMatchClickHandlers(panel) {
        const matchCards = panel.querySelectorAll('.match-card');
        matchCards.forEach(card => {
            card.addEventListener('click', () => {
                const matchId = card.dataset.matchId;
                this.handleMatchClick(matchId);
            });
        });
    }

    handleMatchClick(matchId) {
        const match = mockData.matches.find(m => m.id == matchId);
        if (!match) return;

        // Here you could implement navigation to match details page
        // For now, we'll show match information
        console.log('Match clicked:', match);

        // Dispatch custom event for other components
        const event = new CustomEvent('matchSelected', {
            detail: { match }
        });
        document.dispatchEvent(event);

        // You could also show a modal with match details
        this.showMatchModal(match);
    }

    showMatchModal(match) {
        // Simple modal implementation
        const modal = document.createElement('div');
        modal.className = 'match-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        `;

        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            border-radius: var(--radius-lg);
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        `;

        const homeInitials = utils.getTeamInitials(match.homeTeam);
        const awayInitials = utils.getTeamInitials(match.awayTeam);
        
        let scoreDisplay = match.status === 'upcoming' ? 'vs' : `${match.homeScore} - ${match.awayScore}`;
        let statusDisplay = match.status === 'live' ? 'AO VIVO' : 
                           match.status === 'finished' ? 'FINALIZADO' : 'PRÓXIMA';

        modalContent.innerHTML = `
            <div style="text-align: center;">
                <h2 style="margin-bottom: 1rem; color: var(--gray-900);">${match.competition}</h2>
                
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem;">
                    <div style="text-align: center; flex: 1;">
                        <div style="width: 4rem; height: 4rem; background: var(--gray-200); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; font-size: 1.5rem; font-weight: 600;">
                            ${homeInitials}
                        </div>
                        <h3 style="font-size: var(--font-size-lg); font-weight: 600;">${match.homeTeam}</h3>
                    </div>
                    
                    <div style="text-align: center; margin: 0 2rem;">
                        <div style="font-size: 2rem; font-weight: 700; margin-bottom: 0.5rem;">${scoreDisplay}</div>
                        <div style="background: ${match.status === 'live' ? 'var(--red-500)' : 'var(--gray-500)'}; color: white; padding: 0.25rem 0.75rem; border-radius: var(--radius-sm); font-size: var(--font-size-xs); font-weight: 600;">
                            ${statusDisplay}
                        </div>
                        ${match.status === 'live' ? `<div style="margin-top: 0.5rem; font-size: var(--font-size-sm); color: var(--gray-600);">${match.time}'</div>` : ''}
                        ${match.status === 'upcoming' ? `<div style="margin-top: 0.5rem; font-size: var(--font-size-sm); color: var(--gray-600);">${match.time}</div>` : ''}
                    </div>
                    
                    <div style="text-align: center; flex: 1;">
                        <div style="width: 4rem; height: 4rem; background: var(--gray-200); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; font-size: 1.5rem; font-weight: 600;">
                            ${awayInitials}
                        </div>
                        <h3 style="font-size: var(--font-size-lg); font-weight: 600;">${match.awayTeam}</h3>
                    </div>
                </div>
                
                <button onclick="this.closest('.match-modal').remove()" style="background: var(--primary-blue); color: white; border: none; padding: 0.75rem 2rem; border-radius: var(--radius-md); font-weight: 600; cursor: pointer;">
                    Fechar
                </button>
            </div>
        `;

        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        // Close modal with Escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    }

    // Method to refresh tab content (useful for live updates)
    refreshActiveTab() {
        this.loadTabContent(this.activeTab);
    }

    // Method to update match data (for live updates)
    updateMatch(matchId, newData) {
        const matchIndex = mockData.matches.findIndex(m => m.id == matchId);
        if (matchIndex !== -1) {
            mockData.matches[matchIndex] = { ...mockData.matches[matchIndex], ...newData };
            this.refreshActiveTab();
        }
    }
}

// Initialize tabs component when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.tabsComponent = new TabsComponent();
    });
} else {
    window.tabsComponent = new TabsComponent();
}

