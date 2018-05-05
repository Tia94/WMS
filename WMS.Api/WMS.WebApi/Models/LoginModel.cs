namespace WMS.WebApi.Models
{
    public class LoginModel
    {
        public string Username { get; set; }

        public string Password { get; set; }
    }

    public class RegisterModel
    {
        public string Username { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        public string TelephoneNumber { get; set; }

        public string Address { get; set; }
    }
}