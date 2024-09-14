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
    public async Task<ActionResult<UserDto>> register(RegisterRequest registerRequest)
    {
        if (await IsUsernameTaken(registerRequest.Username))
        {
            return BadRequest(string.Format("Username {0} is taken!", registerRequest.Username));
        }

        if (await IsEmailTaken(registerRequest.Email))
        {
            return BadRequest(string.Format("Email {0} is taken!", registerRequest.Email));
        }

        using HMACSHA512 hmac = new();

        User user = new User
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

    private async Task<bool> IsUsernameTaken(string username)
    {
        return await applicationDbContext.Users.AnyAsync(user => user.Username.Equals(username));
    }

    private async Task<bool> IsEmailTaken(string email)
    {
        return await applicationDbContext.Users.AnyAsync(user => user.Email.Equals(email));
    }
}
