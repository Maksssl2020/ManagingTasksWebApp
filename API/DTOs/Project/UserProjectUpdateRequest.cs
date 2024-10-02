using System;

namespace API.DTOs.Project;

public class UserProjectUpdateRequest
{
    public long? Id { get; set; }
    public string? Title { get; set; }
    public string? Details { get; set; }
}
