using System;
using System.ComponentModel.DataAnnotations;

namespace API.Models.Note;

public class UserNote
{
    [Key]
    public long Id { get; set; }
    public required string Title { get; set; }
    public required string Details { get; set; }
    public long UserId { get; set; }
    public User.User User { get; set; } = null!;
}
