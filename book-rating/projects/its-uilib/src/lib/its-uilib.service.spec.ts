import { TestBed } from '@angular/core/testing';

import { ItsUilibService } from './its-uilib.service';

describe('ItsUilibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItsUilibService = TestBed.get(ItsUilibService);
    expect(service).toBeTruthy();
  });
});
