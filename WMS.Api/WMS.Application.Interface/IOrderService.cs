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

        void StartPacking(int id);

        void FinishPacking(int id);

        void Send(int id);

        void Finish(int id);

        IEnumerable<string> GetOrderStatuses();
    }
}