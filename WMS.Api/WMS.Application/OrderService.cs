using WMS.Application.Dto;
using WMS.Application.Interface;
using WMS.Domain.Model.Orders;
using WMS.Domain.Model.Users;
using WMS.Domain.Repository.Interface;

namespace WMS.Application
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository orderRepository;
        private readonly IUserRepository userRepository;
        private readonly IProductRepository productRepository;

        public OrderService(IOrderRepository orderRepository, IUserRepository userRepository,
            IProductRepository productRepository)
        {
            this.orderRepository = orderRepository;
            this.userRepository = userRepository;
            this.productRepository = productRepository;
        }

        public void Submit(SubmitOrderDto dto)
        {
            var client = userRepository.Get<Client>(dto.Username);
            var order = new Order(client);

            foreach (var item in dto.Items)
            {
                var product = productRepository.Get(item.Product.Id);
                order.Items.Add(new OrderItem(product, item.Quantity));
            }

            orderRepository.Add(order);
        }
    }
}