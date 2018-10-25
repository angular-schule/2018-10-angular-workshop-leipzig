import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Book } from '../shared/book';

@Component({
  selector: 'br-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {

  bookForm: FormGroup;
  @Output() submitBook = new EventEmitter<Book>();

  constructor() { }

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
