using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsStatsAPI.Data;
using SportsStatsAPI.DTOs;
using SportsStatsAPI.Models;

namespace SportsStatsAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StatisticsController : ControllerBase
    {
        private readonly SportsStatsContext _context;

        public StatisticsController(SportsStatsContext context)
        {
            _context = context;
        }

        [HttpGet("overview")]
        public async Task<ActionResult<StatisticsOverviewDto>> GetOverview()
        {
            var totalMatches = await _context.Matches.CountAsync();
            var liveMatches = await _context.Matches.CountAsync(m => m.Status == MatchStatus.Live);
            var totalTeams = await _context.Teams.CountAsync();
            var totalGoals = await _context.Players.SumAsync(p => p.Goals);
            var totalCompetitions = await _context.Competitions.CountAsync();

            var overview = new StatisticsOverviewDto
            {
                TotalMatches = totalMatches,
                LiveMatches = liveMatches,
                TotalTeams = totalTeams,
                TotalGoals = totalGoals,
                TotalCompetitions = totalCompetitions
            };

            return Ok(overview);
        }

        [HttpGet("goals")]
        public async Task<ActionResult<IEnumerable<GoalStatDto>>> GetGoalStatistics(
            [FromQuery] int? competitionId = null,
            [FromQuery] int limit = 5)
        {
            var query = _context.Standings
                .Include(s => s.Team)
                .AsQueryable();

            if (competitionId.HasValue)
            {
                query = query.Where(s => s.CompetitionId == competitionId.Value);
            }

            var goalStats = await query
                .OrderByDescending(s => s.GoalsFor)
                .Take(limit)
                .Select(s => new GoalStatDto
                {
                    Team = s.Team.Name,
                    Goals = s.GoalsFor
                })
                .ToListAsync();

            return Ok(goalStats);
        }

        [HttpGet("results")]
        public async Task<ActionResult<IEnumerable<ResultStatDto>>> GetResultStatistics(
            [FromQuery] int? competitionId = null)
        {
            var query = _context.Standings.AsQueryable();

            if (competitionId.HasValue)
            {
                query = query.Where(s => s.CompetitionId == competitionId.Value);
            }

            var standings = await query.ToListAsync();

            if (!standings.Any())
            {
                return Ok(new List<ResultStatDto>());
            }

            var totalMatches = standings.Sum(s => s.Played);
            var totalWins = standings.Sum(s => s.Wins);
            var totalDraws = standings.Sum(s => s.Draws);
            var totalLosses = standings.Sum(s => s.Losses);

            if (totalMatches == 0)
            {
                return Ok(new List<ResultStatDto>());
            }

            var results = new List<ResultStatDto>
            {
                new() { Label = "Vitórias", Value = (int)Math.Round((double)totalWins / totalMatches * 100), Color = "#3b82f6" },
                new() { Label = "Empates", Value = (int)Math.Round((double)totalDraws / totalMatches * 100), Color = "#f59e0b" },
                new() { Label = "Derrotas", Value = (int)Math.Round((double)totalLosses / totalMatches * 100), Color = "#ef4444" }
            };

            return Ok(results);
        }

        [HttpGet("cards")]
        public async Task<ActionResult<IEnumerable<StatsCardDto>>> GetStatsCards()
        {
            var today = DateTime.Today;
            var todayMatches = await _context.Matches.CountAsync(m => m.MatchDate.Date == today);
            var totalTeams = await _context.Teams.CountAsync();
            var totalGoals = await _context.Players.SumAsync(p => p.Goals);
            var totalCompetitions = await _context.Competitions.CountAsync();

            var cards = new List<StatsCardDto>
            {
                new()
                {
                    Title = "Partidas Hoje",
                    Value = todayMatches.ToString(),
                    Change = "+12%",
                    ChangeType = "positive",
                    Icon = "calendar"
                },
                new()
                {
                    Title = "Times Ativos",
                    Value = totalTeams.ToString(),
                    Change = "+3%",
                    ChangeType = "positive",
                    Icon = "users"
                },
                new()
                {
                    Title = "Gols Marcados",
                    Value = totalGoals.ToString(),
                    Change = "+8%",
                    ChangeType = "positive",
                    Icon = "target"
                },
                new()
                {
                    Title = "Competições",
                    Value = totalCompetitions.ToString(),
                    Change = "0%",
                    ChangeType = "neutral",
                    Icon = "trophy"
                }
            };

            return Ok(cards);
        }
    }
}

