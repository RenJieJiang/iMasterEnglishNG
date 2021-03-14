using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using iMasterEnglishNG.Configuration;
using iMasterEnglishNG.Web;

namespace iMasterEnglishNG.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class iMasterEnglishNGDbContextFactory : IDesignTimeDbContextFactory<iMasterEnglishNGDbContext>
    {
        public iMasterEnglishNGDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<iMasterEnglishNGDbContext>();
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            iMasterEnglishNGDbContextConfigurer.Configure(builder, configuration.GetConnectionString(iMasterEnglishNGConsts.ConnectionStringName));

            return new iMasterEnglishNGDbContext(builder.Options);
        }
    }
}
