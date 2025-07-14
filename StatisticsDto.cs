namespace SportsStatsAPI.DTOs
{
    public class StatisticsOverviewDto
    {
        public int TotalMatches { get; set; }
        public int LiveMatches { get; set; }
        public int TotalTeams { get; set; }
        public int TotalGoals { get; set; }
        public int TotalCompetitions { get; set; }
    }

    public class GoalStatDto
    {
        public string Team { get; set; } = string.Empty;
        public int Goals { get; set; }
    }

    public class ResultStatDto
    {
        public string Label { get; set; } = string.Empty;
        public int Value { get; set; }
        public string Color { get; set; } = string.Empty;
    }

    public class StatsCardDto
    {
        public string Title { get; set; } = string.Empty;
        public string Value { get; set; } = string.Empty;
        public string Change { get; set; } = string.Empty;
        public string ChangeType { get; set; } = string.Empty;
        public string Icon { get; set; } = string.Empty;
    }
}

