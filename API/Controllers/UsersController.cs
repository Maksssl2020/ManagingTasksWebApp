using System;
using API.Data;
using API.Models.User;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class UsersController(ApplicationDbContext applicationDbContext) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> FindAllUsers()
    {
        return await applicationDbContext.Users.ToListAsync();
    }
}
