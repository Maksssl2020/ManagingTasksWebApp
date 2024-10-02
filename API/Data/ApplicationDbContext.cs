using System;
using API.Models.User;
using API.Models.Task;
using Microsoft.EntityFrameworkCore;
using API.Models.Project;

namespace API.Data;

public class ApplicationDbContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }
    public DbSet<ToDoTask> Tasks { get; set; }
    public DbSet<UserProject> Projects { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ToDoTask>()
        .HasOne(task => task.User)
        .WithMany(user => user.Tasks)
        .HasForeignKey(task => task.UserId);

        modelBuilder.Entity<UserProject>()
        .HasIndex(userProject => new { userProject.UserId, userProject.Title })
        .IsUnique();

        modelBuilder.Entity<UserProject>()
        .HasOne(project => project.User)
        .WithMany(user => user.Projects)
        .HasForeignKey(project => project.UserId);

        base.OnModelCreating(modelBuilder);
    }
}
