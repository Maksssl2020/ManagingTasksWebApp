using System;
using System.ComponentModel.DataAnnotations;
using API.Models.Note;
using API.Models.Project;
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
    public List<UserProject> Projects { get; set; } = [];
    public List<UserNote> Notes { get; set; } = [];
}
