using System;
using System.Net;
using API.DTOs.Task;
using API.Models.Task;

namespace API.Repositories;

public interface IToDoTaskRepository
{
    Task<ToDoTaskDto> SaveTaskAsync(ToDoTask toDoTask);
    Task<ToDoTaskDto?> GetTaskByIdAsync(long id);
    Task<IEnumerable<ToDoTaskDto>> GetTasksByUserIdAsync(long id);
    Task<IEnumerable<ToDoTaskDto>> GetAllTasksAsync();
    Task<HttpStatusCode> UpdateTaskAsync(long id, ToDoTaskUpdateRequest toDoTaskUpdateRequest);
    Task<HttpStatusCode> DeleteTaskAsync(long id);
    Task<(HttpStatusCode status, int deletedCount)> DeleteAllTasksAsync(long[] tasksId);
}
