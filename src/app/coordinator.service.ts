import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoordinatorService {
  private apiUrl = 'http://localhost:8000/user/create';
  private loginApiUrl = 'http://localhost:8000/login/create';

  constructor(private http: HttpClient) {}

  addCoordinator(coordinatorData: any) {
    return this.http.post(this.apiUrl, coordinatorData);
  }
  
}
