// Search functionality
class SearchComponent {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.searchResults = document.getElementById('searchResults');
        this.isResultsVisible = false;
        
        this.init();
    }

    init() {
        if (!this.searchInput || !this.searchResults) return;

        // Debounced search function
        const debouncedSearch = utils.debounce((query) => {
            this.performSearch(query);
        }, 300);

        // Event listeners
        this.searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            debouncedSearch(query);
        });

        this.searchInput.addEventListener('focus', () => {
            if (this.searchInput.value.trim()) {
                this.showResults();
            }
        });

        // Close results when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.searchInput.contains(e.target) && !this.searchResults.contains(e.target)) {
                this.hideResults();
            }
        });

        // Handle keyboard navigation
        this.searchInput.addEventListener('keydown', (e) => {
            this.handleKeyNavigation(e);
        });
    }

    performSearch(query) {
        if (!query || query.length < 2) {
            this.hideResults();
            return;
        }

        const results = utils.searchItems(query, mockData.searchData);
        this.displayResults(results, query);
    }

    displayResults(results, query) {
        if (results.length === 0) {
            this.searchResults.innerHTML = `
                <div class="search-no-results">
                    <p style="padding: 1rem; text-align: center; color: var(--gray-500); font-size: var(--font-size-sm);">
                        Nenhum resultado encontrado para "${query}"
                    </p>
                </div>
            `;
        } else {
            const resultsHTML = `
                <div class="search-results-header" style="padding: 0.5rem 1rem; border-bottom: 1px solid var(--gray-200); background: var(--gray-50);">
                    <span style="font-size: var(--font-size-xs); color: var(--gray-500); font-weight: 500;">
                        ${results.length} resultado(s) para "${query}"
                    </span>
                </div>
                ${results.map(item => this.createResultItem(item)).join('')}
            `;
            this.searchResults.innerHTML = resultsHTML;
        }

        this.showResults();
        this.addResultClickHandlers();
    }

    createResultItem(item) {
        const iconMap = {
            team: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
            </svg>`,
            player: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
            </svg>`,
            competition: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                <path d="M4 22h16"></path>
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
            </svg>`
        };

        const badgeMap = {
            team: 'Time',
            player: 'Jogador',
            competition: 'Competição'
        };

        return `
            <div class="search-result-item" data-type="${item.type}" data-name="${item.name}">
                <div class="search-result-icon">
                    ${iconMap[item.type] || iconMap.team}
                </div>
                <div class="search-result-content">
                    <div class="search-result-name">${item.name}</div>
                    <div class="search-result-description">${item.description}</div>
                </div>
                <div class="search-result-badge">${badgeMap[item.type]}</div>
            </div>
        `;
    }

    addResultClickHandlers() {
        const resultItems = this.searchResults.querySelectorAll('.search-result-item');
        resultItems.forEach(item => {
            item.addEventListener('click', () => {
                const name = item.dataset.name;
                const type = item.dataset.type;
                this.handleResultClick(name, type);
            });
        });
    }

    handleResultClick(name, type) {
        // Update search input with selected item
        this.searchInput.value = name;
        this.hideResults();

        // Here you could implement navigation to specific pages
        // For now, we'll just show an alert
        console.log(`Selected ${type}: ${name}`);
        
        // You could dispatch a custom event here for other components to listen to
        const event = new CustomEvent('searchItemSelected', {
            detail: { name, type }
        });
        document.dispatchEvent(event);
    }

    handleKeyNavigation(e) {
        const items = this.searchResults.querySelectorAll('.search-result-item');
        if (items.length === 0) return;

        let currentIndex = -1;
        items.forEach((item, index) => {
            if (item.classList.contains('highlighted')) {
                currentIndex = index;
            }
        });

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                this.highlightItem(items, currentIndex + 1);
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.highlightItem(items, currentIndex - 1);
                break;
            case 'Enter':
                e.preventDefault();
                if (currentIndex >= 0 && items[currentIndex]) {
                    items[currentIndex].click();
                }
                break;
            case 'Escape':
                this.hideResults();
                this.searchInput.blur();
                break;
        }
    }

    highlightItem(items, index) {
        // Remove existing highlights
        items.forEach(item => item.classList.remove('highlighted'));

        // Add highlight to new item
        if (index >= 0 && index < items.length) {
            items[index].classList.add('highlighted');
            items[index].scrollIntoView({ block: 'nearest' });
        }
    }

    showResults() {
        this.searchResults.classList.remove('hidden');
        this.isResultsVisible = true;
    }

    hideResults() {
        this.searchResults.classList.add('hidden');
        this.isResultsVisible = false;
    }

    clearSearch() {
        this.searchInput.value = '';
        this.hideResults();
    }
}

// Add CSS for highlighted search results
const searchStyles = `
    .search-result-item.highlighted {
        background-color: var(--secondary-blue) !important;
    }
    
    .search-no-results {
        border-bottom: 1px solid var(--gray-200);
    }
    
    .search-results-header {
        position: sticky;
        top: 0;
        z-index: 10;
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = searchStyles;
document.head.appendChild(styleSheet);

// Initialize search component when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.searchComponent = new SearchComponent();
    });
} else {
    window.searchComponent = new SearchComponent();
}

