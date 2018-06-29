namespace WMS.Domain.Model.Users
{
    public class Keeper : User
    {
        public Keeper(string username, string firstname, string lastname, string password, string email,
            string telephoneNumber, string address) : base(username, firstname, lastname, password, email,
            telephoneNumber, address, Role.Keeper)
        {
        }

        protected Keeper()
        {
        }
    }
}