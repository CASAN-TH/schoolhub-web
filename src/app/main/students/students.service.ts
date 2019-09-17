import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  routeParam: any;
  students: any = [];
  onDataChanged: BehaviorSubject<any>;

  private authorizationHeader() {
    const token = window.localStorage.getItem(`token@${environment.appName}`);
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return headers;
  }

  constructor(private httpclient: HttpClient) { this.onDataChanged = new BehaviorSubject([]); }

  resolve(route: ActivatedRouteSnapshot) {
    // console.log("resolve");
    this.routeParam = route.params;
    if (!this.routeParam.studentsId) {
      // console.log("no");
      return this.getstudentsDataList();
    } else {
      // console.log("yes");
      this.getstudentsbyId(this.routeParam.studentsId);
    }
  }

  getstudentsDataList() {
    // console.log("getstudentsDataList");
    return new Promise((resolve, reject) => {
      this.httpclient.get(environment.apiUrl + "/api/students", { headers: this.authorizationHeader() }).subscribe((response: any) => {
        this.onDataChanged.next(response.data);
        resolve(response.data);
      }, reject);
    });
  }

  getstudentsbyId(studentsId) {
    // console.log("getstudentsbyId");
    return new Promise((resolve, reject) => {
      if (studentsId === 'new') {
        this.onDataChanged.next(null);
        resolve(null);
      } else {
        this.httpclient.get(environment.apiUrl + "/api/students/" + studentsId, { headers: this.authorizationHeader() }).subscribe((response: any) => {
          this.onDataChanged.next(response.data);
          resolve(response.data);
        }, reject);
      }
    });
  }

  adStudentsData(data: any) {
    // console.log(data);
    return new Promise((resolve, reject) => {
      this.httpclient.post(environment.apiUrl + "/api/students", data, { headers: this.authorizationHeader() }).subscribe((response: any) => {
        this.getstudentsDataList();
        // console.log(response.data);
        resolve(response.data);
      }, reject);
    });
  }

  editStudentsData(students) {
    // console.log(students);
    return new Promise((resolve, reject) => {
      this.httpclient.put(environment.apiUrl + "/api/students/" + students._id, students, { headers: this.authorizationHeader() }).subscribe((response: any) => {
        this.getstudentsDataList();
        resolve(response.data);
      }, reject);
    });
  }

}
