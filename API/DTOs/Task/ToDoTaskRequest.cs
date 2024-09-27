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

    public override string ToString()
    {
        return
               $"Title: {Title}, " +
               $"Deadline: {Deadline.ToString("yyyy-MM-dd")}, " +  // Formatujesz datę, jeśli chcesz
               $"Project: {Project}, " +
               $"Priority: {Priority}, " +
               $"Details: {Details}, " +
               $"UserId: {UserId}, ";
    }
}
