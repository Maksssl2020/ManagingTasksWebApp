using System;
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs.Authentication;
using API.Interfaces;
using API.Models.User;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class AuthenticationController(ApplicationDbContext applicationDbContext, ITokenService tokenService) : ControllerBase
{
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterRequest registerRequest)
    {
        using HMACSHA512 hmac = new();

        User user = new()
        {
            Username = registerRequest.Username,
            Password = Convert.ToBase64String(hmac.ComputeHash(Encoding.UTF8.GetBytes(registerRequest.Password))),
            PasswordSalt = Convert.ToBase64String(hmac.Key),
            Email = registerRequest.Email
        };

        applicationDbContext.Users.Add(user);
        await applicationDbContext.SaveChangesAsync();


        var userDto = await Login(new LoginRequest
        {
            Username = registerRequest.Username,
            Password = registerRequest.Password
        });

        return userDto;
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginRequest loginRequest)
    {
        var user = await applicationDbContext.Users.FirstOrDefaultAsync(user => user.Username.Equals(loginRequest.Username));

        if (user == null)
        {
            return Unauthorized("Invalid credentials!");
        }

        using HMACSHA512 hmac = new(Convert.FromBase64String(user.PasswordSalt));
        byte[] computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginRequest.Password));
        byte[] storedHash = Convert.FromBase64String(user.Password);

        for (int i = 0; i < computedHash.Length; i++)
        {
            if (computedHash[i] != storedHash[i])
            {
                return Unauthorized("Invalid credentials!");
            }
        }

        return new UserDto
        {
            Username = user.Username,
            Email = user.Email,
            Token = tokenService.GenerateToken(user)
        };
    }

    [HttpPost("is-username-unique")]
    public async Task<ActionResult<bool>> IsUsernameUnique(string username)
    {
        return await applicationDbContext.Users.AnyAsync(user => !user.Username.Equals(username));
    }

    [HttpPost("is-email-unique")]
    public async Task<ActionResult<bool>> IsEmailUnique(string email)
    {
        return await applicationDbContext.Users.AnyAsync(user => !user.Email.Equals(email));
    }
}
