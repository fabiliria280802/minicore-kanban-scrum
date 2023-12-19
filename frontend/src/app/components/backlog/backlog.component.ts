import { Component, OnInit } from '@angular/core';
import { Sprint } from './../../interfaces/sprint.interface';
import { Task } from './../../interfaces/task.interface';
import { TaskService } from 'src/app/services/task.service';
import { SprintService } from 'src/app/services/sprint.service';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css'],
})
export class BacklogComponent implements OnInit {
  sprints: Sprint[] = [];
  tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private sprintService: SprintService,
  ) {}

  ngOnInit(): void {
    this.loadSprints();
    this.loadTasks();
  }

  loadSprints(): void {
    this.sprintService.getSprints().subscribe(
      (data: Sprint[]) => {
        this.sprints = data;
      },
      (error) => {
        console.error('Error loading sprints:', error);
      },
    );
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(
      (data: Task[]) => {
        this.tasks = data;
      },
      (error) => {
        console.error('Error loading tasks:', error);
      },
    );
  }

  //calculo de puntos del sprint estos se calculan con los puntos de la tareas
}
