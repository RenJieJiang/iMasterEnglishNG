using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using iMasterEnglishNG.Configuration;

namespace iMasterEnglishNG.Web.Host.Startup
{
    [DependsOn(
       typeof(iMasterEnglishNGWebCoreModule))]
    public class iMasterEnglishNGWebHostModule: AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public iMasterEnglishNGWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(iMasterEnglishNGWebHostModule).GetAssembly());
        }
    }
}
