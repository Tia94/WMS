using System;

namespace WMS.Application.Interface
{
    public interface IAuthenticationService
    {
        bool Login(string username, string password);

        void Register();
    }
}
