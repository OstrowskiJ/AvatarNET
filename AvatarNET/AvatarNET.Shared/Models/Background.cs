using System.ComponentModel.DataAnnotations;

namespace Avatar.Shared.Models;

public class Background
{
    public Background(Guid id, string color)
    {
        Id = id;
        Color = color;
    }

    [Key]
    public Guid Id { get; set; }
        
    public string Color { get; set; }
}