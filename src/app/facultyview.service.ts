import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacultyviewService {

  private apiUrl = 'http://localhost:8000/faculty/getAll'; // Replace with your backend API URL
  private selectedFaculty: any;

  constructor(private http: HttpClient) { }

  getFaculty(): Observable<any> {
    return this.http.get('http://localhost:8000/faculty/getAll/faculty');
  }

  setFaculty(faculty: any): void {
    this.selectedFaculty= faculty;
  }

  getSelectedFaculty(): any {
    return this.selectedFaculty;
  }
}