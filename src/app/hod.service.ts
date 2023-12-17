import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HodService {
  private apiUrl = 'http://localhost:8000/hoduser/create';

  constructor(private http: HttpClient) { }
  addhod(hodData: any) {
    return this.http.post(this.apiUrl, hodData);
  }
}

