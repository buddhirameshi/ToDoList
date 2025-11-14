

namespace ToDoListAPI.Services
{
    public interface IService<T>
    {
        Task<IEnumerable<T>>GetAllItemsAsync();
        Task<T?> GetItemByIdAsync(int id);
        Task<T> AddItemAsync(T dto);
        Task<bool> UpdateItemAsync(T dto);
        Task<bool> DeleteItemAsync(int id);



    }
}
