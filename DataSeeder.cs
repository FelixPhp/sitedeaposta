using SportsStatsAPI.Models;

namespace SportsStatsAPI.Data
{
    public static class DataSeeder
    {
        public static void SeedData(SportsStatsContext context)
        {
            if (context.Competitions.Any())
                return; // Data already seeded

            // Seed Competitions
            var laLiga = new Competition
            {
                Id = 1,
                Name = "La Liga",
                Country = "Spain",
                Season = "2024-25",
                Type = "League",
                StartDate = new DateTime(2024, 8, 1),
                EndDate = new DateTime(2025, 5, 31)
            };

            var premierLeague = new Competition
            {
                Id = 2,
                Name = "Premier League",
                Country = "England",
                Season = "2024-25",
                Type = "League",
                StartDate = new DateTime(2024, 8, 1),
                EndDate = new DateTime(2025, 5, 31)
            };

            var ligue1 = new Competition
            {
                Id = 3,
                Name = "Ligue 1",
                Country = "France",
                Season = "2024-25",
                Type = "League",
                StartDate = new DateTime(2024, 8, 1),
                EndDate = new DateTime(2025, 5, 31)
            };

            var serieA = new Competition
            {
                Id = 4,
                Name = "Serie A",
                Country = "Italy",
                Season = "2024-25",
                Type = "League",
                StartDate = new DateTime(2024, 8, 1),
                EndDate = new DateTime(2025, 5, 31)
            };

            var bundesliga = new Competition
            {
                Id = 5,
                Name = "Bundesliga",
                Country = "Germany",
                Season = "2024-25",
                Type = "League",
                StartDate = new DateTime(2024, 8, 1),
                EndDate = new DateTime(2025, 5, 31)
            };

            context.Competitions.AddRange(laLiga, premierLeague, ligue1, serieA, bundesliga);

            // Seed Teams
            var teams = new List<Team>
            {
                // La Liga teams
                new Team { Id = 1, Name = "Real Madrid", ShortName = "RMA", CompetitionId = 1, Stadium = "Santiago Bernabéu", Founded = 1902 },
                new Team { Id = 2, Name = "Barcelona", ShortName = "BAR", CompetitionId = 1, Stadium = "Camp Nou", Founded = 1899 },
                new Team { Id = 3, Name = "Atletico Madrid", ShortName = "ATM", CompetitionId = 1, Stadium = "Wanda Metropolitano", Founded = 1903 },
                new Team { Id = 4, Name = "Sevilla", ShortName = "SEV", CompetitionId = 1, Stadium = "Ramón Sánchez Pizjuán", Founded = 1890 },
                new Team { Id = 5, Name = "Real Sociedad", ShortName = "RSO", CompetitionId = 1, Stadium = "Reale Arena", Founded = 1909 },
                new Team { Id = 6, Name = "Villarreal", ShortName = "VIL", CompetitionId = 1, Stadium = "Estadio de la Cerámica", Founded = 1923 },
                new Team { Id = 7, Name = "Valencia", ShortName = "VAL", CompetitionId = 1, Stadium = "Mestalla", Founded = 1919 },
                new Team { Id = 8, Name = "Athletic Bilbao", ShortName = "ATH", CompetitionId = 1, Stadium = "San Mamés", Founded = 1898 },
                new Team { Id = 9, Name = "Cadiz", ShortName = "CAD", CompetitionId = 1, Stadium = "Nuevo Mirandilla", Founded = 1910 },
                new Team { Id = 10, Name = "Elche", ShortName = "ELC", CompetitionId = 1, Stadium = "Martínez Valero", Founded = 1923 },
                new Team { Id = 11, Name = "Almeria", ShortName = "ALM", CompetitionId = 1, Stadium = "Power Horse Stadium", Founded = 1989 },

                // Premier League teams
                new Team { Id = 12, Name = "Manchester City", ShortName = "MCI", CompetitionId = 2, Stadium = "Etihad Stadium", Founded = 1880 },
                new Team { Id = 13, Name = "Liverpool", ShortName = "LIV", CompetitionId = 2, Stadium = "Anfield", Founded = 1892 },

                // Ligue 1 teams
                new Team { Id = 14, Name = "PSG", ShortName = "PSG", CompetitionId = 3, Stadium = "Parc des Princes", Founded = 1970 },
                new Team { Id = 15, Name = "Marseille", ShortName = "MAR", CompetitionId = 3, Stadium = "Orange Vélodrome", Founded = 1899 },

                // Serie A teams
                new Team { Id = 16, Name = "Juventus", ShortName = "JUV", CompetitionId = 4, Stadium = "Allianz Stadium", Founded = 1897 },
                new Team { Id = 17, Name = "AC Milan", ShortName = "MIL", CompetitionId = 4, Stadium = "San Siro", Founded = 1899 },

                // Bundesliga teams
                new Team { Id = 18, Name = "Bayern Munich", ShortName = "BAY", CompetitionId = 5, Stadium = "Allianz Arena", Founded = 1900 },
                new Team { Id = 19, Name = "Borussia Dortmund", ShortName = "BVB", CompetitionId = 5, Stadium = "Signal Iduna Park", Founded = 1909 }
            };

            context.Teams.AddRange(teams);

            // Seed Players
            var players = new List<Player>
            {
                // Real Madrid players
                new Player { Id = 1, Name = "Karim Benzema", Position = "Forward", TeamId = 1, Goals = 18, Matches = 20, Age = 36, Nationality = "France" },
                new Player { Id = 2, Name = "Vinicius Jr", Position = "Winger", TeamId = 1, Goals = 12, Matches = 19, Age = 24, Nationality = "Brazil" },
                new Player { Id = 3, Name = "Luka Modric", Position = "Midfielder", TeamId = 1, Goals = 3, Matches = 18, Age = 39, Nationality = "Croatia" },

                // Barcelona players
                new Player { Id = 4, Name = "Robert Lewandowski", Position = "Forward", TeamId = 2, Goals = 16, Matches = 19, Age = 35, Nationality = "Poland" },
                new Player { Id = 5, Name = "Pedri", Position = "Midfielder", TeamId = 2, Goals = 4, Matches = 17, Age = 22, Nationality = "Spain" },

                // Atletico Madrid players
                new Player { Id = 6, Name = "Antoine Griezmann", Position = "Forward", TeamId = 3, Goals = 14, Matches = 20, Age = 33, Nationality = "France" },

                // Sevilla players
                new Player { Id = 7, Name = "Youssef En-Nesyri", Position = "Forward", TeamId = 4, Goals = 12, Matches = 18, Age = 27, Nationality = "Morocco" },

                // Real Sociedad players
                new Player { Id = 8, Name = "Alexander Isak", Position = "Forward", TeamId = 5, Goals = 11, Matches = 17, Age = 25, Nationality = "Sweden" }
            };

            context.Players.AddRange(players);

            // Seed Standings
            var standings = new List<Standing>
            {
                new Standing { Id = 1, TeamId = 1, CompetitionId = 1, Position = 1, Played = 20, Wins = 15, Draws = 3, Losses = 2, GoalsFor = 45, GoalsAgainst = 18, GoalDifference = 27, Points = 48 },
                new Standing { Id = 2, TeamId = 2, CompetitionId = 1, Position = 2, Played = 20, Wins = 14, Draws = 4, Losses = 2, GoalsFor = 42, GoalsAgainst = 20, GoalDifference = 22, Points = 46 },
                new Standing { Id = 3, TeamId = 3, CompetitionId = 1, Position = 3, Played = 20, Wins = 12, Draws = 5, Losses = 3, GoalsFor = 35, GoalsAgainst = 22, GoalDifference = 13, Points = 41 },
                new Standing { Id = 4, TeamId = 4, CompetitionId = 1, Position = 4, Played = 20, Wins = 11, Draws = 4, Losses = 5, GoalsFor = 32, GoalsAgainst = 25, GoalDifference = 7, Points = 37 },
                new Standing { Id = 5, TeamId = 5, CompetitionId = 1, Position = 5, Played = 20, Wins = 10, Draws = 6, Losses = 4, GoalsFor = 30, GoalsAgainst = 24, GoalDifference = 6, Points = 36 },
                new Standing { Id = 6, TeamId = 6, CompetitionId = 1, Position = 6, Played = 20, Wins = 9, Draws = 7, Losses = 4, GoalsFor = 28, GoalsAgainst = 22, GoalDifference = 6, Points = 34 },
                new Standing { Id = 7, TeamId = 7, CompetitionId = 1, Position = 7, Played = 20, Wins = 8, Draws = 6, Losses = 6, GoalsFor = 26, GoalsAgainst = 26, GoalDifference = 0, Points = 30 },
                new Standing { Id = 8, TeamId = 8, CompetitionId = 1, Position = 8, Played = 20, Wins = 7, Draws = 8, Losses = 5, GoalsFor = 24, GoalsAgainst = 23, GoalDifference = 1, Points = 29 },
                new Standing { Id = 9, TeamId = 9, CompetitionId = 1, Position = 9, Played = 20, Wins = 3, Draws = 5, Losses = 12, GoalsFor = 15, GoalsAgainst = 35, GoalDifference = -20, Points = 14 },
                new Standing { Id = 10, TeamId = 10, CompetitionId = 1, Position = 10, Played = 20, Wins = 2, Draws = 6, Losses = 12, GoalsFor = 12, GoalsAgainst = 38, GoalDifference = -26, Points = 12 },
                new Standing { Id = 11, TeamId = 11, CompetitionId = 1, Position = 11, Played = 20, Wins = 1, Draws = 4, Losses = 15, GoalsFor = 10, GoalsAgainst = 42, GoalDifference = -32, Points = 7 }
            };

            context.Standings.AddRange(standings);

            // Seed Matches
            var matches = new List<Match>
            {
                new Match { Id = 1, HomeTeamId = 1, AwayTeamId = 2, HomeScore = 2, AwayScore = 1, Status = MatchStatus.Live, MatchTime = "78", CompetitionId = 1, MatchDate = DateTime.Today },
                new Match { Id = 2, HomeTeamId = 12, AwayTeamId = 13, HomeScore = 1, AwayScore = 3, Status = MatchStatus.Finished, MatchTime = "90", CompetitionId = 2, MatchDate = DateTime.Today },
                new Match { Id = 3, HomeTeamId = 14, AwayTeamId = 15, Status = MatchStatus.Upcoming, MatchTime = "20:00", CompetitionId = 3, MatchDate = DateTime.Today },
                new Match { Id = 4, HomeTeamId = 16, AwayTeamId = 17, Status = MatchStatus.Upcoming, MatchTime = "21:45", CompetitionId = 4, MatchDate = DateTime.Today },
                new Match { Id = 5, HomeTeamId = 18, AwayTeamId = 19, HomeScore = 3, AwayScore = 2, Status = MatchStatus.Finished, MatchTime = "90", CompetitionId = 5, MatchDate = DateTime.Today }
            };

            context.Matches.AddRange(matches);

            context.SaveChanges();
        }
    }
}

