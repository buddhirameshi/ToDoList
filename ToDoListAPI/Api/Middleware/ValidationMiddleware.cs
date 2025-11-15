using Microsoft.AspNetCore.Mvc;

namespace ToDoList.Api.Middleware
{
    public class ValidationMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ValidationMiddleware> _logger;

        public ValidationMiddleware(RequestDelegate next, ILogger<ValidationMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // Let the action execute first
            await _next(context);


            // Enhance the default 400 response format and logging.
            if (context.Response.StatusCode == StatusCodes.Status400BadRequest &&
                context.Items.ContainsKey("ValidationProblemDetails"))
            {
                var problem = (ProblemDetails)context.Items["ValidationProblemDetails"]!;
                _logger.LogWarning("Validation failed: {@Errors}", problem);

                context.Response.ContentType = "application/json";
                await context.Response.WriteAsJsonAsync(problem);
            }
        }
    }
}