using Stripe;

namespace AvatarNET.Application.Responses;

public class PaymentIntentUpdateCommandResponse
{
    public PaymentIntentUpdateCommandResponse(Customer customer, PaymentIntent paymentIntent)
    {
        Customer = customer;
        PaymentIntent = paymentIntent;
    }

    private Customer Customer { get; set; }
    private PaymentIntent PaymentIntent { get; set; }
}