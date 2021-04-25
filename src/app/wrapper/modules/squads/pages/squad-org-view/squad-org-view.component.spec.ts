import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquadOrgViewComponent } from './squad-org-view.component';

describe('SquadOrgViewComponent', () => {
  let component: SquadOrgViewComponent;
  let fixture: ComponentFixture<SquadOrgViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SquadOrgViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SquadOrgViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
