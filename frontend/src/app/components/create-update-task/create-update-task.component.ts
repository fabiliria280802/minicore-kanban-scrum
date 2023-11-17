import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Task, points, status } from 'src/app/interfaces/task.interface';
@Component({
  selector: 'app-create-update-task',
  templateUrl: './create-update-task.component.html',
  styleUrls: ['./create-update-task.component.css']
})
export class CreateUpdateTaskComponent implements OnInit {
  pointOptions: {value: points, viewValue: string}[] = [];
  selectedValuePoints: points = points.one;

  statusOptions: { value: status, viewValue: string}[] = []; // Debe ser un array
  selectedValueStatus: status = status.todo;

  constructor(public dialogRef: MatDialogRef<CreateUpdateTaskComponent>){
    Object.entries(points).forEach(([key, value]) => {
      if (!isNaN(Number(value))) {
        this.pointOptions.push({ value: value as points, viewValue: key });
      }
    });
    Object.entries(status).forEach(([key, value]) => {
      if (isNaN(Number(key))) {
        this.statusOptions.push({ value: value as status, viewValue: key });
      }
    });
  }
  ngOnInit(): void {}
  cancelar(){

  }
}
