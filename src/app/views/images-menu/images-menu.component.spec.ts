import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesMenuComponent } from './images-menu.component';

describe('SatelliteMenuComponent', () => {
  let component: ImagesMenuComponent;
  let fixture: ComponentFixture<ImagesMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagesMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
