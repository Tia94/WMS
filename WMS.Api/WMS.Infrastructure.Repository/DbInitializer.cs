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

            AddUsers(context);

            AddProducts(context);

            context.SaveChanges();
        }

        private static void AddProducts(WMSContext context)
        {
            if (context.Products.Any())
                return;

            var products = new[]
            {
                new Product("Product 1", "Category A", 50, 190),
                new Product("Product 2", "Category A", 150, 110),
                new Product("Product 3", "Category B", 200, 190.9M),
                new Product("Product 4", "Category B", 8000, 160.5M),
            };

            context.Products.AddRange(products);
        }

        private static void AddUsers(WMSContext context)
        {
            // Look for any users.
            if (context.Users.Any())
                return; // DB has been seeded

            var users = new[]
            {
                new User("admin", "System", "Admin", "1234", "admin@gmail.com", "0933594236", "", Role.Admin),
                new Client("client", "App", "Client", "1234", "client@gmail.com", "0933594236", ""),
                new User("driver", "Truck", "Driver", "1234", "driver@gmail.com", "0933594236", "", Role.Driver),
                new User("keeper", "Store", "Keeper", "1234", "keeper@gmail.com", "0933594236", "", Role.Keeper)
            };

            context.Users.AddRange(users);
        }
    }
}