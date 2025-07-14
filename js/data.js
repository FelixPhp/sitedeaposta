// Mock data for the sports statistics website

const mockData = {
    matches: [
        {
            id: 1,
            homeTeam: 'Real Madrid',
            awayTeam: 'Barcelona',
            homeScore: 2,
            awayScore: 1,
            status: 'live',
            time: '78',
            competition: 'La Liga',
            isLive: true,
            date: '2025-07-14'
        },
        {
            id: 2,
            homeTeam: 'Manchester City',
            awayTeam: 'Liverpool',
            homeScore: 1,
            awayScore: 3,
            status: 'finished',
            time: 'Finalizado',
            competition: 'Premier League',
            isLive: false,
            date: '2025-07-14'
        },
        {
            id: 3,
            homeTeam: 'PSG',
            awayTeam: 'Marseille',
            homeScore: null,
            awayScore: null,
            status: 'upcoming',
            time: '20:00',
            competition: 'Ligue 1',
            isLive: false,
            date: '2025-07-14'
        },
        {
            id: 4,
            homeTeam: 'Juventus',
            awayTeam: 'AC Milan',
            homeScore: null,
            awayScore: null,
            status: 'upcoming',
            time: '21:45',
            competition: 'Serie A',
            isLive: false,
            date: '2025-07-14'
        },
        {
            id: 5,
            homeTeam: 'Bayern Munich',
            awayTeam: 'Borussia Dortmund',
            homeScore: 3,
            awayScore: 2,
            status: 'finished',
            time: 'Finalizado',
            competition: 'Bundesliga',
            isLive: false,
            date: '2025-07-14'
        }
    ],

    standings: [
        { position: 1, name: 'Real Madrid', played: 20, wins: 15, draws: 3, losses: 2, goalsFor: 45, goalsAgainst: 18, goalDifference: 27, points: 48, status: 'champions' },
        { position: 2, name: 'Barcelona', played: 20, wins: 14, draws: 4, losses: 2, goalsFor: 42, goalsAgainst: 20, goalDifference: 22, points: 46, status: 'champions' },
        { position: 3, name: 'Atletico Madrid', played: 20, wins: 12, draws: 5, losses: 3, goalsFor: 35, goalsAgainst: 22, goalDifference: 13, points: 41, status: 'champions' },
        { position: 4, name: 'Sevilla', played: 20, wins: 11, draws: 4, losses: 5, goalsFor: 32, goalsAgainst: 25, goalDifference: 7, points: 37, status: 'champions' },
        { position: 5, name: 'Real Sociedad', played: 20, wins: 10, draws: 6, losses: 4, goalsFor: 30, goalsAgainst: 24, goalDifference: 6, points: 36, status: 'normal' },
        { position: 6, name: 'Villarreal', played: 20, wins: 9, draws: 7, losses: 4, goalsFor: 28, goalsAgainst: 22, goalDifference: 6, points: 34, status: 'normal' },
        { position: 7, name: 'Valencia', played: 20, wins: 8, draws: 6, losses: 6, goalsFor: 26, goalsAgainst: 26, goalDifference: 0, points: 30, status: 'normal' },
        { position: 8, name: 'Athletic Bilbao', played: 20, wins: 7, draws: 8, losses: 5, goalsFor: 24, goalsAgainst: 23, goalDifference: 1, points: 29, status: 'normal' },
        { position: 9, name: 'Cadiz', played: 20, wins: 3, draws: 5, losses: 12, goalsFor: 15, goalsAgainst: 35, goalDifference: -20, points: 14, status: 'relegation' },
        { position: 10, name: 'Elche', played: 20, wins: 2, draws: 6, losses: 12, goalsFor: 12, goalsAgainst: 38, goalDifference: -26, points: 12, status: 'relegation' },
        { position: 11, name: 'Almeria', played: 20, wins: 1, draws: 4, losses: 15, goalsFor: 10, goalsAgainst: 42, goalDifference: -32, points: 7, status: 'relegation' }
    ],

    topScorers: [
        { position: 1, name: 'Karim Benzema', team: 'Real Madrid', goals: 18, matches: 20 },
        { position: 2, name: 'Robert Lewandowski', team: 'Barcelona', goals: 16, matches: 19 },
        { position: 3, name: 'Antoine Griezmann', team: 'Atletico Madrid', goals: 14, matches: 20 },
        { position: 4, name: 'Youssef En-Nesyri', team: 'Sevilla', goals: 12, matches: 18 },
        { position: 5, name: 'Alexander Isak', team: 'Real Sociedad', goals: 11, matches: 17 }
    ],

    goalStats: [
        { team: 'Real Madrid', goals: 45 },
        { team: 'Barcelona', goals: 42 },
        { team: 'Atletico Madrid', goals: 35 },
        { team: 'Sevilla', goals: 32 },
        { team: 'Real Sociedad', goals: 30 }
    ],

    winPercentage: [
        { label: 'Vitórias', value: 65, color: '#3b82f6' },
        { label: 'Empates', value: 20, color: '#f59e0b' },
        { label: 'Derrotas', value: 15, color: '#ef4444' }
    ],

    stats: [
        {
            title: 'Partidas Hoje',
            value: '24',
            change: '+12%',
            changeType: 'positive',
            icon: 'calendar'
        },
        {
            title: 'Times Ativos',
            value: '156',
            change: '+3%',
            changeType: 'positive',
            icon: 'users'
        },
        {
            title: 'Gols Marcados',
            value: '89',
            change: '+8%',
            changeType: 'positive',
            icon: 'target'
        },
        {
            title: 'Competições',
            value: '12',
            change: '0%',
            changeType: 'neutral',
            icon: 'trophy'
        }
    ],

    searchData: [
        { type: 'team', name: 'Real Madrid', description: 'Clube de futebol espanhol - La Liga' },
        { type: 'team', name: 'Barcelona', description: 'Clube de futebol espanhol - La Liga' },
        { type: 'team', name: 'Manchester City', description: 'Clube de futebol inglês - Premier League' },
        { type: 'team', name: 'Liverpool', description: 'Clube de futebol inglês - Premier League' },
        { type: 'team', name: 'PSG', description: 'Clube de futebol francês - Ligue 1' },
        { type: 'player', name: 'Karim Benzema', description: 'Atacante - Real Madrid' },
        { type: 'player', name: 'Robert Lewandowski', description: 'Atacante - Barcelona' },
        { type: 'player', name: 'Lionel Messi', description: 'Atacante - PSG' },
        { type: 'competition', name: 'La Liga', description: 'Campeonato Espanhol' },
        { type: 'competition', name: 'Premier League', description: 'Campeonato Inglês' },
        { type: 'competition', name: 'Champions League', description: 'Liga dos Campeões da UEFA' }
    ]
};

// Utility functions
const utils = {
    formatTime: (time) => {
        if (time === 'Finalizado') return time;
        if (time.includes(':')) return time;
        return `${time}'`;
    },

    getTeamInitials: (teamName) => {
        return teamName.split(' ').map(word => word[0]).join('').toUpperCase().substring(0, 2);
    },

    formatGoalDifference: (diff) => {
        if (diff > 0) return `+${diff}`;
        return diff.toString();
    },

    getPositionClass: (position) => {
        if (position <= 4) return 'champions';
        if (position >= 9) return 'relegation';
        return 'normal';
    },

    filterMatches: (matches, status) => {
        switch (status) {
            case 'live':
                return matches.filter(match => match.status === 'live');
            case 'today':
                return matches.filter(match => match.status === 'finished' && match.date === '2025-07-14');
            case 'upcoming':
                return matches.filter(match => match.status === 'upcoming');
            default:
                return matches;
        }
    },

    searchItems: (query, data) => {
        if (!query || query.length < 2) return [];
        
        const lowercaseQuery = query.toLowerCase();
        return data.filter(item => 
            item.name.toLowerCase().includes(lowercaseQuery) ||
            item.description.toLowerCase().includes(lowercaseQuery)
        ).slice(0, 8); // Limit to 8 results
    },

    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { mockData, utils };
} else {
    window.mockData = mockData;
    window.utils = utils;
}

