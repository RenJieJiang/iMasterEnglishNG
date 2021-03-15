using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace iMasterEnglishNG.Migrations
{
    public partial class Add_Words : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Words",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorUserId = table.Column<long>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierUserId = table.Column<long>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeleterUserId = table.Column<long>(nullable: true),
                    DeletionTime = table.Column<DateTime>(nullable: true),
                    Word = table.Column<string>(maxLength: 100, nullable: true),
                    Frequency = table.Column<int>(nullable: false),
                    PhoneticSymbol = table.Column<string>(maxLength: 100, nullable: true),
                    Definition = table.Column<string>(maxLength: 1000, nullable: true),
                    Synonym = table.Column<string>(maxLength: 200, nullable: true),
                    Antonym = table.Column<string>(maxLength: 200, nullable: true),
                    Remarks = table.Column<string>(maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Words", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Words");
        }
    }
}
