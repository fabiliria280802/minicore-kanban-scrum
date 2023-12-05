// sprint-active.component.ts
import { Component, OnInit } from '@angular/core';

//TODO: AQUI HAY ALGO MAL EN LA DIRECCION PORQUE EXISTE UN CARPETA FRONTEND/SRC/APP/INTERFACE
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/interfaces/task.interface';

@Component({
  selector: 'app-sprint-active',
  templateUrl: './sprint-active.component.html',
  styleUrls: ['./sprint-active.component.css']
})
export class SprintActiveComponent implements OnInit {
  statuses: string[] = ['To Do', 'In Progress', 'Done'];
  tasks: { [status: string]: Task[] } = {
    'To Do': [],
    'In Progress': [],
    'Done': []
  };

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((allTasks: Task[]) => {
      // Reset tasks object
      this.tasks = { 'To Do': [], 'In Progress': [], 'Done': [] };

      // Sort tasks into their respective statuses
      allTasks.forEach(task => {
        if (this.tasks[task.status]) {
          this.tasks[task.status].push(task);
        } else {
          // Handle case where status does not match any known status
          console.error('Unknown status:', task.status);
        }
      });
    });
  }
}



