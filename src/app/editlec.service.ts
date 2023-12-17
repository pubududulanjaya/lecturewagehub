import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditlecService {
  // BehaviorSubject for communicating the selected lecturer for editing
  private selectedLecturerSubject = new BehaviorSubject<any>(null);
  selectedLecturer$ = this.selectedLecturerSubject.asObservable();

  constructor() {}

  // Set the selected lecturer
  setLecturer(lecturer: any) {
    this.selectedLecturerSubject.next(lecturer);
  }
}
