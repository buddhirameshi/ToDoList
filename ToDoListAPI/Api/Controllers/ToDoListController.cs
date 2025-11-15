using Humanizer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoList.Models;
using ToDoList.Services;

namespace ToDoList.Api.Controllers
{
    [Route("api/ToDoList")]
    [ApiController]
    public class ToDoListController : ControllerBase
    {
        private readonly IService<ToDoItem> _service;

        public ToDoListController(IService<ToDoItem> service)
        {
            _service = service;
        }

        [HttpGet]
        //GET: api/ToDoList
        public async Task<ActionResult<IEnumerable<ToDoItem>>> GetAll() => Ok(await _service.GetAllItemsAsync());

       

        // GET: api/ToDoItem/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ToDoItem>> GetToDoItem(int id)
        {
            var item = await _service.GetItemByIdAsync(id);
            if (item == null) return NotFound();
            return Ok(item);
        }

        // POST: api/ToDoItem
        [HttpPost]
        public async Task<ActionResult<ToDoItem>> PostToDoItem(ToDoItem toDoItem)
        {
            var product = await _service.AddItemAsync(toDoItem);
            return CreatedAtAction(nameof(GetToDoItem), new { id = product.Id }, product);
        }



        // PUT: api/ToDoItem/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutToDoItem(ToDoItem toDoItem)
        {
            var updated = await _service.UpdateItemAsync(toDoItem);
            if (!updated) return NotFound();
            return NoContent();
        }


        // DELETE: api/ToDoItem/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteToDoItem(int id)
        {
            var deleted = await _service.DeleteItemAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}
