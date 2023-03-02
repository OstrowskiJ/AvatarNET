using Avatar.Shared.Models;
using Newtonsoft.Json;

namespace AvatarNET.Server;

public class PaymentIntentCreateRequest
{
    [JsonProperty("product")]
    public Product Product { get; set; }
}