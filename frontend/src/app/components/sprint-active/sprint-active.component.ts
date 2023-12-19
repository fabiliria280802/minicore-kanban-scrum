// sprint-active.component.ts
import { Component, OnInit } from '@angular/core';
import { Sprint } from './../../interfaces/sprint.interface';
import { Subtask, subtaskstatus } from './../../interfaces/subtask.interface';
import { Task, status } from './../../interfaces/task.interface';
import { SubtaskService } from 'src/app/services/subtask.service';
import { TaskService } from 'src/app/services/task.service';
import { SprintService } from 'src/app/services/sprint.service';

//TODO: AQUI HAY ALGO MAL EN LA DIRECCION PORQUE EXISTE UN CARPETA FRONTEND/SRC/APP/INTERFACE

@Component({
  selector: 'app-sprint-active',
  templateUrl: './sprint-active.component.html',
  styleUrls: ['./sprint-active.component.css'],
})
export class SprintActiveComponent implements OnInit {
  sprints: Sprint[] = [];
  tasks: Task[] = [];
  subtasks: Subtask[] = [];

  constructor(
    private taskService: TaskService,
    private sprintService: SprintService,
    private subtaskService: SubtaskService,
  ) {}

  ngOnInit(): void {
    this.loadSprints();
    this.loadTasks();
    this.loadSubtasks();
  }

  loadSprints(): void {
    this.sprintService.getSprints().subscribe((data: Sprint[]) => {
      this.sprints = data;
    });
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((data: Task[]) => {
      this.tasks = data;
    });
  }

  loadSubtasks(): void {
    this.subtaskService.getSubtasks().subscribe((data: Subtask[]) => {
      this.subtasks = data;
    });
  }

  getSubtasksForTask(taskId: number): Subtask[] {
    return this.subtasks.filter((subtask) => subtask.idtask === taskId);
  }
}
