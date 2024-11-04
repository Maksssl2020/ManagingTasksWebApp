using System;
using API.Models.Role;
using Microsoft.AspNetCore.Identity;

namespace API.Data;

public static class RoleSeed
{
    public static async Task SeedRolesAsync(RoleManager<Role> roleManager)
    {
        var roles = new List<Role>
        {
            new() {Name = "REGISTERED"},
            new() {Name = "ADMIN"}
        };

        foreach (var role in roles)
        {
            if (role.Name != null && !await roleManager.RoleExistsAsync(role.Name))
            {
                await roleManager.CreateAsync(role);
            }
        }
    }
}
