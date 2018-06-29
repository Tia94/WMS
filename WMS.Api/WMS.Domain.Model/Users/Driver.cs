namespace WMS.Domain.Model.Users
{
    public class Driver : User
    {
        public Driver(string username, string firstname, string lastname, string password, string email,
            string telephoneNumber, string address) : base(username, firstname, lastname, password, email,
            telephoneNumber, address, Role.Driver)
        {
        }

        protected Driver()
        {
        }
    }
}