//Angular adds
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

//intrerfaces
import { User } from './../../interfaces/user.interface';
import { Sprint } from './../../interfaces/sprint.interface';
import { Task } from './../../interfaces/task.interface';
import { Subtask } from './../../interfaces/subtask.interface';

//services
import { SubtaskService } from 'src/app/services/subtask.service';
import { UserService } from 'src/app/services/user.service';
import { TaskService } from 'src/app/services/task.service';
import { SprintService } from 'src/app/services/sprint.service';

//calling components
import { CreateUpdateTaskComponent } from '../create-update-task/create-update-task.component';
import { SidebarInsightComponent } from '../../shared/sidebar-insight/sidebar-insight.component';
import { UserInsightComponent } from '../../shared/user-insight/user-insight.component';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css'],
})
export class BacklogComponent implements OnInit {
  sprints: Sprint[] = [];
  tasks: Task[] = [];
  users: User[] = [];
  subtasks: Subtask[] = [];
  expandedTasks: { [taskId: number]: boolean } = {};
  completedSprintsCount: { [sprintId: number]: number } = {};

  constructor(
    private dialog: MatDialog,
    private _subtaskService: SubtaskService,
    private _taskService: TaskService,
    private _sprintService: SprintService,
    private _userService: UserService,
    private toastr: ToastrService,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadUsers();
    this.loadSprints();
    this.loadTasks();
    this.loadTask();
    this.loadSubtask();
    this._subtaskService.loadSubtasks();
  }
  getAssignedFullName(id: number): string {
    const user = this.users.find((user) => user.id === id);
    return user ? user.fullname : 'No asignado';
  }

  async loadUsers(): Promise<void> {
    try {
      const data: User[] | undefined = await this._userService.getUsers().toPromise();
      this.users = data || []; // Asignar un arreglo vacío si data es undefined
    } catch (error) {
      console.error('Error loading users:', error);
    }
  }


  loadSprints(): void {
    this._sprintService.getSprints().subscribe((data: Sprint[]) => {
      console.log('Sprints loaded:', data); // Agregar para depuración
      this.sprints = data;
      this.sprints.forEach((sprint, index, sprintArray) => {
        // Cuenta cuántos sprints anteriores tienen estado "Completado".
        const completedBeforeThis = sprintArray
          .slice(0, index)
          .filter((s) => s.sprintstatus === 'Completado').length;
        this.completedSprintsCount[sprint.id ?? 0] = completedBeforeThis;
      });
    });
  }

  loadSubtask(): void {
    this._subtaskService.getSubtasks().subscribe((data: Subtask[]) => {
      console.log('Subtask loaded:', data); // Agregar para depuración
      this.subtasks = data;
    });
  }

  loadTask(): void {
    this._taskService.getTasks().subscribe((data: Task[]) => {
      console.log('Task loaded:', data); // Agregar para depuración
      this.tasks = data;
    });
  }
  loadTasks(): void {
    this._taskService.getTasks().subscribe(
      (data: Task[]) => {
        this.tasks = data.map((task) => ({
          ...task,
          assignedFullName: this.getAssignedFullName(task.iduser),
        }));
      },
      (error) => {
        console.error('Error loading tasks:', error);
      },
    );
  }
  hasSubtasks(id: number): boolean {
    if (typeof id === 'number') {
      return this._taskService.hasSubtasks(id);
    } else {
      return false;
    }
  }
  addEditTask(id?: number) {
    const dialogRef = this.dialog.open(CreateUpdateTaskComponent, {
      width: '550px',
      disableClose: true,
      data: { id: id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadTasks();
        this.loadSprints();
        this.loadTask();
        this.loadSubtask();
      }
    });
  }
  deleteTask(id: number) {
    this._taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
      this.toastr.success('Se borro exitosamente el usuario', 'Eliminación');
    });
  }
  toggleTaskExpansion(taskId: number): void {
    this.expandedTasks[taskId] = !this.expandedTasks[taskId];
  }
  getClassByTaskStatus(status: string): string {
    if (status === 'Finalizada') {
      return 'task-finalizada';
    } else if (status === 'Avanzada') {
      return 'task-avanzada';
    } else if (status === 'Por hacer') {
      return 'task-por-hacer';
    } else {
      return '';
    }
  }
  getClassBySubtaskStatus(status: string): string {
    if (status === 'Finalizada') {
      return 'subtask-finalizada';
    } else if (status === 'Avanzada') {
      return 'subtask-avanzada';
    } else if (status === 'Por hacer') {
      return 'subtask-por-hacer';
    } else {
      return '';
    }
  }

  //TODO:Styles css status sprint
  getClassBySprintStatus(status: string): string {
    if (status === 'Completado') {
      return 'sprint-sprintstatus';
    } else if (status === 'Iniciado') {
      return 'subtask-avanzada';
    } else if (status === null || status === '') {
      return '';
    } else {
      return '';
    }
  }
  getClassBySprintStatusShow(status: string): boolean {
    return status === 'Iniciado' || status === null || status === '';
  }
  callSideMove(sprintId: number): boolean {
    return this.completedSprintsCount[sprintId] >= 5;
  }
  openSidebarInsight(sprintId: number): void {
    if (this.callSideMove(sprintId)) {
      const dialogRef = this.dialog.open(SidebarInsightComponent, {
        width: '610px',
        disableClose: true,
        data: { sprintId: sprintId },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.loadTasks();
        }
      });
    }
  }
  openUserInsight(sprintId: number): void {
    const dialogRef = this.dialog.open(UserInsightComponent, {
        width: '610px',
        disableClose: true,
        data: { sprintId: sprintId },
    });
    dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.loadTasks();
        }
    });
  }
}
