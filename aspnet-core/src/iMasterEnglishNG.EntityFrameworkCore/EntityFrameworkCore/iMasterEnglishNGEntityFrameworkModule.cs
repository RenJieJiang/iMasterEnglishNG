using Abp.EntityFrameworkCore.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Abp.Zero.EntityFrameworkCore;
using iMasterEnglishNG.EntityFrameworkCore.Seed;

namespace iMasterEnglishNG.EntityFrameworkCore
{
    [DependsOn(
        typeof(iMasterEnglishNGCoreModule), 
        typeof(AbpZeroCoreEntityFrameworkCoreModule))]
    public class iMasterEnglishNGEntityFrameworkModule : AbpModule
    {
        /* Used it tests to skip dbcontext registration, in order to use in-memory database of EF Core */
        public bool SkipDbContextRegistration { get; set; }

        public bool SkipDbSeed { get; set; }

        public override void PreInitialize()
        {
            if (!SkipDbContextRegistration)
            {
                Configuration.Modules.AbpEfCore().AddDbContext<iMasterEnglishNGDbContext>(options =>
                {
                    if (options.ExistingConnection != null)
                    {
                        iMasterEnglishNGDbContextConfigurer.Configure(options.DbContextOptions, options.ExistingConnection);
                    }
                    else
                    {
                        iMasterEnglishNGDbContextConfigurer.Configure(options.DbContextOptions, options.ConnectionString);
                    }
                });
            }
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(iMasterEnglishNGEntityFrameworkModule).GetAssembly());
        }

        public override void PostInitialize()
        {
            if (!SkipDbSeed)
            {
                SeedHelper.SeedHostDb(IocManager);
            }
        }
    }
}
