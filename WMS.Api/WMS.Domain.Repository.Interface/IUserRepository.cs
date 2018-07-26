using System;
using System.Collections.Generic;
using WMS.Domain.Model.Users;

namespace WMS.Domain.Repository.Interface
{
    public interface IUserRepository
    {
        IList<User> Get();

        User Get(int id);

        User Get(string username, string password);

        T Get<T>(string username) where T : User;

        User Get(Guid activatinCode);

        void Add(User user);

        void Update(User user);

        void Delete(int id);
    }
}