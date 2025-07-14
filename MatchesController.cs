using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsStatsAPI.Data;
using SportsStatsAPI.DTOs;
using SportsStatsAPI.Models;

namespace SportsStatsAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MatchesController : ControllerBase
    {
        private readonly SportsStatsContext _context;

        public MatchesController(SportsStatsContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MatchDto>>> GetMatches(
            [FromQuery] string? status = null,
            [FromQuery] int? competitionId = null,
            [FromQuery] string? date = null,
            [FromQuery] int? teamId = null,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 20)
        {
            var query = _context.Matches
                .Include(m => m.HomeTeam)
                .Include(m => m.AwayTeam)
                .Include(m => m.Competition)
                .AsQueryable();

            // Apply filters
            if (!string.IsNullOrEmpty(status))
            {
                if (Enum.TryParse<MatchStatus>(status, true, out var matchStatus))
                {
                    query = query.Where(m => m.Status == matchStatus);
                }
            }

            if (competitionId.HasValue)
            {
                query = query.Where(m => m.CompetitionId == competitionId.Value);
            }

            if (!string.IsNullOrEmpty(date))
            {
                if (DateTime.TryParse(date, out var matchDate))
                {
                    query = query.Where(m => m.MatchDate.Date == matchDate.Date);
                }
            }

            if (teamId.HasValue)
            {
                query = query.Where(m => m.HomeTeamId == teamId.Value || m.AwayTeamId == teamId.Value);
            }

            // Apply pagination
            var matches = await query
                .OrderByDescending(m => m.MatchDate)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
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
                    IsLive = m.Status == MatchStatus.Live,
                    Date = m.MatchDate
                })
                .ToListAsync();

            return Ok(matches);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MatchDetailDto>> GetMatch(int id)
        {
            var match = await _context.Matches
                .Include(m => m.HomeTeam)
                .Include(m => m.AwayTeam)
                .Include(m => m.Competition)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (match == null)
            {
                return NotFound();
            }

            var matchDetail = new MatchDetailDto
            {
                Id = match.Id,
                HomeTeam = match.HomeTeam.Name,
                AwayTeam = match.AwayTeam.Name,
                HomeScore = match.HomeScore,
                AwayScore = match.AwayScore,
                Status = match.Status.ToString().ToLower(),
                Time = match.MatchTime,
                Competition = match.Competition.Name,
                IsLive = match.Status == MatchStatus.Live,
                Date = match.MatchDate,
                HomeTeamDetails = new TeamDto
                {
                    Id = match.HomeTeam.Id,
                    Name = match.HomeTeam.Name,
                    ShortName = match.HomeTeam.ShortName,
                    Logo = match.HomeTeam.Logo,
                    Stadium = match.HomeTeam.Stadium,
                    Founded = match.HomeTeam.Founded,
                    Competition = match.Competition.Name
                },
                AwayTeamDetails = new TeamDto
                {
                    Id = match.AwayTeam.Id,
                    Name = match.AwayTeam.Name,
                    ShortName = match.AwayTeam.ShortName,
                    Logo = match.AwayTeam.Logo,
                    Stadium = match.AwayTeam.Stadium,
                    Founded = match.AwayTeam.Founded,
                    Competition = match.Competition.Name
                },
                CompetitionDetails = new CompetitionDto
                {
                    Id = match.Competition.Id,
                    Name = match.Competition.Name,
                    Country = match.Competition.Country,
                    Season = match.Competition.Season,
                    Type = match.Competition.Type,
                    StartDate = match.Competition.StartDate,
                    EndDate = match.Competition.EndDate
                }
            };

            return Ok(matchDetail);
        }

        [HttpGet("live")]
        public async Task<ActionResult<IEnumerable<MatchDto>>> GetLiveMatches()
        {
            var liveMatches = await _context.Matches
                .Include(m => m.HomeTeam)
                .Include(m => m.AwayTeam)
                .Include(m => m.Competition)
                .Where(m => m.Status == MatchStatus.Live)
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
                    IsLive = true,
                    Date = m.MatchDate
                })
                .ToListAsync();

            return Ok(liveMatches);
        }

        [HttpGet("today")]
        public async Task<ActionResult<IEnumerable<MatchDto>>> GetTodayMatches()
        {
            var today = DateTime.Today;
            var todayMatches = await _context.Matches
                .Include(m => m.HomeTeam)
                .Include(m => m.AwayTeam)
                .Include(m => m.Competition)
                .Where(m => m.MatchDate.Date == today && m.Status == MatchStatus.Finished)
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
                    IsLive = false,
                    Date = m.MatchDate
                })
                .ToListAsync();

            return Ok(todayMatches);
        }

        [HttpGet("upcoming")]
        public async Task<ActionResult<IEnumerable<MatchDto>>> GetUpcomingMatches()
        {
            var upcomingMatches = await _context.Matches
                .Include(m => m.HomeTeam)
                .Include(m => m.AwayTeam)
                .Include(m => m.Competition)
                .Where(m => m.Status == MatchStatus.Upcoming)
                .OrderBy(m => m.MatchDate)
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
                    IsLive = false,
                    Date = m.MatchDate
                })
                .ToListAsync();

            return Ok(upcomingMatches);
        }
    }
}

