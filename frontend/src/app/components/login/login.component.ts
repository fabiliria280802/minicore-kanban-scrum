import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginPayload } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/services/error.service';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(
    private toastr: ToastrService,
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService,
    private msalService: MsalService
  ) {
    // Manejar redirección de promesas en el constructor
    this.msalService.instance.handleRedirectPromise().then((res) => {
      if (res && res.account) {
        this.msalService.instance.setActiveAccount(res.account);
      }
    }).catch((error) => {
      console.error('Error handling redirect promise', error);
    });
  }

  ngOnInit(): void {
    this.msalService.instance.handleRedirectPromise().then((res) => {
      if (res) {
        console.log(res);
      }
    }).catch((error) => {
      console.error('Error handling redirect promise', error);
    });
  }

  logIn() {
    if (this.login.trim() === '' || this.password.trim() === '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    const user: LoginPayload = {
      login: this.login,
      password: this.password,
    };

    this.loading = true;
    this._userService.login(user).subscribe({
      next: (token) => {
        this.loading = false;
        this.toastr.success('Bienvenido', 'Login');
        this.router.navigate(['/backlog']);
        localStorage.setItem('token', token);
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        if (e.error.msg) {
          this._errorService.msjError(e);
        } else {
          this.toastr.error('Ups ocurrio un error', 'Error');
        }
      },
    });
  }

  isLoggedIn(): boolean {
    return this.msalService.instance.getActiveAccount() != null;
  }

  LoginMicrosoft() {
    this.msalService.loginRedirect();
  }

  logout() {
    this.msalService.logout();
  }
}

