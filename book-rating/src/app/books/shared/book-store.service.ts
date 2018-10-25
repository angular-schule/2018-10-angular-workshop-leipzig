import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Book } from './book';
import { map, delay, catchError } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {

  private apiUrl = 'https://api.angular.schule';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Book[]> {
    return this.http.get<any[]>(`${this.apiUrl}/books`).pipe(
      map(rawBooks => rawBooks.map(
        rawBook => this.mapToBook(rawBook)
      )),
      catchError(err => { // WICHTIG: Funktion muss immer ein Observable returnen
        console.log(err);
        // return throwError('FEHLER!'); // Fehler weiterwerfen
        return of([]); // Fehler ignorieren
      })
    );
  }

  getSingle(isbn: string): Observable<Book> {
    return this.http.get<any>(`${this.apiUrl}/book/${isbn}`).pipe(
      map(rawBook => this.mapToBook(rawBook))
    );
  }

  private mapToBook(rawBook: any): Book {
    return {
      isbn: rawBook.isbn,
      title: rawBook.title,
      description: rawBook.description,
      rating: rawBook.rating
    };
  }

  create(book: Book): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/book`,
      book,
      { responseType: 'text' }
    );
  }

  search(term: string): Observable<Book[]> {
    return this.http.get<any[]>(`${this.apiUrl}/books/search/${term}`).pipe(
      map(rawBooks => rawBooks ? rawBooks : []),
      map(rawBooks => rawBooks.map(
        rawBook => this.mapToBook(rawBook))
      )
    );
  }


  getAllStatic(): Book[] {
    return [
      {
        isbn: '000',
        title: 'Angular',
        description: 'Grundlagen, fortgeschrittene Techniken, …',
        rating: 5
      },
      {
        isbn: '111',
        title: 'React',
        description: 'Ein anderes Framework',
        rating: 3
      },
      {
        isbn: '222',
        title: 'Vue.js',
        description: 'Neu, hip und grün',
        rating: 4
      },
    ];
  }
}
