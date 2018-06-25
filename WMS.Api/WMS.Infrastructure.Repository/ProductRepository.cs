using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using WMS.Domain.Model;
using WMS.Domain.Repository.Interface;

namespace WMS.Infrastructure.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly WMSContext context;

        public ProductRepository(WMSContext context)
        {
            this.context = context;
        }

        public IList<Product> Get()
        {
            return context.Products.ToList();
        }

        public Product Get(int id)
        {
            return context.Products.Single(x => x.Id == id);
        }

        public void Update(Product product)
        {
            context.Products.Attach(product);
            var entity = context.Entry(product);
            entity.State = EntityState.Modified;
            context.SaveChanges();
        }

        public void Add(Product product)
        {
            context.Products.Add(product);
            context.SaveChanges();
        }

        public void Delete(int id)
        {
            var product = context.Products.First(x => x.Id == id);
            context.Products.Remove(product);
            context.SaveChanges();
        }
    }
}