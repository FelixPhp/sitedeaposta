using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsStatsAPI.Data;
using SportsStatsAPI.DTOs;

namespace SportsStatsAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CompetitionsController : ControllerBase
    {
        private readonly SportsStatsContext _context;

        public CompetitionsController(SportsStatsContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CompetitionDto>>> GetCompetitions()
        {
            var competitions = await _context.Competitions
                .Select(c => new CompetitionDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    Country = c.Country,
                    Season = c.Season,
                    Type = c.Type,
                    StartDate = c.StartDate,
                    EndDate = c.EndDate
                })
                .ToListAsync();

            return Ok(competitions);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CompetitionDetailDto>> GetCompetition(int id)
        {
            var competition = await _context.Competitions
                .FirstOrDefaultAsync(c => c.Id == id);

            if (competition == null)
            {
                return NotFound();
            }

            // Get standings
            var standings = await _context.Standings
                .Include(s => s.Team)
                .Where(s => s.CompetitionId == id)
                .OrderBy(s => s.Position)
                .Select(s => new StandingDto
                {
                    Position = s.Position,
                    Name = s.Team.Name,
                    Played = s.Played,
                    Wins = s.Wins,
                    Draws = s.Draws,
                    Losses = s.Losses,
                    GoalsFor = s.GoalsFor,
                    GoalsAgainst = s.GoalsAgainst,
                    GoalDifference = s.GoalDifference,
                    Points = s.Points,
                    Status = GetPositionStatus(s.Position)
                })
                .ToListAsync();

            // Get recent matches
            var recentMatches = await _context.Matches
                .Include(m => m.HomeTeam)
                .Include(m => m.AwayTeam)
                .Include(m => m.Competition)
                .Where(m => m.CompetitionId == id)
                .OrderByDescending(m => m.MatchDate)
                .Take(10)
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

            // Get top scorers
            var topScorers = await _context.Players
                .Include(p => p.Team)
                .Where(p => p.Team.CompetitionId == id && p.Goals > 0)
                .OrderByDescending(p => p.Goals)
                .Take(5)
                .ToListAsync();

            var topScorerDtos = new List<TopScorerDto>();
            for (int i = 0; i < topScorers.Count; i++)
            {
                var player = topScorers[i];
                topScorerDtos.Add(new TopScorerDto
                {
                    Position = i + 1,
                    Name = player.Name,
                    Team = player.Team.Name,
                    Goals = player.Goals,
                    Matches = player.Matches
                });
            }

            var competitionDetail = new CompetitionDetailDto
            {
                Id = competition.Id,
                Name = competition.Name,
                Country = competition.Country,
                Season = competition.Season,
                Type = competition.Type,
                StartDate = competition.StartDate,
                EndDate = competition.EndDate,
                Standings = standings,
                RecentMatches = recentMatches,
                TopScorers = topScorerDtos
            };

            return Ok(competitionDetail);
        }

        [HttpGet("{id}/standings")]
        public async Task<ActionResult<IEnumerable<StandingDto>>> GetCompetitionStandings(int id)
        {
            var standings = await _context.Standings
                .Include(s => s.Team)
                .Where(s => s.CompetitionId == id)
                .OrderBy(s => s.Position)
                .Select(s => new StandingDto
                {
                    Position = s.Position,
                    Name = s.Team.Name,
                    Played = s.Played,
                    Wins = s.Wins,
                    Draws = s.Draws,
                    Losses = s.Losses,
                    GoalsFor = s.GoalsFor,
                    GoalsAgainst = s.GoalsAgainst,
                    GoalDifference = s.GoalDifference,
                    Points = s.Points,
                    Status = GetPositionStatus(s.Position)
                })
                .ToListAsync();

            return Ok(standings);
        }

        [HttpGet("{id}/matches")]
        public async Task<ActionResult<IEnumerable<MatchDto>>> GetCompetitionMatches(int id)
        {
            var matches = await _context.Matches
                .Include(m => m.HomeTeam)
                .Include(m => m.AwayTeam)
                .Include(m => m.Competition)
                .Where(m => m.CompetitionId == id)
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

