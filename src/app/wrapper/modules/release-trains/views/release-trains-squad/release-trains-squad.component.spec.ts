import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseTrainsSquadComponent } from './release-trains-squad.component';

describe('ReleaseTrainsSquadComponent', () => {
  let component: ReleaseTrainsSquadComponent;
  let fixture: ComponentFixture<ReleaseTrainsSquadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReleaseTrainsSquadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseTrainsSquadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
