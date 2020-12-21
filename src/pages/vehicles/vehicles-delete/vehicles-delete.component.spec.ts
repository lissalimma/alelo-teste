import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesDeleteComponent } from './vehicles-delete.component';

describe('VehiclesDeleteComponent', () => {
  let component: VehiclesDeleteComponent;
  let fixture: ComponentFixture<VehiclesDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiclesDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclesDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
