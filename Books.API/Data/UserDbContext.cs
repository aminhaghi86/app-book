using Books.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Books.API.Data
{
    public class UserDbContext:DbContext
    {
        public UserDbContext(DbContextOptions<UserDbContext> options):base(options) { 

        }

        public DbSet<User> Users  { get; set; }

//protected override void OnModelCreating(ModelBuilder modelBuilder)
//{           modelBuilder.Entity<User>().ToTable("users");       }

    }
}
