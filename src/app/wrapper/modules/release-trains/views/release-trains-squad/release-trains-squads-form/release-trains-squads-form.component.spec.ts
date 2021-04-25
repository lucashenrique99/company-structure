import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseTrainsSquadsFormComponent } from './release-trains-squads-form.component';

describe('ReleaseTrainsSquadsFormComponent', () => {
  let component: ReleaseTrainsSquadsFormComponent;
  let fixture: ComponentFixture<ReleaseTrainsSquadsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReleaseTrainsSquadsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseTrainsSquadsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
