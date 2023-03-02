using AvatarNET.Application.Responses;
using MediatR;
using Stripe;
using Product = Avatar.Shared.Models.Product;

namespace AvatarNET.Application.Commands.CommandHandlers;

public class PaymentIntentCreateCommandHandler : IRequestHandler<PaymentIntentCreateCommand, PaymentIntentCreateCommandResponse>
{
    public async Task<PaymentIntentCreateCommandResponse> Handle(PaymentIntentCreateCommand request, CancellationToken cancellationToken)
    {
        var customerService = new CustomerService();
        var customer = await customerService.CreateAsync(new CustomerCreateOptions(), cancellationToken: cancellationToken);
        
        var paymentIntentService = new PaymentIntentService();
        var paymentIntent = await paymentIntentService.CreateAsync(new PaymentIntentCreateOptions
        {
            Customer = customer.Id,
            PaymentMethodTypes = new List<string> { "card" },
            Amount = CalculateOrderAmount(request.Product),
            Currency = "USD"
        }, cancellationToken: cancellationToken);

        return new PaymentIntentCreateCommandResponse {
            ClientSecret = paymentIntent.ClientSecret, 
            CustomerId = customer.Id,
            PaymentIntentId = paymentIntent.Id
        };
    }
    
    private long CalculateOrderAmount(Product product)
    {
        //TODO: Calculation by words TBD
        /*var priceOfOneWord = 1000;
        // \\s+ - whitespace RegEx
        var wordsCount = product.Text!.Split("\\s+").Length;

        return wordsCount * priceOfOneWord;*/
        
        // Multiplied by 100, because Stripe API stores amount in cents.
        return Convert.ToInt64(product.TotalDue * 100);
    }
}