import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquadDialogComponent } from './squad-dialog.component';

describe('SquadDialogComponent', () => {
  let component: SquadDialogComponent;
  let fixture: ComponentFixture<SquadDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SquadDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SquadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
