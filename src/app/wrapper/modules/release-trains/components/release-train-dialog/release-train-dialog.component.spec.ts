import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseTrainDialogComponent } from './release-train-dialog.component';

describe('ReleaseTrainDialogComponent', () => {
  let component: ReleaseTrainDialogComponent;
  let fixture: ComponentFixture<ReleaseTrainDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReleaseTrainDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseTrainDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
