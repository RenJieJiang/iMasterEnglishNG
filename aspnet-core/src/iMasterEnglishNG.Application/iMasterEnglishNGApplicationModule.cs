using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using iMasterEnglishNG.Authorization;

namespace iMasterEnglishNG
{
    [DependsOn(
        typeof(iMasterEnglishNGCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class iMasterEnglishNGApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<iMasterEnglishNGAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(iMasterEnglishNGApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
