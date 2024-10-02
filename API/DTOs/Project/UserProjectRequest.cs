using System;

namespace API.DTOs.Project;

public class UserProjectRequest
{
    public required string Title { get; set; }
    public required string Details { get; set; }
    public long UserId { get; set; }
}
