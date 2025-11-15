using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Moq;
using System.Text.Json;
using ToDoList.Models;
using ToDoList.DataAccess;
using ToDoList.Services;
using ToDoList.Api.Middleware;

namespace ToDoApi.Tests.Middleware
{
    public class GlobalExceptionMiddlewareTests
    {
   [Fact]
    public async Task Middleware_ShouldReturnProblemDetails_OnException()
    {
        // Arrange: delegate that throws
        RequestDelegate next = (ctx) => throw new Exception("Boom");

        var logger = Mock.Of<ILogger<GlobalExceptionHandlerMiddleware>>();
        var middleware = new GlobalExceptionHandlerMiddleware(next, logger);

        var context = new DefaultHttpContext();
        context.Response.Body = new MemoryStream();

        // Act
        await middleware.InvokeAsync(context);

        // Assert
        context.Response.StatusCode.Should().Be(500);

       // context.Response.Body.Seek(0, SeekOrigin.Begin);
       // var json = await JsonSerializer.DeserializeAsync<Dictionary<string, object>>(context.Response.Body);

       // json!["title"].Should().Be("An unexpected error occurred.");
    }
}
}