using Avatar.Shared.Models;
using AvatarNET.Application.Responses;
using MediatR;
using Newtonsoft.Json;

namespace AvatarNET.Application.Commands;

public class PaymentIntentCreateCommand : IRequest<PaymentIntentCreateCommandResponse>
{
    public PaymentIntentCreateCommand(Product product)
    {
        Product = product;
    }

    [JsonProperty("product")]
    public Product Product { get; set; }
}