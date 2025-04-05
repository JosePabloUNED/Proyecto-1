using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace GestionFinanzasPersonales.Server.Models;

public partial class FinanzasPersonalesContext : DbContext
{
    public FinanzasPersonalesContext()
    {
    }

    public FinanzasPersonalesContext(DbContextOptions<FinanzasPersonalesContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Tbfpaccount> Tbfpaccounts { get; set; }

    public virtual DbSet<Tbfpbudget> Tbfpbudgets { get; set; }

    public virtual DbSet<Tbfpcategory> Tbfpcategories { get; set; }

    public virtual DbSet<Tbfpnotification> Tbfpnotifications { get; set; }

    public virtual DbSet<Tbfptransaction> Tbfptransactions { get; set; }

    public virtual DbSet<Tbfpuser> Tbfpusers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=PABLO\\MSSQLSERVERUNED;Initial Catalog=FinanzasPersonales;Integrated Security=True;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Tbfpaccount>(entity =>
        {
            entity.HasKey(e => e.IdAccount);

            entity.ToTable("TBFPAccount");

            entity.Property(e => e.IdAccount)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("id_account");
            entity.Property(e => e.DateCreation)
                .HasColumnType("datetime")
                .HasColumnName("date_creation");
            entity.Property(e => e.IdUser).HasColumnName("id_user");
            entity.Property(e => e.InitialBalance)
                .HasColumnType("money")
                .HasColumnName("initial_balance");
            entity.Property(e => e.NameAccount)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("name_account");
            entity.Property(e => e.TypeAccount)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("type_account");

            entity.HasOne(d => d.IdUserNavigation).WithMany(p => p.Tbfpaccounts)
                .HasForeignKey(d => d.IdUser)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TBFPAccount_TBFPUser");
        });

        modelBuilder.Entity<Tbfpbudget>(entity =>
        {
            entity.HasKey(e => e.IdBudget);

            entity.ToTable("TBFPBudget");

            entity.Property(e => e.IdBudget)
                .ValueGeneratedOnAdd() // Change this line to set IdBudget as an identity column
                .HasColumnName("id_budget");
            entity.Property(e => e.Amount)
                .HasColumnType("money")
                .HasColumnName("amount");
            entity.Property(e => e.IdCategory).HasColumnName("id_category");
            entity.Property(e => e.IdUser).HasColumnName("id_user");
            entity.Property(e => e.Period)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("period");

            entity.HasOne(d => d.IdCategoryNavigation).WithMany(p => p.Tbfpbudgets)
                .HasForeignKey(d => d.IdCategory)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TBFPBudget_TBFPCategory");

            entity.HasOne(d => d.IdUserNavigation).WithMany(p => p.Tbfpbudgets)
                .HasForeignKey(d => d.IdUser)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TBFPBudget_TBFPUser");
        });

        modelBuilder.Entity<Tbfpcategory>(entity =>
        {
            entity.HasKey(e => e.IdCategory);

            entity.ToTable("TBFPCategory");

            entity.Property(e => e.IdCategory)
                .ValueGeneratedNever()
                .HasColumnName("id_category");
            entity.Property(e => e.NameCategory)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("name_category");
        });

        modelBuilder.Entity<Tbfpnotification>(entity =>
        {
            entity.HasKey(e => e.IdNotif);

            entity.ToTable("TBFPNotification");

            entity.Property(e => e.IdNotif)
                .ValueGeneratedNever()
                .HasColumnName("id_notif");
            entity.Property(e => e.DateSend)
                .HasColumnType("datetime")
                .HasColumnName("date_send");
            entity.Property(e => e.IdUser).HasColumnName("id_user");
            entity.Property(e => e.Message)
                .HasMaxLength(2000)
                .IsUnicode(false)
                .HasColumnName("message");
            entity.Property(e => e.State).HasColumnName("state");

            entity.HasOne(d => d.IdUserNavigation).WithMany(p => p.Tbfpnotifications)
                .HasForeignKey(d => d.IdUser)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TBFPNotification_TBFPUser");
        });

        modelBuilder.Entity<Tbfptransaction>(entity =>
        {
            entity.HasKey(e => e.IdTransaction);

            entity.ToTable("TBFPTransaction");

            entity.Property(e => e.IdTransaction)
                .ValueGeneratedNever()
                .HasColumnName("id_transaction");
            entity.Property(e => e.Amount)
                .HasColumnType("money")
                .HasColumnName("amount");
            entity.Property(e => e.DateTransaction)
                .HasColumnType("datetime")
                .HasColumnName("date_transaction");
            entity.Property(e => e.DescriptionTran) // Updated from Description
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("description_tran");
            entity.Property(e => e.IdAccount)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("id_account");
            entity.Property(e => e.IdCategory).HasColumnName("id_category");
            entity.Property(e => e.TypeTran) // Updated from Type
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("type_tran");

            entity.HasOne(d => d.IdAccountNavigation).WithMany(p => p.Tbfptransactions)
                .HasForeignKey(d => d.IdAccount)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TBFPTransaction_TBFPAccount");

            entity.HasOne(d => d.IdCategoryNavigation).WithMany(p => p.Tbfptransactions)
                .HasForeignKey(d => d.IdCategory)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TBFPTransaction_TBFPCategory");
        });

        modelBuilder.Entity<Tbfpuser>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.ToTable("TBFPUser");

            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd() // Add this line to set the Id as an identity column
                .HasColumnName("id_user");
            entity.Property(e => e.DateRegistration)
                .HasColumnType("datetime")
                .HasColumnName("date_registration");
            entity.Property(e => e.Email)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.PasswordHash)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("password");
            entity.Property(e => e.UserName)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("user_name");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}