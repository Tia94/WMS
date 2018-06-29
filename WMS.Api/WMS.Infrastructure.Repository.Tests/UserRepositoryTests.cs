using WMS.Infrastructure.Repository.Tests.Factories;
using Xunit;

namespace WMS.Infrastructure.Repository.Tests
{
    [Trait("Category", "Integration")]
    public class UserRepositoryTests : DbIntegrationTestBase
    {
        private readonly UserRepository sut;

        public UserRepositoryTests()
        {
            sut = new UserRepository(GetWMSContext());
        }

        [Fact]
        public void GetAdminTest()
        {
            var user = UserFactory.CreateAdmin();

            using (var context = GetWMSContext())
            {
                context.Users.Add(user);
                context.SaveChanges();
            }

            var dbUser = sut.Get(user.Username, user.Password);

            Assert.NotNull(dbUser);
            Assert.Equal(user.Username, dbUser.Username);
        }

        [Fact]
        public void GetClientTest()
        {
            var user = UserFactory.CreateClient();

            using (var context = GetWMSContext())
            {
                context.Users.Add(user);
                context.SaveChanges();
            }

            var dbUser = sut.Get(user.Username, user.Password);

            Assert.NotNull(dbUser);
            Assert.Equal(user.Username, dbUser.Username);
        }

        [Fact]
        public void GetKeeperTest()
        {
            var user = UserFactory.CreateKeeper();


            using (var context = GetWMSContext())
            {
                context.Users.Add(user);
                context.SaveChanges();
            }

            var dbUser = sut.Get(user.Username, user.Password);

            Assert.NotNull(dbUser);
            Assert.Equal(user.Username, dbUser.Username);
        }

        [Fact]
        public void GetDriverTest()
        {
            var user = UserFactory.CreateDriver();

            using (var context = GetWMSContext())
            {
                context.Users.Add(user);
                context.SaveChanges();
            }

            var dbUser = sut.Get(user.Username, user.Password);

            Assert.NotNull(dbUser);
            Assert.Equal(user.Username, dbUser.Username);
        }
    }
}