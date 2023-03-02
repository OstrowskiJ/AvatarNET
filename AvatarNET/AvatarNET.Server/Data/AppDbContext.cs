using Avatar.Shared.Models;
using Microsoft.EntityFrameworkCore;

namespace AvatarNET.Server.Data;

public sealed class AppDbContext : DbContext
{
    public DbSet<Product> Products => Set<Product>();
    
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AvatarModel>();
        modelBuilder.Entity<Background>();
        modelBuilder.Entity<Plan>();
        modelBuilder.Entity<Voice>();

        modelBuilder.Entity<Product>().HasKey(x => x.Id);
        
        modelBuilder.SeedData();
    }
}