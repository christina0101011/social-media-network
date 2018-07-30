import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';
import { TokenPayload, Photos, Likes, Comments, Description, BlogType, Theme, Blog, Passwords } from './Models';
import { User } from './Models';

interface TokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private token: string;

  constructor(private http: HttpClient, private router: Router) {}

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  public getUserDetails(): User {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public register(user: TokenPayload): Observable<any> {
    return this.http.post(`/api/register`, user).pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );
  }

  public login(user: TokenPayload): Observable<any> {
    return this.http.post('/api/login', user).pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );
  }

  public profile(): Observable<any> {
    return this.http.get('/api/profile', { headers: { Authorization: `Bearer ${this.getToken()}` }}).pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );
  }

  public updateUser(user: User): Observable<any> {
    return this.http.put('/api/update', user, { headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );
  }

  public updatePassword(passwords: Passwords): Observable<any> {
    return this.http.put('/api/password', passwords, { headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );
  }

  public deleteAccount(user: User): Observable<any> {
    return this.http.delete('/api/delete', { headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/');
  }
}
