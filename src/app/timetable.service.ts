import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  private apiUrl = 'http://localhost:8000/timetable';

  constructor(private http: HttpClient) { }

  timetable(timetableData: any) {
    return this.http.post(`${this.apiUrl}/create`, timetableData);
  }
  getAllTimetableEntries() {
    return this.http.get(`${this.apiUrl}/getAll`);
  }
}