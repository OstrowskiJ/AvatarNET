using System.Reflection;
using AvatarNET.Application.Commands;
using AvatarNET.Application.Commands.CommandHandlers;
using AvatarNET.Application.Responses;
using AvatarNET.Server.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Stripe;

var builder = WebApplication.CreateBuilder(args);

StripeConfiguration.ApiKey = builder.Configuration["Stripe:SecretKey"];

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddRouting(options => options.LowercaseUrls = true);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite("Data Source = ./Data/AppDb.db"));

builder.Services.AddMediatR(cfg=>cfg.RegisterServicesFromAssemblies(Assembly.GetExecutingAssembly()));

builder.Services.AddScoped<IRequestHandler<PaymentIntentCreateCommand, PaymentIntentCreateCommandResponse>, PaymentIntentCreateCommandHandler>();
builder.Services.AddScoped<IRequestHandler<PaymentIntentUpdateCommand, PaymentIntentUpdateCommandResponse>, PaymentIntentUpdateCommandHandler>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors();

app.MapControllers();

app.Run();
