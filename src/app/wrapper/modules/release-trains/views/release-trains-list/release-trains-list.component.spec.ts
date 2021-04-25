import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseTrainsListComponent } from './release-trains-list.component';

describe('ReleaseTrainsListComponent', () => {
  let component: ReleaseTrainsListComponent;
  let fixture: ComponentFixture<ReleaseTrainsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReleaseTrainsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseTrainsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
