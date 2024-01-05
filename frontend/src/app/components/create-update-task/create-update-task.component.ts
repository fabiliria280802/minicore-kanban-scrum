//Angular adds
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

//interfaces
import {
  Task,
  points,
  status,
  priority,
} from 'src/app/interfaces/task.interface';
import { Sprint } from 'src/app/interfaces/sprint.interface';
import { User } from 'src/app/interfaces/user.interface';

//servicios
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';
import { TaskService } from 'src/app/services/task.service';
import { SprintService } from 'src/app/services/sprint.service';

@Component({
  selector: 'app-create-update-task',
  templateUrl: './create-update-task.component.html',
  styleUrls: ['./create-update-task.component.css'],
})
export class CreateUpdateTaskComponent implements OnInit {
  //atributos
  idsprint: number = 0;
  iduser: number = 0;
  title: string = '';
  taskdescription: string = '';
  status: status = status.todo;
  points: points = points.none;
  priority: priority = priority.low;

  //nombre pestaña
  operation: string = '';

  //llamada a la otra pagina
  id: number | undefined;

  //selects
  tasks: Task[] = [];
  users: User[] = [];
  sprints: Sprint[] = [];
  statuses: status[] = [status.todo, status.doing, status.done];
  pointss: points[] = [
    points.none,
    points.one,
    points.three,
    points.five,
    points.eight,
    points.thirteen,
  ];
  prioritys: priority[] = [priority.low, priority.medium, priority.high];

  //reactiveform
  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<CreateUpdateTaskComponent>,
    private _taskService: TaskService,
    private _sprintService: SprintService,
    private _errorService: ErrorService,
    private _userService: UserService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) {
    this.form = this.fb.group({
      idsprint: [''],
      iduser: [''],
      title: [''],
      taskdescription: [''],
      status: [''],
      points: [''],
      priority: [''],
    });
    this.id = data.id;
  }

  ngOnInit(): void {
    this.loadSprints();
    this.loadUsers();
    this.isEdit(this.id);
  }
  isEdit(id: number | undefined) {
    if (id != undefined) {
      this.operation = 'Editar';
    } else {
      this.operation = 'Agregar';
    }
  }
  getTask(id: number) {
    this._taskService.getTask(id).subscribe((data) => {
      console.log(data);
      this.form.setValue({
        idsprint: data.idsprint,
        iduser: data.iduser,
        title: data.title,
        taskdescription: data.taskdescription,
        status: data.status,
        points: data.points,
        priority: data.priority,
      });
    });
  }

  loadSprints(): void {
    this._sprintService.getSprints().subscribe({
      next: (sprints) => {
        this.sprints = sprints;
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

  loadUsers(): void {
    this._userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
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

  loadTasks(): void {
    this._taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
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

  onSprintSelected(sprintId: number): void {
    this.idsprint = sprintId;
  }

  onUserSelected(userId: number): void {
    this.iduser = userId;
  }

  cancelar() {
    this.dialogRef.close();
  }

  addEditTask() {
    if (this.form.invalid) {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }
    console.log('Valores del formulario:', this.form.value);
    const task: Task = {
      idsprint: this.form.value.idsprint,
      iduser: this.form.value.iduser,
      title: this.form.value.title,
      taskdescription: this.form.value.taskdescription,
      status: this.form.value.status,
      points: this.form.value.points,
      priority: this.form.value.priority,
    };
    if (this.id == undefined) {
      this._taskService.saveTasks(task).subscribe({
        next: (data) => {
          this.toastr.success(
            'La tarea fue registrada con exito',
            'Tarea registrada',
          );
          this.dialogRef.close(true);
          this.loadTasks();
        },
        error: (e: HttpErrorResponse) => {
          if (e.error.msg) {
            this._errorService.msjError(e);
          } else {
            this.toastr.error('Ups ocurrio un error o no', 'Error');
          }
        },
      });
    } else {
      this._taskService.putTask(this.id, task).subscribe({
        next: (data) => {
          this.toastr.success(
            'La tarea fue actualizada con exito',
            'Tarea actualizada',
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
  }
}
