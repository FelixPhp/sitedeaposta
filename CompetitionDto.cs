namespace SportsStatsAPI.DTOs
{
    public class CompetitionDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public string Season { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }

    public class CompetitionDetailDto : CompetitionDto
    {
        public List<StandingDto> Standings { get; set; } = new();
        public List<MatchDto> RecentMatches { get; set; } = new();
        public List<TopScorerDto> TopScorers { get; set; } = new();
    }
}

