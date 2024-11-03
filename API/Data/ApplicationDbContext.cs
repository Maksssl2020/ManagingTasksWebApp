using System;
using API.Models.User;
using API.Models.Task;
using Microsoft.EntityFrameworkCore;
using API.Models.Project;
using API.Models.Note;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using API.Models.Role;
using Microsoft.AspNetCore.Identity;

namespace API.Data;

public class ApplicationDbContext(DbContextOptions options) : IdentityDbContext<User, Role, long, IdentityUserClaim<long>, UserRole, IdentityUserLogin<long>, IdentityRoleClaim<long>, IdentityUserToken<long>>(options)
{
    public DbSet<ToDoTask> Tasks { get; set; }
    public DbSet<UserProject> Projects { get; set; }
    public DbSet<UserNote> Notes { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<UserRole>()
                .HasKey(ur => new { ur.UserId, ur.RoleId });

        modelBuilder.Entity<UserRole>()
                .HasIndex(ur => ur.UserId)
                .IsUnique();

        modelBuilder.Entity<User>()
        .HasMany(user => user.UserRoles)
        .WithOne(ur => ur.User)
        .HasForeignKey(ur => ur.UserId)
        .IsRequired();

        modelBuilder.Entity<Role>()
        .HasMany(user => user.UserRoles)
        .WithOne(ur => ur.Role)
        .HasForeignKey(ur => ur.RoleId)
        .IsRequired();

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

        modelBuilder.Entity<UserNote>()
        .HasOne(note => note.User)
        .WithMany(user => user.Notes)
        .HasForeignKey(note => note.UserId);
    }
}
