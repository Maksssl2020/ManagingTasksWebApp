using System;

namespace API.DTOs.Authentication;

public class UserDto
{
    public long Id { get; set; }
    public required string Username { get; set; }
    public required string Email { get; set; }
    public required string Token { get; set; }
}
