import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, of } from "rxjs";

import { Task, Subtask } from "../interfaces/task.interface";
import { environments } from "../../../environments/environments";

@Injectable({ providedIn: "root" })
export class TaskService {
  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/tasks`);
  }

  getTaskById(id: string): Observable<Task | undefined> {
    return this.http
      .get<Task>(`${this.baseUrl}/tasks/${id}`)
      .pipe(catchError((error) => of(undefined)));
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/tasks`, task);
  }

  updateTask(task: Task): Observable<Task> {
    if (!task.id) throw new Error("Task id is required");

    return this.http.put<Task>(`${this.baseUrl}/tasks/${task.id}`, task);
  }

  getSubtasksByTaskId(id: string): Observable<Subtask[]> {
    return this.http.get<Subtask[]>(`${this.baseUrl}/tasks/${id}/subtasks`);
  }

  deleteTaskById(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/tasks/${id}`).pipe(
      map((resp) => true),
      catchError((err) => of(false)),
    );
  }
}
