import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User, position, type } from 'src/app/interfaces/user.interface';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  fullname: string = '';
  email: string = '';
  type: type = type.Viewer;
  position: position = position.Intern;
  loading: boolean = true;

  constructor(
    private toastr: ToastrService,
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService,
  ) {}

  ngOnInit(): void {}

  addUser() {
    if (
      this.username == '' ||
      this.password == '' ||
      this.confirmPassword == '' ||
      this.username == ' ' ||
      this.password == ' ' ||
      this.confirmPassword == ' '
    ) {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }
    if (!this.isValidPassword(this.password)) {
      this.toastr.error(
        'La contraseña debe tener al menos 8 caracteres, incluir mínimo 2 caracteres especiales, al menos 1 letra mayúscula y contener al menos 2 números',
        'Error',
      );
      return;
    }
    if (this.password != this.confirmPassword) {
      this.toastr.error('No coinciden las contraseñas', 'Error');
      return;
    }
    if (!/.*@skam\.com$/.test(this.email)) {
      this.toastr.error(
        'El correo electrónico escrito no cumple con las normas de la compañía',
        'Error',
      );
      return;
    }
    const user: User = {
      username: this.username,
      password: this.password,
      fullname: this.fullname,
      email: this.email,
      type: this.type,
      position: this.position,
    };
    this.loading = true;
    this._userService.signIn(user).subscribe({
      next: (data) => {
        this.loading = false;
        this.toastr.success(
          'El usuario fue registrado con exito',
          'Usuario registrado',
        );
        this.router.navigate(['/login']);
      },
      error: (e: HttpErrorResponse) => {
        if (e.error.msg) {
          this._errorService.msjError(e);
          this.loading = false;
        } else {
          this.toastr.error('Ups ocurrio un error', 'Error');
        }
        this.loading = false;
      },
    });
  }
  //metodo validacion password
  isValidPassword(password: string): boolean {
    const hasMinLength = password.length >= 8;
    const hasSpecialChars = (password.match(/[^A-Za-z0-9]/g) ?? []).length >= 2;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumbers = (password.match(/\d/g) ?? []).length >= 2;
    return hasMinLength && hasSpecialChars && hasUpperCase && hasNumbers;
  }
}
