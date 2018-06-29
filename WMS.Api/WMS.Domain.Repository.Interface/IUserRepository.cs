using WMS.Domain.Model;
using System;
using WMS.Domain.Model.Users;

namespace WMS.Domain.Repository.Interface
{
    public interface IUserRepository
    {
        User Get(string username, string password);
        User Get(Guid activatinCode);

        void Add(User user);
        void Update(User user);
    }

}
