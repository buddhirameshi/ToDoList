using Microsoft.EntityFrameworkCore;
using ToDoListApi.Models;

namespace ToDoListAPI.Data
{
    public class ToDoListContext: DbContext
    {
        public ToDoListContext(DbContextOptions<ToDoListContext> options)
    : base(options)
        {
        }

        public DbSet<ToDoItem> ToDoItems { get; set; }=null!;


    }
}
