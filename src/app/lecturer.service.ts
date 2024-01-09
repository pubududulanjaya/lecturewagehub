// lecturer.service.ts
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LecturerService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  getLecturerDetails(LecturerName: string): Observable<any> {
    const url = `${this.apiUrl}/lectureDetails/${LecturerName}`;
    return this.http.get<any>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching lecturer details', error);
        return throwError('An error occurred while fetching lecturer details');
      })
    );
  }

  getLecturerDetailsByName(LecturerName: string): Observable<any> {
    // This is a placeholder, replace it with your actual implementation
    // You might want to modify this depending on how your API expects data
    // For example, if your API expects a request body, you can use http.post instead of http.get
    return this.http.get(`${this.apiUrl}/lecturers/${LecturerName}`);
  }
}
