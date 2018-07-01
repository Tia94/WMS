using System;
using System.Collections.Generic;
using System.Linq;
using WMS.Domain.Model.Users;

namespace WMS.Domain.Model.Orders
{
    public class Order : Entity
    {
        public Order(Client client)
        {
            Items = new List<OrderItem>();
            Number = Guid.NewGuid();

            Client = client ?? throw new ArgumentNullException(nameof(client));
            ClientId = client.Id;
        }

        protected Order()
        {
        }

        public Guid Number { get; protected set; }

        public virtual ICollection<OrderItem> Items { get; protected set; }

        public virtual Client Client { get; protected set; }
        public int ClientId { get; protected set; }

        public decimal Total => Items.Sum(x => x.Price);

        public void AddItem(Product product, int quantity)
        {
            var item = Items.FirstOrDefault(x => x.Product.Id == product.Id);
            if (item == null)
            {
                item = new OrderItem(product, quantity);
                Items.Add(item);
            }
            else
            {
                item.Quantity += quantity;
            }
        }

        public void RemoveItem(Product product)
        {
            var item = Items.Single(x => x.Product.Id == product.Id);
            Items.Remove(item);
        }
    }
}