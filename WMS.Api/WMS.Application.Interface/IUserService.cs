using System;
using WMS.Application.Dto;

namespace WMS.Application.Interface
{
    public interface IUserService
    {
        UserDto Get(string username, string password);
        
        void RegisterClient(RegisterDto dto);
        void Activate(Guid guid);
    }
}
