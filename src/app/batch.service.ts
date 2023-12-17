import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BatchService {
  private apiUrl = 'http://localhost:8000/batch/create';

  constructor(private http: HttpClient) { }
  addbatch(batchData: any) {
    return this.http.post(this.apiUrl, batchData);
  }
}
