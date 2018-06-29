using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using WMS.Application.Dto;
using WMS.Application.Interface;
using WMS.Domain.Model.Users;
using WMS.Domain.Repository.Interface;

namespace WMS.Application
{
    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;

        public UserService(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        public UserDto Get(string username, string password)
        {
            var user = userRepository.Get(username, password);

            return user != null ? MapToUserDto(user) : null;
        }

        public void RegisterClient(RegisterDto dto)
        {
            var user = new Client(dto.Username, dto.Firstname, dto.Lastname, dto.Password, dto.Email,
                dto.TelephoneNumber, dto.Address);

            userRepository.Add(user);

            SendActivationEmail(user);
        }

        public void Activate(Guid guid)
        {
            var user = userRepository.Get(guid);
            user.IsActive = true;
            userRepository.Update(user);
        }

        public IList<UserDto> Get()
        {
            return userRepository.Get().Select(MapToUserDto).ToList();
        }

        public UserDto Get(int id)
        {
            return MapToUserDto(userRepository.Get(id));
        }

        public void Add(UserDto dto)
        {
            var user = new User(dto.Username, dto.Firstname, dto.Lastname, dto.Password, dto.Email, dto.TelephoneNumber,
                dto.Address, Enum.Parse<Role>(dto.Role));

            userRepository.Add(user);
        }

        public void Update(UserDto dto)
        {
            var user = userRepository.Get(dto.Id);

            user.Username = dto.Username;
            user.Password = dto.Password;
            user.Firstname = dto.Firstname;
            user.Lastname = dto.Lastname;
            user.Email = dto.Email;
            user.TelephoneNumber = dto.TelephoneNumber;
            user.Address = dto.Address;
            user.IsActive = dto.IsActive;

            userRepository.Update(user);
        }

        public void Delete(int id)
        {
            userRepository.Delete(id);
        }

        private static void SendActivationEmail(User user)
        {
            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential("*******", "*******")
            };

            using (smtp)
            {
                var mailMessage = new MailMessage
                {
                    From = new MailAddress("WMS@gmail.com"),
                    Body = $"<a href=\"http://localhost:50234/api/auth/activate/{user.ActivationCode}\">Activate </a>",
                    Subject = "subject"
                };

                mailMessage.To.Add(user.Email);
                smtp.Send(mailMessage);
            }
        }

        private static UserDto MapToUserDto(User user)
        {
            return new UserDto
            {
                Username = user.Username,
                Password = user.Password,
                Firstname = user.Firstname,
                Lastname = user.Lastname,
                Email = user.Email,
                TelephoneNumber = user.TelephoneNumber,
                Address = user.Address,
                Role = user.Role.ToString(),
                IsActive = user.IsActive
            };
        }
    }
}