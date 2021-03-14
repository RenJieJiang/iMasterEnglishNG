using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace iMasterEnglishNG.Controllers
{
    public abstract class iMasterEnglishNGControllerBase: AbpController
    {
        protected iMasterEnglishNGControllerBase()
        {
            LocalizationSourceName = iMasterEnglishNGConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
