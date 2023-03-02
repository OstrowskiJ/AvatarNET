using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Avatar.Shared.Models;

public class AvatarModel
{
    public AvatarModel(Guid id, string name)
    {
        Id = id;
        Name = name;
    }
    
    [Key]
    public Guid Id { get; set; }
    
    public string Name { get; set; }
}