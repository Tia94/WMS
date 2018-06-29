using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using WMS.Domain.Model;
using WMS.Domain.Repository.Interface;

namespace WMS.Infrastructure.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly WMSContext context;

        public UserRepository(WMSContext context)
        {
            this.context = context;
        }

        public User Get(string username, string password)
        {
            return context.Users.SingleOrDefault(x => x.Username == username && x.Password == password && x.IsActive);
        }

        public void Add(User user)
        {
            context.Users.Add(user);
            context.SaveChanges();
        }

        public User Get(Guid activatinCode)
        {
            return context.Users.SingleOrDefault(x => x.ActivationCode == activatinCode);
        }

        public void Update(User user)
        {
            context.Users.Attach(user);
            var entity = context.Entry(user);
            entity.State = EntityState.Modified;
            context.SaveChanges();
        }
    }
}