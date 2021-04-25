import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseTrainsResponsibleFormComponent } from './release-trains-responsible-form.component';

describe('ReleaseTrainsResponsibleFormComponent', () => {
  let component: ReleaseTrainsResponsibleFormComponent;
  let fixture: ComponentFixture<ReleaseTrainsResponsibleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReleaseTrainsResponsibleFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseTrainsResponsibleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
