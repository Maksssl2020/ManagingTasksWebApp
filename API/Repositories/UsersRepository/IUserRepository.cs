using System;
using API.DTOs.Authentication;
using API.Models.User;

namespace API.Repositories.UsersRepository;

public interface IUserRepository
{
    Task<UserDto?> GetUserDtoByIdAsync(long id);
    Task<User?> GetUserByIdAsync(long id);
    Task<IEnumerable<UserDto>> GetUsersAsync();
}
