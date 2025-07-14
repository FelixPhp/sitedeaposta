using System.ComponentModel.DataAnnotations;

namespace SportsStatsAPI.Models
{
    public class Player
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
        
        [StringLength(50)]
        public string Position { get; set; } = string.Empty;
        
        public int TeamId { get; set; }
        
        public int Goals { get; set; } = 0;
        public int Matches { get; set; } = 0;
        public int? Age { get; set; }
        
        [StringLength(50)]
        public string? Nationality { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation properties
        public Team Team { get; set; } = null!;
    }
}

