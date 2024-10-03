import { TestBed } from '@angular/core/testing';

import { PublisherServiceService } from './publisher-service.service';

describe('PublisherServiceService', () => {
  let service: PublisherServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublisherServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
