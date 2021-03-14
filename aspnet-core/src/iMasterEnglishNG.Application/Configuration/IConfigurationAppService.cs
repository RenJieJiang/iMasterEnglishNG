using System.Threading.Tasks;
using iMasterEnglishNG.Configuration.Dto;

namespace iMasterEnglishNG.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
