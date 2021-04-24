import { TestBed } from '@angular/core/testing';

import { SquadMembersService } from './squad-members.service';

describe('SquadMembersService', () => {
  let service: SquadMembersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SquadMembersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
