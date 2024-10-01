using System;
using System.ComponentModel.DataAnnotations;

namespace API.Models.Task;

public class ToDoTask
{
    [Key]
    public long Id { get; set; }
    public required string Title { get; set; }
    public DateOnly Deadline { get; set; }
    public required string Project { get; set; }
    public TaskPriority Priority { get; set; }
    public required string Details { get; set; }
    public bool IsFinished { get; set; }
    public bool IsAfterDeadline { get; set; }

    public long UserId { get; set; }
    public User.User User { get; set; } = null!;


}
