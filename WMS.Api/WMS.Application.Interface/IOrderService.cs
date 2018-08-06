using System.Collections.Generic;
using WMS.Application.Dto;

namespace WMS.Application.Interface
{
    public interface IOrderService
    {
        void Submit(SubmitOrderDto dto);

        IEnumerable<OrderDto> Get(string username);

        void Cancel(int id);

        IEnumerable<Dto.Orders.Keeper.OrderDto> GetKeeperOrders();

        void StartProcessing(int id);

        void FinishProcessing(int id);
    }
}