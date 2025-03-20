using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Database.Entities
{
    public class AppDbContext:DbContext
    {
        public AppDbContext() { }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(clsConnection.ConnectionString, options =>
                                        options.EnableRetryOnFailure(
                                        maxRetryCount: 3,
                                        maxRetryDelay: TimeSpan.FromSeconds(10),
                                        errorNumbersToAdd: null)
            );
        }

        public DbSet<Token>Tokens { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserType>UserTypes { get; set; }
        public DbSet<RoleType> RoleTypes { get; set; }
        public DbSet<ChemistryConversation> ChemistryConversations { get; set; }
        public DbSet<HistoryConversation> HistoryConversations { get; set; }
        public DbSet<MathConversation> MathConversations { get; set; }
        public DbSet<PhysicsConversation> PhysicsConversations { get; set; }
        public DbSet<Session> Sessions { get; set; }
        public DbSet<Question> Questions { get; set; }
        

        

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Token>().Property(P => P.IsActive)
                                        .HasDefaultValue(true);

            modelBuilder.Entity<Token>().Property(P => P.DateOfCreated)
                                        .HasDefaultValueSql("GETDATE()");

            modelBuilder.Entity<UserType>().HasData(
                new UserType { TypeId = 1, TypeName = "User" }
            );

            modelBuilder.Entity<RoleType>().HasData(
                new RoleType { RoleId = 1, RoleName = "user" },
                new RoleType { RoleId = 2, RoleName = "model" }
            );

            modelBuilder.Entity<MathConversation>().Property(P => P.DateOfCreated)
                                                   .HasDefaultValueSql("GETDATE()");

            modelBuilder.Entity<ChemistryConversation>().Property(P => P.DateOfCreated)
                                                        .HasDefaultValueSql("GETDATE()");

            modelBuilder.Entity<PhysicsConversation>().Property(P => P.DateOfCreated)
                                                      .HasDefaultValueSql("GETDATE()");

            modelBuilder.Entity<HistoryConversation>().Property(P => P.DateOfCreated)
                                                      .HasDefaultValueSql("GETDATE()");


        }


    }
}
