using System.Linq;
using Microsoft.EntityFrameworkCore;
using WMS.Domain.Model;

namespace WMS.Infrastructure.Repository
{
    public static class DbInitializer
    {
        public static void Seed(this WMSContext context)
        {
            context.Database.Migrate();

            // Look for any users.
            if (context.Users.Any())
            {
                return; // DB has been seeded
            }

            var users = new[]
            {
                new User("admin", "System", "Admin", "1234", "admin@gmail.com", "0933594236", "", Role.Admin),
                new Client("client", "App", "Client", "1234", "client@gmail.com", "0933594236", ""),
                new User("driver", "Truck", "Driver", "1234", "driver@gmail.com", "0933594236", "", Role.Driver),
                new User("keeper", "Store", "Keeper", "1234", "keeper@gmail.com", "0933594236", "", Role.Keeper)
            };

            context.Users.AddRange(users);
            context.SaveChanges();
        }
    }
}