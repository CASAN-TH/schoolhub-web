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
    console.log("resolve");
    this.routeParam = route.params;
    if (!this.routeParam.studentsId) {
      console.log("no");
     return this.getstudentsDataList();
    } else {
      console.log("yes");
    }
  }

  getstudentsDataList() {
    console.log("getstudentsDataList");
    return new Promise((resolve, reject) => {
      this.httpclient.get("http://localhost:3000/api/students", { headers: this.authorizationHeader() }).subscribe((response: any) => {
        this.onDataChanged.next(response.data);
        resolve(response.data);
      }, reject);
    });
  }

  getstudentsbyId(studentsId) {
    console.log("getstudentsbyId");
  }

}
