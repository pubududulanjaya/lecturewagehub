// data.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'http://your-backend-api-url'; // Update this URL

  constructor(private http: HttpClient) {}

  getLecturerData(lecturerName: string): Observable<any> {
    const url = `${this.baseUrl}/api/lecturers/${lecturerName}`;
    return this.http.get(url);
  }
}
