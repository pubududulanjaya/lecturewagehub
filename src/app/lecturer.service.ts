// lecturer.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LecturerService {
  private apiUrl = 'http://localhost:8000';
  private apiUrlg = 'http://localhost:8000/lectureDetails/getAll';

  constructor(private http: HttpClient) { }

  getLecturerDetails(lecturerId: string): Observable<any> {
    const url = `${this.apiUrl}/lectureDetails/${lecturerId}`;
    return this.http.get(url);
  }
}
