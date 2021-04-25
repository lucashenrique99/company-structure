import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseTrainsSquadsListComponent } from './release-trains-squads-list.component';

describe('ReleaseTrainsSquadsListComponent', () => {
  let component: ReleaseTrainsSquadsListComponent;
  let fixture: ComponentFixture<ReleaseTrainsSquadsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReleaseTrainsSquadsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseTrainsSquadsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
