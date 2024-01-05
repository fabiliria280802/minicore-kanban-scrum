import { Injectable } from '@angular/core';
import { environment } from 'environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginPayload, User } from '../interfaces/user.interface';

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

  signIn(user: User): Observable<any> {
    return this.http.post<User>(
      `${this.myAppUrl}${this.myApiUrl}/signIn`,
      user,
    );
  }

  login(user: LoginPayload): Observable<any> {
    return this.http.post<LoginPayload>(
      `${this.myAppUrl}${this.myApiUrl}/login`,
      user,
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getUser(id: number): Observable<any> {
    return this.http.get<User>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }

  deleteUsers(id: number): Observable<any> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }

  putUsers(id: number, user: User): Observable<any> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`, user);
  }
}
