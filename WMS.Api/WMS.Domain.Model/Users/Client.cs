using System.Collections.Generic;

namespace WMS.Domain.Model.Users
{
    public class Client : User
    {
        private int level = 1; //default client level.
        public ICollection<Order> clientOrders { get; }

        public Client(string username, string firstname, string lastname, string password, string email,
            string telephoneNumber, string address) : base(username, firstname, lastname, password, email,
            telephoneNumber, address, Role.Client)
        {
        }

        protected Client()
        {
        }

        public void CheckUpgrade()
        {
            decimal ordersValue = 0;
            foreach(Order o in clientOrders)
            {
                ordersValue += o.Total;
            }

            if(ordersValue >=5000 && ordersValue <= 25000)
            {
                level = 2;
            }
            if (ordersValue > 25000)
            {
                level = 3;
            }
        }
    }
}