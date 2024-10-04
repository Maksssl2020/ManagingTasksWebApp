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
    public async Task<(HttpStatusCode status, int deletedCount)> DeleteAllTasksAsync(long[] tasksId)
    {

        using var transaction = await applicationDbContext.Database.BeginTransactionAsync();

        try
        {
            var affectedRows = await applicationDbContext.Tasks
            .Where(task => tasksId.Contains(task.Id))
            .ExecuteDeleteAsync();

            await transaction.CommitAsync();

            var status = affectedRows == tasksId.Length ? HttpStatusCode.NoContent : HttpStatusCode.PartialContent;

            return (status, affectedRows);
        }
        catch (Exception)
        {
            await transaction.RollbackAsync();
            return (HttpStatusCode.InternalServerError, 0);
        }

    }

    public async Task<HttpStatusCode> DeleteTaskAsync(long id)
    {
        var affectedRows = await applicationDbContext.Tasks
        .Where(task => task.Id == id)
        .ExecuteDeleteAsync();

        return affectedRows == 0 ? HttpStatusCode.NotFound : HttpStatusCode.NoContent;
    }

    public async Task<IEnumerable<ToDoTaskDto>> GetAllTasksAsync()
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

    public async Task<ToDoTaskDto> SaveTaskAsync(ToDoTask toDoTask)
    {
        await applicationDbContext.Tasks.AddAsync(toDoTask);
        await applicationDbContext.SaveChangesAsync();

        return mapper.Map<ToDoTask, ToDoTaskDto>(toDoTask);
    }

    public async Task<HttpStatusCode> UpdateTaskAsync(long id, ToDoTaskUpdateRequest toDoTaskUpdateRequest)
    {
        var foundTask = await applicationDbContext.Tasks.FirstOrDefaultAsync(task => task.Id == id) ?? throw new ArgumentException("Task not found!");

        mapper.Map(toDoTaskUpdateRequest, foundTask);

        if (await applicationDbContext.SaveChangesAsync() == 0)
        {
            throw new InvalidOperationException("Failed to update the task!");
        }

        return HttpStatusCode.NoContent;
    }
}
