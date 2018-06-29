namespace WMS.Domain.Model.Users
{
    public class Client : User
    {
        public Client(string username, string firstname, string lastname, string password, string email,
            string telephoneNumber, string address) : base(username, firstname, lastname, password, email,
            telephoneNumber, address, Role.Client)
        {
        }

        protected Client()
        {
        }
        
    }
}