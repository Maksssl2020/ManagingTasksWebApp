using API.Models.User;
using Microsoft.AspNetCore.Identity;

namespace API.Models.Role;

public class UserRole : IdentityUserRole<long>
{
    public User.User User { get; set; } = null!;
    public Role Role { get; set; } = null!;
}
