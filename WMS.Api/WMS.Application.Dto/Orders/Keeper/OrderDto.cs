using System;
using System.Collections.Generic;

namespace WMS.Application.Dto.Orders.Keeper
{
    public class OrderDto
    {
        public OrderDto()
        {
            Items = new List<OrderItemDto>();
        }

        public int Id { get; set; }

        public Guid Number { get; set; }

        public ClientDto Client { get; set; }

        public IEnumerable<OrderItemDto> Items { get; set; }
    }
}