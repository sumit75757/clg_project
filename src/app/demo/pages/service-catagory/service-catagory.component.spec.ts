import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCatagoryComponent } from './service-catagory.component';

describe('ServiceCatagoryComponent', () => {
  let component: ServiceCatagoryComponent;
  let fixture: ComponentFixture<ServiceCatagoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceCatagoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCatagoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
