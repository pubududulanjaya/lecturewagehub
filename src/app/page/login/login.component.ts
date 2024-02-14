// login.component.ts
import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { Login, LoginFailure } from './login.state';

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
        this.store.dispatch(new LoginFailure('An error occurred. Please try again later.'));
      }
    );
  }

  getUsername() {
    return this.store.select(state => state.auth.username);
  }

  getErrorMessage() {
    return this.store.select(state => state.auth.errorMessage);
  }

  getSuccessMessage() {
    return this.store.select(state => state.auth.successMessage);
  }
}
