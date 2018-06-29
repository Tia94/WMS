using WMS.Domain.Model;
using WMS.Domain.Model.Users;
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
        public void GetTest()
        {
            var user = new User("Test_Username", "Test_Firstname", "Test_Lastname", "Test_Password", "Test_Email",
                "Test_Tel_Number", "Test_Address", Role.Client);

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