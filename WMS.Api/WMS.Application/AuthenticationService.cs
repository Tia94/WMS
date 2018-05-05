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
                    Address = user.Address
                };
            }

            return null;
        }

        public void RegisterClient(RegisterDto registerDto)
        {
            var user = new User
            {
                Firstname = registerDto.Firstname,
                Lastname = registerDto.Lastname,
                Username = registerDto.Username,
                Email = registerDto.Email,
                Password = registerDto.Password,
                Address = registerDto.Address,
                TelephoneNumber = registerDto.TelephoneNumber,
                Role = Role.Client
            };

            userRepository.Add(user);
        }
    }
}