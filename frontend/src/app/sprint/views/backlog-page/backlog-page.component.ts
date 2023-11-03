import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { SprintService } from '../../services/sprint.service';
import { Sprint, Task } from '../../interfaces/sprint.interface';

@Component({
  selector: 'app-backlog-page',
  templateUrl: './backlog-page.component.html',
  styleUrls: ['./backlog-page.component.css'],
})
export class BacklogPageComponent implements OnInit {
  public sprint?: Sprint;
  public tasks: Task[] = [];

  constructor(
    private sprintService: SprintService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.sprintService.getSprintById(id))
      )
      .subscribe((sprint) => {
        if (!sprint) return this.router.navigate(['/sprints/list']);

        this.sprint = sprint;
        this.getTasksForSprint(sprint.id);
      });
  }

  getTasksForSprint(sprintId: number): void {
    this.sprintService.getTasksBySprintId(sprintId.toString()).subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  goBack(): void {
    this.router.navigateByUrl('sprints/list');
  }
}
