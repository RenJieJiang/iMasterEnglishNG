using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using iMasterEnglishNG.Configuration.Dto;

namespace iMasterEnglishNG.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : iMasterEnglishNGAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
