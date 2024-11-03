using System;
using System.Net;
using API.DTOs.Project;
using API.Models.Project;
using API.Repositories.UserProjectRepository;
using API.Repositories.UsersRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("/api/projects/")]
// [Authorize(Policy = "RequireRegisteredRole")]
public class UserProjectController(IUserProjectRepository userProjectRepository, IUserRepository userRepository) : ControllerBase
{

    [HttpGet("user-projects/{userId}")]
    public async Task<ActionResult<IEnumerable<UserProjectDto>>> GetUserProjectsAsync(long userId)
    {
        var foundUserProjects = await userProjectRepository.GetUserProjectsAsync(userId);

        if (foundUserProjects == null)
        {
            return BadRequest("User projects not found!");
        }

        return Ok(foundUserProjects);
    }

    [HttpPost("add-project/{userId}")]
    public async Task<ActionResult<UserProjectDto>> SaveProject(long userId, UserProjectRequest userProjectRequest)
    {
        var foundUser = await userRepository.GetUserByIdAsync(userId);

        if (foundUser == null)
        {
            return BadRequest("User not found!");
        }

        var userProject = new UserProject
        {
            Title = userProjectRequest.Title,
            Details = userProjectRequest.Details,
            UserId = userId
        };

        return await userProjectRepository.SaveProjectAsync(userProject);
    }

    [HttpDelete("delete-project/{id}")]
    public async Task<ActionResult<HttpStatusCode>> DeleteProject(long id)
    {
        var foundProject = await userProjectRepository.GetUserProjectAsync(id);

        if (foundProject == null)
        {
            return BadRequest("Cannot find project!");
        }

        return await userProjectRepository.DeleteProjectAsync(id);
    }
}
