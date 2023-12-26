import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sprint } from 'src/app/interfaces/sprint.interface';
import { ErrorService } from 'src/app/services/error.service';
import { ToastrService } from 'ngx-toastr';
import { SprintService } from 'src/app/services/sprint.service';

@Component({
  selector: 'app-create-update-sprint',
  templateUrl: './create-update-sprint.component.html',
  styleUrls: ['./create-update-sprint.component.css'],
})
export class CreateUpdateSprintComponent implements OnInit {
  title: string = '';
  initialDate: Date = new Date();
  finalDate: Date = new Date();

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private _errorService: ErrorService,
    private _sprintService: SprintService
  ) {}
  ngOnInit(): void {}

  //metodos
  addSprint() {}
  //metodo validacion password
  isValidTitle(password: string): boolean {
    const hasMinLength = password.length >= 8;
    const hasSpecialChars = (password.match(/[^A-Za-z0-9]/g) ?? []).length >= 2;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumbers = (password.match(/\d/g) ?? []).length >= 2;

    return hasMinLength && hasSpecialChars && hasUpperCase && hasNumbers;
  }
}
