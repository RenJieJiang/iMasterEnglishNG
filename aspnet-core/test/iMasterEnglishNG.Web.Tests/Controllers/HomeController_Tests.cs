using System.Threading.Tasks;
using iMasterEnglishNG.Models.TokenAuth;
using iMasterEnglishNG.Web.Controllers;
using Shouldly;
using Xunit;

namespace iMasterEnglishNG.Web.Tests.Controllers
{
    public class HomeController_Tests: iMasterEnglishNGWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}