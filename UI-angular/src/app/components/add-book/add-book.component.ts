import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { BooksService } from 'src/app/services/books.service';
import { tap } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent implements OnInit {
  books: Book[] = [];
  bookToAddOrUpdate: Book = {
    id: '',
    title: '',
    author: '',
    publicationDate: '',
  };

  constructor(
    private bookService: BooksService,
    private router: Router,
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.bookService.getBookById(bookId).subscribe({
        next: (book) => {
          this.bookToAddOrUpdate = book;
          this.changeDetectorRef.detectChanges();
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  addBook() {
    this.bookService
      .addBook(this.bookToAddOrUpdate)
      .pipe(
        tap(() => {
          this.clearForm();
          this.getAllBooks();
          this.router.navigate(['']);
        })
      )
      .subscribe({
        next: (response) => {
          this.clearForm();
        },
        error: (error) => {
          console.log(error);
        },
      });
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

  onSubmit() {
    if (!this.bookToAddOrUpdate.id) {
      this.addBook();
    } else {
      this.updateBook();
    }
  }

  updateBook() {
    this.bookService
      .updateBook(this.bookToAddOrUpdate)
      .pipe(
        tap(() => {
          this.clearForm();
          this.getAllBooks();
          this.router.navigate(['']);
        })
      )
      .subscribe({
        next: (response) => {
          this.clearForm();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  clearForm() {
    this.bookToAddOrUpdate = {
      id: '',
      title: '',
      author: '',
      publicationDate: '',
    };
  }
}
