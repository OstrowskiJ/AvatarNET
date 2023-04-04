using Stripe;

namespace AvatarNET.Application.Responses;

public class PaymentIntentUpdateCommandResponse
{
    public PaymentIntentUpdateCommandResponse(Customer customer, PaymentIntent paymentIntent, string clientSecret)
    {
        Customer = customer;
        PaymentIntent = paymentIntent;
        ClientSecret = clientSecret;
    }

    public Customer Customer { get; set; }
    
    public PaymentIntent PaymentIntent { get; set; }

    public string ClientSecret { get; set; }
}