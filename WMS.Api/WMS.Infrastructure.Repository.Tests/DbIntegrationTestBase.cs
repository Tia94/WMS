using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace WMS.Infrastructure.Repository.Tests
{
    public abstract class DbIntegrationTestBase : IDisposable
    {
        protected DbIntegrationTestBase()
        {
            Configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();

            DbContextOptions = new DbContextOptionsBuilder()
                .UseSqlServer(Configuration.GetConnectionString("Default"))
                .Options;

            using (var context = GetWMSContext())
            {
                context.Database.Migrate();
                context.Seed();
            }
        }

        protected DbContextOptions DbContextOptions { get; }

        protected IConfiguration Configuration { get; }

        protected WMSContext GetWMSContext()
        {
            return new WMSContext(DbContextOptions);
        }

        public void Dispose()
        {
            using (var context = GetWMSContext())
            {
                context.Database.EnsureDeleted();
            }
        }
    }
}