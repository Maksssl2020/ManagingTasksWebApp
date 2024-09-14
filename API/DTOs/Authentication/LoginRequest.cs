using System;

namespace API.DTOs.Authentication;

public class LoginRequest
{
    public required string Username { get; set; }
    public required string Password { get; set; }
}
