using System;
using System.Net;
using System.Net.Mail;
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

        public void Activate(Guid guid)
        {
            var user = userRepository.Get(guid);
            user.IsActive = true;
            userRepository.Update(user);
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
            var user = new Client(dto.Username, dto.Firstname, dto.Lastname, dto.Password, dto.Email,
                dto.TelephoneNumber,
                dto.Address);

            userRepository.Add(user);

            SendActivationEmail(user);
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
    }
}