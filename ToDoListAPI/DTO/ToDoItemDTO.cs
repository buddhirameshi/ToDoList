namespace ToDoListApi.DTO
{

    /// <summary>
    /// This Data Transfer Object (DTO) class will be useful if over-post preventing is required based on user roles.
    /// Exposing of "Effort" property in the ToDoItem class can be prevented by enabling this DTO class instead of the ToDoItem class.
    /// If there are user roles such as "Administrator" and "User", then DTO class can be exposed to "User" roles while ToDoItem class is enabled for "Administrator" roles.
    /// Currently this class is not in use as  authentication or authorization features are not implemenetd 
    /// </summary>
    public class ToDoItemDTO
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public bool IsComplete { get; set; }


    }
}
