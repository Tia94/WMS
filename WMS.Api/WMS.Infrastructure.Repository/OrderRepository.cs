using WMS.Domain.Model.Orders;
using WMS.Domain.Repository.Interface;

namespace WMS.Infrastructure.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly WMSContext context;

        public OrderRepository(WMSContext context)
        {
            this.context = context;
        }

        public void Add(Order order)
        {
            context.Orders.Add(order);
            context.SaveChanges();
        }
    }
}