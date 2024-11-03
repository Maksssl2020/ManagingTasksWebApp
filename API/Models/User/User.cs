using System;
using System.ComponentModel.DataAnnotations;
using API.Models.Note;
using API.Models.Project;
using API.Models.Role;
using API.Models.Task;
using Microsoft.AspNetCore.Identity;

namespace API.Models.User;

public class User : IdentityUser<long>
{
    public List<ToDoTask> Tasks { get; set; } = [];
    public List<UserProject> Projects { get; set; } = [];
    public List<UserNote> Notes { get; set; } = [];
    public ICollection<UserRole> UserRoles { get; set; } = [];
}
