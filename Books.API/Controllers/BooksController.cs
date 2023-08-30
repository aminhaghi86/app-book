using Books.API.Data;
using Books.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace Books.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class BooksController : ControllerBase
    {
        private readonly BooksDbContext _booksDbContext;
        private readonly UserDbContext _userDbContext;
        public BooksController(BooksDbContext booksDbContext, UserDbContext userDbContext)
        {
            _booksDbContext = booksDbContext;
            _userDbContext = userDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBooks()
        {

            //get specefic user's book
            var loggedInUser = await _userDbContext.Users.FirstOrDefaultAsync(x => x.Username == User.Identity.Name);
            var books = await _booksDbContext.Books.Where(b=>b.UserId == loggedInUser.Id).ToListAsync();
            return Ok(books);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        [ActionName("GetBook")]
        public async Task<IActionResult> GetBook(Guid id)
        {
            var book = await _booksDbContext.Books.FirstOrDefaultAsync(x => x.Id == id);
            if (book != null)
            {
                return Ok(book);
            }
            return NotFound("Book not found.");
        }

        [HttpPost]
        public async Task<IActionResult> AddBook([FromBody] Book book)
        {
            var loggedInUser = await _userDbContext.Users.FirstOrDefaultAsync(x => x.Username == User.Identity.Name);

            book.Id = Guid.NewGuid();
            //add user id to book table...
            book.UserId = loggedInUser.Id;
            await _booksDbContext.Books.AddAsync(book);
            await _booksDbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBook), new { id = book.Id }, book);
        }


        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateBook([FromRoute] Guid id, [FromBody] Book book)
        {
            var existingBook = await _booksDbContext.Books.FirstOrDefaultAsync(x => x.Id == id);
            if (existingBook != null)
            {
                existingBook.Title= book.Title;
                existingBook.Author= book.Author;
                existingBook.PublicationDate= book.PublicationDate;
                await _booksDbContext.SaveChangesAsync();
                return Ok(existingBook);
            }
            return NotFound("Book Not Found!!");
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteBook([FromRoute] Guid id)
        {
            var existingBook = await _booksDbContext.Books.FirstOrDefaultAsync(x => x.Id == id);
            if (existingBook != null)
            {
                _booksDbContext.Remove(existingBook);
                await _booksDbContext.SaveChangesAsync();
                return Ok(existingBook);
            }
            return NotFound("Book Not Found!!");
        }
    }
}
