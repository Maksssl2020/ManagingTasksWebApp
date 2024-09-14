using System;
using System.ComponentModel.DataAnnotations;

namespace API.Models.Task;

public class Task
{
    [Key]
    public long Id { get; set; }
    public required string Title { get; set; }
    public DateOnly Deadline { get; set; }
    public required string Project { get; set; }
    public TaskPriority priority { get; set; }
    public required string Details { get; set; }
    public bool IsFinished { get; set; }
    public bool IsAfterDeadline { get; set; }
}
