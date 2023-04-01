import { TestBed } from '@angular/core/testing';

import { PartnerservService } from './partnerserv.service';

describe('PartnerservService', () => {
  let service: PartnerservService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartnerservService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
