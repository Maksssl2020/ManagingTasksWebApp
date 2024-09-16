using System;

namespace API.DTOs.Authentication;

public class UsernameRequest
{
    public required string Username { get; set; }
}
