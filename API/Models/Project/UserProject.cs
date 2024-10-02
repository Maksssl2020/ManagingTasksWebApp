using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace API.Models.Project;

public class UserProject
{
    [Key]
    public long Id { get; set; }
    public required string Title { get; set; }
    public required string Details { get; set; }
    public long UserId { get; set; }
    public User.User User { get; set; } = null!;
}
