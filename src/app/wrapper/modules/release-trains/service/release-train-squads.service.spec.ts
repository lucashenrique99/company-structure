import { TestBed } from '@angular/core/testing';

import { ReleaseTrainSquadsService } from './release-train-squads.service';

describe('ReleaseTrainSquadsService', () => {
  let service: ReleaseTrainSquadsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReleaseTrainSquadsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
