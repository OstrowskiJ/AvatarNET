using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace AvatarNET.Server.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AvatarModel",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AvatarModel", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Background",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Color = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Background", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Plan",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Type = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Plan", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Text = table.Column<string>(type: "TEXT", nullable: true),
                    PlanId = table.Column<Guid>(type: "TEXT", nullable: false),
                    ModelId = table.Column<Guid>(type: "TEXT", nullable: false),
                    VoiceId = table.Column<Guid>(type: "TEXT", nullable: false),
                    BackgroundId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Subtotal = table.Column<decimal>(type: "money", nullable: false),
                    SalesTax = table.Column<decimal>(type: "money", nullable: false),
                    TotalDue = table.Column<decimal>(type: "money", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Voice",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Language = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Voice", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "AvatarModel",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { new Guid("01a74d8b-28c9-465a-8e0e-76e6ebeb3a4e"), "Paige" },
                    { new Guid("09aac140-5066-4a8d-aacf-a3203a88562a"), "Will" },
                    { new Guid("18b5cb25-9e98-409e-a4fe-59667c9ed3c3"), "Alisha" },
                    { new Guid("638d2c38-25e8-43d6-8435-77b7c0537b81"), "Maia" },
                    { new Guid("ae4f603d-2015-46c4-bbc4-73ba5cea7783"), "Ethan" },
                    { new Guid("df248a4f-9ab9-45c5-876a-1e5adf70643b"), "Jason" }
                });

            migrationBuilder.InsertData(
                table: "Background",
                columns: new[] { "Id", "Color" },
                values: new object[,]
                {
                    { new Guid("2ecff033-aa87-4ad7-adbd-1a3733907068"), "Green" },
                    { new Guid("a84d4767-2521-462f-b47b-e2eb15865fd9"), "Red" },
                    { new Guid("cd57fb2f-2840-4d19-9661-d5947cee6c4d"), "Blue" }
                });

            migrationBuilder.InsertData(
                table: "Plan",
                columns: new[] { "Id", "Type" },
                values: new object[] { new Guid("4b631f86-4e90-4fdb-bd3f-ea8b775b913e"), "Basic" });

            migrationBuilder.InsertData(
                table: "Voice",
                columns: new[] { "Id", "Language" },
                values: new object[,]
                {
                    { new Guid("73ed61f0-fcb2-4b54-b0bc-82ed294bb7bd"), "English" },
                    { new Guid("ffd7fa43-9848-4763-8b4b-f5c8db796e7a"), "Polish" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AvatarModel");

            migrationBuilder.DropTable(
                name: "Background");

            migrationBuilder.DropTable(
                name: "Plan");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Voice");
        }
    }
}
