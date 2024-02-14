// lecturer.service.ts
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LecturerService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  getLecturerDetails(LecturerName: string): Observable<any> {
    const url = `${this.apiUrl}/lectureDetails/${LecturerName}`;
    return this.http.get(url).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching lecturer details', error);
        return throwError(error);
      })
    );
  }
  
}
