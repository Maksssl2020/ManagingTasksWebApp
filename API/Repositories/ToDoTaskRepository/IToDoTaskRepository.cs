using System;
using System.Net;
using API.DTOs.Task;
using API.Models.Task;

namespace API.Repositories;

public interface IToDoTaskRepository
{
    Task<HttpStatusCode> SaveTaskAsync(ToDoTask toDoTask);
    Task<ToDoTaskDto?> GetTaskByIdAsync(long id);
    Task<IEnumerable<ToDoTaskDto>> GetTasksByUserIdAsync(long id);
    Task<IEnumerable<ToDoTaskDto>> GetAllTasksAcync();
    Task<HttpStatusCode> UpdateTaskAsync(long id, ToDoTask toDoTask);
    Task<HttpStatusCode> DeleteTask(long id);
}
