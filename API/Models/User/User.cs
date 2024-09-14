using System;
using System.ComponentModel.DataAnnotations;

namespace API.Models.User;

public class User
{
    [Key]
    public long Id { get; set; }
    public required string Username { get; set; }
    public required string Password { get; set; }
    public required string PasswordSalt { get; set; }
    public required string Email { get; set; }
}
