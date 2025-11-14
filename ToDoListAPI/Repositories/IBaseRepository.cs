
using ToDoListAPI.Models.DAO;

namespace ToDoListAPI.Repositories
{
    public interface IBaseRepository<T>
    {
        Task<IEnumerable<T>> GetAllItemsAsync();
        Task<T?> GetItemByIdAsync(int id);
        Task<T> AddItemAsync(T item);
        Task<bool> UpdateItemAsync(T item);
        Task<bool> DeleteItemAsync(int id);
        
    }
}
