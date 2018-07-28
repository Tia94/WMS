using System.Linq;
using WMS.Domain.Model;
using WMS.Domain.Model.Orders;
using WMS.Infrastructure.Repository.Tests.Factories;
using Xunit;

namespace WMS.Infrastructure.Repository.Tests
{
    public class OrderRepositoryTests : DbIntegrationTestBase
    {
        private readonly OrderRepository sut;

        public OrderRepositoryTests()
        {
            sut = new OrderRepository(GetWMSContext());
        }

        [Fact]
        public void TestAddStage()
        {
            var client = UserFactory.CreateClient();
            var product = new Product("Apple", "Fruit", 500, 1.2M);
            var order = new Order(client);
            order.AddItem(product, 2);
            order.SetStatus(OrderStatus.ReadyToBePickedUpByDriver);

            sut.Add(order);

            Order dbOrder;
            using (var context = GetWMSContext())
            {
                dbOrder = context.Orders.Single(x => x.Id == order.Id);
            }

            Assert.Equal(order.Number, dbOrder.Number);
            Assert.Equal(OrderStatus.ReadyToBePickedUpByDriver, order.Stage.Status);
        }
    }
}