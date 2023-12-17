import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecregistrationComponent } from './lecregistration.component';

describe('LecregistrationComponent', () => {
  let component: LecregistrationComponent;
  let fixture: ComponentFixture<LecregistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LecregistrationComponent]
    });
    fixture = TestBed.createComponent(LecregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
