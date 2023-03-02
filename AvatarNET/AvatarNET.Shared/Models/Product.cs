using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Avatar.Shared.Models;

public class Product
{
    [Key]
    public Guid Id { get; set; }

    public string? Text { get; set; }
    
    [ForeignKey("Plan")]
    public Guid PlanId { get; set; }

    [ForeignKey("Model")]
    public Guid ModelId { get; set; }

    [ForeignKey("Voice")]
    public Guid VoiceId { get; set; }

    [ForeignKey("Background")]
    public Guid BackgroundId { get; set; }
    
    [Column(TypeName="money")]
    public decimal Subtotal { get; set; }
    
    [Column(TypeName="money")]
    public decimal SalesTax { get; set; }
    
    [Column(TypeName="money")]
    public decimal TotalDue { get; set; }
}