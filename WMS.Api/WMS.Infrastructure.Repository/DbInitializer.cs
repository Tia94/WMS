using System.Linq;
using WMS.Domain.Model;

namespace WMS.Infrastructure.Repository
{
    public static class DbInitializer
    {
        public static void Initialize(WMSContext context)
        {
            context.Database.EnsureCreated();

            // Look for any students.
            if (context.Users.Any())
            {
                return; // DB has been seeded
            }

            var users = new[]
            {
                new User
                {
                    Username = "admin",
                    Firstname = "System",
                    Lastname = "Admin",
                    Password = "1234",
                    Email = "admin@gmail.com",
                    TelephoneNumber = "0933594236",
                    Role = Role.Admin
                },
                new User
                {
                    Username = "client",
                    Firstname = "App",
                    Lastname = "Client",
                    Password = "1234",
                    Email = "client@gmail.com",
                    TelephoneNumber = "0933066835",
                    Role = Role.Client
                },
                new User
                {
                    Username = "driver",
                    Firstname = "Truck",
                    Lastname = "Driver",
                    Password = "1234",
                    Email = "driver@gmail.com",
                    TelephoneNumber = "0933066835",
                    Role = Role.Driver
                },
                new User
                {
                    Username = "keeper",
                    Firstname = "Store",
                    Lastname = "Keeper",
                    Password = "1234",
                    Email = "keeper@gmail.com",
                    TelephoneNumber = "0933066835",
                    Role = Role.Keeper
                },
            };

            context.Users.AddRange(users);
            context.SaveChanges();
        }
    }
}