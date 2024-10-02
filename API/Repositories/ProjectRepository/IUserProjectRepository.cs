using System;
using System.Net;
using API.DTOs.Project;
using API.Models.Project;

namespace API.Repositories.ProjectRepository;

public interface IUserProjectRepository
{
    Task<IEnumerable<UserProjectDto>> GetUserProjectsAsync(long userId);
    Task<UserProjectDto> SaveProjectAsync(UserProject userProject);
    Task<HttpStatusCode> UpdateProjectAsync(UserProjectUpdateRequest projectUpdateRequest);
    Task<HttpStatusCode> DeleteProjectAsync(long id);

}
