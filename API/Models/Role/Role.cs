using System;
using Microsoft.AspNetCore.Identity;

namespace API.Models.Role;

public class Role : IdentityRole<long>
{
    public ICollection<UserRole> UserRoles { get; set; } = [];
}
