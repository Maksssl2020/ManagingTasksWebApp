using System;
using API.Models.User;

namespace API.Interfaces;

public interface ITokenService
{
    Task<string> GenerateToken(User user);
}
