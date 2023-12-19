import { Component, OnInit } from '@angular/core';
import { Sprint } from './../../interfaces/sprint.interface';
import { Subtask, subtaskstatus } from './../../interfaces/subtask.interface';
import { Task, status } from './../../interfaces/task.interface';
import { SubtaskService } from 'src/app/services/subtask.service';
import { TaskService } from 'src/app/services/task.service';
import { SprintService } from 'src/app/services/sprint.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private sprintService: SprintService,
  ) {}

  ngOnInit(): void {}
}
