import { Component } from '@angular/core';

@Component({
  selector: 'br-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Book Rating';
  url = 'https://angular.schule';

  /*constructor() {
    setTimeout(() => {
      this.title = 'HALLO';
    }, 2000);
  }*/
}
