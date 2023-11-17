import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-auth-users',
  templateUrl: './auth-users.component.html',
  styleUrls: ['./auth-users.component.css']
})
export class AuthUsersComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient) { }
  loginUser() {
    this.http.post('.././backend/controllers/user.controller.ts', { username: this.username, password: this.password })
        .subscribe(
            response => {
                console.log('Login exitoso', response);
            },
            error => {
                console.error('Error en el login', error);
            }
        );
}
}
