import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunitiesFormComponent } from './communities-form.component';

describe('CommunitiesFormComponent', () => {
  let component: CommunitiesFormComponent;
  let fixture: ComponentFixture<CommunitiesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunitiesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunitiesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
