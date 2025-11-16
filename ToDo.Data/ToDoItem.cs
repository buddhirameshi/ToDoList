using System.ComponentModel.DataAnnotations;

namespace ToDoList.Models
{

    /// <summary>
    /// ToDoItem business object
    /// </summary>
    public class ToDoItem
    {
        public int Id { get; set; }

        [Required,MaxLength(200)]
        public string? Title { get; set; }

        public bool IsComplete { get; set; }

       


        [Range(0.00, 2080)]
        public decimal Effort { get; set; }

        [MaxLength(400)]
        public string Description { get; set; } = null!;


        //public enum Status
        //{
        //    Complete,
        //    InProgress,
        //    Planning,
        //    OnHold,
        //    Deferred,
        //    Cancelled
        //}
    }
}
