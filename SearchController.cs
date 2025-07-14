using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsStatsAPI.Data;
using SportsStatsAPI.DTOs;

namespace SportsStatsAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SearchController : ControllerBase
    {
        private readonly SportsStatsContext _context;

        public SearchController(SportsStatsContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<SearchResponseDto>> Search(
            [FromQuery] string query,
            [FromQuery] string? type = null,
            [FromQuery] int limit = 8)
        {
            if (string.IsNullOrWhiteSpace(query) || query.Length < 2)
            {
                return Ok(new SearchResponseDto
                {
                    Results = new List<SearchResultDto>(),
                    TotalCount = 0,
                    Query = query ?? string.Empty
                });
            }

            var results = new List<SearchResultDto>();

            // Search teams
            if (string.IsNullOrEmpty(type) || type.Equals("team", StringComparison.OrdinalIgnoreCase))
            {
                var teams = await _context.Teams
                    .Include(t => t.Competition)
                    .Where(t => t.Name.Contains(query) || t.ShortName.Contains(query))
                    .Take(limit)
                    .Select(t => new SearchResultDto
                    {
                        Type = "team",
                        Name = t.Name,
                        Description = $"Clube de futebol {t.Competition.Country} - {t.Competition.Name}",
                        Id = t.Id
                    })
                    .ToListAsync();

                results.AddRange(teams);
            }

            // Search players
            if (string.IsNullOrEmpty(type) || type.Equals("player", StringComparison.OrdinalIgnoreCase))
            {
                var players = await _context.Players
                    .Include(p => p.Team)
                    .Where(p => p.Name.Contains(query))
                    .Take(limit)
                    .Select(p => new SearchResultDto
                    {
                        Type = "player",
                        Name = p.Name,
                        Description = $"{p.Position} - {p.Team.Name}",
                        Id = p.Id
                    })
                    .ToListAsync();

                results.AddRange(players);
            }

            // Search competitions
            if (string.IsNullOrEmpty(type) || type.Equals("competition", StringComparison.OrdinalIgnoreCase))
            {
                var competitions = await _context.Competitions
                    .Where(c => c.Name.Contains(query) || c.Country.Contains(query))
                    .Take(limit)
                    .Select(c => new SearchResultDto
                    {
                        Type = "competition",
                        Name = c.Name,
                        Description = $"Campeonato {c.Country}",
                        Id = c.Id
                    })
                    .ToListAsync();

                results.AddRange(competitions);
            }

            // Limit total results
            results = results.Take(limit).ToList();

            var response = new SearchResponseDto
            {
                Results = results,
                TotalCount = results.Count,
                Query = query
            };

            return Ok(response);
        }

        [HttpGet("suggestions")]
        public async Task<ActionResult<IEnumerable<string>>> GetSearchSuggestions(
            [FromQuery] string query,
            [FromQuery] int limit = 5)
        {
            if (string.IsNullOrWhiteSpace(query) || query.Length < 2)
            {
                return Ok(new List<string>());
            }

            var suggestions = new List<string>();

            // Get team name suggestions
            var teamSuggestions = await _context.Teams
                .Where(t => t.Name.Contains(query))
                .Select(t => t.Name)
                .Take(limit)
                .ToListAsync();

            suggestions.AddRange(teamSuggestions);

            // Get player name suggestions
            var playerSuggestions = await _context.Players
                .Where(p => p.Name.Contains(query))
                .Select(p => p.Name)
                .Take(limit)
                .ToListAsync();

            suggestions.AddRange(playerSuggestions);

            // Get competition name suggestions
            var competitionSuggestions = await _context.Competitions
                .Where(c => c.Name.Contains(query))
                .Select(c => c.Name)
                .Take(limit)
                .ToListAsync();

            suggestions.AddRange(competitionSuggestions);

            // Remove duplicates and limit results
            suggestions = suggestions.Distinct().Take(limit).ToList();

            return Ok(suggestions);
        }
    }
}

