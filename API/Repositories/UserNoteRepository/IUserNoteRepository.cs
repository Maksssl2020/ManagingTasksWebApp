using System;
using System.Net;
using API.DTOs.Note;
using API.Models.Note;

namespace API.Repositories.UserNoteRepository;

public interface IUserNoteRepository
{
    Task<UserNoteDto> SaveNoteAsync(UserNote userNote);
    Task<IEnumerable<UserNoteDto>> GetUserNotesAsync(long userId);
    Task<HttpStatusCode> DeleteUserNoteAsync(long userNoteId);
}
