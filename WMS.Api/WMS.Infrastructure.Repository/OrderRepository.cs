﻿using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
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

        public IList<Order> Get(string username) => context.Orders
            .Include(x => x.Stages)
            .Include(x => x.Items)
            .ThenInclude(x => x.Product)
            .Where(x => x.Client.Username.Equals(username))
            .ToList();

        public Order Get(int id) => context.Orders
            .Include(x => x.Stages)
            .Include(x => x.Items)
            .ThenInclude(x => x.Product)
            .Single(x => x.Id == id);

        public void Update(Order order)
        {
            context.Orders.Attach(order);
            var entity = context.Entry(order);
            entity.State = EntityState.Modified;
            context.SaveChanges();
        }

        public IEnumerable<Order> GetKeeperOrders()
        {
            var statuses = new[]
            {
                OrderStatus.Submitted,
                OrderStatus.PackingByStoreKeeper,
                OrderStatus.ReadyToBePickedUpByDriver,
                OrderStatus.InDelivery
            };

            // TODO: Look into using "Order.Stage" instead of calculating it
            return context.Orders
                .Include(x => x.Stages)
                .Include(x => x.Client)
                .Include(x => x.Items)
                .ThenInclude(x => x.Product)
                .Where(x => statuses.Contains(x.Stages.OrderByDescending(stage => stage.CreatedOn)
                    .Select(stage => stage.Status).First()))
                .ToList();
        }

        public IEnumerable<Order> GetAdminOrders() => context.Orders
            .Include(x => x.Stages)
            .Include(x => x.Client)
            .Include(x => x.Items)
            .ThenInclude(x => x.Product)
            .ToList();
    }
}