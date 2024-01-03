import { Injectable } from '@angular/core';
import { environment } from 'environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/tasks';
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getTask(id: number): Observable<any> {
    return this.http.get<Task>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }

  saveTasks(task: Task): Observable<any> {
    return this.http.post<Task>(`${this.myAppUrl}${this.myApiUrl}`, task);
  }

  putTask(id: number, task: Task): Observable<any>{
    return this.http.put<void>(
      `${this.myAppUrl}${this.myApiUrl}/${id}`,task
    );
  }

  deleteTask(id: number):Observable<any>{
    return this.http.delete<void>(
      `${this.myAppUrl}${this.myApiUrl}/${id}`
      );
  }
  getTasksBySprintId(id: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.myAppUrl}${this.myApiUrl}/sprint/${id}`);
  }
}
