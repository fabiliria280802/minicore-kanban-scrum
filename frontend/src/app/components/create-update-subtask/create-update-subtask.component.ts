//Angular adds
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

//interfaces
import { Task } from 'src/app/interfaces/task.interface';
import { User } from 'src/app/interfaces/user.interface';
import { Subtask, subtaskstatus } from 'src/app/interfaces/subtask.interface';

//services
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
  iduser: number = 0;
  idtask: number = 0;
  title: string = '';
  subtaskdescription: string = '';
  subtaskstatus: subtaskstatus = subtaskstatus.todo;
  subtaskstatuses: subtaskstatus[] = [subtaskstatus.todo, subtaskstatus.doing, subtaskstatus.done];

  //nombre pestaña
  operation: string = '';

  //llamada a la otra pagina
  id: number | undefined;

  //selects
  tasks: Task[] = [];
  users: User[] =[];

  //reactiveform
  form: FormGroup;

  constructor(
    public dialogRef:MatDialogRef<CreateUpdateSubtaskComponent>,
    private _taskService: TaskService,
    private _errorService: ErrorService,
    private _userService: UserService,
    private _subtaskService: SubtaskService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private fb: FormBuilder,
    ){
      this.form =this.fb.group({
          idtask:[''],
          iduser:[''],
          title:[''],
          subtaskdescription:[''],
          subtaskstatus:[''],
      });
      this.id = data.id;
    }

  ngOnInit(): void {
    this.loadTasks();
    this.loadUsers();
    this.isEdit(this.id);
  }

  isEdit(id: number | undefined){
    if (id != undefined) {
      this.operation = 'Editar';
    } else {
      this.operation = 'Agregar';
    }
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
  getSubtask(id: number){
    this._subtaskService.getSubtask(id).subscribe(data => {
      console.log(data);
      this.form.setValue({
        idsprint: data.idsprint,
        iduser: data.iduser,
        title: data.title,
        subtaskdescription: data.subtaskdescription,
        subtaskstatus: data.subtaskstatus,
      });
    })
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

  addEditSubtask(){
    if (this.form.invalid) {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }
    const subtask: Subtask = {
      iduser: this.iduser,
      idtask: this.idtask,
      title: this.title,
      subtaskdescription: this.subtaskdescription,
      subtaskstatus: this.subtaskstatus,
    };
    this._subtaskService.saveSubtasks(subtask).subscribe({
      next: (data) => {
        this.toastr.success(
          'La subtarea fue registrada con exito',
          'Subtarea registrada',
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
