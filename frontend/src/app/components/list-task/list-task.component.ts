//Angular adds
import { Component, OnInit, ViewChild, AfterViewInit, Input,} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

//interfaces
import { Task, points, status } from '../../interfaces/task.interface';

//services
import { TaskService } from '../../services/task.service';

//calling components
import { CreateUpdateTaskComponent } from '../create-update-task/create-update-task.component';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css'],
})
export class ListTaskComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'N° Sprint',
    'N° Task',
    'title',
    'description',
    'status',
    'points',
    'assignedUser',
    'tools',
  ];
  /*
  @Input() set tasks(value: Task[]) {
    this.dataSource = new MatTableDataSource<Task>(value);
    if (this.matPaginator) {
      this.dataSource.paginator = this.matPaginator;
    }
  }*/
  dataSource = new MatTableDataSource<Task>();
/*
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.dataSource.paginator = mp;
  }*/

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private _taskService: TaskService,
  ) {
    this.dataSource = new MatTableDataSource();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.getTasks();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    /*
    if (this.matPaginator) {
      this.dataSource.paginator = this.matPaginator;
      this.dataSource.sort = this.sort;
    }*/
  }

  getTasks(): void {
    this._taskService.getTasks().subscribe(
      data => {
        console.log(data);
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      })
  }

  addEditTask() {
    const dialogRef = this.dialog.open(CreateUpdateTaskComponent, {
      width: '550px',
      disableClose: true,
      //data:{},
    });
    dialogRef.afterClosed().subscribe(result=>{
      console.log('hell no');
    });
  }


}
