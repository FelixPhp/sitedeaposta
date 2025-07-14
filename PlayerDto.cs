namespace SportsStatsAPI.DTOs
{
    public class PlayerDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Position { get; set; } = string.Empty;
        public string Team { get; set; } = string.Empty;
        public int Goals { get; set; }
        public int Matches { get; set; }
        public int? Age { get; set; }
        public string? Nationality { get; set; }
    }

    public class TopScorerDto
    {
        public int Position { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Team { get; set; } = string.Empty;
        public int Goals { get; set; }
        public int Matches { get; set; }
    }
}

