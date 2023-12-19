import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  Input,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TaskService } from '../../services/task.service';
import { Task, status } from '../../interfaces/task.interface';
import { CreateUpdateTaskComponent } from '../create-update-task/create-update-task.component';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css'],
})
export class ListTaskComponent implements OnInit, AfterViewInit {
  statuses: any;
  @Input() set tasks(value: Task[]) {
    // Use a setter to respond to input changes
    this.dataSource = new MatTableDataSource<Task>(value);
    if (this.matPaginator) {
      // If paginator is already set, attach it to the new data source
      this.dataSource.paginator = this.matPaginator;
    }
  }
  dataSource = new MatTableDataSource<Task>(); // Initialize dataSource

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    // Use a setter for the paginator
    this.dataSource.paginator = mp; // Assign the paginator once it's available
  }

  constructor(
    private dialog: MatDialog,
    private taskService: TaskService, // Assuming this service exists
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  ngAfterViewInit(): void {
    if (this.matPaginator) {
      this.dataSource.paginator = this.matPaginator;
    }
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(
      (tasks) => {
        this.dataSource.data = tasks; // Assuming 'tasks' is an array of Task
      },
      (error) => {
        console.error('Error fetching tasks', error);
      },
    );
  }

  openCreateUpdateDialog(task?: Task): void {
    const dialogRef = this.dialog.open(CreateUpdateTaskComponent, {
      width: '250px',
      data: task ? task : { title: '', status: status.todo, points: 0 }, // Pass existing task or empty for new
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadTasks(); // Reload tasks after closing the dialog
      }
    });
  }

  // Additional methods for handling task actions (delete, update, etc.) go here...
}
