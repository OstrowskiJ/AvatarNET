using AvatarNET.Application.Responses;
using MediatR;
using Stripe;

namespace AvatarNET.Application.Commands.CommandHandlers;

public class PaymentIntentUpdateCommandHandler : IRequestHandler<PaymentIntentUpdateCommand, PaymentIntentUpdateCommandResponse>
{
    public async Task<PaymentIntentUpdateCommandResponse> Handle(PaymentIntentUpdateCommand request, CancellationToken cancellationToken)
    {
        var customerService = new CustomerService();
        var customer = await customerService.UpdateAsync(request.CustomerId, new CustomerUpdateOptions
        {
            Name = request.CustomerName,
            Email = request.CustomerEmail
        }, cancellationToken: cancellationToken);
        
        var paymentIntentService = new PaymentIntentService();
        var paymentIntent = await paymentIntentService.UpdateAsync(request.PaymentIntentId, new PaymentIntentUpdateOptions
        {
            Customer = customer.Id,
            ReceiptEmail = request.CustomerEmail
        }, cancellationToken: cancellationToken);

        return new PaymentIntentUpdateCommandResponse(customer, paymentIntent, paymentIntent.ClientSecret);
    }
}