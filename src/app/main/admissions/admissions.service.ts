import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdmissionsService {

  private authorizationHeader() {
    const token = window.localStorage.getItem(`token@${environment.appName}`);
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return headers;
  }
  onDataChanged: BehaviorSubject<any>;
  admissions: any = [];
  routeParam: any;

  constructor(private httpClient: HttpClient) { this.onDataChanged = new BehaviorSubject([]); }

  resolve(route: ActivatedRouteSnapshot) {
    console.log("resolve");
    this.routeParam = route.params
    if (!this.routeParam.admissionsId) {
      console.log("no");
      this.getadmissionsDataList();
    } else {
      console.log("yes");
      this.getadmissionsDatabyId(this.routeParam.admissionsId);
    }
  }

  getadmissionsDataList() {
    console.log("getadmissionsDataList");
    return new Promise((resolve, reject) => {
      this.httpClient.get(environment.apiUrl + "/api/admissions", { headers: this.authorizationHeader() }).subscribe((response: any) => {
        this.onDataChanged.next(response.data);
        resolve(response.data);
      }, reject);
    });
  }

  getadmissionsDatabyId(admissionsId) {
    console.log(admissionsId);
    return new Promise((resolve, reject) => {
      if (admissionsId === 'new') {
        this.onDataChanged.next(null);
        resolve(null);
      } else {
        this.httpClient.get("http://localhost:3000/api/admissions/" + admissionsId, { headers: this.authorizationHeader() }).subscribe((response: any) => {
          this.onDataChanged.next(response.data);
          resolve(response.data);
        }, reject);
      }
    });
  }
  editAdmissionsData(admissions) {
    console.log("editAdmissionsData");
    return new Promise((resolve, reject) => {
      this.httpClient.put("http://localhost:3000/api/admissions/" + admissions._id, admissions, { headers: this.authorizationHeader() }).subscribe((response: any) => {
        this.getadmissionsDataList();
        resolve(response.data);
      }, reject);
    });
  }

  ADDadmissionsData(data: any) {
    console.log(data);
    return new Promise((resolve, reject) => {
      this.httpClient.post("http://localhost:3000/api/admissions", data, { headers: this.authorizationHeader() }).subscribe((response: any) => {
        this.onDataChanged.next(response.data);
        resolve(response.data);
      }, reject);
    });
  }

  deleteData(_id) {
    return new Promise((resolve, reject) => {
      this.httpClient.delete("http://localhost:3000/api/admissions/" + _id, { headers: this.authorizationHeader() }).subscribe((response: any) => {
        this.getadmissionsDataList();
        resolve(response.data);
      }, reject);
    });
  }

}
