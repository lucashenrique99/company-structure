import { TestBed } from '@angular/core/testing';

import { ReleaseTrainsService } from './release-trains.service';

describe('ReleaseTrainsService', () => {
  let service: ReleaseTrainsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReleaseTrainsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
