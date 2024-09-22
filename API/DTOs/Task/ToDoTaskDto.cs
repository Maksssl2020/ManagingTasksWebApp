using System;

namespace API.DTOs.Task;

public class ToDoTaskDto
{
    public long Id { get; set; }
    public required string Title { get; set; }
    public DateOnly Deadline { get; set; }
    public required string Project { get; set; }
    public required string Priority { get; set; }
    public required string Details { get; set; }
    public bool IsFinished { get; set; }
    public bool IsAfterDeadline { get; set; }

    public long UserId { get; set; }
}
