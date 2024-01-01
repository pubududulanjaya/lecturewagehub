// login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
  saveLogin(loginData: { username: string; password: string; usertype: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/save`, loginData);
  }
}
