// API integration for SportsStats
class ApiService {
    constructor() {
        this.baseURL = 'http://localhost:5000/api';
        this.cache = new Map();
        this.cacheTimeout = 30000; // 30 seconds
    }

    // Generic fetch method with error handling
    async fetchData(endpoint, options = {}) {
        const cacheKey = `${endpoint}${JSON.stringify(options)}`;
        
        // Check cache first
        if (this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (Date.now() - cached.timestamp < this.cacheTimeout) {
                return cached.data;
            }
        }

        try {
            const url = `${this.baseURL}${endpoint}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                ...options
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            // Cache the result
            this.cache.set(cacheKey, {
                data,
                timestamp: Date.now()
            });

            return data;
        } catch (error) {
            console.error(`API Error for ${endpoint}:`, error);
            throw error;
        }
    }

    // Matches endpoints
    async getMatches(filters = {}) {
        const params = new URLSearchParams();
        
        if (filters.status) params.append('status', filters.status);
        if (filters.competitionId) params.append('competitionId', filters.competitionId);
        if (filters.date) params.append('date', filters.date);
        if (filters.teamId) params.append('teamId', filters.teamId);
        if (filters.page) params.append('page', filters.page);
        if (filters.pageSize) params.append('pageSize', filters.pageSize);

        const queryString = params.toString();
        const endpoint = `/Matches${queryString ? '?' + queryString : ''}`;
        
        return await this.fetchData(endpoint);
    }

    async getMatch(id) {
        return await this.fetchData(`/Matches/${id}`);
    }

    async getLiveMatches() {
        return await this.fetchData('/Matches/live');
    }

    async getTodayMatches() {
        return await this.fetchData('/Matches/today');
    }

    async getUpcomingMatches() {
        return await this.fetchData('/Matches/upcoming');
    }

    // Teams endpoints
    async getTeams(filters = {}) {
        const params = new URLSearchParams();
        
        if (filters.competitionId) params.append('competitionId', filters.competitionId);
        if (filters.search) params.append('search', filters.search);
        if (filters.page) params.append('page', filters.page);
        if (filters.pageSize) params.append('pageSize', filters.pageSize);

        const queryString = params.toString();
        const endpoint = `/Teams${queryString ? '?' + queryString : ''}`;
        
        return await this.fetchData(endpoint);
    }

    async getTeam(id) {
        return await this.fetchData(`/Teams/${id}`);
    }

    async getTeamMatches(id) {
        return await this.fetchData(`/Teams/${id}/matches`);
    }

    async getTeamPlayers(id) {
        return await this.fetchData(`/Teams/${id}/players`);
    }

    // Players endpoints
    async getPlayers(filters = {}) {
        const params = new URLSearchParams();
        
        if (filters.teamId) params.append('teamId', filters.teamId);
        if (filters.position) params.append('position', filters.position);
        if (filters.search) params.append('search', filters.search);
        if (filters.page) params.append('page', filters.page);
        if (filters.pageSize) params.append('pageSize', filters.pageSize);

        const queryString = params.toString();
        const endpoint = `/Players${queryString ? '?' + queryString : ''}`;
        
        return await this.fetchData(endpoint);
    }

    async getPlayer(id) {
        return await this.fetchData(`/Players/${id}`);
    }

    async getTopScorers(competitionId = null, limit = 10) {
        const params = new URLSearchParams();
        
        if (competitionId) params.append('competitionId', competitionId);
        if (limit) params.append('limit', limit);

        const queryString = params.toString();
        const endpoint = `/Players/top-scorers${queryString ? '?' + queryString : ''}`;
        
        return await this.fetchData(endpoint);
    }

    // Competitions endpoints
    async getCompetitions() {
        return await this.fetchData('/Competitions');
    }

    async getCompetition(id) {
        return await this.fetchData(`/Competitions/${id}`);
    }

    async getCompetitionStandings(id) {
        return await this.fetchData(`/Competitions/${id}/standings`);
    }

    async getCompetitionMatches(id) {
        return await this.fetchData(`/Competitions/${id}/matches`);
    }

    // Statistics endpoints
    async getStatisticsOverview() {
        return await this.fetchData('/Statistics/overview');
    }

    async getGoalStatistics(competitionId = null, limit = 5) {
        const params = new URLSearchParams();
        
        if (competitionId) params.append('competitionId', competitionId);
        if (limit) params.append('limit', limit);

        const queryString = params.toString();
        const endpoint = `/Statistics/goals${queryString ? '?' + queryString : ''}`;
        
        return await this.fetchData(endpoint);
    }

    async getResultStatistics(competitionId = null) {
        const params = new URLSearchParams();
        
        if (competitionId) params.append('competitionId', competitionId);

        const queryString = params.toString();
        const endpoint = `/Statistics/results${queryString ? '?' + queryString : ''}`;
        
        return await this.fetchData(endpoint);
    }

    async getStatsCards() {
        return await this.fetchData('/Statistics/cards');
    }

    // Search endpoints
    async search(query, type = null, limit = 8) {
        const params = new URLSearchParams();
        
        params.append('query', query);
        if (type) params.append('type', type);
        if (limit) params.append('limit', limit);

        const queryString = params.toString();
        const endpoint = `/Search?${queryString}`;
        
        return await this.fetchData(endpoint);
    }

    async getSearchSuggestions(query, limit = 5) {
        const params = new URLSearchParams();
        
        params.append('query', query);
        if (limit) params.append('limit', limit);

        const queryString = params.toString();
        const endpoint = `/Search/suggestions?${queryString}`;
        
        return await this.fetchData(endpoint);
    }

    // Utility methods
    clearCache() {
        this.cache.clear();
    }

    setCacheTimeout(timeout) {
        this.cacheTimeout = timeout;
    }

    // Health check
    async healthCheck() {
        try {
            const response = await fetch(`${this.baseURL.replace('/api', '')}/health`);
            return response.ok;
        } catch (error) {
            console.error('Health check failed:', error);
            return false;
        }
    }
}

// Create global instance
const apiService = new ApiService();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ApiService, apiService };
} else {
    window.ApiService = ApiService;
    window.apiService = apiService;
}

