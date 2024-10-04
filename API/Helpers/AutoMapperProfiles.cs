using System;
using API.DTOs.Note;
using API.DTOs.Project;
using API.DTOs.Task;
using API.Models.Note;
using API.Models.Project;
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
        CreateMap<UserProject, UserProjectDto>();
        CreateMap<UserProjectUpdateRequest, UserProject>();
        CreateMap<UserNote, UserNoteDto>();
    }
}
