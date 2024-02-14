// login.state.ts
import { Injectable, NgZone } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap, catchError } from 'rxjs/operators';
import { LoginService } from 'src/app/login.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export class Login {
  static readonly type = '[Auth] Login';
  constructor(public payload: { username: string; password: string }) {}
}

export class LoginSuccess {
  static readonly type = '[Auth] Login Success';
  constructor(public payload: any) {}
}

export class LoginFailure {
  static readonly type = '[Auth] Login Failure';
  constructor(public payload: string) {}
}

interface AuthStateModel {
  username: string;
  usertype: string;
  Department?: string;
  errorMessage: string;
  successMessage: string;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    username: '',
    usertype: '',
    errorMessage: '',
    successMessage: '',
  },
})
@Injectable()
export class AuthState {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private ngZone: NgZone,
    private cookieService: CookieService //Added
  ) {}

  @Selector()
  static username(state: AuthStateModel): string {
    return state.username;
  }

  @Selector()
  static usertype(state: AuthStateModel): string {
    return state.usertype;
  }

  @Selector()
  static Department(state: AuthStateModel): string | undefined {
    return state.Department;
  }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    const credentials = action.payload;

    return this.loginService.login(credentials).pipe(
      tap(
        (response: any) => ctx.dispatch(new LoginSuccess(response)),
        (error) => ctx.dispatch(new LoginFailure(error))
      )
    );
  }

@Action(LoginSuccess)
  loginSuccess(ctx: StateContext<AuthStateModel>, action: LoginSuccess) {
    const response = action.payload;
    ctx.patchState({
      username: response.username,
      usertype: response.usertype,
      Department: response.Department,
      errorMessage: '',
      successMessage: '',
    });

    if (response.success) {
      this.ngZone.run(() => {
        if (response.usertype === 'coordinator' && response.Department !== undefined) {
          this.cookieService.set('Department', response.Department);
          this.router.navigate([`/codashboard`]); 
        } else if (response.usertype === 'hod') {
          this.router.navigate(['/HOD-panel']);
        } else if (response.usertype === 'admin') {
          this.router.navigate(['/admin_dashboard']);
        } else {
          ctx.patchState({
            errorMessage: 'Invalid usertype or department.',
          });
        }
      });
    } else {
      ctx.patchState({
        errorMessage: response.message,
      });
    }
  }

  @Action(LoginFailure)
  loginFailure(ctx: StateContext<AuthStateModel>, action: LoginFailure) {
    const errorMessage = action.payload;
    ctx.patchState({
      errorMessage,
      successMessage: '',
    });
  }
}
