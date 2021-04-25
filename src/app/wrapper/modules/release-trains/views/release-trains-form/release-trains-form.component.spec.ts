import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseTrainsFormComponent } from './release-trains-form.component';

describe('ReleaseTrainsFormComponent', () => {
  let component: ReleaseTrainsFormComponent;
  let fixture: ComponentFixture<ReleaseTrainsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReleaseTrainsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseTrainsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
