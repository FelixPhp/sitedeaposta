using System.ComponentModel.DataAnnotations;

namespace SportsStatsAPI.Models
{
    public class Standing
    {
        public int Id { get; set; }
        
        public int TeamId { get; set; }
        public int CompetitionId { get; set; }
        
        public int Position { get; set; }
        public int Played { get; set; } = 0;
        public int Wins { get; set; } = 0;
        public int Draws { get; set; } = 0;
        public int Losses { get; set; } = 0;
        public int GoalsFor { get; set; } = 0;
        public int GoalsAgainst { get; set; } = 0;
        public int GoalDifference { get; set; } = 0;
        public int Points { get; set; } = 0;
        
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation properties
        public Team Team { get; set; } = null!;
        public Competition Competition { get; set; } = null!;
    }
}

