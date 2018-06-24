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
            return context.Users.SingleOrDefault(x => x.Username == username && x.Password == password);            
        }

        public void Add(User user)
        {
            context.Users.Add(user);
            context.SaveChanges();
        }
    }
}
