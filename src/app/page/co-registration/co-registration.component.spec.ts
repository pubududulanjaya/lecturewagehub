import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoRegistrationComponent } from './co-registration.component';

describe('CoRegistrationComponent', () => {
  let component: CoRegistrationComponent;
  let fixture: ComponentFixture<CoRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoRegistrationComponent]
    });
    fixture = TestBed.createComponent(CoRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
