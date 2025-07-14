using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsStatsAPI.Data;
using SportsStatsAPI.DTOs;

namespace SportsStatsAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TeamsController : ControllerBase
    {
        private readonly SportsStatsContext _context;

        public TeamsController(SportsStatsContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TeamDto>>> GetTeams(
            [FromQuery] int? competitionId = null,
            [FromQuery] string? search = null,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 20)
        {
            var query = _context.Teams
                .Include(t => t.Competition)
                .AsQueryable();

            // Apply filters
            if (competitionId.HasValue)
            {
                query = query.Where(t => t.CompetitionId == competitionId.Value);
            }

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(t => t.Name.Contains(search) || t.ShortName.Contains(search));
            }

            // Apply pagination
            var teams = await query
                .OrderBy(t => t.Name)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(t => new TeamDto
                {
                    Id = t.Id,
                    Name = t.Name,
                    ShortName = t.ShortName,
                    Logo = t.Logo,
                    Stadium = t.Stadium,
                    Founded = t.Founded,
                    Competition = t.Competition.Name
                })
                .ToListAsync();

            return Ok(teams);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TeamDetailDto>> GetTeam(int id)
        {
            var team = await _context.Teams
                .Include(t => t.Competition)
                .Include(t => t.Players)
                .Include(t => t.Standings)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (team == null)
            {
                return NotFound();
            }

            // Get recent matches
            var recentMatches = await _context.Matches
                .Include(m => m.HomeTeam)
                .Include(m => m.AwayTeam)
                .Include(m => m.Competition)
                .Where(m => m.HomeTeamId == id || m.AwayTeamId == id)
                .OrderByDescending(m => m.MatchDate)
                .Take(5)
                .Select(m => new MatchDto
                {
                    Id = m.Id,
                    HomeTeam = m.HomeTeam.Name,
                    AwayTeam = m.AwayTeam.Name,
                    HomeScore = m.HomeScore,
                    AwayScore = m.AwayScore,
                    Status = m.Status.ToString().ToLower(),
                    Time = m.MatchTime,
                    Competition = m.Competition.Name,
                    IsLive = m.Status == Models.MatchStatus.Live,
                    Date = m.MatchDate
                })
                .ToListAsync();

            var teamDetail = new TeamDetailDto
            {
                Id = team.Id,
                Name = team.Name,
                ShortName = team.ShortName,
                Logo = team.Logo,
                Stadium = team.Stadium,
                Founded = team.Founded,
                Competition = team.Competition.Name,
                Players = team.Players.Select(p => new PlayerDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Position = p.Position,
                    Team = team.Name,
                    Goals = p.Goals,
                    Matches = p.Matches,
                    Age = p.Age,
                    Nationality = p.Nationality
                }).ToList(),
                Standing = team.Standings.FirstOrDefault() != null ? new StandingDto
                {
                    Position = team.Standings.First().Position,
                    Name = team.Name,
                    Played = team.Standings.First().Played,
                    Wins = team.Standings.First().Wins,
                    Draws = team.Standings.First().Draws,
                    Losses = team.Standings.First().Losses,
                    GoalsFor = team.Standings.First().GoalsFor,
                    GoalsAgainst = team.Standings.First().GoalsAgainst,
                    GoalDifference = team.Standings.First().GoalDifference,
                    Points = team.Standings.First().Points,
                    Status = GetPositionStatus(team.Standings.First().Position)
                } : null,
                RecentMatches = recentMatches
            };

            return Ok(teamDetail);
        }

        [HttpGet("{id}/matches")]
        public async Task<ActionResult<IEnumerable<MatchDto>>> GetTeamMatches(int id)
        {
            var matches = await _context.Matches
                .Include(m => m.HomeTeam)
                .Include(m => m.AwayTeam)
                .Include(m => m.Competition)
                .Where(m => m.HomeTeamId == id || m.AwayTeamId == id)
                .OrderByDescending(m => m.MatchDate)
                .Select(m => new MatchDto
                {
                    Id = m.Id,
                    HomeTeam = m.HomeTeam.Name,
                    AwayTeam = m.AwayTeam.Name,
                    HomeScore = m.HomeScore,
                    AwayScore = m.AwayScore,
                    Status = m.Status.ToString().ToLower(),
                    Time = m.MatchTime,
                    Competition = m.Competition.Name,
                    IsLive = m.Status == Models.MatchStatus.Live,
                    Date = m.MatchDate
                })
                .ToListAsync();

            return Ok(matches);
        }

        [HttpGet("{id}/players")]
        public async Task<ActionResult<IEnumerable<PlayerDto>>> GetTeamPlayers(int id)
        {
            var team = await _context.Teams.FindAsync(id);
            if (team == null)
            {
                return NotFound();
            }

            var players = await _context.Players
                .Where(p => p.TeamId == id)
                .Select(p => new PlayerDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Position = p.Position,
                    Team = team.Name,
                    Goals = p.Goals,
                    Matches = p.Matches,
                    Age = p.Age,
                    Nationality = p.Nationality
                })
                .ToListAsync();

            return Ok(players);
        }

        private static string GetPositionStatus(int position)
        {
            return position switch
            {
                <= 4 => "champions",
                >= 9 => "relegation",
                _ => "normal"
            };
        }
    }
}

