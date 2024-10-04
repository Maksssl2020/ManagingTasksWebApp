using System;
using System.Net;
using API.Data;
using API.DTOs.Note;
using API.Models.Note;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories.UserNoteRepository;

public class UserNoteRepository(ApplicationDbContext applicationDbContext, IMapper mapper) : IUserNoteRepository
{
    public async Task<HttpStatusCode> DeleteUserNoteAsync(long userNoteId)
    {
        var affectedRows = await applicationDbContext.Notes
            .Where(note => note.Id == userNoteId)
            .ExecuteDeleteAsync();

        return affectedRows != 0 ? HttpStatusCode.NoContent : throw new ArgumentException("Note not found!");
    }

    public async Task<IEnumerable<UserNoteDto>> GetUserNotesAsync(long userId)
    {
        return await applicationDbContext.Notes
            .Where(note => note.UserId == userId)
            .ProjectTo<UserNoteDto>(mapper.ConfigurationProvider)
            .ToListAsync();
    }

    public async Task<UserNoteDto> SaveNoteAsync(UserNote userNote)
    {
        await applicationDbContext.Notes.AddAsync(userNote);
        await applicationDbContext.SaveChangesAsync();

        return mapper.Map<UserNote, UserNoteDto>(userNote);
    }
}
