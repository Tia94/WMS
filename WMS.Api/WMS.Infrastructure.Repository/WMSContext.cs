using Microsoft.EntityFrameworkCore;
using WMS.Domain.Model;
using WMS.Domain.Model.Orders;
using WMS.Domain.Model.Users;

namespace WMS.Infrastructure.Repository
{
    public class WMSContext : DbContext
    {
        public WMSContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<Order> Orders { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable(nameof(User));
            modelBuilder.Entity<User>().HasKey(x => x.Id);

            modelBuilder.Entity<Product>().ToTable(nameof(Product));
            modelBuilder.Entity<Product>().HasKey(x => x.Id);
            modelBuilder.Entity<Product>().Property(x => x.Price).HasColumnType(SqlServerTypes.Decimal);

            modelBuilder.Entity<Order>().ToTable(nameof(Order));
            modelBuilder.Entity<Order>().HasKey(x => x.Id);
            modelBuilder.Entity<Order>().HasMany(x => x.Items);
            modelBuilder.Entity<Order>().HasMany(x => x.Stages)
                .WithOne(x => x.Order)
                .IsRequired()
                .HasForeignKey(x => x.OrderId);

            modelBuilder.Entity<Order>().HasOne(x => x.Client).WithMany(x => x.Orders).OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<OrderItem>().ToTable(nameof(OrderItem));
            modelBuilder.Entity<OrderItem>().HasKey(x => x.Id);
            modelBuilder.Entity<OrderItem>().HasOne(x => x.Product);
            modelBuilder.Entity<OrderItem>().Property(x => x.Price).HasColumnType(SqlServerTypes.Decimal);

            modelBuilder.Entity<OrderStage>().ToTable(nameof(OrderStage));
            modelBuilder.Entity<OrderStage>().HasKey(x => x.Id);
            modelBuilder.Entity<OrderStage>().HasOne(x => x.Order).WithMany(x => x.Stages)
                .OnDelete(DeleteBehavior.Cascade);

        }
    }
}