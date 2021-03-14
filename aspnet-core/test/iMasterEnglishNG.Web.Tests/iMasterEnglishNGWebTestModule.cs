using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using iMasterEnglishNG.EntityFrameworkCore;
using iMasterEnglishNG.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace iMasterEnglishNG.Web.Tests
{
    [DependsOn(
        typeof(iMasterEnglishNGWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class iMasterEnglishNGWebTestModule : AbpModule
    {
        public iMasterEnglishNGWebTestModule(iMasterEnglishNGEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(iMasterEnglishNGWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(iMasterEnglishNGWebMvcModule).Assembly);
        }
    }
}