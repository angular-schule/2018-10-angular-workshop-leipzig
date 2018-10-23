import { TestBed } from '@angular/core/testing';

import { BookRatingService } from './book-rating.service';
import { Book } from './book';

fdescribe('BookRatingService', () => {
  let rs: BookRatingService; // außerhalb beforeEach() deklarieren, damit im it() verfügbar ist
  let book: Book;

  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(() => {
    rs = TestBed.get(BookRatingService);

    book = {
      title: '',
      isbn: '',
      description: '',
      rating: 3
    };
  });

  it('should be created', () => {
    const service: BookRatingService = TestBed.get(BookRatingService);
    expect(service).toBeTruthy();
  });

  it('should increase the rating for rateUp', () => {
    const ratedBook = rs.rateUp(book);
    expect(ratedBook.rating).toEqual(4);
  });

  it('should decrease the rating for rateDown', () => {
    const ratedBook = rs.rateDown(book);
    expect(ratedBook.rating).toEqual(2);
  });

  it('should not be allowed to rate higher than 5', () => {
    book.rating = 5;

    const ratedBook = rs.rateUp(book);
    expect(ratedBook.rating).toEqual(5);
  });

  it('should not be allowed to rate lower than 1', () => {
    book.rating = 1;

    const ratedBook = rs.rateDown(book);
    expect(ratedBook.rating).toEqual(1);
  });
});
