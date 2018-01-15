import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BowlerListComponent } from './bowler-list.component';

describe('BowlerListComponent', () => {
  let component: BowlerListComponent;
  let fixture: ComponentFixture<BowlerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BowlerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BowlerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
