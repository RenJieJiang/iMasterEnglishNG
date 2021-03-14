using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using iMasterEnglishNG.Authorization.Roles;
using iMasterEnglishNG.Authorization.Users;
using iMasterEnglishNG.MultiTenancy;

namespace iMasterEnglishNG.EntityFrameworkCore
{
    public class iMasterEnglishNGDbContext : AbpZeroDbContext<Tenant, Role, User, iMasterEnglishNGDbContext>
    {
        /* Define a DbSet for each entity of the application */
        
        public iMasterEnglishNGDbContext(DbContextOptions<iMasterEnglishNGDbContext> options)
            : base(options)
        {
        }
    }
}
