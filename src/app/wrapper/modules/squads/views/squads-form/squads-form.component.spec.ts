import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquadsFormComponent } from './squads-form.component';

describe('SquadsFormComponent', () => {
  let component: SquadsFormComponent;
  let fixture: ComponentFixture<SquadsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SquadsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SquadsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
