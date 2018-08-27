namespace WMS.Application.Dto.Orders.Admin
{
    public class OrderItemDto
    {
        public int Id { get; set; }

        public ProductDto Product { get; set; }

        public int Quantity { get; set; }

        public decimal Price { get; set; }
    }
}