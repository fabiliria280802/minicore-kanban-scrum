//Angular adds
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

//interfaces
import { Sprint } from 'src/app/interfaces/sprint.interface';

//services
import { ErrorService } from 'src/app/services/error.service';
import { SprintService } from 'src/app/services/sprint.service';

@Component({
  selector: 'app-create-update-sprint',
  templateUrl: './create-update-sprint.component.html',
  styleUrls: ['./create-update-sprint.component.css'],
})
export class CreateUpdateSprintComponent implements OnInit {
  //atributos
  idsprint: number = 0;
  title: string = '';
  initialDate: Date = new Date();
  finalDate: Date = new Date();

  //reactiveform
  form: FormGroup;
  constructor(
    public dialogRef:MatDialogRef<CreateUpdateSprintComponent>,
    private toastr: ToastrService,
    private router: Router,
    private _errorService: ErrorService,
    private _sprintService: SprintService,
    private fb: FormBuilder,
  ) {
    this.form =this.fb.group({
      idsprint:[null],
      title:[''],
      initialDate:[''],
      finalDate:[''],
  });
  }
  ngOnInit(): void {}

  //metodos
  addEditSprint() {
    if (
      this.idsprint == 0 ||
      this.title == '' ||
      this.title == ' '||
      this.initialDate == new Date('') ||
      this.finalDate == new Date('')
    ) {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }
    const sprint: Sprint = {
      idsprint: this.idsprint,
      title: this.title,
      initialDate: this.initialDate,
      finalDate: this.finalDate,
    };
    this._sprintService.saveSprints(sprint).subscribe({
      next: (data) => {
        this.toastr.success(
          'El sprint fue registrada con exito',
          'Sprint registrado',
        );
        this.dialogRef.close();
      },
      error: (e: HttpErrorResponse) => {
        if (e.error.msg) {
          this._errorService.msjError(e);
        } else {
          this.toastr.error('Ups ocurrio un error', 'Error');
        }
      },
    });
  }

  cancelar(){
    this.dialogRef.close();
  }
}
