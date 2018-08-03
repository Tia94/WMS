using System.Collections.Generic;

namespace WMS.WebApi.Models.Orders.Keeper
{
    public class OrderModel
    {
        public OrderModel()
        {
            Items = new List<OrderItemModel>();
        }

        public int Id { get; set; }

        public string Number { get; set; }

        public ClientModel Client { get; set; }

        public IEnumerable<OrderItemModel> Items { get; set; }
    }
}