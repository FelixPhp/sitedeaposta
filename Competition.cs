using System.ComponentModel.DataAnnotations;

namespace SportsStatsAPI.Models
{
    public class Competition
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
        
        [StringLength(50)]
        public string Country { get; set; } = string.Empty;
        
        [StringLength(20)]
        public string Season { get; set; } = string.Empty;
        
        [StringLength(50)]
        public string Type { get; set; } = string.Empty;
        
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation properties
        public ICollection<Team> Teams { get; set; } = new List<Team>();
        public ICollection<Match> Matches { get; set; } = new List<Match>();
        public ICollection<Standing> Standings { get; set; } = new List<Standing>();
    }
}

