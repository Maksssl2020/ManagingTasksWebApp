using System;
using API.Models.User;

namespace API.Interfaces;

public interface ITokenService
{
    string GenerateToken(User user);
}
