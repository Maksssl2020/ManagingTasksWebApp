using System;
using API.DTOs.Project;
using API.Models.Project;
using API.Repositories.ProjectRepository;
using API.Repositories.UsersRepository;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("/api/projects/")]
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
}
