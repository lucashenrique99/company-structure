import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthdaysMonthListComponent } from './birthdays-month-list.component';

describe('BirthdaysMonthListComponent', () => {
  let component: BirthdaysMonthListComponent;
  let fixture: ComponentFixture<BirthdaysMonthListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BirthdaysMonthListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthdaysMonthListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
