using System.Collections.Generic;

namespace WMS.WebApi.Models.Orders
{
    public class SubmitOrderModel
    {
        public string Username { get; set; }

        public IEnumerable<OrderItemModel> Items { get; set; } = new List<OrderItemModel>();
    }

    public class OrderItemModel
    {
        public ProductModel Product { get; set; }

        public int Quantity { get; set; }
    }

    public class ProductModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Category { get; set; }

        public decimal Price { get; set; }
    }
}