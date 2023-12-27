import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Task } from 'src/app/interfaces/task.interface';
import { User } from 'src/app/interfaces/user.interface';
import { Subtask, subtaskstatus } from 'src/app/interfaces/subtask.interface';
import { ErrorService } from 'src/app/services/error.service';
import { SubtaskService } from 'src/app/services/subtask.service';
import { UserService } from 'src/app/services/user.service';
import { TaskService } from 'src/app/services/task.service';

//TODO: Agregar funcionalidad de esta pestaña (subtask)
@Component({
  selector: 'app-create-update-subtask',
  templateUrl: './create-update-subtask.component.html',
  styleUrls: ['./create-update-subtask.component.css'],
})
export class CreateUpdateSubtaskComponent implements OnInit{
  //atributos
  idsubtask: number = 0;
  idtask: number = 0;
  title: string = '';
  description: string = '';
  assignedUser?: string = '';
  subtaskstatus: subtaskstatus = subtaskstatus.todo;
  subtaskstatuses: subtaskstatus[] = [subtaskstatus.todo, subtaskstatus.doing, subtaskstatus.done];
  //selects
  tasks: Task[] = [];
  users: User[] =[];

  constructor(
    public dialogRef:MatDialogRef<CreateUpdateSubtaskComponent>,
    private _taskService: TaskService,
    private _errorService: ErrorService,
    private _userService: UserService,
    private _subtaskService: SubtaskService,
    private router: Router,
    private toastr: ToastrService,
    ){}

  ngOnInit(): void {
    this.loadTasks();
    this.loadUsers();
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

  addSubtask(){
    if (
      this.idsubtask == 0 ||
      this.idtask == 0 ||
      this.title == '' ||
      this.title == ' '||
      this.description == '' ||
      this.description == ' ' ||
      this.assignedUser == ''
    ) {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }
    const subtask: Subtask = {
      idsubtask: this.idsubtask,
      idtask: this.idtask,
      title: this.title,
      description: this.description,
      subtaskstatus: this.subtaskstatus,
      assignedUser: this.assignedUser,
    };
    this._subtaskService.saveSubtasks(subtask).subscribe({
      next: (data) => {
        this.toastr.success(
          'La subtarea fue registrada con exito',
          'Subtarea registrada',
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
