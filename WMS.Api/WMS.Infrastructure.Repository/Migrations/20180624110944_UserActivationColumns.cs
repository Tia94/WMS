using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WMS.Infrastructure.Repository.Migrations
{
    public partial class UserActivationColumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ActivationCode",
                table: "User",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "User",
                nullable: false,
                defaultValue: false);

     
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ActivationCode",
                table: "User");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "User");
        }
    }
}
