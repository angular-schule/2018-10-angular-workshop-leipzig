import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  books: Book[] = [];

  constructor(private bs: BookStoreService) { }

  ngOnInit() {
    // this.books = this.bs.getAllStatic();
    this.bs.getAll().subscribe(books => {
      this.books = books;
    });
  }

  addBook(book: Book) {
    this.bs.create(book).subscribe(() => {
      this.books = [...this.books, book];
    });
  }


  updateSortList(book: Book) {
    /* Alternativ:
    const cleanedList = this.books.filter(b => b.isbn !== book.isbn); // Filter erzeugt Kopie
    cleanedList.push(book);
    cleanedList.sort((a, b) => b.rating - a.rating);
    this.books = cleanedList;
    */

    this.books = this.books
      .map(b => b.isbn === book.isbn ? book : b)
      .sort((a, b) => b.rating - a.rating);

  }

}
