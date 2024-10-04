using System;
using System.Net;
using API.Data;
using API.DTOs.Project;
using API.Models.Project;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories.UserProjectRepository;

public class UserProjectRepository(ApplicationDbContext applicationDbContext, IMapper mapper) : IUserProjectRepository
{
    public async Task<HttpStatusCode> DeleteProjectAsync(long id)
    {
        var affectedRows = await applicationDbContext.Projects
        .Where(project => project.Id == id)
        .ExecuteDeleteAsync();

        return affectedRows > 0 ? HttpStatusCode.NoContent : throw new ArgumentException("Project not found!");
    }

    public async Task<UserProjectDto?> GetUserProjectAsync(long projectId)
    {
        return await applicationDbContext.Projects
        .Where(project => project.Id == projectId)
        .ProjectTo<UserProjectDto>(mapper.ConfigurationProvider)
        .FirstOrDefaultAsync();
    }

    public async Task<IEnumerable<UserProjectDto>> GetUserProjectsAsync(long userId)
    {
        return await applicationDbContext.Projects
        .Where(project => project.UserId == userId)
        .ProjectTo<UserProjectDto>(mapper.ConfigurationProvider)
        .ToListAsync();
    }

    public async Task<UserProjectDto> SaveProjectAsync(UserProject userProject)
    {
        await applicationDbContext.Projects.AddAsync(userProject);
        await applicationDbContext.SaveChangesAsync();

        return mapper.Map<UserProject, UserProjectDto>(userProject);
    }

    public async Task<HttpStatusCode> UpdateProjectAsync(UserProjectUpdateRequest projectUpdateRequest)
    {
        var foundProject = await applicationDbContext.Projects.FirstOrDefaultAsync(project => project.Id == projectUpdateRequest.Id);

        if (foundProject == null)
        {
            throw new ArgumentException("Project not found!");
        }

        mapper.Map<UserProjectUpdateRequest, UserProject>(projectUpdateRequest);

        if (await applicationDbContext.SaveChangesAsync() == 0)
        {
            throw new InvalidOperationException("Failed to update project!");
        }

        return HttpStatusCode.NoContent;
    }
}
