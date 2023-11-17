import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Task, points, status } from 'src/app/interfaces/task.interface';
import { CreateUpdateTaskComponent } from '../create-update-task/create-update-task.component';

const listTask: Task[] =[
  {
    title: "string",
    description: "string",
    status: status.doing,
    points: points.one,
    assignedUser: "string"},
];

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['title','description','status','points','assignedUser','acciones'];
  dataSource: MatTableDataSource<Task>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dialog: MatDialog){
    this.dataSource = new MatTableDataSource(listTask);
  }

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    (this.paginator as MatPaginator)._intl.itemsPerPageLabel = "Items por pagina";
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  addEditTask(){
    const dialogRef = this.dialog.open(CreateUpdateTaskComponent, {
      width:'550px',
      disableClose: true,
    });
  }
}
