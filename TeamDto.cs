namespace SportsStatsAPI.DTOs
{
    public class TeamDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string ShortName { get; set; } = string.Empty;
        public string? Logo { get; set; }
        public string? Stadium { get; set; }
        public int? Founded { get; set; }
        public string Competition { get; set; } = string.Empty;
    }

    public class TeamDetailDto : TeamDto
    {
        public List<PlayerDto> Players { get; set; } = new();
        public StandingDto? Standing { get; set; }
        public List<MatchDto> RecentMatches { get; set; } = new();
    }
}

