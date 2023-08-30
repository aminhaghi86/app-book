import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  baseUrl = environment.bookUrl;
  constructor(private http: HttpClient) {}
  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl);
  }
  addBook(book:Book): Observable<Book> {
    book.id='00000000-0000-0000-0000-000000000000'
    return this.http.post<Book>(this.baseUrl,book)
  }
  deleteBook(id:string):Observable<Book>{
   return  this.http.delete<Book>(this.baseUrl + "/" + id)
  }
  updateBook(book:Book):Observable<Book>{
    return this.http.put<Book>(this.baseUrl+ "/"+book.id,book)
  }
  getBookById(id: string): Observable<Book> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Book>(url);
  }
}
