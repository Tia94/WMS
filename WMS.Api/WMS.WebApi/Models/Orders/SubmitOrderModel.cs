using System.Collections.Generic;

namespace WMS.WebApi.Models.Orders
{
    public class SubmitOrderModel
    {
        public string Username { get; set; }

        public IEnumerable<OrderItemModel> Items { get; set; } = new List<OrderItemModel>();
    }
}