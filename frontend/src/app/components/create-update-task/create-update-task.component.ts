//Angular adds
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

//interfaces
import { Task, points, status } from 'src/app/interfaces/task.interface';
import { Sprint } from 'src/app/interfaces/sprint.interface';
import { User } from 'src/app/interfaces/user.interface';

//servicios
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';
import { TaskService } from 'src/app/services/task.service';
import { SprintService } from 'src/app/services/sprint.service';

//TODO: Agregar funcionalidad de esta pestaña (task)
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
  description: string = '';
  status: status = status.todo;
  points: points = points.none;
  assignedUser?: string = '';

  //selects
  users: User[] =[];
  sprints: Sprint[]=[];
  statuses: status[] = [status.todo, status.doing, status.done];
  pointss: points[] = [points.none, points.one, points.three, points.five, points.eight, points.thirteen];

  /*
export interface Task {
  idtask: number;
  idsprint: number;
  title: string;
  description: string;
  status: status;
  points: points;
  assignedUser?: string;
}*/

  constructor(
    public dialogRef:MatDialogRef<CreateUpdateTaskComponent>,
    private _taskService: TaskService,
    private _sprintService: SprintService,
    private _errorService: ErrorService,
    private _userService: UserService,
    private router: Router,
    private toastr: ToastrService,
  ){}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
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

  loadUsers():void{
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

  cancelar(){
    this.dialogRef.close();
  }

  addTask(){
    if (
      this.idsprint == 0 ||
      this.iduser == 0 ||
      this.title == '' ||
      this.title == ' '||
      this.description == '' ||
      this.description == ' ' ||
      this.assignedUser == ''
    ) {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }
    const task: Task = {
      iduser: this.iduser,
      idsprint: this.idsprint,
      title: this.title,
      description: this.description,
      points: this.points,
      status: this.status,
      assignedUser: this.assignedUser,
    };
    this._taskService.saveTasks(task).subscribe({
      next: (data) => {
        this.toastr.success(
          'La tarea fue registrada con exito',
          'Tarea registrada',
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
}
