using System.ComponentModel.DataAnnotations;

namespace SportsStatsAPI.Models
{
    public enum MatchStatus
    {
        Upcoming,
        Live,
        Finished
    }

    public class Match
    {
        public int Id { get; set; }
        
        public int HomeTeamId { get; set; }
        public int AwayTeamId { get; set; }
        
        public int? HomeScore { get; set; }
        public int? AwayScore { get; set; }
        
        public MatchStatus Status { get; set; } = MatchStatus.Upcoming;
        
        [StringLength(10)]
        public string? MatchTime { get; set; }
        
        public int CompetitionId { get; set; }
        
        public DateTime MatchDate { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation properties
        public Team HomeTeam { get; set; } = null!;
        public Team AwayTeam { get; set; } = null!;
        public Competition Competition { get; set; } = null!;
    }
}

