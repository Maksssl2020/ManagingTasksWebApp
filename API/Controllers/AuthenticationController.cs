using System;
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs.Authentication;
using API.Interfaces;
using API.Models.User;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace API.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class AuthenticationController(UserManager<User> userManager, ITokenService tokenService) : ControllerBase
{
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterRequest registerRequest)
    {
        User user = new()
        {
            UserName = registerRequest.Username,
            Email = registerRequest.Email,
        };

        System.Console.WriteLine(registerRequest);

        var result = await userManager.CreateAsync(user, registerRequest.Password);

        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }

        var roleResult = await userManager.AddToRoleAsync(user, "REGISTERED");

        if (!roleResult.Succeeded)
        {
            return BadRequest(roleResult.Errors);
        }

        return new UserDto
        {
            Id = user.Id,
            Username = user.UserName,
            Email = user.Email,
            Token = await tokenService.GenerateToken(user)
        };
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginRequest loginRequest)
    {
        var user = await userManager.Users
        .FirstOrDefaultAsync(user => user.UserName!.Equals(loginRequest.Username));

        if (user == null || user.UserName == null || user.Email == null)
        {
            return Unauthorized("Invalid credentials!");
        }

        System.Console.WriteLine(loginRequest);

        var result = await userManager.CheckPasswordAsync(user, loginRequest.Password);

        if (!result)
        {
            return Unauthorized("Invalid credentials!");
        }

        return new UserDto
        {
            Id = user.Id,
            Username = user.UserName,
            Email = user.Email,
            Token = await tokenService.GenerateToken(user)
        };
    }

    [HttpPost("is-username-unique")]
    public async Task<ActionResult<bool>> IsUsernameUnique(UsernameRequest usernameRequest)
    {
        var users = await userManager.Users.ToListAsync();
        bool isUnique = !users.Any(user => user.UserName == usernameRequest.Username);
        return Ok(isUnique);
    }

    [HttpPost("is-email-unique")]
    public async Task<ActionResult<bool>> IsEmailUnique(EmailRequest emailRequest)
    {
        var users = await userManager.Users.ToListAsync();
        bool isUnique = !users.Any(user => user.Email == emailRequest.Email);
        return Ok(isUnique);
    }
}
