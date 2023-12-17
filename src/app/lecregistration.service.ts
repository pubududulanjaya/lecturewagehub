import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LecregistrationService {
  private apiUrl = 'http://localhost:8000/lectureDetails/create';

  constructor(private http: HttpClient) { }
  addlecregistration(lecregistrationData: any) {
    return this.http.post(this.apiUrl, lecregistrationData);
  }

  
}