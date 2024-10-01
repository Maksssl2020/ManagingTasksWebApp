using System;

namespace API.DTOs.Task;

public class ToDoTaskUpdateRequest
{
    public long Id { get; set; }
    public string? Title { get; set; }
    public DateOnly Deadline { get; set; }
    public string? Priority { get; set; }
    public string? Details { get; set; }
}
