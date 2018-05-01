using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using WMS.Domain.Model;
using WMS.Domain.Repository.Interface;

namespace WMS.Infrastructure.Repository
{
    public class UserRepository : IUserRepository
    {
        private WMSContext context;
        public UserRepository(WMSContext context)
        {
            this.context = context;
        }
        public User Get(string username, string password)
        {
            return context.Users.SingleOrDefault(x => x.Username == username && x.Password == password);
            
        }
    }
}
