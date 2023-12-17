import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddfacultyService {
  private apiUrl = 'http://localhost:8000/faculty/create';

  constructor(private http: HttpClient) { }

  addfaculty(addfacultyData: any) {
    return this.http.post('http://localhost:8000/faculty/create', addfacultyData);
  }
}