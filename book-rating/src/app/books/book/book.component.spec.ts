import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { mock, instance, verify, when, anything, spy } from 'ts-mockito';
import { By } from '@angular/platform-browser';

import { BookComponent } from './book.component';
import { BookRatingService } from '../shared/book-rating.service';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let rs: BookRatingService;

  beforeEach(async(() => {
    // gemockten BRS erstellen
    // hat dieselbe Schnittstelle, aber keine Funktionalität
    rs = mock(BookRatingService);

    TestBed.configureTestingModule({
      declarations: [ BookComponent ],
      providers: [
        // BRS ersetzen: Angular verwendet jetzt immer
        // instance(rs), wenn jemand den BRS anfordert
        // instance(rs) erstellt konkrete Instanz des Mocks
        { provide: BookRatingService, useValue: instance(rs) }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;

    component.book = {
      title: 'title',
      isbn: '000',
      description: 'desc',
      rating: 3
    };

    // WICHTIG: Diese Zeile nach der Initialisierung des Books
    // damit book in der View aktualisiert wird
    fixture.detectChanges();
    // fixture.autoDetectChanges(); // ????
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should forward rateUp call to the service', () => {
    component.rateUp();

    // verify statt expect, weil ts-mockito
    // Mock besitzt bereits einen Spy
    // man kann hier konkretes Argument für den Aufruf angeben
    verify(rs.rateUp(component.book)).once();
  });

  it('should throw ratingChange event for rateUp', (done) => {
    // Mockservice mit Funktionalität füllen
    // wenn rateUp gerufen wird, dann konkreten Wert returnen
    when(rs.rateUp(anything()))
      .thenReturn({ ...component.book });

    // EventEmitter abonnieren
    component.ratingChange.subscribe(book => {
      expect(book).toBeTruthy();

      // Jasmine wartet so lange mit dem Test bis done()
      // gerufen wird. Nötig, weil Event asynchron sein könnte
      // (ist es aber nicht)
      // Timeout nach 10 Sekunden
      done();
    });

    component.rateUp();
  });

  it('should call component.rateUp on button click', () => {
    // Komponente überwachen
    const spiedComp = spy(component);
    
    // Button holen
    // fixture.debugElement ist das gerenderte Template der Komponente
    const rateUpBtn: HTMLButtonElement = fixture.debugElement
      .query(By.css('button[data-testing-id="rateUpBtn"]'))
      .nativeElement;

    // Klick auslösen
    rateUpBtn.click();

    // Prüfen ob Methode aufgerufen wurde
    verify(spiedComp.rateUp()).once();
  });

  it('should display the correct rating', () => {
    // Element holen und auslesen
    const ratingBox = fixture.debugElement
      .query(By.css('[data-testing-id="ratingBox"]'))
      .nativeElement;

    // in .textContent steht der Text eines DOM-Elements
    expect(ratingBox.textContent)
      .toEqual(component.book.rating.toString());

      // Rating im Buch ändern
      // component.book.rating = 5;
      component.book = { ...component.book, rating: 5 };

      // CD manuell antriggern
      fixture.detectChanges();

      // prüfen, ob Rating korrekt angezeigt
      expect(ratingBox.textContent)
        .toEqual(component.book.rating.toString());

  });


});
