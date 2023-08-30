import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Book } from '../../models/book.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'book-app';
  books: Book[] = [];
  bookToAddOrUpdate: Book = {
    id: '',
    title: '',
    author: '',
    publicationDate: '',
  };

  constructor(private bookService: BooksService, private router: Router) {}

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks() {
    this.bookService.getAllBooks().subscribe({
      next: (response) => {
        this.books = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  deleteBook(id: string) {
    this.bookService.deleteBook(id).subscribe({
      next: (response) => {
        this.getAllBooks();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  populateForm(book: Book) {
    this.bookToAddOrUpdate = { ...book };
    this.router.navigate(['addbook', book.id]);
  }
}
