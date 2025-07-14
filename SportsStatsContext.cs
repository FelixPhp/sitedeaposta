using Microsoft.EntityFrameworkCore;
using SportsStatsAPI.Models;

namespace SportsStatsAPI.Data
{
    public class SportsStatsContext : DbContext
    {
        public SportsStatsContext(DbContextOptions<SportsStatsContext> options) : base(options)
        {
        }

        public DbSet<Competition> Competitions { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<Player> Players { get; set; }
        public DbSet<Match> Matches { get; set; }
        public DbSet<Standing> Standings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Competition configuration
            modelBuilder.Entity<Competition>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Country).HasMaxLength(50);
                entity.Property(e => e.Season).HasMaxLength(20);
                entity.Property(e => e.Type).HasMaxLength(50);
            });

            // Team configuration
            modelBuilder.Entity<Team>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.Property(e => e.ShortName).HasMaxLength(20);
                entity.Property(e => e.Logo).HasMaxLength(500);
                entity.Property(e => e.Stadium).HasMaxLength(100);

                entity.HasOne(e => e.Competition)
                    .WithMany(c => c.Teams)
                    .HasForeignKey(e => e.CompetitionId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // Player configuration
            modelBuilder.Entity<Player>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Position).HasMaxLength(50);
                entity.Property(e => e.Nationality).HasMaxLength(50);

                entity.HasOne(e => e.Team)
                    .WithMany(t => t.Players)
                    .HasForeignKey(e => e.TeamId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // Match configuration
            modelBuilder.Entity<Match>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.MatchTime).HasMaxLength(10);
                entity.Property(e => e.Status).HasConversion<string>();

                entity.HasOne(e => e.HomeTeam)
                    .WithMany(t => t.HomeMatches)
                    .HasForeignKey(e => e.HomeTeamId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(e => e.AwayTeam)
                    .WithMany(t => t.AwayMatches)
                    .HasForeignKey(e => e.AwayTeamId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(e => e.Competition)
                    .WithMany(c => c.Matches)
                    .HasForeignKey(e => e.CompetitionId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // Standing configuration
            modelBuilder.Entity<Standing>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.HasOne(e => e.Team)
                    .WithMany(t => t.Standings)
                    .HasForeignKey(e => e.TeamId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(e => e.Competition)
                    .WithMany(c => c.Standings)
                    .HasForeignKey(e => e.CompetitionId)
                    .OnDelete(DeleteBehavior.Cascade);

                // Unique constraint for team-competition combination
                entity.HasIndex(e => new { e.TeamId, e.CompetitionId }).IsUnique();
            });
        }
    }
}

