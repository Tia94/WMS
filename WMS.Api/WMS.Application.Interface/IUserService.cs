using System;
using System.Collections.Generic;
using WMS.Application.Dto;

namespace WMS.Application.Interface
{
    public interface IUserService
    {
        UserDto Get(string username, string password);

        void RegisterClient(RegisterDto dto);

        void Activate(Guid guid);

        IList<UserDto> Get();

        UserDto Get(int id);

        void Add(UserDto dto);

        void Update(UserDto dto);

        void Delete(int id);
    }
}