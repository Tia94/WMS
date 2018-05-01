using System;
using WMS.Application.Dto;
using WMS.Application.Interface;
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
                };
            }

            return null;
        }

        public void Register()
        {
            throw new NotImplementedException();
        }
    }
}