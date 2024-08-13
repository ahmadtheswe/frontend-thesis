import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourOrderDetailComponent } from './your-order-detail.component';

describe('YourOrderDetailComponent', () => {
  let component: YourOrderDetailComponent;
  let fixture: ComponentFixture<YourOrderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourOrderDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YourOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
