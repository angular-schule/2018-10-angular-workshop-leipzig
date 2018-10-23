import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItsUilibComponent } from './its-uilib.component';

describe('ItsUilibComponent', () => {
  let component: ItsUilibComponent;
  let fixture: ComponentFixture<ItsUilibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItsUilibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItsUilibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
