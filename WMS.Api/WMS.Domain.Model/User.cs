namespace WMS.Domain.Model
{

    public class User : Entity
    {
        public string Username { get; set; }

        public string Firstname { get; set; }

        public string Lastname { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        public string TelephoneNumber { get; set; }

        public string Address { get; set; }

        public Role Role { get; set; }

    }
}
