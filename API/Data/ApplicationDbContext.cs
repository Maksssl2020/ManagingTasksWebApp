using System;
using API.Models.User;
using API.Models.Task;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class ApplicationDbContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }
    public DbSet<ToDoTask> Tasks { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ToDoTask>()
        .HasOne(task => task.User)
        .WithMany(user => user.Tasks)
        .HasForeignKey(task => task.UserId);

        base.OnModelCreating(modelBuilder);
    }
}
