import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  private authorizationHeader() {
    const token = window.localStorage.getItem(`token@${environment.appName}`);
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return headers;
  }

  constructor(private httpClient: HttpClient) { }

  addSchool(data){
    
    return new Promise((resolve, reject)=>
    {
      this.httpClient.post(environment.apiUrl + "/api/schools",data , {headers: this.authorizationHeader()}).subscribe((response: any)=>{

      });
    }
    )
  }
}
