using System.Collections.Generic;
using WMS.Application.Dto;

namespace WMS.Application.Interface
{
    public interface IProductService
    {
        IList<ProductDto> Get();

        void Add(ProductDto dto);
    }
}