import { Component, OnInit } from '@angular/core';
import { Sprint } from './../../interfaces/sprint.interface';
import { Task } from './../../interfaces/task.interface';
import { TaskService } from 'src/app/services/task.service';
import { SprintService } from 'src/app/services/sprint.service';

import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css'],
})
export class BacklogComponent implements OnInit {
  sprints: Sprint[] = [];
  tasks: Task[] = [];
  users: User[] =[];
  asiningName: string = '';
  constructor(
    private _taskService: TaskService,
    private _sprintService: SprintService,
    private _userService:UserService
  ) {}

  ngOnInit(): void {
    this.loadSprints();
    this.loadTasks();
    this.loadUsers();
  }

  loadUsers(): void {
    this._userService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
      },
      (error) => {
        console.error('Error loading users:', error);
      },
    );
  }

  loadSprints(): void {
    this._sprintService.getSprints().subscribe(
      (data: Sprint[]) => {
        this.sprints = data;
      },
      (error) => {
        console.error('Error loading sprints:', error);
      },
    );
  }

  loadTasks(): void {
    this._taskService.getTasks().subscribe(
      (data: Task[]) => {
        this.tasks = data;
      },
      (error) => {
        console.error('Error loading tasks:', error);
      },
    );
  }

  updateSprintCommittedPoints(idsprint: number): void {
    this._sprintService.calculateCommittedPoints(idsprint).subscribe(
      updatedSprint => {
        const index = this.sprints.findIndex(s => s.idsprint === idsprint);
        if (index !== -1) {
          this.sprints[index] = updatedSprint;
        }
      },
      error => console.error('Error updating committed points:', error)
    );
  }
}
