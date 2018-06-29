using System;
using System.Collections.Generic;
using System.Linq;
using WMS.Domain.Model.Users;

namespace WMS.Domain.Model
{
    public class OrderItem
    {
        public OrderItem(Product product, int quantity)
        {
            Product = product;
            Quantity = quantity;
        }

        protected OrderItem()
        {
        }

        public Product Product { get; set; }

        public int Quantity { get; set; }

        public decimal Price { get; set; }
    }

    public class Order
    {
        public Order(Client client)
        {
            Items = new List<OrderItem>();
            Number = Guid.NewGuid();

            Client = client;
        }

        public Guid Number { get; }

        public ICollection<OrderItem> Items { get; }

        public Client Client { get; }

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
    }
}