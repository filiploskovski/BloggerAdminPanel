import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlySubscriptionComponent } from './monthly-subscription.component';

describe('MonthlySubscriptionComponent', () => {
  let component: MonthlySubscriptionComponent;
  let fixture: ComponentFixture<MonthlySubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlySubscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlySubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
