using AvatarNET.Application.Commands;
using AvatarNET.Application.Responses;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AvatarNET.Server.Controllers;

[Route("create-payment-intent")]
[ApiController]
public class PaymentIntentController : Controller
{
    private readonly ISender _mediator;
    
    public PaymentIntentController(ISender mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<ActionResult> Create(PaymentIntentCreateCommand command)
    {      
        var response = await _mediator.Send(command);
        return Json(response);
    }
    
    [HttpPut]
    public async Task<ActionResult> Update(PaymentIntentUpdateCommand command)
    {      
        var response = await _mediator.Send(command);
        return Json(response);
    }
}