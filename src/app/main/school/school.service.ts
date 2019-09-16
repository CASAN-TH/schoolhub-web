import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  jwt: JwtHelperService = new JwtHelperService();
  private authorizationHeader() {
    const token = window.localStorage.getItem(`token@${environment.appName}`);
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return headers;
  }

  constructor(private httpClient: HttpClient) { }

  addSchool(data) {

    return new Promise((resolve, reject) => {
      this.httpClient.post(environment.apiUrl + "/api/schools", data, { headers: this.authorizationHeader() }).subscribe((response: any) => {
        this.httpClient.get(environment.apiUrl + "/api/auth/refreshToken", { headers: this.authorizationHeader() }).subscribe((res: any) => {
          window.localStorage.setItem(`token@${environment.appName}`, res.token);
          const user = res.token ? this.jwt.decodeToken(res.token) : null;
          if (user) {
            window.localStorage.setItem(`token@${environment.appName}-school`, user.ref1);
          }
          resolve(response);
        }, reject);
      }, reject);
    }
    );
  }
}
