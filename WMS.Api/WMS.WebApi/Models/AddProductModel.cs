﻿namespace WMS.WebApi.Models
{
    public class AddProductModel
    {
        public string Name { get; set; }

        public string Category { get; set; }

        public int Quantity { get; set; }

        public decimal Price { get; set; }
    }
}