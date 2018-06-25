using System.Collections.Generic;
using WMS.Domain.Model;

namespace WMS.Domain.Repository.Interface
{
    public interface IProductRepository
    {
        IList<Product> Get();

        void Add(Product product);
    }
}