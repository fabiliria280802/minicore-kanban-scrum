import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Task } from 'src/app/interfaces/task.interface';
import { ErrorService } from 'src/app/services/error.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-user-insight',
  templateUrl: './user-insight.component.html',
  styleUrls: ['./user-insight.component.css']
})
export class UserInsightComponent implements OnInit, OnDestroy{
  tasks: Task[] = [];
  displayedColumns: string[] = ['Nombre','Tiempo esperado', 'Tiempo hecho', 'Conclusión'];
  constructor(
    public dialogRef: MatDialogRef<UserInsightComponent>,
    private toastr: ToastrService,
    private http: HttpClient,
    private router: Router,
    private _errorService: ErrorService,
    private _taskService: TaskService,
    //@Inject(MAT_DIALOG_DATA) public data: any,
  ){

  }
  ngOnInit(){
    this._taskService.getTasks().subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
      },
      error => {
        this.toastr.error('Hubo un error al obtener las tareas');
      }
    );
  }
  ngOnDestroy(): void {
    this._taskService.getTasks().subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
      },
      error => {
        this.toastr.error('Hubo un error al obtener las tareas');
      }
    );
  }
  cancelar() {
    this.dialogRef.close();
  }
}
