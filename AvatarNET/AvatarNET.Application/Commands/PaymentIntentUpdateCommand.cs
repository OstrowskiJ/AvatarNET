using Avatar.Shared.Models;
using AvatarNET.Application.Responses;
using MediatR;
using Newtonsoft.Json;

namespace AvatarNET.Application.Commands;

public class PaymentIntentUpdateCommand : IRequest<PaymentIntentUpdateCommandResponse>
{
    public PaymentIntentUpdateCommand(string paymentIntentId, string customerName, string customerEmail, string customerId)
    {
        PaymentIntentId = paymentIntentId;
        CustomerName = customerName;
        CustomerEmail = customerEmail;
        CustomerId = customerId;
    }

    [JsonProperty("paymentIntentId")] 
    public string PaymentIntentId { get; set; }
    
    [JsonProperty("customerName")] 
    public string CustomerName { get; set; }
    
    [JsonProperty("customerEmail")] 
    public string CustomerEmail { get; set; }

    [JsonProperty("customerId")] 
    public string CustomerId { get; set; }
}