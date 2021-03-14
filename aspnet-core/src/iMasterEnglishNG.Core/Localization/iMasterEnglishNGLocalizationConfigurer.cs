using Abp.Configuration.Startup;
using Abp.Localization.Dictionaries;
using Abp.Localization.Dictionaries.Xml;
using Abp.Reflection.Extensions;

namespace iMasterEnglishNG.Localization
{
    public static class iMasterEnglishNGLocalizationConfigurer
    {
        public static void Configure(ILocalizationConfiguration localizationConfiguration)
        {
            localizationConfiguration.Sources.Add(
                new DictionaryBasedLocalizationSource(iMasterEnglishNGConsts.LocalizationSourceName,
                    new XmlEmbeddedFileLocalizationDictionaryProvider(
                        typeof(iMasterEnglishNGLocalizationConfigurer).GetAssembly(),
                        "iMasterEnglishNG.Localization.SourceFiles"
                    )
                )
            );
        }
    }
}
