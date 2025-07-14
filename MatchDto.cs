namespace SportsStatsAPI.DTOs
{
    public class MatchDto
    {
        public int Id { get; set; }
        public string HomeTeam { get; set; } = string.Empty;
        public string AwayTeam { get; set; } = string.Empty;
        public int? HomeScore { get; set; }
        public int? AwayScore { get; set; }
        public string Status { get; set; } = string.Empty;
        public string? Time { get; set; }
        public string Competition { get; set; } = string.Empty;
        public bool IsLive { get; set; }
        public DateTime Date { get; set; }
    }

    public class MatchDetailDto : MatchDto
    {
        public TeamDto HomeTeamDetails { get; set; } = new();
        public TeamDto AwayTeamDetails { get; set; } = new();
        public CompetitionDto CompetitionDetails { get; set; } = new();
    }
}

