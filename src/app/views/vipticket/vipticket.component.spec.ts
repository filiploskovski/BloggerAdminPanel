import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VipticketComponent } from './vipticket.component';

describe('VipticketComponent', () => {
  let component: VipticketComponent;
  let fixture: ComponentFixture<VipticketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VipticketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VipticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
