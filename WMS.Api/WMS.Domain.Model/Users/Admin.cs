namespace WMS.Domain.Model.Users
{
    public class Admin : User
    {
        public Admin(string username, string firstname, string lastname, string password, string email,
            string telephoneNumber, string address) : base(username, firstname, lastname, password, email,
            telephoneNumber, address, Role.Admin)
        {
        }

        protected Admin()
        {
        }
    }
}