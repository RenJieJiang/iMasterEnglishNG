using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace iMasterEnglishNG.EntityFrameworkCore
{
    public static class iMasterEnglishNGDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<iMasterEnglishNGDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<iMasterEnglishNGDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
