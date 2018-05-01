using WMS.Application.Dto;

namespace WMS.Application.Interface
{
    public interface IAuthenticationService
    {
        UserDto Login(string username, string password);

        void Register();
    }
}
