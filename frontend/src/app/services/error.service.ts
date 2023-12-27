import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private toastr: ToastrService) {}

  msjError(e: HttpErrorResponse) {
    const errorMessage = e.error?.msg || 'Ocurrió un error inesperado.';
    this.toastr.error(errorMessage, 'Error');
  }
}
