import { TestBed } from '@angular/core/testing';

import { AccuweatherService } from './accuweather.service';

describe('AccuweatherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccuweatherService = TestBed.get(AccuweatherService);
    expect(service).toBeTruthy();
  });
});
