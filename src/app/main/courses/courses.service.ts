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

  onCoursesChanged: BehaviorSubject<any>;
  onCourseChanged: BehaviorSubject<any>;
  routeParams: any;

  constructor(
    private http: HttpClient
  ) {
    this.onCoursesChanged = new BehaviorSubject([]);
    this.onCourseChanged = new BehaviorSubject([]);
  }
  private authorizationHeader() {
    const token = window.localStorage.getItem(`token@${environment.appName}`);
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return headers;
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;
    if (this.routeParams.actiontype === 'new') {
      let yearfrom = parseInt(this.routeParams.year) - 1;
      let bodyyear = {
        from: yearfrom.toString(),
        to: this.routeParams.year
      }
      this.cloneCourseYear(bodyyear);
    } else if (this.routeParams.actiontype === 'read') {
      this.getCourseYear(this.routeParams.year);
    }
    this.getCouresList()
  }

  getCouresList(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiUrl + '/api/courses', { headers: this.authorizationHeader() }).subscribe((res: any) => {
        this.onCoursesChanged.next(res.data);
      })
    })
  }

  getCourseYear(year): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiUrl + '/api/courses/year/' + year, { headers: this.authorizationHeader() }).subscribe((res: any) => {
        this.onCourseChanged.next(res.data);
      })
    })
  }

  cloneCourseYear(year): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(environment.apiUrl + "/api/courses/clone/" + year.from + "/" + year.to, null, { headers: this.authorizationHeader() }).subscribe((res: any) => {
        this.onCoursesChanged.next(res.data);
      })
    });
  }

  courseSubjectEdit(data): Promise<any>{
    return new Promise((resolve, reject) =>{
      console.log(data);
      this.http.put(environment.apiUrl + "/api/courses/" + data._id, data, { headers: this.authorizationHeader() }).subscribe((res: any) =>{
        console.log(res)
        this.getCourseYear(res.data.year);
      })
    })
  }
}
