import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditlecturerComponent } from './editlecturer.component';

describe('EditlecturerComponent', () => {
  let component: EditlecturerComponent;
  let fixture: ComponentFixture<EditlecturerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditlecturerComponent]
    });
    fixture = TestBed.createComponent(EditlecturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
