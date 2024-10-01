using System;
using API.DTOs.Task;
using API.Models.Task;
using AutoMapper;

namespace API.Helpers;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<ToDoTask, ToDoTaskDto>()
            .ForMember(destination => destination.Priority, option => option.MapFrom(source => source.Priority.ToString()))
            .ForMember(destination => destination.Deadline, option => option.MapFrom(source => DateOnly.Parse(source.Deadline.ToString())));

        CreateMap<ToDoTaskUpdateRequest, ToDoTask>();
    }
}
