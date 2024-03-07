import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  private apiUrl = 'http://localhost:8000/timetable';

  constructor(private http: HttpClient) { }

  timetable(timetableData: any) {
    return this.http.post(`http://localhost:8000/timetable/create`, timetableData);
  }
  getAllTimetableEntries() {
    return this.http.get(`http://localhost:8000/timetable/getAll`);
  }

  // getAllTimetable() {
  //   return this.http.get(`${this.apiUrl}/getAll`);
  // }
  getTimetable(LecturerName: string) {
    return this.http.get<any>(`http://localhost:8000/timetable?LecturerName=${LecturerName}`);
  }
}