using System.ComponentModel.DataAnnotations;

namespace Books.API.Models
{
    public class Book
    {
        [Key]
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public DateTime PublicationDate { get; set; }

        public int UserId { get; set; }
    }
}
