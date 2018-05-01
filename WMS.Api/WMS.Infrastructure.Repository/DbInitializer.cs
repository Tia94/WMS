using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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
                return;   // DB has been seeded
            }

            var users = new User[]
            {
            new User{Firstname="Carson",Lastname="Alexander",Password="1234",Email="admin@gmail.com",TelephoneNumber="0933594236",Role=Role.Admin},
            new User{Firstname="Patricia",Lastname="Atieyeh",Password="12345",Email="patricia.atieyeh@gmail.com",TelephoneNumber="0933066835",Role=Role.Client},
            new User{Firstname="Said",Lastname="Atieyeh",Password="123456",Email="driver@gmail.com",TelephoneNumber="0933066835",Role=Role.Driver},
            new User{Firstname="Rami",Lastname="Atieyeh",Password="1234567",Email="keeper@gmail.com",TelephoneNumber="0933066835",Role=Role.Keeper},
            };
            
            context.SaveChanges();
        }
    }
}
