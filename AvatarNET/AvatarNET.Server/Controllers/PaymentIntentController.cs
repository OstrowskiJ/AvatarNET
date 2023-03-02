﻿using Microsoft.AspNetCore.Mvc;
using Stripe;
using Product = Avatar.Shared.Models.Product;

namespace AvatarNET.Server.Controllers;

[Route("create-payment-intent")]
[ApiController]
public class PaymentIntentController : Controller
{
    [HttpPost]
    public ActionResult Create(PaymentIntentCreateRequest request)
    {      
        var customerService = new CustomerService();
        var customer = customerService.Create(new CustomerCreateOptions());
        var paymentIntentService = new PaymentIntentService();
        var paymentIntent = paymentIntentService.Create(new PaymentIntentCreateOptions
        {
            Customer = customer.Id,
            PaymentMethodTypes = new System.Collections.Generic.List<string> { "card" },
            Amount = CalculateOrderAmount(request.Product),
            Currency = "USD"
        });

        return Json(new {
            clientSecret = paymentIntent.ClientSecret, 
            customerId = customer.Id,
            paymentIntentId = paymentIntent.Id
        });
    }
    
    [HttpPut]
    public async Task<ActionResult> Update(PaymentIntentUpdateRequest request)
    {      
        var customerService = new CustomerService();
        var customer = await customerService.UpdateAsync(request.CustomerId, new CustomerUpdateOptions
        {
            Name = request.CustomerName,
            Email = request.CustomerEmail
        });
        
        var paymentIntentService = new PaymentIntentService();
        var paymentIntent = await paymentIntentService.UpdateAsync(request.PaymentIntentId, new PaymentIntentUpdateOptions
        {
            Customer = customer.Id,
            ReceiptEmail = request.CustomerEmail
        });

        return Ok(new { customer, paymentIntent });
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