using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WMS.Application.Interface;

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
    }
}