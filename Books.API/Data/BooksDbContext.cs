using Books.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Books.API.Data
{
    public class BooksDbContext : DbContext
    {
        public BooksDbContext(DbContextOptions options) : base(options)
        {

        }

        //Dbset look like a table
        public DbSet<Book> Books { get; set; }
    }
}
