using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using WMS.Application.Interface;
using WMS.Application.Dto;
using WMS.WebApi.Models;

namespace WMS.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Authentication")]
    public class AuthenticationController : Controller
    {
        private readonly IConfiguration configuration;
        private readonly IAuthenticationService authenticationService;

        public AuthenticationController(IConfiguration configuration, IAuthenticationService authenticationService)
        {
            this.configuration = configuration;
            this.authenticationService = authenticationService;
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login([FromBody] LoginModel model)
        {
            IActionResult response = Unauthorized();

            var userDto = authenticationService.Login(model.Username, model.Password);

            if (userDto == null)
                return response;

            var tokenString = BuildToken(userDto);
            response = Ok(new {token = tokenString});

            return response;
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Register([FromBody] RegisterModel model)
        {
            // TODO: Model validation
            var registerDto = new RegisterDto
            {
                Username = model.Username,
                Firstname = model.Firstname,
                Lastname = model.Lastname,
                Email = model.Email,
                Password = model.Password,
                TelephoneNumber = model.TelephoneNumber,
                Address = model.Address
            };

            authenticationService.RegisterClient(registerDto);
            
            return Ok();
        }

        private string BuildToken(UserDto userDto)
        {
            // TODO: Add info from "userDto" into JWT token
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(configuration["Jwt:Issuer"],
                configuration["Jwt:Issuer"],
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}