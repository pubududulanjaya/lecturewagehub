import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OtherpaymentService {
  private apiUrl = 'http://localhost:8000/payment/create';

  constructor(private http: HttpClient) { }
  otherpayment(paymentData: any) {
    return this.http.post(this.apiUrl, paymentData);
  }
}