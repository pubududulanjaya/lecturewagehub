// login.component.ts

import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { Login, LoginFailure } from './login.state';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private store: Store, private router: Router) {}

  login() {
    console.log('Attempting login...');
    const credentials = { username: this.username, password: this.password };
    console.log('Request Credentials:', credentials);

    this.store.dispatch(new Login(credentials)).subscribe(
      () => {},
      (error) => {
        console.error('An error occurred:', error);
        // Check if the error message is for incorrect username and password
        if (error === 'Incorrect username or password') {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Incorrect username or password',
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          // For other errors, dispatch the LoginFailure action as usual
          this.store.dispatch(new LoginFailure('An error occurred. Please try again later.'));
        }
      }
    );
  }

  getUsername() {
    return this.store.select(state => state.auth.username);
  }

  getErrorMessage() {
    console.log("T------------"+ JSON.stringify(this.store.select(state => state.auth.errorMessage)));  
    
    return this.store.select(state => state.auth.errorMessage);
  }

  getSuccessMessage() {
    console.log("T------------"+ JSON.stringify(this.store.select(state => state.auth.successMessage)));
    return this.store.select(state => state.auth.successMessage);
  }
}
