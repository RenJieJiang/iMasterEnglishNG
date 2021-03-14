using System.Collections.Generic;

namespace iMasterEnglishNG.Authentication.External
{
    public interface IExternalAuthConfiguration
    {
        List<ExternalLoginProviderInfo> Providers { get; }
    }
}
