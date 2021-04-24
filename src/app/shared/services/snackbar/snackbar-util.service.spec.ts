import { TestBed } from '@angular/core/testing';

import { SnackbarUtilService } from './snackbar-util.service';

describe('SnackbarUtilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SnackbarUtilService = TestBed.get(SnackbarUtilService);
    expect(service).toBeTruthy();
  });
});
