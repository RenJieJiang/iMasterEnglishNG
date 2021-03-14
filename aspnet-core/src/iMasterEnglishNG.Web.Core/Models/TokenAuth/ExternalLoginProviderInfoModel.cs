using Abp.AutoMapper;
using iMasterEnglishNG.Authentication.External;

namespace iMasterEnglishNG.Models.TokenAuth
{
    [AutoMapFrom(typeof(ExternalLoginProviderInfo))]
    public class ExternalLoginProviderInfoModel
    {
        public string Name { get; set; }

        public string ClientId { get; set; }
    }
}
