using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WMS.Application.Dto;
using WMS.Application.Interface;
using WMS.WebApi.Models.Orders;

namespace WMS.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Orders")]
    public class OrdersController : Controller
    {
        private readonly IProductService productService;
        private readonly IOrderService orderService;

        public OrdersController(IProductService productService, IOrderService orderService)
        {
            this.productService = productService;
            this.orderService = orderService;
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult Get()
        {
            var products = productService.Get().Select(x => new
            {
                x.Id,
                x.Name,
                x.Category,
                x.Price,
                InStock = x.Quantity > 0
            }).ToList();

            return new OkObjectResult(products);
        }

        [HttpPost]
        [AllowAnonymous]
        public IActionResult Post([FromBody] SubmitOrderModel model)
        {
            var dto = new SubmitOrderDto
            {
                Username = model.Username,
                Items = model.Items.Select(item => new OrderItemDto
                {
                    Product = new OrderItemProductDto
                    {
                        Id = item.Product.Id,
                        Name = item.Product.Name,
                        Category = item.Product.Category,
                        Price = item.Product.Price
                    },
                    Quantity = item.Quantity
                }).ToList()
            };

            orderService.Submit(dto);
            return new OkResult();
        }

//
//        [HttpGet("{id:int}")]
//        [AllowAnonymous]
//        public IActionResult Get(int id)
//        {
//            var product = productService.Get(id);
//            return new OkObjectResult(product);
//        }
//
//        [HttpPost]
//        [AllowAnonymous]
//        public IActionResult Post([FromBody] AddProductModel model)
//        {
//            var dto = new ProductDto
//            {
//                Name = model.Name,
//                Category = model.Category,
//                Quantity = model.Quantity,
//                Price = model.Price
//            };
//
//            productService.Add(dto);
//
//            return new OkResult();
//        }
//
//        [HttpPut("{id:int}")]
//        [AllowAnonymous]
//        public IActionResult Put(int id, [FromBody] UpdateProductModel model)
//        {
//            var dto = new ProductDto
//            {
//                Id = id,
//                Name = model.Name,
//                Category = model.Category,
//                Quantity = model.Quantity,
//                Price = model.Price
//            };
//
//            productService.Update(dto);
//
//            return new OkResult();
//        }
//
//        [HttpDelete("{id:int}")]
//        public IActionResult Delete(int id)
//        {
//            productService.Delete(id);
//            return new OkResult();
//        }
    }
}