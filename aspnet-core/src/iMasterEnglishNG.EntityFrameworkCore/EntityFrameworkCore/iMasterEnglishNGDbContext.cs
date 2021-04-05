using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using iMasterEnglishNG.Authorization.Roles;
using iMasterEnglishNG.Authorization.Users;
using iMasterEnglishNG.MultiTenancy;
using iMasterEnglishNG.Entities;
using System;

namespace iMasterEnglishNG.EntityFrameworkCore
{
    public class iMasterEnglishNGDbContext : AbpZeroDbContext<Tenant, Role, User, iMasterEnglishNGDbContext>
    {
        /* Define a DbSet for each entity of the application */

        public DbSet<WordEntity> Words { get; set; }
        public DbSet<SentenceEntity> Sentences { get; set; }

        public iMasterEnglishNGDbContext(DbContextOptions<iMasterEnglishNGDbContext> options)
            : base(options)
        {
        }

        [DbFunction("FormatDate", "dbo")]
        public static string FormatDate(System.DateTime dt)
        {
            // no need to provide an implementation
            throw new NotSupportedException();
        }
    }
}
