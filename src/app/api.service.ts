import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    const data = { username, password };
    return this.http.post('/login', data);
  }

  // Add other API methods here as needed
}
