using System.ComponentModel.DataAnnotations;

namespace Avatar.Shared.Models;

public class Voice
{
    public Voice(Guid id, string language)
    {
        Id = id;
        Language = language;
    }

    [Key]
    public Guid Id { get; set; }
    
    public string Language { get; set; }
}