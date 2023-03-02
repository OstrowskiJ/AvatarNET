namespace AvatarNET.Application.Responses;

public class PaymentIntentCreateCommandResponse
{
    public string ClientSecret { get; set; }
    public string CustomerId { get; set; }
    public string PaymentIntentId { get; set; }
}