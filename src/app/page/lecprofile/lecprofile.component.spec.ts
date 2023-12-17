import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecprofileComponent } from './lecprofile.component';

describe('LecprofileComponent', () => {
  let component: LecprofileComponent;
  let fixture: ComponentFixture<LecprofileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LecprofileComponent]
    });
    fixture = TestBed.createComponent(LecprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
