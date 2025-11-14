using Microsoft.EntityFrameworkCore;
using ToDoList.Models;

namespace ToDoList.DataAccess
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
