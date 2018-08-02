using System;
using System.Collections.Generic;

namespace WMS.WebApi.Models.Orders
{
    public class OrderModel
    {
        public int Id { get; set; }

        public Guid Number { get; set; }

        public string Status { get; set; }

        public bool IsCancellable { get; set; }

        public IEnumerable<OrderItemModel> Items { get; set; }

        public decimal Total { get; set; }
    }
}