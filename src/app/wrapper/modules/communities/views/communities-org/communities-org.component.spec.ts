import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunitiesOrgComponent } from './communities-org.component';

describe('CommunitiesOrgComponent', () => {
  let component: CommunitiesOrgComponent;
  let fixture: ComponentFixture<CommunitiesOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunitiesOrgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunitiesOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
