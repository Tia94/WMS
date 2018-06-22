using System;
using System.Collections.Generic;
using System.Text;

namespace WMS.Domain.Model
{
    class Order
    {
        List<Product> products { get; set; }
        User user { get; set; }
        public decimal totalPrice { get; set; }

        public Order()
        {
            foreach (Product product in products)
            {
                this.totalPrice = 0;
                this.totalPrice += product.Price;
            }
        }
    }
}
