import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquadMemberDialogComponent } from './squad-member-dialog.component';

describe('SquadMemberDialogComponent', () => {
  let component: SquadMemberDialogComponent;
  let fixture: ComponentFixture<SquadMemberDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SquadMemberDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SquadMemberDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
