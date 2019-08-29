import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {
  jwt: JwtHelperService = new JwtHelperService();
  token: any;
  user: any;
  onUserDataChanged: BehaviorSubject<any>;

  constructor(
    private http: HttpClient
  ) {
    
    this.onUserDataChanged = new BehaviorSubject({});
    this.token = window.localStorage.getItem(`token@${environment.appName}`);
    this.user = this.token ? this.jwt.decodeToken(this.token) : null;
    if (this.user && this.user != null) {
      this.onUserDataChanged.next(this.user);
    }


  }

  login(data: any): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.post(`${environment.apiUrl}/api/auth/signin`, data).subscribe((res: any) => {
        window.localStorage.setItem(`token@${environment.appName}`, res.token);
        this.token = window.localStorage.getItem(`token@${environment.appName}`);
        this.user = this.token ? this.jwt.decodeToken(this.token) : null;
        this.onUserDataChanged.next(this.user);
        resolve(this.user);
      }, reject);
    });

  }

  register(data: any): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.post(`${environment.apiUrl}/api/auth/signup`, data).subscribe((res: any) => {
        window.localStorage.setItem(`token@${environment.appName}`, res.token);
        this.token = window.localStorage.getItem(`token@${environment.appName}`);
        this.user = this.token ? this.jwt.decodeToken(this.token) : null;
        this.onUserDataChanged.next(this.user);
        resolve(this.user);
      }, reject);
    });

  }

  logout(): Promise<any> {

    return new Promise((resolve, reject) => {
      window.localStorage.removeItem(`token@${environment.appName}`);
      this.token = window.localStorage.getItem(`token@${environment.appName}`);
      this.user = this.token ? this.jwt.decodeToken(this.token) : null;
      this.onUserDataChanged.next(this.user);
      resolve(this.user);
    });
  }
}
