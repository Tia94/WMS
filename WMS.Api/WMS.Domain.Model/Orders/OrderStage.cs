using System.Collections.Generic;

namespace WMS.Domain.Model.Orders
{
    public class OrderStage : Entity
    {
        protected OrderStage()
        {
        }

        public OrderStage(Order order, string status)
        {
            Order = order;
            OrderId = order.Id;

            Status = status;
        }

        public virtual Order Order { get; set; }
        public int OrderId { get; set; }

        public string Status { get; set; }
    }

    public class OrderStatus
    {
        public const string Submitted = "Submitted";
        public const string ReadyToBePickedUpByDriver = "Ready to be picked up by driver";
        public const string InDelivery = "In delivery";
        public const string Delivered = "Delivered";
        public const string Canceled = "Canceled";

        public static IEnumerable<string> All => new List<string>
        {
            Submitted,
            ReadyToBePickedUpByDriver,
            InDelivery,
            Delivered,
            Canceled
        };

        public static IEnumerable<string> Cancellable => new List<string>
        {
            Submitted,
            ReadyToBePickedUpByDriver
        };
    }
}