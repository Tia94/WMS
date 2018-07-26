using WMS.Domain.Model.Orders;

namespace WMS.Domain.Repository.Interface
{
    public interface IOrderRepository
    {
        void Add(Order order);
    }
}