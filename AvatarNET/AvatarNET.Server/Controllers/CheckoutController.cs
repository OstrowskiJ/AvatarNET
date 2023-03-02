using Avatar.Shared.Models;
using Microsoft.AspNetCore.Mvc;
using Stripe.Checkout;

namespace AvatarNET.Server.Controllers;

[ApiController]
[Route("[controller]")]
[ApiExplorerSettings(IgnoreApi = true)]
public class CheckoutController : ControllerBase
{
    private readonly IConfiguration _configuration;

    public CheckoutController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    [HttpPost]
    public async Task<ActionResult> CheckoutOrder([FromBody] Product product, [FromServices] IServiceProvider serviceProvider)
    {
        var sessionId = await CheckOut(product);
        var pubKey = _configuration["Stripe:PubKey"];

        var checkoutOrderResponse = new CheckoutOrderResponse()
        {
            SessionId = sessionId,
            PubKey = pubKey
        };

        return Ok(checkoutOrderResponse);
    }

    [NonAction]
    private async Task<string> CheckOut(Product product)
    {
        // Create a payment flow from the items in the cart.
        // Gets sent to Stripe API.
        var options = new SessionCreateOptions
        {
            // Stripe calls the URLs below when certain checkout events happen such as success and failure.
            SuccessUrl = $"https://localhost:7019/checkout/success?sessionId=" + "{CHECKOUT_SESSION_ID}", // Customer paid.
            CancelUrl = "https://localhost:7019/" + "failed",  // Checkout cancelled.
            PaymentMethodTypes = new List<string> // Only card available in test mode?
            {
                "card"
            },
            LineItems = new List<SessionLineItemOptions>
            {
                new()
                {
                    PriceData = new SessionLineItemPriceDataOptions
                    {
                        UnitAmount = Convert.ToInt64(product.TotalDue), // Price is in USD cents.
                        Currency = "USD",
                        ProductData = new SessionLineItemPriceDataProductDataOptions
                        {
                            Name = "placeholder name",
                            Description = "placeholder description",
                            Images = new List<string>() {"https://www.pngkit.com/png/full/437-4372207_money-pile-money-small.png"}
                        },
                    },
                    Quantity = 1,
                },
            },
            Mode = "payment" // One-time payment. Stripe supports recurring 'subscription' payments.
        };

        var service = new SessionService();
        var session = await service.CreateAsync(options);

        return session.Id;
    }

    [HttpGet("success")]
    // Automatic query parameter handling from ASP.NET.
    // Example URL: https://localhost:7051/checkout/success?sessionId=si_123123123123
    public ActionResult CheckoutSuccess(string sessionId)
    {
        var sessionService = new SessionService();
        var session = sessionService.Get(sessionId);

        // Here you can save order and customer details to your database.
        var total = session.AmountTotal.Value;
        var customerEmail = session.CustomerDetails.Email;

        return Redirect("https://localhost:7019/");
    }
}
