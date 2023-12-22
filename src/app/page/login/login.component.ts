// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  login() {
    const credentials = { username: this.username, password: this.password };
  
    this.loginService.login(credentials).subscribe(
      (response: any) => {
        if (response.success) {
          this.successMessage = response.message;
          this.errorMessage = ''; // Clear any previous error message
  
          // Navigate based on usertype
          if (response.usertype === 'coordinator') {
            this.router.navigate(['/codashboard']);
          } else if (response.usertype === 'HOD') {
            this.router.navigate(['/HOD-panal']);
          } else if(response.usertype === 'admin') {
            
            this.router.navigate(['/admin_dashboard']);
          }
        } else {
          this.errorMessage = response.message;
          this.successMessage = ''; // Clear any previous success message
          console.error(response.message);
        }
      },
      (error) => {
        this.errorMessage = 'An error occurred. Please try again later.';
        this.successMessage = ''; // Clear any previous success message
        console.error('An error occurred:', error);
      }
    );
  }
}
