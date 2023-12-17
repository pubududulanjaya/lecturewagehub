import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private apiUrl = "http://localhost:8000/module/create";
 
  constructor(private http: HttpClient) { }
  addmodule(moduleData: any) {
    return this.http.post(this.apiUrl, moduleData);
  }
}
