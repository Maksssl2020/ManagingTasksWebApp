using System;

namespace API.DTOs.Note;

public class UserNoteRequest
{
    public required string Title { get; set; }
    public required string Details { get; set; }
    public long UserId { get; set; }
}
