using Abp.Authorization.Roles;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using iMasterEnglishNG.Authorization.Users;

namespace iMasterEnglishNG.Authorization.Roles
{
    public class RoleStore : AbpRoleStore<Role, User>
    {
        public RoleStore(
            IUnitOfWorkManager unitOfWorkManager,
            IRepository<Role> roleRepository,
            IRepository<RolePermissionSetting, long> rolePermissionSettingRepository)
            : base(
                unitOfWorkManager,
                roleRepository,
                rolePermissionSettingRepository)
        {
        }
    }
}
