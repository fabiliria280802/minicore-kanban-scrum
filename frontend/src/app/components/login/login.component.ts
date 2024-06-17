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
  loading: boolean = true;

  constructor(
    private toastr: ToastrService,
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService,
    //nuevo
    private msalService: MsalService
  ) {
    //nuevo
    this.msalService.instance.handleRedirectPromise().then(res=>{
      if(res !=null && res.account !=null){
        this.msalService.instance.setActiveAccount(res.account);
      }
    })
  }

  ngOnInit(): void{
    this.msalService.instance.handleRedirectPromise().then(res=>{
      if(res){
        console.log(res);
      }
    })

  }
  logIn() {
    if (
      this.login == '' ||
      this.password == '' ||
      this.login == ' ' ||
      this.password == ' '
    ) {
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
        if (e.error.msg) {
          this._errorService.msjError(e);
          this.loading = false;
        } else {
          this.toastr.error('Ups ocurrio un error', 'Error');
        }
        this.loading = true;
      },
    });
  }

  //nuevo
  isLoggedIn(): boolean{
    return this.msalService.instance.getActiveAccount() != null
  }

  Login(){
    this.msalService.loginRedirect();
  }
  logout(){
    this.msalService.logout();
  }
}
