using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using WMS.Domain.Model.Users;
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

        public IList<User> Get()
        {
            return context.Users.ToList();
        }

        public User Get(string username, string password)
        {
            return context.Users.SingleOrDefault(x => x.Username == username && x.Password == password && x.IsActive);
        }

        public T Get<T>(string username) where T : User
        {
            return context.Users.OfType<T>().Single(x => x.Username == username);
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

        public User Get(int id)
        {
            return context.Users.Single(x => x.Id == id);
        }

        public void Delete(int id)
        {
            var user = context.Users.Single(x => x.Id == id);
            context.Users.Remove(user);
            context.SaveChanges();
        }
    }
}