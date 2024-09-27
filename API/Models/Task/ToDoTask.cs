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


    public override string ToString()
    {
        return $"Id: {Id}, " +
               $"Title: {Title}, " +
               $"Deadline: {Deadline.ToString("yyyy-MM-dd")}, " +  // Formatujesz datę, jeśli chcesz
               $"Project: {Project}, " +
               $"Priority: {Priority}, " +
               $"Details: {Details}, " +
               $"IsFinished: {IsFinished}, " +
               $"IsAfterDeadline: {IsAfterDeadline}, " +
               $"UserId: {UserId}, " +
               $"User: {User?.ToString() ?? "No user"}";  // Sprawdzasz, czy użytkownik nie jest nullem
    }
}
