using Avatar.Shared.Models;
using Microsoft.AspNetCore.Mvc;

namespace AvatarNET.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class SettingsController
{
    private readonly IConfiguration _configuration;

    public SettingsController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    [HttpGet]
    public string Get()
    {
        return _configuration.GetSection("Settings").Get<Settings>().ApiUrl;
    }
}