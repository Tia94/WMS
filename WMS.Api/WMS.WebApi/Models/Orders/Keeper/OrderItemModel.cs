namespace WMS.WebApi.Models.Orders.Keeper
{
    public class OrderItemModel
    {
        public int Id { get; set; }

        public ProductModel Product { get; set; }

        public int Quantity { get; set; }
    }
}