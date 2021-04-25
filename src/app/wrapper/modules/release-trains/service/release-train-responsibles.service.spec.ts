import { TestBed } from '@angular/core/testing';

import { ReleaseTrainResponsiblesService } from './release-train-responsibles.service';

describe('ReleaseTrainResponsiblesService', () => {
  let service: ReleaseTrainResponsiblesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReleaseTrainResponsiblesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
