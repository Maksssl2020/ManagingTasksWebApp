using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Interfaces;
using API.Models.User;
using Microsoft.IdentityModel.Tokens;

namespace API.Services;

public class TokenService(IConfiguration configuration) : ITokenService
{
    public string GenerateToken(User user)
    {
        string tokenSecretKey = configuration["TokenSecretKey"] ?? throw new Exception("Cannot find secret token key!");

        SymmetricSecurityKey symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenSecretKey));

        List<Claim> claims = [
            new(ClaimTypes.NameIdentifier, user.Username)
        ];

        SigningCredentials signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha512Signature);

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
