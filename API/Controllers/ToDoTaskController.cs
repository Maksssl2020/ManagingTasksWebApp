using System;
using API.Data;
using API.DTOs.Task;
using API.Models.Task;
using API.Models.User;
using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("/api/to-do-tasks/")]
public class ToDoTaskController(ApplicationDbContext applicationDbContext, IMapper mapper) : ControllerBase
{

    [HttpGet("test")]
    public ActionResult<string> Test()
    {
        return "Test endpoint is working.";
    }

    [HttpPost("save-task")]
    public async Task<ActionResult<ToDoTaskDto>> SaveTask([FromBody] ToDoTaskRequest taskRequest)
    {

        Console.WriteLine($"Searching for user with ID: {taskRequest.UserId}");

        var foundUser = await applicationDbContext.Users.FindAsync(taskRequest.UserId);

        if (foundUser == null)
        {
            return NotFound("User not found!");
        }

        if (Enum.TryParse<TaskPriority>(taskRequest.Priority, out TaskPriority priority))
        {
            return BadRequest("Invalid task prioroty name!");
        }

        var task = new ToDoTask
        {
            Title = taskRequest.Title,
            Details = taskRequest.Details,
            Project = taskRequest.Project,
            Deadline = taskRequest.Deadline,
            Priority = priority,
            IsFinished = false,
            IsAfterDeadline = false,
            UserId = foundUser.Id
        };

        applicationDbContext.Tasks.Add(task);
        await applicationDbContext.SaveChangesAsync();

        return Ok(mapper.Map<ToDoTaskDto>(task));
    }
}
