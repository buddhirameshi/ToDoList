using System.ComponentModel.DataAnnotations;

namespace ToDoListAPI.Models.DAO
{
    public class ToDoItem
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(500)]
        public string? Title { get; set; }

        public bool IsComplete { get; set; }

        public decimal Effort { get; set; }

    }
}
