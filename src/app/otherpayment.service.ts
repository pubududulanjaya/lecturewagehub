import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtherpaymentService {
  private apiUrl = 'http://localhost:8000/payment/create';

  constructor(private http: HttpClient) { }

  otherpayment(paymentData: any): Observable<any> {
    return this.http.post(this.apiUrl, paymentData);
  }

  getPayments(LecturerName: string): Observable<any> {
    const url = `http://localhost:8000/payment?LecturerName=${LecturerName}`;
    return this.http.get(url);
  }
}
