using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WMS.Application.Dto;
using WMS.Application.Interface;
using WMS.WebApi.Models;
using WMS.WebApi.Models.Product;

namespace WMS.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Products")]
    public class ProductsController : Controller
    {
        private readonly IProductService productService;

        public ProductsController(IProductService productService)
        {
            this.productService = productService;
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult Get()
        {
            var products = productService.Get();
            return new OkObjectResult(new {Data = products, Total = products.Count});
        }

        [HttpPost]
        [AllowAnonymous]
        public IActionResult Post([FromBody] AddProductModel model)
        {
            var dto = new ProductDto
            {
                Name = model.Name,
                Category = model.Category,
                Quantity = model.Quantity,
                Price = model.Price
            };

            productService.Add(dto);

            return new OkResult();
        }

        [HttpPut]
        [AllowAnonymous]
        public IActionResult Put([FromBody] UpdateProductModel model)
        {
            var dto = new ProductDto
            {
                Id = model.Id,
                Name = model.Name,
                Category = model.Category,
                Quantity = model.Quantity,
                Price = model.Price
            };

            productService.Update(dto);

            return new OkResult();
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            productService.Delete(id);
            return new OkResult();
        }


    }
}