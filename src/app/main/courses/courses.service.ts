import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { resolve } from 'url';
import { reject } from 'q';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  onCoursesChanged : BehaviorSubject<any>;

  constructor(
    private http: HttpClient
  ) {
    this.onCoursesChanged = new BehaviorSubject([]);
   }
  private authorizationHeader(){
    const token = window.localStorage.getItem(`token@${environment.appName}`);
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return headers;
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    this.getCouresList()
  }

  getCouresList(): Promise <any>{
    return new Promise((resolve,reject) =>{
      this.http.get(environment.apiUrl + '/api/courses', { headers: this.authorizationHeader() }).subscribe((res: any) => {
        this.onCoursesChanged.next(res.data);
      })
    })
  }
}
