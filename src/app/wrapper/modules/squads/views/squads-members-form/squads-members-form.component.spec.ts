import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquadsMembersFormComponent } from './squads-members-form.component';

describe('SquadsMembersFormComponent', () => {
  let component: SquadsMembersFormComponent;
  let fixture: ComponentFixture<SquadsMembersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SquadsMembersFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SquadsMembersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
