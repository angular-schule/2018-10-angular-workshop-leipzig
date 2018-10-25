import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { map, filter, distinctUntilChanged, sample, debounceTime, scan, take, mergeMap, concatMap, switchMap, exhaustMap } from 'rxjs/operators';
import { interval, merge, concat, forkJoin, of, EMPTY, Observable } from 'rxjs';

import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'br-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {

  results$: Observable<Book[]>;

  bookForm: FormGroup;
  @Output() submitBook = new EventEmitter<Book>();

  constructor(private bs: BookStoreService) { }

  ngOnInit() {
    this.bookForm = new FormGroup({
      isbn: new FormControl('', [
        Validators.required,
        Validators.minLength(10), // Errorcode: minlength
        Validators.maxLength(13)
      ]),
      title: new FormControl('', Validators.required),
      description: new FormControl('')
    });

    this.results$ = this.bookForm.get('title').valueChanges.pipe(
      filter(title => title.length > 3),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(title => this.bs.search(title))
    );

    /*const sub = this.bookForm.valueChanges.subscribe(
      e => console.log(e),
      err => console.error(err)
    );

    setTimeout(() => {
      sub.unsubscribe();
    }, 5000);*/

    forkJoin(
      this.bookForm.valueChanges.pipe(take(5)),
      interval(1000).pipe(take(5)),
      interval(500).pipe(take(3)),
    ); // .subscribe(e => console.log(e));


    /*this.values$ = this.bookForm.valueChanges.pipe(
      map(value => value.title), // nur title
      filter(title => title.length >= 3), // nur 3 oder mehr Zeichen
      distinctUntilChanged(), // keine zwei gleichen Werte hintereinander
      debounceTime(1000), // erst auslösen, wenn 1000ms kein Wert angekommen
      // sample(interval(1000)) // alle 1000ms den letzten Wert entnehmen
      // scan((acc, item) => [...acc, item], []) // alle Ergebnisse zu Array zusammenfügen
      exhaustMap(term => this.bs.search(term))
    );*/

  }

  submitForm() {
    // Buch bauen
    const newBook: Book = {
      ...this.bookForm.value,
      rating: 1
    };

    // Event emitten
    this.submitBook.emit(newBook);

    // Reset
    this.bookForm.reset({
      title: '',
      isbn: '',
      description: ''
    });
  }

}
