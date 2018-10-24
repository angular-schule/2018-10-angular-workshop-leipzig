import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { BookComponent } from './book/book.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ButtonSharedModule } from '../button-shared/button-shared.module';
import { ItsUilibModule } from 'its-uilib';
import { BookRatingService } from './shared/book-rating.service';


@NgModule({
  imports: [
    CommonModule,
    BooksRoutingModule,
    ButtonSharedModule,
    ItsUilibModule
  ],
  declarations: [
    BookComponent,
    DashboardComponent
  ],
  exports: [
    DashboardComponent
  ],
  /*providers: [
    BookRatingService // Service explizit providen (alter Weg)
  ]*/
})
export class BooksModule { }
