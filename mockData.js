// Mock data for the sports statistics website

export const mockMatches = [
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
    status: 'scheduled',
    time: '20:00',
    competition: 'Ligue 1',
    isLive: false,
    date: '2025-07-14'
  },
  {
    id: 4,
    homeTeam: 'Bayern Munich',
    awayTeam: 'Borussia Dortmund',
    homeScore: 3,
    awayScore: 2,
    status: 'finished',
    time: 'Finalizado',
    competition: 'Bundesliga',
    isLive: false,
    date: '2025-07-14'
  },
  {
    id: 5,
    homeTeam: 'Juventus',
    awayTeam: 'AC Milan',
    homeScore: null,
    awayScore: null,
    status: 'scheduled',
    time: '21:45',
    competition: 'Serie A',
    isLive: false,
    date: '2025-07-14'
  }
]

export const mockStandings = [
  {
    id: 1,
    name: 'Real Madrid',
    played: 20,
    wins: 15,
    draws: 3,
    losses: 2,
    goalsFor: 45,
    goalsAgainst: 18,
    goalDifference: 27,
    points: 48
  },
  {
    id: 2,
    name: 'Barcelona',
    played: 20,
    wins: 14,
    draws: 4,
    losses: 2,
    goalsFor: 42,
    goalsAgainst: 20,
    goalDifference: 22,
    points: 46
  },
  {
    id: 3,
    name: 'Atletico Madrid',
    played: 20,
    wins: 12,
    draws: 5,
    losses: 3,
    goalsFor: 35,
    goalsAgainst: 22,
    goalDifference: 13,
    points: 41
  },
  {
    id: 4,
    name: 'Sevilla',
    played: 20,
    wins: 11,
    draws: 4,
    losses: 5,
    goalsFor: 32,
    goalsAgainst: 25,
    goalDifference: 7,
    points: 37
  },
  {
    id: 5,
    name: 'Real Sociedad',
    played: 20,
    wins: 10,
    draws: 6,
    losses: 4,
    goalsFor: 30,
    goalsAgainst: 24,
    goalDifference: 6,
    points: 36
  },
  {
    id: 6,
    name: 'Villarreal',
    played: 20,
    wins: 9,
    draws: 7,
    losses: 4,
    goalsFor: 28,
    goalsAgainst: 22,
    goalDifference: 6,
    points: 34
  },
  {
    id: 7,
    name: 'Valencia',
    played: 20,
    wins: 8,
    draws: 6,
    losses: 6,
    goalsFor: 26,
    goalsAgainst: 26,
    goalDifference: 0,
    points: 30
  },
  {
    id: 8,
    name: 'Athletic Bilbao',
    played: 20,
    wins: 7,
    draws: 8,
    losses: 5,
    goalsFor: 24,
    goalsAgainst: 23,
    goalDifference: 1,
    points: 29
  },
  {
    id: 18,
    name: 'Cadiz',
    played: 20,
    wins: 3,
    draws: 5,
    losses: 12,
    goalsFor: 15,
    goalsAgainst: 35,
    goalDifference: -20,
    points: 14
  },
  {
    id: 19,
    name: 'Elche',
    played: 20,
    wins: 2,
    draws: 6,
    losses: 12,
    goalsFor: 12,
    goalsAgainst: 38,
    goalDifference: -26,
    points: 12
  },
  {
    id: 20,
    name: 'Almeria',
    played: 20,
    wins: 1,
    draws: 4,
    losses: 15,
    goalsFor: 10,
    goalsAgainst: 42,
    goalDifference: -32,
    points: 7
  }
]

export const mockGoalStats = [
  { name: 'Real Madrid', goals: 45 },
  { name: 'Barcelona', goals: 42 },
  { name: 'Atletico Madrid', goals: 35 },
  { name: 'Sevilla', goals: 32 },
  { name: 'Real Sociedad', goals: 30 }
]

export const mockWinPercentage = [
  { name: 'Vitórias', value: 65 },
  { name: 'Empates', value: 20 },
  { name: 'Derrotas', value: 15 }
]

export const mockSearchResults = [
  {
    name: 'Real Madrid',
    type: 'team',
    description: 'Clube de futebol espanhol - La Liga'
  },
  {
    name: 'Cristiano Ronaldo',
    type: 'player',
    description: 'Atacante - Al Nassr'
  },
  {
    name: 'Champions League',
    type: 'competition',
    description: 'Liga dos Campeões da UEFA'
  },
  {
    name: 'Barcelona vs Real Madrid',
    type: 'match',
    description: 'El Clásico - La Liga'
  },
  {
    name: 'Manchester City',
    type: 'team',
    description: 'Clube de futebol inglês - Premier League'
  },
  {
    name: 'Lionel Messi',
    type: 'player',
    description: 'Atacante - Inter Miami'
  }
]

export const mockTopScorers = [
  {
    id: 1,
    name: 'Karim Benzema',
    team: 'Real Madrid',
    goals: 18,
    matches: 20
  },
  {
    id: 2,
    name: 'Robert Lewandowski',
    team: 'Barcelona',
    goals: 16,
    matches: 19
  },
  {
    id: 3,
    name: 'Antoine Griezmann',
    team: 'Atletico Madrid',
    goals: 14,
    matches: 20
  },
  {
    id: 4,
    name: 'Youssef En-Nesyri',
    team: 'Sevilla',
    goals: 12,
    matches: 18
  },
  {
    id: 5,
    name: 'Alexander Isak',
    team: 'Real Sociedad',
    goals: 11,
    matches: 17
  }
]

