using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Interfaces;
using API.Models.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace API.Services;

public class TokenService(IConfiguration configuration, UserManager<User> userManager) : ITokenService
{
    public async Task<string> GenerateToken(User user)
    {
        string tokenSecretKey = configuration["TokenSecretKey"] ?? throw new Exception("Cannot find secret token key!");

        SymmetricSecurityKey symmetricSecurityKey = new(Encoding.UTF8.GetBytes(tokenSecretKey));

        if (user.UserName == null)
        {
            throw new Exception("Invalid username!");
        }

        List<Claim> claims = [
            new(ClaimTypes.NameIdentifier, user.UserName)
        ];

        var role = await userManager.GetRolesAsync(user);
        claims.AddRange(role.Select(role => new Claim(ClaimTypes.Role, role)));

        SigningCredentials signingCredentials = new(symmetricSecurityKey, SecurityAlgorithms.HmacSha512Signature);

        SecurityTokenDescriptor securityTokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(1),
            SigningCredentials = signingCredentials
        };
        JwtSecurityTokenHandler jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
        SecurityToken securityToken = jwtSecurityTokenHandler.CreateToken(securityTokenDescriptor);

        return jwtSecurityTokenHandler.WriteToken(securityToken);
    }
}
