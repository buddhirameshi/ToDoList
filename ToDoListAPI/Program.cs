using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using ToDoList.Api.Middleware;
using ToDoList.DataAccess;
using ToDoList.Models;
using ToDoList.Services;


var builder = WebApplication.CreateBuilder(args);

// Logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();


// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ToDoListContext>(options => {
    options.UseInMemoryDatabase("TodoListDB");
    options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);

});

// Register repository and service
builder.Services.AddScoped<IRepository<ToDoItem>, ToDoItemRepository>();
builder.Services.AddScoped<IService<ToDoItem>, ToDoItemService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        policy => policy
            .WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod());
});



var app = builder.Build();

app.UseCors("AllowAngular");

// Global Exception Handling Middleware
app.UseMiddleware<GlobalExceptionHandlerMiddleware>();
// Global Validation Handling Middleware
app.UseMiddleware<ValidationMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();

builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.InvalidModelStateResponseFactory = context =>
    {
        var errors = context.ModelState
            .Where(e => e.Value?.Errors.Count > 0)
            .ToDictionary(
                e => e.Key,
                e => e.Value!.Errors.Select(err => err.ErrorMessage).ToArray()
            );

        var problemDetails = new ValidationProblemDetails(errors)
        {
            Status = StatusCodes.Status400BadRequest,
            Title = "One or more validation errors occurred.",
            Instance = context.HttpContext.Request.Path
        };

        // Make problem details available to our middleware for logging
        context.HttpContext.Items["ValidationProblemDetails"] = problemDetails;

        return new BadRequestObjectResult(problemDetails)
        {
            ContentTypes = { "application/problem+json" }
        };
    };
});

