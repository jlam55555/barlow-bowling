import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BowlerDetailComponent } from './bowler-detail.component';

describe('BowlerDetailComponent', () => {
  let component: BowlerDetailComponent;
  let fixture: ComponentFixture<BowlerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BowlerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BowlerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
