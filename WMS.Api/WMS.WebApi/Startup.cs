using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using WMS.Application;
using WMS.Application.Interface;
using WMS.Domain.Repository.Interface;
using WMS.Infrastructure.Repository;

namespace WMS.WebApi
{
    public class Startup
    {
        private const string SecretKey = "Jwt:Key";
        private SymmetricSecurityKey signingKey;

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration.GetValue<string>(SecretKey)));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = Configuration["Jwt:Issuer"],
                        ValidAudience = Configuration["Jwt:Issuer"],
                        IssuerSigningKey = signingKey
                    };
                });

            services
                .AddScoped<IUserRepository, UserRepository>()
                .AddScoped<IProductRepository, ProductRepository>()
                .AddScoped<IOrderRepository, OrderRepository>()
                .AddScoped<IUserService, UserService>()
                .AddScoped<IProductService, ProductService>()
                .AddScoped<IOrderService, OrderService>();

            services.AddDbContext<WMSContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("Default")));

            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllHeaders",
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
            });

            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("AllowAllHeaders");

            app.UseAuthentication();

            app.UseMvc();

            loggerFactory
                .AddFile(@"Logs\log-{Date}.txt")
                .AddConsole()
                .AddDebug();
        }
    }
}