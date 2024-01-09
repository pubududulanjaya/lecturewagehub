// auth.service.ts

    import { Injectable } from '@angular/core';
    import { HttpClient } from '@angular/common/http';
    import { Observable } from 'rxjs';
    
    @Injectable({
      providedIn: 'root',
    })
    export class AuthService {
      constructor(private http: HttpClient) {}
    
      login(username: string, password: string): Observable<any> {
        return this.http.post('/login', { username, password });
      }
    
      logout(): Observable<any> {
        return this.http.get('/logout');
      }
    
      getLoggedInUser(): any {
        // Logic to retrieve the logged-in user from wherever it is stored
        // For example, you might have a user object stored in local storage or a cookie.
        // Adjust this based on your authentication mechanism.
        // Return the user object or null if not logged in.
        return localStorage.getItem('loggedInUser'); // Adjust this based on your actual implementation
      }
    
      // Add a method to store the department information
      setDepartment(Department: string): void {
        localStorage.setItem('Department', Department);
      }
    
      // Add a method to get the department information
      getDepartment(): string | null {
        return localStorage.getItem('Department');
      }

      // Add a method to get the department information for a specific user
    getDepartmentForUser(user: any): string | null {
      // Replace this logic with your actual implementation
      // You might have a service call to fetch the department for the user
      // For now, we'll assume the department is stored in the user object
      return user && user.department ? user.department : null;
    }
    }
  