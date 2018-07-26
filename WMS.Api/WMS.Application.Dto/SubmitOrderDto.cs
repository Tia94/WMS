using System.Collections.Generic;

namespace WMS.Application.Dto
{
    public class SubmitOrderDto
    {
        public string Username { get; set; }

        public IEnumerable<OrderItemDto> Items { get; set; } = new List<OrderItemDto>();
    }
}