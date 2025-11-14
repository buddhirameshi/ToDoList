using Microsoft.EntityFrameworkCore;
using ToDoListAPI.Data;
using ToDoListAPI.Models.DAO;

namespace ToDoListAPI.Repositories
{
    public class ToDoItemRepository : IBaseRepository<ToDoItem>
    {

        private readonly ToDoListContext _context;

        public ToDoItemRepository(ToDoListContext context)
        {
            _context = context;
        }

        public async Task<ToDoItem> AddItemAsync(ToDoItem toDoItem)
        {
            _context.ToDoItems.Add(toDoItem);
             await _context.SaveChangesAsync();
            return toDoItem;
        }

        public async Task<bool> DeleteItemAsync(int id)
        {
            var toDoItem = await _context.ToDoItems.FindAsync(id);
            if (toDoItem == null)
            {
                return false;
            }

            _context.ToDoItems.Remove(toDoItem);
            await _context.SaveChangesAsync();

            return true;
        }


        public async Task<IEnumerable<ToDoItem>> GetAllItemsAsync()
        {
           return await _context.ToDoItems.ToListAsync();           
        }


        public async Task<ToDoItem?> GetItemByIdAsync(int id)
        {
            var toDoItem = await _context.ToDoItems.FindAsync(id);
            if (toDoItem == null) {
                return null;
            }
            return toDoItem;
        }


        public async Task<bool> UpdateItemAsync(ToDoItem toDoItem)
        {
            _context.Entry(toDoItem).State = EntityState.Modified;

            var exists = await _context.ToDoItems.AnyAsync(x => x.Id == toDoItem.Id);
            if (!exists) return false;

            _context.ToDoItems.Update(toDoItem);
            await _context.SaveChangesAsync();
            return true;

        }


    }
}
