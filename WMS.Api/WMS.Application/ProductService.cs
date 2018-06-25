using System.Collections.Generic;
using System.Linq;
using WMS.Application.Dto;
using WMS.Application.Interface;
using WMS.Domain.Model;
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
                Id = x.Id,
                Name = x.Name,
                Category = x.Category,
                Price = x.Price,
                Quantity = x.Quantity
            }).ToList();
        }

        public ProductDto Get(int id)
        {
            var product = productRepository.Get(id);
            return new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Category = product.Category,
                Quantity = product.Quantity,
                Price = product.Price
            };
        }

        public void Add(ProductDto dto)
        {
            var product = new Product(dto.Name, dto.Category, dto.Quantity, dto.Price);

            productRepository.Add(product);
        }

        public void Update(ProductDto dto)
        {
            var product = productRepository.Get(dto.Id);

            product.Name = dto.Name;
            product.Category = dto.Category;
            product.Quantity = dto.Quantity;
            product.Price = dto.Price;

            productRepository.Update(product);
        }

        public void Delete(int id)
        {
            productRepository.Delete(id);
        }
    }
}