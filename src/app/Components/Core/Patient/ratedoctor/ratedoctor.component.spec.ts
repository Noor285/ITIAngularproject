import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatedoctorComponent } from './ratedoctor.component';

describe('RatedoctorComponent', () => {
  let component: RatedoctorComponent;
  let fixture: ComponentFixture<RatedoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RatedoctorComponent]
    });
    fixture = TestBed.createComponent(RatedoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
