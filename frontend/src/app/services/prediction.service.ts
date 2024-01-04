import { Injectable } from '@angular/core';
import { environment } from 'environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { SprintService } from './sprint.service';
import { Prediction } from '../interfaces/prediction.interface';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(
    private http: HttpClient,
    private _sprintService: SprintService
    ) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/predictions';
  }

  getPrediction(id: number): Observable<any> {
    return this.http.get<Prediction>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }

  getPredictions(): Observable<Prediction[]> {
    return this.http.get<Prediction[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  postPrediction(): Observable<any> {
    return this.http.post<Prediction>(`${this.myAppUrl}${this.myApiUrl}`, {});
  }
}
