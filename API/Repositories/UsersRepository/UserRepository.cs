using System;
using API.Data;
using API.DTOs.Authentication;
using API.Models.User;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories.UsersRepository;

public class UserRepository(ApplicationDbContext applicationDbContext, IMapper mapper) : IUserRepository
{
    public async Task<User?> GetUserByIdAsync(long id)
    {
        return await applicationDbContext.Users
            .Where(user => user.Id == id)
            .FirstOrDefaultAsync();
    }

    public async Task<UserDto?> GetUserDtoByIdAsync(long id)
    {
        return await applicationDbContext.Users
            .Where(user => user.Id == id)
            .ProjectTo<UserDto>(mapper.ConfigurationProvider)
            .FirstOrDefaultAsync();
    }

    public async Task<IEnumerable<UserDto>> GetUsersAsync()
    {
        return await applicationDbContext.Users
            .ProjectTo<UserDto>(mapper.ConfigurationProvider)
            .ToListAsync();
    }
}
