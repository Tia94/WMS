﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WMS.Infrastructure.Repository;

namespace WMS.Infrastructure.Repository.Migrations
{
    [DbContext(typeof(WMSContext))]
    [Migration("20180902094528_RemovedUserDiscriminator")]
    partial class RemovedUserDiscriminator
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.1-rtm-30846")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("WMS.Domain.Model.Orders.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("ClientId");

                    b.Property<DateTimeOffset>("CreatedOn");

                    b.Property<Guid>("Number");

                    b.HasKey("Id");

                    b.HasIndex("ClientId");

                    b.ToTable("Order");
                });

            modelBuilder.Entity("WMS.Domain.Model.Orders.OrderItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTimeOffset>("CreatedOn");

                    b.Property<int?>("OrderId");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(9, 3)");

                    b.Property<int>("ProductId");

                    b.Property<int>("Quantity");

                    b.HasKey("Id");

                    b.HasIndex("OrderId");

                    b.HasIndex("ProductId");

                    b.ToTable("OrderItem");
                });

            modelBuilder.Entity("WMS.Domain.Model.Orders.OrderStage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTimeOffset>("CreatedOn");

                    b.Property<int>("OrderId");

                    b.Property<string>("Status");

                    b.HasKey("Id");

                    b.HasIndex("OrderId");

                    b.ToTable("OrderStage");
                });

            modelBuilder.Entity("WMS.Domain.Model.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Category");

                    b.Property<DateTimeOffset>("CreatedOn");

                    b.Property<string>("Name");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(9, 3)");

                    b.Property<int>("Quantity");

                    b.HasKey("Id");

                    b.ToTable("Product");
                });

            modelBuilder.Entity("WMS.Domain.Model.Users.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<Guid>("ActivationCode");

                    b.Property<string>("Address");

                    b.Property<DateTimeOffset>("CreatedOn");

                    b.Property<string>("Email");

                    b.Property<string>("Firstname");

                    b.Property<bool>("IsActive");

                    b.Property<string>("Lastname");

                    b.Property<string>("Password");

                    b.Property<int>("Role");

                    b.Property<string>("TelephoneNumber");

                    b.Property<string>("Username");

                    b.HasKey("Id");

                    b.ToTable("User");
                });

            modelBuilder.Entity("WMS.Domain.Model.Orders.Order", b =>
                {
                    b.HasOne("WMS.Domain.Model.Users.User", "Client")
                        .WithMany()
                        .HasForeignKey("ClientId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("WMS.Domain.Model.Orders.OrderItem", b =>
                {
                    b.HasOne("WMS.Domain.Model.Orders.Order")
                        .WithMany("Items")
                        .HasForeignKey("OrderId");

                    b.HasOne("WMS.Domain.Model.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("WMS.Domain.Model.Orders.OrderStage", b =>
                {
                    b.HasOne("WMS.Domain.Model.Orders.Order", "Order")
                        .WithMany("Stages")
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Restrict);
                });
#pragma warning restore 612, 618
        }
    }
}
