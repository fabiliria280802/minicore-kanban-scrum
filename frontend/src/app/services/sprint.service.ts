import { Injectable } from '@angular/core';
import { environment } from 'environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sprint } from '../interfaces/sprint.interface';

@Injectable({
  providedIn: 'root'
})
export class SprintService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/Sprints'
  }

  getSprints(): Observable<Sprint[]>{
    return this.http.get<Sprint[]>(this.myAppUrl);
  }
}