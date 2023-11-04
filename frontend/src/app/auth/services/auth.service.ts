import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of, catchError, tap, map } from "rxjs";
import { environments } from "../../../environments/environments";
import { User } from "../interfaces/user.interface";

@Injectable({ providedIn: "root" })
export class AuthService {
  private baseUrl = environments.baseUrl;
  private user?: User;

  constructor(private http: HttpClient) {}

  get currentUser(): User | undefined {
    if (!this.user) return undefined;
    return { ...this.user };
  }

  login(email: string, password: string): Observable<User> {
    return this.http
      .post<User>(`${this.baseUrl}/users/login`, { email, password })
      .pipe(
        tap((user) => (this.user = user)),
        tap((user) => this.storeTokenInLocalStorage(environments.token))
      );
  }

  checkAuthentication(): Observable<boolean> {
    const token = this.retrieveTokenFromLocalStorage();
    if (!token) return of(false);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<User>(`${this.baseUrl}/users/checkAuth`, { headers }).pipe(
      tap((user) => (this.user = user)),
      map((user) => !!user),
      catchError((err) => of(false))
    );
  }

  logout() {
    this.user = undefined;
    this.clearTokenFromLocalStorage();
  }

  private storeTokenInLocalStorage(token: string): void {
    localStorage.setItem(environments.token, token);
  }

  private retrieveTokenFromLocalStorage(): string | null {
    return localStorage.getItem(environments.token);
  }

  private clearTokenFromLocalStorage(): void {
    localStorage.removeItem(environments.token);
  }
}
