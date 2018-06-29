using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using WMS.Application.Interface;
using WMS.Application.Dto;
using WMS.WebApi.Models;

namespace WMS.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/auth")]
    public class AuthenticationController : Controller
    {
        private readonly IConfiguration configuration;
        private readonly IUserService userService;
        private readonly ILogger<AuthenticationController> logger;

        public AuthenticationController(IConfiguration configuration, IUserService userService,
            ILogger<AuthenticationController> logger)
        {
            this.configuration = configuration;
            this.userService = userService;
            this.logger = logger;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var identity = await GetClaimsIdentity(model);

            if (identity == null)
            {
                logger.LogInformation($"Invalid username '{model.Username}' or password '{model.Password}'");
                return BadRequest("Invalid credentials");
            }

            var tokenString = BuildToken(identity, model.Username);

            return new OkObjectResult(new {token = tokenString});
        }

        [AllowAnonymous]
        [HttpPost("register")]
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

            userService.RegisterClient(registerDto);

            return Ok();
        }

        [AllowAnonymous]
        [HttpGet("activate/{guid:Guid}")]
        public IActionResult Activate(Guid guid)
        {
            userService.Activate(guid);
            return Ok();
        }

        private Task<ClaimsIdentity> GetClaimsIdentity(LoginModel model)
        {
            const string authType = "Token";

            var userDto = userService.Get(model.Username, model.Password);

            if (userDto?.Role == null)
                return Task.FromResult<ClaimsIdentity>(null);

            return Task.FromResult(new ClaimsIdentity(new GenericIdentity(model.Username, authType),
                new[] {new Claim("role", userDto.Role)}));
        }

        private string BuildToken(ClaimsIdentity identity, string username)
        {
            var issuedAt = DateTime.UtcNow;

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, ToUnixEpochDate(issuedAt).ToString(), ClaimValueTypes.Integer64)
            };

            claims.AddRange(identity.Claims);

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: configuration["Jwt:Issuer"],
                audience: configuration["Jwt:Issuer"],
                claims: claims,
                notBefore: DateTime.UtcNow,
                expires: issuedAt.AddMinutes(30),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private static long ToUnixEpochDate(DateTime date) => (long) Math.Round(
            (date.ToUniversalTime() - new DateTimeOffset(1970, 1, 1, 0, 0, 0, TimeSpan.Zero)).TotalSeconds);

        
    }
}