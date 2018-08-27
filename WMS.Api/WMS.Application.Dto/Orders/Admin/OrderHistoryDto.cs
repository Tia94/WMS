using System;

namespace WMS.Application.Dto.Orders.Admin
{
    public class OrderHistoryDto
    {
        public string Status { get; set; }

        public DateTimeOffset Date { get; set; }
    }
}