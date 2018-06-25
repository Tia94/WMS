namespace WMS.WebApi.Models.Product
{
    public class UpdateProductModel
    {
        public string Name { get; set; }

        public string Category { get; set; }

        public int Quantity { get; set; }

        public decimal Price { get; set; }
    }
}