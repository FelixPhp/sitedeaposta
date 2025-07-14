using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsStatsAPI.Data;
using SportsStatsAPI.DTOs;

namespace SportsStatsAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlayersController : ControllerBase
    {
        private readonly SportsStatsContext _context;

        public PlayersController(SportsStatsContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PlayerDto>>> GetPlayers(
            [FromQuery] int? teamId = null,
            [FromQuery] string? position = null,
            [FromQuery] string? search = null,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 20)
        {
            var query = _context.Players
                .Include(p => p.Team)
                .AsQueryable();

            // Apply filters
            if (teamId.HasValue)
            {
                query = query.Where(p => p.TeamId == teamId.Value);
            }

            if (!string.IsNullOrEmpty(position))
            {
                query = query.Where(p => p.Position.Contains(position));
            }

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(p => p.Name.Contains(search) || p.Team.Name.Contains(search));
            }

            // Apply pagination
            var players = await query
                .OrderBy(p => p.Name)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(p => new PlayerDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Position = p.Position,
                    Team = p.Team.Name,
                    Goals = p.Goals,
                    Matches = p.Matches,
                    Age = p.Age,
                    Nationality = p.Nationality
                })
                .ToListAsync();

            return Ok(players);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PlayerDto>> GetPlayer(int id)
        {
            var player = await _context.Players
                .Include(p => p.Team)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (player == null)
            {
                return NotFound();
            }

            var playerDto = new PlayerDto
            {
                Id = player.Id,
                Name = player.Name,
                Position = player.Position,
                Team = player.Team.Name,
                Goals = player.Goals,
                Matches = player.Matches,
                Age = player.Age,
                Nationality = player.Nationality
            };

            return Ok(playerDto);
        }

        [HttpGet("top-scorers")]
        public async Task<ActionResult<IEnumerable<TopScorerDto>>> GetTopScorers(
            [FromQuery] int? competitionId = null,
            [FromQuery] int limit = 10)
        {
            var query = _context.Players
                .Include(p => p.Team)
                .AsQueryable();

            // Filter by competition if specified
            if (competitionId.HasValue)
            {
                query = query.Where(p => p.Team.CompetitionId == competitionId.Value);
            }

            var topScorers = await query
                .Where(p => p.Goals > 0)
                .OrderByDescending(p => p.Goals)
                .ThenByDescending(p => p.Matches)
                .Take(limit)
                .Select((p, index) => new TopScorerDto
                {
                    Position = index + 1,
                    Name = p.Name,
                    Team = p.Team.Name,
                    Goals = p.Goals,
                    Matches = p.Matches
                })
                .ToListAsync();

            // Manually set positions since LINQ doesn't support index in Select with EF
            var result = new List<TopScorerDto>();
            var position = 1;
            foreach (var scorer in topScorers)
            {
                result.Add(new TopScorerDto
                {
                    Position = position++,
                    Name = scorer.Name,
                    Team = scorer.Team,
                    Goals = scorer.Goals,
                    Matches = scorer.Matches
                });
            }

            return Ok(result);
        }
    }
}

