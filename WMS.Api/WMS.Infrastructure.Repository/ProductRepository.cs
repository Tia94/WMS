using System.Collections.Generic;
using System.Linq;
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
    }
}