// lecturer.service.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LecturerService {

  // Replace 'any' with the actual interface or type of your lecturer details
  getLecturerDetails(lecturerName: string): Observable<any> {
    // Assuming you have a method to fetch lecturer details from an API or other data source
    // Replace the following line with your actual implementation
    const lecturerDetails = this.fetchLecturerDetailsFromApi(lecturerName);
    return of(lecturerDetails);
  }

  // Replace this with your actual method to fetch data from an API or other data source
  private fetchLecturerDetailsFromApi(lecturerName: string): any {
    // Example: Make an HTTP request or fetch data from a database
    // Replace the following line with your actual implementation
    const mockLecturerDetails = {
      lecturerId: '123',
      LecturerName: lecturerName,
      Title: 'Associate Professor',
      MobileNumber: '1234567890',
      NIC: '123456789X',
      AddressLine1: '123 Main Street',
      AddressLine2: 'Apt 456',
      State: 'Cityville',
      Email: 'lecturer@example.com',
      SalaryType: 'monthly',
      MonthlyPayment: '5000',
      RatePerHour: 'null',
      AccountName: 'John Doe',
      AccountNumber: '123456789012',
      BankName: 'Bank of Cityville',
      bankCode: 'B123',
      BranchName: 'Cityville Branch',
      BranchCode: 'C456'
      // Add other details here
    };
    return mockLecturerDetails;
  }
}
