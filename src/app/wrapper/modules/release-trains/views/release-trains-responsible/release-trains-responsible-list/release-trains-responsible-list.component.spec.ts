import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseTrainsResponsibleListComponent } from './release-trains-responsible-list.component';

describe('ReleaseTrainsResponsibleListComponent', () => {
  let component: ReleaseTrainsResponsibleListComponent;
  let fixture: ComponentFixture<ReleaseTrainsResponsibleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReleaseTrainsResponsibleListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseTrainsResponsibleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
