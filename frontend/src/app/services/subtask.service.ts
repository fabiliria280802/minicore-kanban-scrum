import { Injectable } from '@angular/core';
import { environment } from 'environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subtask } from '../interfaces/subtask.interface';

@Injectable({
  providedIn: 'root'
})
export class SubtaskService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/subtasks'
  }

  getSubtasks(): Observable<Subtask[]>{
    return this.http.get<Subtask[]>(this.myAppUrl);
  }
}
