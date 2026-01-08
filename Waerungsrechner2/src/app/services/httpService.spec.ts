import { TestBed } from '@angular/core/testing';

import { httpService } from './httpService';

describe('Http', () => {
  let service: httpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(httpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
