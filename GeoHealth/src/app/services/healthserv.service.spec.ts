import { TestBed } from '@angular/core/testing';

import { HealthservService } from './healthserv.service';

describe('HealthservService', () => {
  let service: HealthservService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HealthservService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
