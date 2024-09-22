using System;

namespace API.DTOs.Task;

public class ToDoTaskRequest
{
    public required string Title { get; set; }
    public DateOnly Deadline { get; set; }
    public required string Project { get; set; }
    public required string Priority { get; set; }
    public required string Details { get; set; }
    public long UserId { get; set; }

}
