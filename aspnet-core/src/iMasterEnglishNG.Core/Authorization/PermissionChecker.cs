using Abp.Authorization;
using iMasterEnglishNG.Authorization.Roles;
using iMasterEnglishNG.Authorization.Users;

namespace iMasterEnglishNG.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
