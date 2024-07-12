import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  encrypt(data: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/encrypt`, { data });
  }

  decrypt(data: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/decrypt`, { data });
  }
}
