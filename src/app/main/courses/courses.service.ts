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
  onTranscriptChanged: BehaviorSubject<any>;
  onImportDataChanged: BehaviorSubject<any>;
  routeParams: any;
  courseId: any;

  constructor(
    private http: HttpClient
  ) {
    this.onCoursesChanged = new BehaviorSubject([]);
    this.onCourseChanged = new BehaviorSubject([]);
    this.onTranscriptChanged = new BehaviorSubject([]);
    this.onImportDataChanged = new BehaviorSubject([]);
  }
  private authorizationHeader() {
    const token = window.localStorage.getItem(`token@${environment.appName}`);
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return headers;
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;
    //new CourseYear
    if (this.routeParams.actiontype === 'newyear') {
      let yearfrom = parseInt(this.routeParams.year) - 1;
      let bodyyear = {
        from: yearfrom.toString(),
        to: this.routeParams.year
      }
      this.cloneCourseYear(bodyyear);
      // read CourseYear
    } else if (this.routeParams.actiontype === 'read') {
      this.getCourseYear(this.routeParams.year);
    } else if (this.routeParams.actiontype === 'import') {
      // console.log("Import");
    } else {
      this.getCourseYear(this.routeParams.year);
    }
    if (this.routeParams.studentId) {
      this.getTranscript(this.routeParams);
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
        this.getCourseYear(year.to);
      })
    });
  }

  courseSubjectEdit(data): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(environment.apiUrl + "/api/courses/" + data._id, data, { headers: this.authorizationHeader() }).subscribe((res: any) => {
        this.getCourseYear(res.data.year);
      })
    })
  }

  getTranscript(body): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiUrl + "/api/courses/" + body.courseId + "/" + body.studentId, { headers: this.authorizationHeader() }).subscribe((res: any) => {
        this.onTranscriptChanged.next(res.data);
      })
    })
  }

  createTranscript(body): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!body._id) {
        this.http.post(environment.apiUrl + "/api/course/transcript", body, { headers: this.authorizationHeader() }).subscribe((res: any) => {
          resolve(res);
        })
      } else {
        this.http.put(environment.apiUrl + "/api/course/transcript/" + body._id, body, { headers: this.authorizationHeader() }).subscribe((res: any) => {
          resolve(res);
        })
      }
    })
  }

  readFile(data: any) {
    console.log(data);
    return new Promise((resolve, reject) => {
      this.http.post(environment.apiUrl + "/api/preimports", data, { headers: this.authorizationHeader() }).subscribe((response: any) => {
        this.onImportDataChanged.next(response.data);
        resolve(response.data);
      }, reject);
    });
  }

  deleteImportData(_id) {
    return new Promise((resolve, reject) => {
      this.http.delete(environment.apiUrl + "/api/preimports/" + _id, { headers: this.authorizationHeader() }).subscribe((response: any) => {
        this.onImportDataChanged.next(null);
        resolve(response.data);
      }, reject);
    });
  }

  importData(data: any) {
    return new Promise((resolve, reject) => {
      this.http.put(environment.apiUrl + "/api/preimport/" + data._id, data, { headers: this.authorizationHeader() }).subscribe((response: any) => {
        resolve(response.data);
      }, reject);
    });
  }


}
