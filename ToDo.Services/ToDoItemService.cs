using ToDoList.Models;
using ToDoList.DataAccess;
using Microsoft.Extensions.Logging;


namespace ToDoList.Services
{
    public class ToDoItemService : IService<ToDoItem>
    {

        private readonly IRepository<ToDoItem> _repository;
        private readonly ILogger<ToDoItemService> _logger;

        public ToDoItemService(IRepository<ToDoItem> repository, ILogger<ToDoItemService> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        public  async Task<ToDoItem> AddItemAsync(ToDoItem dto)
        {
            var createdItem = await _repository.AddItemAsync(dto);
            _logger.LogInformation("New ToDoItem is created with the ID : {ToDoItemId}",createdItem.Id);
            return createdItem;
        }
            
        public  async Task<bool> DeleteItemAsync(int id) {
            var deleted = await _repository.DeleteItemAsync(id);
            _logger.LogInformation("Delete ToDoitem {id} {status}",id,deleted?"succeeded":"failed");

            return deleted;
        }



        public  async Task<IEnumerable<ToDoItem>> GetAllItemsAsync()
        { 
            _logger.LogInformation("Fetching the entire ToDoList");
           return  await  _repository.GetAllItemsAsync();
        }


        public async Task<ToDoItem?> GetItemByIdAsync(int id)
        {
            _logger.LogInformation("Fetching the ToDoItem {Id}",id);
            return await _repository.GetItemByIdAsync(id);
        }
        

     
        public async  Task<bool> UpdateItemAsync(ToDoItem item)
        {
            var retrievedItem = await _repository.GetItemByIdAsync(item.Id);
            if (retrievedItem == null)
            {
                _logger.LogWarning("Update failed. ToDoitem ID {ToDoItemId} not found", item.Id);
                return false;
            }

            var updated= await _repository.UpdateItemAsync(item);
            _logger.LogInformation("ToDoItem {ToDoItemId} updated", item.Id);

            return updated;
        }


    }
}
