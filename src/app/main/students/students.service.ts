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
  onCoursesDataChanged: BehaviorSubject<any>;

  private authorizationHeader() {
    const token = window.localStorage.getItem(`token@${environment.appName}`);
    // console.log(token);
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return headers;
  }

  constructor(private httpclient: HttpClient) {
    this.onDataChanged = new BehaviorSubject([]);
    this.onCoursesDataChanged = new BehaviorSubject([]);
  }

  resolve(route: ActivatedRouteSnapshot) {

    this.routeParam = route.params;
    if (!this.routeParam.studentsId) {
      return this.getstudentsDataList();
    } else {
      this.getstudentsbyId(this.routeParam.studentsId);
    }

    if (this.routeParam.coursesId && this.routeParam.studentsId) {
      console.log(this.routeParam.coursesId + ":" + this.routeParam.studentsId);
      this.getCourseByID(this.routeParam.coursesId);
    }


  }
  getCourseByID(coursesId: any) {
    // console.log("ubjlbbl");
    // console.log(this.authorizationHeader());
    return new Promise((resolve, reject) => {
      this.httpclient.get(environment.apiUrl + "/api/courses/" + coursesId, { headers: this.authorizationHeader() }).subscribe((response: any) => {
        // console.log(response);
        this.onCoursesDataChanged.next(response.data);
        resolve(response.data);
      }, reject);
    });
  }

  adStudentCoursesData(students) {
    console.log(students);
    // return new Promise((resolve, reject) => {
    //   this.httpclient.put(environment.apiUrl + "/api/courses/" + students._id, students, { headers: this.authorizationHeader() }).subscribe((response: any) => {
    //     this.getstudentsDataList();
    //     resolve(response.data);
    //   }, reject);
    // });
  }


  getstudentsDataList() {
    return new Promise((resolve, reject) => {
      this.httpclient.get(environment.apiUrl + "/api/students", { headers: this.authorizationHeader() }).subscribe((response: any) => {
        this.onDataChanged.next(response.data);
        resolve(response.data);
      }, reject);
    });
  }

  getstudentsbyId(studentsId) {
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
    return new Promise((resolve, reject) => {
      this.httpclient.post(environment.apiUrl + "/api/students", data, { headers: this.authorizationHeader() }).subscribe((response: any) => {
        this.getstudentsDataList();
        resolve(response.data);
      }, reject);
    });
  }

  editStudentsData(students) {
    return new Promise((resolve, reject) => {
      this.httpclient.put(environment.apiUrl + "/api/students/" + students._id, students, { headers: this.authorizationHeader() }).subscribe((response: any) => {
        this.getstudentsDataList();
        resolve(response.data);
      }, reject);
    });
  }


  studentsSoldoutData(students) {
    console.log(students);
    return new Promise((resolve, reject) => {
      this.httpclient.put(environment.apiUrl + "/api/students/" + students._id, students, { headers: this.authorizationHeader() }).subscribe((response: any) => {
        this.getstudentsDataList();
        resolve(response.data);
      }, reject);
    });
  }


  // deleteData(_id) {
  //   return new Promise((resolve, reject) => {
  //     this.httpclient.delete(environment.apiUrl + "/api/students/" + _id, { headers: this.authorizationHeader() }).subscribe((response: any) => {
  //       this.getstudentsDataList();
  //       resolve(response.data);
  //     }, reject);
  //   });
  // }


}
