import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-update-task',
  templateUrl: './create-update-task.component.html',
  styleUrls: ['./create-update-task.component.css']
})
export class CreateUpdateTaskComponent {
  constructor(public dialogRef: MatDialogRef<CreateUpdateTaskComponent>){
  }
  ngOnInit(): void {}
  cancelar(){
    
  }
}
