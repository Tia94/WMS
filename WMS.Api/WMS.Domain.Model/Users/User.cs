using System;

namespace WMS.Domain.Model.Users
{
    public class User : Entity
    {
        public User(string username, string firstname, string lastname, string password, string email,
            string telephoneNumber, string address, Role role)
        {
            Username = username;
            Firstname = firstname;
            Lastname = lastname;
            Password = password;
            Email = email;
            TelephoneNumber = telephoneNumber;
            Address = address;
            Role = role;
            ActivationCode = Guid.NewGuid();
            IsActive = false;
        }

        protected User()
        {
        }

        public string Username { get; set; }

        public string Firstname { get; set; }

        public string Lastname { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        public string TelephoneNumber { get; set; }

        public string Address { get; set; }

        public Role Role { get; set; }

        public Guid ActivationCode { get; protected set; }

        public bool IsActive { get; set; }

    }
}