using Microsoft.EntityFrameworkCore;
using ToDoListAPI.Data;
using ToDoListAPI.Models.DAO;
using ToDoListAPI.Repositories;
using ToDoListAPI.Services;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();


builder.Services.AddDbContext<ToDoListContext>(opt => opt.UseInMemoryDatabase("TodoListDB"));

// Register repository and service
builder.Services.AddScoped<IBaseRepository<ToDoItem>, ToDoItemRepository>();
builder.Services.AddScoped<IBaseService<ToDoItem>, ToDoItemService>();



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
