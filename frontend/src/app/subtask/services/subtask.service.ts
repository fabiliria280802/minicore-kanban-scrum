import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, of } from "rxjs";

import { Subtask } from "../interfaces/subtask.interface";
import { environments } from "../../../environments/environments";

@Injectable({ providedIn: "root" })
export class SubtaskService {
  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) {}

  getSubtasks(): Observable<Subtask[]> {
    return this.http.get<Subtask[]>(`${this.baseUrl}/subtasks`);
  }

  getSubtaskById(id: string): Observable<Subtask | undefined> {
    return this.http
      .get<Subtask>(`${this.baseUrl}/subtasks/${id}`)
      .pipe(catchError((error) => of(undefined)));
  }

  createSubtask(subtask: Subtask): Observable<Subtask> {
    return this.http.post<Subtask>(`${this.baseUrl}/subtasks`, subtask);
  }

  updateSubtask(subtask: Subtask): Observable<Subtask> {
    if (!subtask.id) throw new Error("Subtask id is required");

    return this.http.put<Subtask>(
      `${this.baseUrl}/subtasks/${subtask.id}`,
      subtask,
    );
  }

  deleteSubtaskById(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/subtasks/${id}`).pipe(
      map((resp) => true),
      catchError((err) => of(false)),
    );
  }
}
