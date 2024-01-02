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

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/subtasks';
  }

  getSubtasks(): Observable<Subtask[]> {
    return this.http.get<Subtask[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  saveSubtasks(subtask: Subtask): Observable<any> {
    const headers = new HttpHeaders({
      'authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post<Subtask>(`${this.myAppUrl}${this.myApiUrl}`, subtask, { headers });
  }
}
