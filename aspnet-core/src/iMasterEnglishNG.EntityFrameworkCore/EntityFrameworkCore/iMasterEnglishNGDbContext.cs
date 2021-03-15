using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using iMasterEnglishNG.Authorization.Roles;
using iMasterEnglishNG.Authorization.Users;
using iMasterEnglishNG.MultiTenancy;
using iMasterEnglishNG.Entities;

namespace iMasterEnglishNG.EntityFrameworkCore
{
    public class iMasterEnglishNGDbContext : AbpZeroDbContext<Tenant, Role, User, iMasterEnglishNGDbContext>
    {
        /* Define a DbSet for each entity of the application */

        public DbSet<WordEntity> Words { get; set; }

        public iMasterEnglishNGDbContext(DbContextOptions<iMasterEnglishNGDbContext> options)
            : base(options)
        {
        }
    }
}
