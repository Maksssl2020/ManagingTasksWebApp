using System;

namespace API.DTOs.Note;

public class UserNoteDto
{
    public long Id { get; set; }
    public required string Title { get; set; }
    public required string Details { get; set; }
    public long UserId { get; set; }
}
