import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMenuComponent } from './upload-menu.component';

describe('AdminMenuComponent', () => {
  let component: UploadMenuComponent;
  let fixture: ComponentFixture<UploadMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
