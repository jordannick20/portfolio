namespace Boilerplate.Models;

public class Review
{
    public int Id { get; set; }
    public int Rating { get; set; }
    public string? First { get; set; }
    public string? Last { get; set; }
    public string? Comment { get; set; }

}