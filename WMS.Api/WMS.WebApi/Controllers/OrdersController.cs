﻿using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WMS.Application.Interface;

namespace WMS.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Orders")]
    public class OrdersController : Controller
    {
        private readonly IProductService productService;

        public OrdersController(IProductService productService)
        {
            this.productService = productService;
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