import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:9003/api/coordinator/add';

  constructor(private http: HttpClient) { }

  addCoordinator(usersData: any) {
    return this.http.post(this.apiUrl, usersData);
  }
}
