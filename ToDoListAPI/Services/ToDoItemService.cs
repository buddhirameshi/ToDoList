
using ToDoListAPI.Models.DAO;
using ToDoListAPI.Models.DTO;
using ToDoListAPI.Repositories;


namespace ToDoListAPI.Services
{
    public class ToDoItemService : IBaseService<ToDoItem>
    {

        private readonly  IBaseRepository<ToDoItem> _repository;

        public ToDoItemService(IBaseRepository<ToDoItem> repository)
        {
            _repository = repository;
        }

        public  Task<ToDoItem> AddItemAsync(ToDoItem dto)
        {
            return  _repository.AddItemAsync(dto);
            
        }
            
        public  Task<bool> DeleteItemAsync(int id) => _repository.DeleteItemAsync(id);



        public  Task<IEnumerable<ToDoItem>> GetAllItemsAsync()=>  _repository.GetAllItemsAsync();
        

        public Task<ToDoItem?> GetItemByIdAsync(int id)=> _repository.GetItemByIdAsync(id);
        

     
        public async  Task<bool> UpdateItemAsync(ToDoItem item)
        {
            var retrievedItem = await _repository.GetItemByIdAsync(item.Id);
            if (retrievedItem == null) return false;
            return await _repository.UpdateItemAsync(item);
        }


    }
}
