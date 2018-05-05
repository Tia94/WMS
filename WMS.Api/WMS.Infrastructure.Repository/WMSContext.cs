using Microsoft.EntityFrameworkCore;
using WMS.Domain.Model;

namespace WMS.Infrastructure.Repository
{
    public class WMSContext : DbContext
    {
        public WMSContext(DbContextOptions<WMSContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("User");
            modelBuilder.Entity<User>().HasKey(x => x.Id);
        }
    }
}
