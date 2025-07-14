using System.ComponentModel.DataAnnotations;

namespace SportsStatsAPI.Models
{
    public class Team
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
        
        [StringLength(20)]
        public string ShortName { get; set; } = string.Empty;
        
        [StringLength(500)]
        public string? Logo { get; set; }
        
        public int CompetitionId { get; set; }
        
        [StringLength(100)]
        public string? Stadium { get; set; }
        
        public int? Founded { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation properties
        public Competition Competition { get; set; } = null!;
        public ICollection<Player> Players { get; set; } = new List<Player>();
        public ICollection<Match> HomeMatches { get; set; } = new List<Match>();
        public ICollection<Match> AwayMatches { get; set; } = new List<Match>();
        public ICollection<Standing> Standings { get; set; } = new List<Standing>();
    }
}

