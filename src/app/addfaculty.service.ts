import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddfacultyService {
  private apiUrl = 'http://localhost:8000/faculty';

  constructor(private http: HttpClient) {}

  addfaculty(data: any) {
    return this.http.post(`${this.apiUrl}/create`, data);


  }

// Example URL in the AddfacultyService
updateFaculty(facultyId: string, data: any) {
  return this.http.patch(this.apiUrl + '/update/' + facultyId, data);
}

  
}