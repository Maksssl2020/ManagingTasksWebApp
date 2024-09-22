using System;
using System.ComponentModel.DataAnnotations;
using API.Models.Task;

namespace API.Models.User;

public class User
{
    [Key]
    public long Id { get; set; }
    public required string Username { get; set; }
    public required string Password { get; set; }
    public required string PasswordSalt { get; set; }
    public required string Email { get; set; }

    public List<ToDoTask> Tasks { get; set; } = [];
}
