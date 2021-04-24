import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TogglePasswordButtonComponent } from './toggle-password-button.component';

describe('TogglePasswordButtonComponent', () => {
  let component: TogglePasswordButtonComponent;
  let fixture: ComponentFixture<TogglePasswordButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TogglePasswordButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TogglePasswordButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
