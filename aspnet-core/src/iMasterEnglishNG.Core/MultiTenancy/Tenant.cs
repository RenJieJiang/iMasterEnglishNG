using Abp.MultiTenancy;
using iMasterEnglishNG.Authorization.Users;

namespace iMasterEnglishNG.MultiTenancy
{
    public class Tenant : AbpTenant<User>
    {
        public Tenant()
        {            
        }

        public Tenant(string tenancyName, string name)
            : base(tenancyName, name)
        {
        }
    }
}
