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

    public class User : Entity
    {
        public string Username { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        public string TelephoneNumber { get; set; }

        public string Address { get; set; }

        public Role Role { get; set; }

    }

    public enum Role
    {
        Admin,
        Keeper,
        Driver,
        Client
    }

    public enum Action
    {
        ViewProducts,
        CreateOrder        
    }
    
}
