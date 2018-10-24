import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';

@Component({
  selector: 'br-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  @Input() book: Book;
  @Output() ratingChange = new EventEmitter<Book>();

  constructor(private rs: BookRatingService) { }

  ngOnInit() {
  }

  rateUp() {
    const ratedBook = this.rs.rateUp(this.book);
    this.ratingChange.emit(ratedBook);
  }

  rateDown() {
    const ratedBook = this.rs.rateDown(this.book);
    this.ratingChange.emit(ratedBook);
  }

  getRating(): any[] {
    return new Array(this.book.rating);
  }
}
