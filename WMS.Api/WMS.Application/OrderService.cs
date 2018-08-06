using System.Collections.Generic;
using System.Linq;
using WMS.Application.Dto;
using WMS.Application.Dto.Orders.Keeper;
using WMS.Application.Interface;
using WMS.Domain.Model.Orders;
using WMS.Domain.Model.Users;
using WMS.Domain.Repository.Interface;
using OrderDto = WMS.Application.Dto.OrderDto;
using OrderItemDto = WMS.Application.Dto.OrderItemDto;

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
                product.Quantity -= item.Quantity;
                productRepository.Update(product);
            }

            orderRepository.Add(order);
        }

        public IEnumerable<OrderDto> Get(string username)
        {
            return orderRepository.Get(username).Select(x => new OrderDto
            {
                Id = x.Id,
                Number = x.Number,
                Status = x.Stage.Status,
                IsCancellable = x.IsCancellable,
                Total = x.Total,
                Items = x.Items.Select(item => new OrderItemDto
                {
                    Product = new OrderItemProductDto
                    {
                        Id = item.Product.Id,
                        Price = item.Product.Price,
                        Name = item.Product.Name,
                        Category = item.Product.Category
                    },
                    Quantity = item.Quantity
                })
            });
        }

        public void Cancel(int id)
        {
            var order = orderRepository.Get(id);

            foreach (var item in order.Items)
            {
                var product = productRepository.Get(item.Product.Id);
                product.Quantity += item.Quantity;
                productRepository.Update(product);
            }

            order.SetStatus(OrderStatus.Canceled);
            orderRepository.Update(order);
        }

        public IEnumerable<Dto.Orders.Keeper.OrderDto> GetKeeperOrders()
        {
            var orders = orderRepository.GetKeeperOrders();

            return orders.Select(x => new Dto.Orders.Keeper.OrderDto
            {
                Id = x.Id,
                Number = x.Number,
                Status = x.Stage.Status,
                Client = new ClientDto
                {
                    FirstName = x.Client.Firstname,
                    LastName = x.Client.Lastname,
                    TelephoneNumber = x.Client.TelephoneNumber,
                    Address = x.Client.Address
                },
                Items = x.Items.Select(item => new Dto.Orders.Keeper.OrderItemDto
                {
                    Id = item.Id,
                    Quantity = item.Quantity,
                    Product = new Dto.Orders.Keeper.ProductDto
                    {
                        Id = item.Product.Id,
                        Name = item.Product.Name,
                        Category = item.Product.Category
                    }
                })
            });
        }

        public void StartProcessing(int id)
        {
            var order = orderRepository.Get(id);

            order.SetStatus(OrderStatus.PackingByStoreKeeper);
            orderRepository.Update(order);
        }

        public void FinishProcessing(int id)
        {
            var order = orderRepository.Get(id);

            order.SetStatus(OrderStatus.ReadyToBePickedUpByDriver);
            orderRepository.Update(order);
        }
    }
}