using WMS.Application.Dto;

namespace WMS.Application.Interface
{
    public interface IOrderService
    {
        void Submit(SubmitOrderDto dto);
    }
}