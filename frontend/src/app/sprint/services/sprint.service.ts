import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, of } from "rxjs";

import { Sprint, Task } from "../interfaces/sprint.interface";
import { environments } from "../../../environments/environments";

@Injectable({ providedIn: "root" })
export class SprintService {
  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) {}

  getSprints(): Observable<Sprint[]> {
    return this.http.get<Sprint[]>(`${this.baseUrl}/sprints`);
  }

  getSprintById(id: string): Observable<Sprint | undefined> {
    return this.http
      .get<Sprint>(`${this.baseUrl}/sprints/${id}`)
      .pipe(catchError((error) => of(undefined)));
  }

  createSprint(sprint: Sprint): Observable<Sprint> {
    return this.http.post<Sprint>(`${this.baseUrl}/sprints`, sprint);
  }

  updateSprint(sprint: Sprint): Observable<Sprint> {
    if (!sprint.id) throw new Error("Sprint id is required");

    return this.http.put<Sprint>(
      `${this.baseUrl}/sprints/${sprint.id}`,
      sprint,
    );
  }

  getTasksBySprintId(id: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/sprints/${id}/tasks`);
  }

  updateSprintStartDate(id: string, startDate: string): Observable<Sprint> {
    return this.http.patch<Sprint>(`${this.baseUrl}/sprints/${id}`, {
      initialDate: startDate,
    });
  }

  updateSprintEndDate(id: string, endDate: string): Observable<Sprint> {
    return this.http.patch<Sprint>(`${this.baseUrl}/sprints/${id}`, {
      finalDate: endDate,
    });
  }
}
