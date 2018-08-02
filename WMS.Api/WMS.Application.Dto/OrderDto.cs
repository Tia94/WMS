using System;
using System.Collections.Generic;

namespace WMS.Application.Dto
{
    public class OrderDto
    {
        public OrderDto()
        {
            Items = new List<OrderItemDto>();
        }

        public int Id { get; set; }

        public Guid Number { get; set; }

        public string Status { get; set; }

        public bool IsCancellable { get; set; }

        public IEnumerable<OrderItemDto> Items { get; set; }

        public decimal Total { get; set; }
    }
}