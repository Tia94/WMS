using System.Collections.Generic;
using WMS.Domain.Model.Orders;

namespace WMS.Domain.Repository.Interface
{
    public interface IOrderRepository
    {
        void Add(Order order);

        IList<Order> Get(string username);

        Order Get(int id);

        void Update(Order order);
    }
}