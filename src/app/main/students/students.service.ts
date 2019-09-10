import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  routeParam: any;

  constructor() { }

  resolve(route: ActivatedRouteSnapshot) {
    console.log("resolve");
    this.routeParam = route.params;
    if (!this.routeParam.studentId) {
      console.log("no");
    } else {
      console.log("yes");
    }

  }
}
