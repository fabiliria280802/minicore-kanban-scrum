import { environment } from 'environments/environments';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Sprint } from '../interfaces/sprint.interface';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root',
})
export class SprintService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(
    private http: HttpClient,
    private _taskService: TaskService,
  ) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/sprints';
  }
  getSprint(id: number): Observable<any> {
    return this.http.get<Sprint>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }

  getSprints(): Observable<Sprint[]> {
    return this.http.get<Sprint[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  saveSprints(sprint: Sprint): Observable<any> {
    return this.http.post<Sprint>(`${this.myAppUrl}${this.myApiUrl}`, sprint);
  }

  /*saveSprints(sprint: Sprint): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'authorization': `Bearer ${token}`
    });
    return this.http.post<Sprint>(`${this.myAppUrl}${this.myApiUrl}`, sprint, { headers });
  }*/

  putSprints(id: number, sprint: Sprint): Observable<any> {
    return this.http.put<void>(
      `${this.myAppUrl}${this.myApiUrl}/${id}`,
      sprint,
    );
  }

  deleteSprint(id: number): Observable<any> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }
  predict() {
    return this.http.post(`${this.myAppUrl}predictions`, {});
  }
}
