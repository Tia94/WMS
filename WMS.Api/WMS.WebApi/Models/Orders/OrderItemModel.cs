namespace WMS.WebApi.Models.Orders
{
    public class OrderItemModel
    {
        public OrderItemProductModel Product { get; set; }

        public int Quantity { get; set; }
    }
}