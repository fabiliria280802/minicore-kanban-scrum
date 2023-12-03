import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//TODO: Eliminar esta pestaña
@Component({
  selector: 'app-auth-users',
  templateUrl: './auth-users.component.html',
  styleUrls: ['./auth-users.component.css'],
})
export class AuthUsersComponent {
  //username: string = '';
  //password: string = '';
  //constructor(private http: HttpClient) { }
  //loginUser() {
  //this.http.post('/api/users/login', { username: this.username, password: this.password })
  //.subscribe((response: any) => {
  //if (response.isAdmin) {
  // Redirigir al dashboard de administrador o realizar acciones de administrador
  //} else {
  // Manejar usuarios que no son administradores
  //  }
  //  }, error => {
  // Manejar errores (usuario no encontrado, error de servidor, etc.)
  //      });
  //}
}
