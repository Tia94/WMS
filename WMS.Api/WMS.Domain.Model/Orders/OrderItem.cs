namespace WMS.Domain.Model.Orders
{
    public class OrderItem : Entity
    {
        public OrderItem(Product product, int quantity)
        {
            Product = product;
            Quantity = quantity;
        }

        protected OrderItem()
        {
        }
        
        public virtual Product Product { get; set; }
        public int ProductId { get; set; }

        public int Quantity { get; set; }

        public decimal Price { get; set; }
    }
}