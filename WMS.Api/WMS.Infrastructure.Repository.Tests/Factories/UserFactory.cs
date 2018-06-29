using WMS.Domain.Model.Users;

namespace WMS.Infrastructure.Repository.Tests.Factories
{
    public static class UserFactory
    {
        public static Admin CreateAdmin(bool isActive = true)
        {
            return new Admin("Test_Username", "Test_Firstname", "Test_Lastname", "Test_Password", "Test_Email",
                    "Test_Tel_Number", "Test_Address")
                {IsActive = true};
        }

        public static Client CreateClient(bool isActive = true)
        {
            return new Client("Test_Username", "Test_Firstname", "Test_Lastname", "Test_Password", "Test_Email",
                    "Test_Tel_Number", "Test_Address")
                {IsActive = true};
        }

        public static Keeper CreateKeeper(bool isActive = true)
        {
            return new Keeper("Test_Username", "Test_Firstname", "Test_Lastname", "Test_Password", "Test_Email",
                    "Test_Tel_Number", "Test_Address")
                {IsActive = true};
        }

        public static Driver CreateDriver(bool isActive = true)
        {
            return new Driver("Test_Username", "Test_Firstname", "Test_Lastname", "Test_Password", "Test_Email",
                    "Test_Tel_Number", "Test_Address")
                {IsActive = true};
        }
    }
}