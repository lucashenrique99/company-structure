import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseTrainsResponsibleComponent } from './release-trains-responsible.component';

describe('ReleaseTrainsResponsibleComponent', () => {
  let component: ReleaseTrainsResponsibleComponent;
  let fixture: ComponentFixture<ReleaseTrainsResponsibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReleaseTrainsResponsibleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseTrainsResponsibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
