using WMS.Application.Dto;
using WMS.Application.Interface;
using WMS.Domain.Model;
using WMS.Domain.Repository.Interface;

namespace WMS.Application
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IUserRepository userRepository;

        public AuthenticationService(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        public UserDto Login(string username, string password)
        {
            var user = userRepository.Get(username, password);
            if (user != null)
            {
                return new UserDto
                {
                    Username = username,
                    Email = user.Email,
                    TelephoneNumber = user.TelephoneNumber,
                    Address = user.Address,
                    Role = user.Role.ToString()
                };
            }

            return null;
        }

        public void RegisterClient(RegisterDto dto)
        {
            var user = new User(dto.Username, dto.Firstname, dto.Lastname, dto.Password, dto.Email, dto.TelephoneNumber,
                dto.Address, Role.Client);

            userRepository.Add(user);
        }
    }
}