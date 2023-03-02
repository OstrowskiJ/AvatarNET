using Avatar.Shared.Models;
using Newtonsoft.Json;

namespace AvatarNET.Application.Requests;

public class PaymentIntentCreateRequest 
{
    [JsonProperty("product")]
    public Product Product { get; set; }
}