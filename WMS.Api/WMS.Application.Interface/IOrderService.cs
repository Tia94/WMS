using System.Collections.Generic;
using WMS.Application.Dto;
using WMS.Application.Dto.Orders.Admin;
using OrderDto = WMS.Application.Dto.OrderDto;

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

        IEnumerable<Dto.Orders.Admin.OrderDto> GetAdminOrders();

        IEnumerable<OrderHistoryDto> GetOrderHistory(int id);
    }
}