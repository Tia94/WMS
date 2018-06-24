using Microsoft.EntityFrameworkCore;
using WMS.Domain.Model;

namespace WMS.Infrastructure.Repository
{
    public class WMSContext : DbContext
    {
        public WMSContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable(nameof(User));
            modelBuilder.Entity<User>().HasKey(x => x.Id);

            modelBuilder.Entity<Product>().ToTable(nameof(Product));
            modelBuilder.Entity<Product>().HasKey(x => x.Id);
            modelBuilder.Entity<Product>().Property(x => x.Price).HasColumnType("decimal(9, 3)");
        }
    }
}