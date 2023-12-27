import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Task, points, status } from 'src/app/interfaces/task.interface';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';
import { TaskService } from 'src/app/services/task.service';
import { User } from 'src/app/interfaces/user.interface';
import { Router } from '@angular/router';
//TODO: Agregar funcionalidad de esta pestaña (task)
@Component({
  selector: 'app-create-update-task',
  templateUrl: './create-update-task.component.html',
  styleUrls: ['./create-update-task.component.css'],
})
export class CreateUpdateTaskComponent implements OnInit {
  users: User[] =[];
  constructor(
    public dialogRef:MatDialogRef<CreateUpdateTaskComponent>,
    private _taskService: TaskService,
    private _errorService: ErrorService,
    private _userService: UserService,
    private router: Router,
    private toastr: ToastrService,
  ){}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  cancelar(){
    this.dialogRef.close();
  }
}
