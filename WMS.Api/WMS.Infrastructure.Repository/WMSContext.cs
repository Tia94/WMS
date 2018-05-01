using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
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
        }
    }
}
