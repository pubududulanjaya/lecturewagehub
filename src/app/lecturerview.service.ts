// lecturerview.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LecturerviewService {

  private apiUrl = 'http://localhost:8000/lectureDetails/getAll'; // Replace with your backend API URL
  private selectedLecturer: any;

  constructor(private http: HttpClient) {}

  getLecturers(): Observable<any> {
    return this.http.get('http://localhost:8000/lectureDetails/getAll/lectureDetails');
  }

  setLecturer(lecturer: any): void {
    this.selectedLecturer = lecturer;
  }

  getSelectedLecturer(): any {
    return this.selectedLecturer;
  }
  
  getLecturerDetails(lecturerId: string): Observable<any> {
    const url = `${this.apiUrl}/lectureDetails/${lecturerId}`;
    return this.http.get(url);
  }
}
