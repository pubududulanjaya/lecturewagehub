import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BatchService {
  private apiUrl = 'http://localhost:8000/batchDetails';

  constructor(private http: HttpClient) {}

  addBatch(batchData: any) {
    const apiEndpoint = `${this.apiUrl}/addBatch/${batchData.Department}`;
    return this.http.post(apiEndpoint, batchData);
  }

  // Add other methods in the service as needed
}
