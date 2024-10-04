using System;
using System.Net;
using API.Data;
using API.DTOs.Task;
using API.Models.Task;
using API.Models.User;
using API.Repositories;
using API.Repositories.UsersRepository;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("/api/to-do-tasks/")]
public class ToDoTaskController(IToDoTaskRepository toDoTaskRepository, IUserRepository userRepository) : ControllerBase
{

    [HttpGet("all")]
    public async Task<ActionResult<IEnumerable<ToDoTaskDto>>> GetAllTasks()
    {
        var foundTasks = await toDoTaskRepository.GetAllTasksAsync();

        if (foundTasks == null)
        {
            return NotFound("There aren't any tasks!");
        }

        return Ok(foundTasks);
    }

    [HttpGet("all/user/{id}")]
    public async Task<ActionResult<IEnumerable<ToDoTaskDto>>> GetAllUserTasks(long id)
    {
        var foundTasks = await toDoTaskRepository.GetTasksByUserIdAsync(id);

        if (foundTasks == null)
        {
            return NotFound("There aren't any user's tasks!");
        }

        return Ok(foundTasks);
    }

    [HttpGet("get-task/{id}")]
    public async Task<ActionResult<ToDoTaskDto>> getTask(long id)
    {
        var foundTask = await toDoTaskRepository.GetTaskByIdAsync(id);

        if (foundTask == null)
        {
            return BadRequest("There is not a task with chosen id!");
        }

        return foundTask;
    }

    [HttpPost("save-task")]
    public async Task<ActionResult<ToDoTaskDto>> SaveTask(ToDoTaskRequest taskRequest)
    {
        var foundUser = await userRepository.GetUserByIdAsync(taskRequest.UserId);

        if (foundUser == null)
        {
            return NotFound("User not found!");
        }

        if (!Enum.TryParse(taskRequest.Priority, true, out TaskPriority priority))
        {
            return BadRequest("Invalid task priority name!");
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

        return await toDoTaskRepository.SaveTaskAsync(task); ;
    }

    [HttpPut("update-task")]
    public async Task<ActionResult<HttpStatusCode>> UpdateTask(ToDoTaskUpdateRequest toDoTaskUpdateRequest)
    {
        try
        {
            await toDoTaskRepository.UpdateTaskAsync(toDoTaskUpdateRequest.Id, toDoTaskUpdateRequest);
            return NoContent();
        }
        catch (ArgumentException exception)
        {
            return BadRequest(exception.Message);
        }
        catch (InvalidOperationException exception)
        {
            return BadRequest(exception.Message);
        }
    }

    [HttpDelete("delete-task/{id}")]
    public async Task<ActionResult<HttpStatusCode>> DeleteTask(long id)
    {
        return await toDoTaskRepository.DeleteTaskAsync(id);
    }

    [HttpDelete("delete-tasks")]
    public async Task<ActionResult<HttpStatusCode>> DeleteAllTasks([FromQuery] long[] tasksId)
    {
        var (status, deletedCount) = await toDoTaskRepository.DeleteAllTasksAsync(tasksId);

        if (status == HttpStatusCode.NoContent)
        {
            return NoContent();
        }
        else if (status == HttpStatusCode.PartialContent)
        {
            return StatusCode((int)HttpStatusCode.PartialContent, new { message = $"Only {deletedCount} tasks could be deleted!" });
        }
        else
        {
            return BadRequest("Deleting tasks failed!");
        }
    }
}
