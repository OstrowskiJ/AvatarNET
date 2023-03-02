using System.ComponentModel.DataAnnotations;

namespace Avatar.Shared.Models;

public class Plan
{
    public Plan(Guid id, string type)
    {
        Id = id;
        Type = type;
    }

    [Key]
    public Guid Id { get; set; }
        
    public string Type { get; set; }
}