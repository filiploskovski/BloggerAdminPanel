import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeTipsComponent } from './free-tips.component';

describe('FreeTipsComponent', () => {
  let component: FreeTipsComponent;
  let fixture: ComponentFixture<FreeTipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeTipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
