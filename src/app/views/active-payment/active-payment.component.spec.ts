import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivePaymentComponent } from './active-payment.component';

describe('ActivePaymentComponent', () => {
  let component: ActivePaymentComponent;
  let fixture: ComponentFixture<ActivePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivePaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
