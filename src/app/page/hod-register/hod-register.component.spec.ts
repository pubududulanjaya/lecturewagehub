import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HodRegisterComponent } from './hod-register.component';

describe('HodRegisterComponent', () => {
  let component: HodRegisterComponent;
  let fixture: ComponentFixture<HodRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HodRegisterComponent]
    });
    fixture = TestBed.createComponent(HodRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
