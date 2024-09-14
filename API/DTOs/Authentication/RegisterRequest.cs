using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs.Authentication;

public class RegisterRequest
{
    [Required]
    public required string Username { get; set; }
    [Required]
    public required string Password { get; set; }
    [Required]
    public required string Email { get; set; }
}
