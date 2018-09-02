using Microsoft.EntityFrameworkCore.Migrations;

namespace WMS.Infrastructure.Repository.Migrations
{
    public partial class RemovedUserDiscriminator : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "User");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "User",
                nullable: false,
                defaultValue: "");
        }
    }
}
