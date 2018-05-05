using WMS.Domain.Model;

namespace WMS.Domain.Repository.Interface
{
    public interface IUserRepository
    {
        User Get(string username, string password);

        void Add(User user);
    }

}
