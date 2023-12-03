import { Injectable } from '@angular/core';
import { environment } from 'environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../interfaces/users.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/users';
  }

  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.myAppUrl);
  }
}
