using System;
using System.Net;
using API.DTOs.Note;
using API.Models.Note;
using API.Repositories.UserNoteRepository;
using API.Repositories.UsersRepository;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("/api/user-notes/")]
public class UserNoteController(IUserNoteRepository userNoteRepository, IUserRepository userRepository) : ControllerBase
{
    [HttpGet("get-user-notes/{userId}")]
    public async Task<ActionResult<IEnumerable<UserNoteDto>>> GetUserNotes(long userId)
    {
        var foundUser = userRepository.GetUserByIdAsync(userId);

        if (foundUser == null)
        {
            return BadRequest("Cannot find user!");
        }

        var foundUserNotes = await userNoteRepository.GetUserNotesAsync(userId);

        return Ok(foundUserNotes);
    }

    [HttpPost("add-note/{userId}")]
    public async Task<ActionResult<UserNoteDto>> AddUserNote(long userId, UserNoteRequest userNoteRequest)
    {
        var foundUser = userRepository.GetUserByIdAsync(userId);

        if (foundUser == null)
        {
            return BadRequest("Cannot find user!");
        }

        var userNote = new UserNote
        {
            Title = userNoteRequest.Title,
            Details = userNoteRequest.Details,
            UserId = userId,
        };

        return await userNoteRepository.SaveNoteAsync(userNote);
    }

    [HttpDelete("delete-note/{userNoteId}")]
    public async Task<ActionResult<HttpStatusCode>> DeleteUserNote(long userNoteId)
    {
        try
        {
            return await userNoteRepository.DeleteUserNoteAsync(userNoteId);
        }
        catch (Exception)
        {
            return BadRequest("Failed to delete note!");
        }
    }
}
