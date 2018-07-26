namespace WMS.Domain.Model
{
    public class Product : Entity
    {
        public Product(string name, string category, int quantity, decimal price)
        {
            Name = name;
            Category = category;
            Quantity = quantity;
            Price = price;
        }

        protected Product()
        {
        }

        public string Name { get; set; }

        public string Category { get; set; }

        public int Quantity { get; set; }

        public decimal Price { get; set; }
    }
}