namespace SportsStatsAPI.DTOs
{
    public class SearchResultDto
    {
        public string Type { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int Id { get; set; }
    }

    public class SearchResponseDto
    {
        public List<SearchResultDto> Results { get; set; } = new();
        public int TotalCount { get; set; }
        public string Query { get; set; } = string.Empty;
    }
}

