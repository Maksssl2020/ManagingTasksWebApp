using System;
using System.Net;
using API.Data;
using API.DTOs.Task;
using API.Models.Task;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories.ToDoTaskRepository;

public class ToDoTaskRepository(ApplicationDbContext applicationDbContext, IMapper mapper) : IToDoTaskRepository
{
    public async Task<HttpStatusCode> DeleteTask(long id)
    {
        var affectedRows = await applicationDbContext.Tasks
        .Where(task => task.Id == id)
        .ExecuteDeleteAsync();

        return affectedRows == 0 ? HttpStatusCode.NotFound : HttpStatusCode.NoContent;
    }

    public async Task<IEnumerable<ToDoTaskDto>> GetAllTasksAcync()
    {
        return await applicationDbContext.Tasks
        .ProjectTo<ToDoTaskDto>(mapper.ConfigurationProvider)
        .ToListAsync();
    }

    public async Task<ToDoTaskDto?> GetTaskByIdAsync(long id)
    {
        return await applicationDbContext.Tasks
        .Where(task => task.Id == id)
        .ProjectTo<ToDoTaskDto>(mapper.ConfigurationProvider)
        .FirstOrDefaultAsync();
    }

    public async Task<IEnumerable<ToDoTaskDto>> GetTasksByUserIdAsync(long id)
    {
        return await applicationDbContext.Tasks
        .Where(task => task.UserId == id)
        .ProjectTo<ToDoTaskDto>(mapper.ConfigurationProvider)
        .ToListAsync();
    }

    public async Task<HttpStatusCode> SaveTaskAsync(ToDoTask toDoTask)
    {
        await applicationDbContext.Tasks.AddAsync(toDoTask);
        await applicationDbContext.SaveChangesAsync();

        return HttpStatusCode.OK;
    }

    public async Task<HttpStatusCode> UpdateTaskAsync(long id, ToDoTask toDoTask)
    {
        var affectedRows = await applicationDbContext.Tasks
        .Where(task => task.Id == id)
        .ExecuteUpdateAsync(updates =>
            updates
                .SetProperty(task => task.Title, toDoTask.Title)
                .SetProperty(task => task.Deadline, toDoTask.Deadline)
                .SetProperty(task => task.Project, toDoTask.Project)
                .SetProperty(task => task.Priority, toDoTask.Priority)
                .SetProperty(task => task.Details, toDoTask.Details)
                .SetProperty(task => task.IsFinished, toDoTask.IsFinished)
                .SetProperty(task => task.IsAfterDeadline, toDoTask.IsAfterDeadline)
                .SetProperty(task => task.Deadline, toDoTask.Deadline)
         );

        return affectedRows == 0 ? HttpStatusCode.NotFound : HttpStatusCode.NoContent;
    }
}
