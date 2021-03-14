using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Abp.Authorization;
using iMasterEnglishNG.Authorization.Roles;

namespace iMasterEnglishNG.Authorization.Users
{
    public class UserClaimsPrincipalFactory : AbpUserClaimsPrincipalFactory<User, Role>
    {
        public UserClaimsPrincipalFactory(
            UserManager userManager,
            RoleManager roleManager,
            IOptions<IdentityOptions> optionsAccessor)
            : base(
                  userManager,
                  roleManager,
                  optionsAccessor)
        {
        }
    }
}
