
namespace ToDoListAPI.Repositories
{
    public interface IRepository<T>
    {
        Task<IEnumerable<T>> GetAllItemsAsync();
        Task<T?> GetItemByIdAsync(int id);
        Task<T> AddItemAsync(T item);
        Task<bool> UpdateItemAsync(T item);
        Task<bool> DeleteItemAsync(int id);
        
    }
}
