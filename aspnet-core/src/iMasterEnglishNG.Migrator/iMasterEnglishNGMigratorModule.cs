using Microsoft.Extensions.Configuration;
using Castle.MicroKernel.Registration;
using Abp.Events.Bus;
using Abp.Modules;
using Abp.Reflection.Extensions;
using iMasterEnglishNG.Configuration;
using iMasterEnglishNG.EntityFrameworkCore;
using iMasterEnglishNG.Migrator.DependencyInjection;

namespace iMasterEnglishNG.Migrator
{
    [DependsOn(typeof(iMasterEnglishNGEntityFrameworkModule))]
    public class iMasterEnglishNGMigratorModule : AbpModule
    {
        private readonly IConfigurationRoot _appConfiguration;

        public iMasterEnglishNGMigratorModule(iMasterEnglishNGEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbSeed = true;

            _appConfiguration = AppConfigurations.Get(
                typeof(iMasterEnglishNGMigratorModule).GetAssembly().GetDirectoryPathOrNull()
            );
        }

        public override void PreInitialize()
        {
            Configuration.DefaultNameOrConnectionString = _appConfiguration.GetConnectionString(
                iMasterEnglishNGConsts.ConnectionStringName
            );

            Configuration.BackgroundJobs.IsJobExecutionEnabled = false;
            Configuration.ReplaceService(
                typeof(IEventBus), 
                () => IocManager.IocContainer.Register(
                    Component.For<IEventBus>().Instance(NullEventBus.Instance)
                )
            );
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(iMasterEnglishNGMigratorModule).GetAssembly());
            ServiceCollectionRegistrar.Register(IocManager);
        }
    }
}
