import { Component } from '@angular/core';

@Component({
  selector: 'br-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Book Rating';
  url = 'https://angular.schule';
  d = new Date();

  constructor() {
    
    const obs = {
      next: e => console.log(e),
      error: err => console.error(err),
      complete: () => console.log('FERTSCH')
    };

    function myObservable(observer) {
      observer.next('A');
      observer.next('B');
      observer.next('C');
      setTimeout(() => observer.next('D'), 2000);
      setTimeout(() => observer.complete(), 3000);
    }

    // myObservable(obs);

  }
}
