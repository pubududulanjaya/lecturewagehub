import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateHistoryComponent } from './rate-history.component';

describe('RateHistoryComponent', () => {
  let component: RateHistoryComponent;
  let fixture: ComponentFixture<RateHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RateHistoryComponent]
    });
    fixture = TestBed.createComponent(RateHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
