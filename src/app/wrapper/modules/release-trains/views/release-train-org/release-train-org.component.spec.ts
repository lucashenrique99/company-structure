import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseTrainOrgComponent } from './release-train-org.component';

describe('ReleaseTrainOrgComponent', () => {
  let component: ReleaseTrainOrgComponent;
  let fixture: ComponentFixture<ReleaseTrainOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReleaseTrainOrgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseTrainOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
