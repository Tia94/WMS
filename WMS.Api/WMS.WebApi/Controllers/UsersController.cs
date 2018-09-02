using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WMS.Application.Dto;
using WMS.Application.Interface;
using WMS.WebApi.Models;
using WMS.WebApi.Models.User;

namespace WMS.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Users")]
    [Authorize(Roles = Roles.Admin)]
    public class UsersController : Controller
    {
        private readonly IUserService userService;

        public UsersController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return new OkObjectResult(userService.Get());
        }

        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            var product = userService.Get(id);
            return new OkObjectResult(product);
        }

        [HttpPost]
        public IActionResult Post([FromBody] AddUserModel model)
        {
            var dto = new UserDto
            {
                Username = model.Username,
                Password = model.Password,
                Firstname = model.Firstname,
                Lastname = model.Lastname,
                Email = model.Email,
                TelephoneNumber = model.TelephoneNumber,
                Address = model.Address,
                Role = model.Role,
                IsActive = model.IsActive
            };

            userService.Add(dto);

            return new OkResult();
        }

        [HttpPut("{id:int}")]
        public IActionResult Put(int id, [FromBody] UpdateUserModel model)
        {
            var dto = new UserDto
            {
                Id = id,
                Username = model.Username,
                Password = model.Password,
                Firstname = model.Firstname,
                Lastname = model.Lastname,
                Email = model.Email,
                TelephoneNumber = model.TelephoneNumber,
                Address = model.Address,
                Role = model.Role,
                IsActive = model.IsActive
            };

            userService.Update(dto);

            return new OkResult();
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            var result = userService.Delete(id);
            return new OkObjectResult(new {result.IsSuccess, result.Error});
        }
    }
}