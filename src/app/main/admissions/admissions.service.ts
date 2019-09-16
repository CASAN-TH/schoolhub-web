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



}
