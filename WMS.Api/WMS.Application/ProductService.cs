using System.Collections.Generic;
using System.Linq;
using WMS.Application.Dto;
using WMS.Application.Interface;
using WMS.Domain.Repository.Interface;

namespace WMS.Application
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository productRepository;

        public ProductService(IProductRepository productRepository)
        {
            this.productRepository = productRepository;
        }

        public IList<ProductDto> Get()
        {
            var products = productRepository.Get();
            return products.Select(x => new ProductDto
            {
                Name = x.Name,
                Category = x.Category,
                Price = x.Price,
                Quantity = x.Quantity
            }).ToList();
        }
    }
}