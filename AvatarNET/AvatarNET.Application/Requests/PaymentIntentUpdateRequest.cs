using Newtonsoft.Json;

namespace AvatarNET.Application.Requests;

public class PaymentIntentUpdateRequest
{
    [JsonProperty("paymentIntentId")] 
    public string PaymentIntentId { get; set; }
    
    [JsonProperty("customerName")] 
    public string CustomerName { get; set; }
    
    [JsonProperty("customerEmail")] 
    public string CustomerEmail { get; set; }

    [JsonProperty("customerId")] 
    public string CustomerId { get; set; }
}