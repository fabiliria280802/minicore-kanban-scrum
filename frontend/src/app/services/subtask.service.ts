import { Injectable } from '@angular/core';
import { environment } from 'environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subtask } from '../interfaces/subtask.interface';

@Injectable({
  providedIn: 'root',
})
export class SubtaskService {
  private myAppUrl: string;
  private myApiUrl: string;
  private subtasks: Subtask[] = [];

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/subtasks';
  }

  getSubtask(id: number): Observable<any> {
    return this.http.get<Subtask>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }

  hasSubtasks(idtask: number): boolean {
    return this.subtasks.some((subtask) => subtask.id === idtask);
  }
  getSubtasks(): Observable<Subtask[]> {
    return this.http.get<Subtask[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  saveSubtasks(subtask: Subtask): Observable<any> {
    const headers = new HttpHeaders({
      authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post<Subtask>(
      `${this.myAppUrl}${this.myApiUrl}`,
      subtask,
      { headers },
    );
  }

  putSubtask(id: number, subtask: Subtask): Observable<any> {
    return this.http.put<void>(
      `${this.myAppUrl}${this.myApiUrl}/${id}`,
      subtask,
    );
  }

  deleteSubtask(id: number): Observable<any> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }

  //adicional
  loadSubtasks(): void {
    this.getSubtasks().subscribe(
      (data: Subtask[]) => {
        this.subtasks = data;
      },
      (error) => {
        console.error('Error loading subtasks:', error);
      },
    );
  }
}
