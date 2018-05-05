using System;

namespace WMS.Domain.Model
{
    public abstract class Entity
    {
        public int Id { get; set; }

        public DateTimeOffset CreatedOn { get; set; }

        protected Entity()
        {
            CreatedOn = DateTimeOffset.Now;
        }
    }

}
