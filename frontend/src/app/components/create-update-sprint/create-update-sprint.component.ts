//Angular adds
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';

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
  title: string = '';
  initialDate: Date = new Date();
  finalDate: Date = new Date();

  //nombre pestaña
  operation: string = '';

  //llamada a la otra pagina
  id: number | undefined;

  //reactiveform
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateUpdateSprintComponent>,
    private toastr: ToastrService,
    private router: Router,
    private _errorService: ErrorService,
    private _sprintService: SprintService,
    private dateAdapter: DateAdapter<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      idsprint: [null],
      title: [''],
      initialDate: [''],
      finalDate: [''],
    });
    this.id = data.id;
  }

  ngOnInit(): void {
    this.isEdit(this.id);
  }

  isEdit(id: number | undefined) {
    if (id != undefined) {
      this.operation = 'Editar';
    } else {
      this.operation = 'Agregar';
    }
  }

  addEditSprint() {
    if (this.form.invalid) {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    const formattedInitialDate = this.formatDate(this.form.value.initialDate);
    const formattedFinalDate = this.formatDate(this.form.value.finalDate);

    const sprint: Sprint = {
      title: this.form.value.title,
      initialDate: formattedInitialDate,
      finalDate: formattedFinalDate,
    };
    this._sprintService.saveSprints(sprint).subscribe({
      next: (data) => {
        this.toastr.success(
          'El sprint fue registrada con exito',
          'Sprint registrado',
        );
        this.dialogRef.close(true);
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
  formatDate(date: Date): string {
    if (!date) {
      return '';
    }
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month < 10 ? `0${month}` : month}-${
      day < 10 ? `0${day}` : day
    }`;
  }
  cancelar() {
    this.dialogRef.close();
  }
}
