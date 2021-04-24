import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquadsMembersListComponent } from './squads-members-list.component';

describe('SquadsMembersListComponent', () => {
  let component: SquadsMembersListComponent;
  let fixture: ComponentFixture<SquadsMembersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SquadsMembersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SquadsMembersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
