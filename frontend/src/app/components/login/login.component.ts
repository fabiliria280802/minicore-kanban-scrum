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
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      await this.msalService.instance.initialize();
      const result = await this.msalService.instance.handleRedirectPromise();
      if (result && result.account) {
        this.msalService.instance.setActiveAccount(result.account);
      }
    } catch (error) {
      console.error('Error handling redirect promise', error);
    }
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

  loginRedirect() {
    if (!this.msalService.instance) {
      console.error('MSAL instance not initialized');
      return;
    }
    this.msalService.loginRedirect();
  }
  logout() {
    this.msalService.logout();
  }
}


