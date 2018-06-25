using System.Collections.Generic;
using WMS.Application.Dto;

namespace WMS.Application.Interface
{
    public interface IProductService
    {
        IList<ProductDto> Get();

        ProductDto Get(int id);

        void Add(ProductDto dto);

        void Update(ProductDto dto);

        void Delete(int id);
    }
}