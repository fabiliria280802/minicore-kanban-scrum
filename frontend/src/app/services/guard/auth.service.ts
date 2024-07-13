import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token1');
  }

  setToken(token: string) {
    localStorage.setItem('auth_token1', token);
  }

  logout() {
    localStorage.removeItem('auth_token1');
  }
}


