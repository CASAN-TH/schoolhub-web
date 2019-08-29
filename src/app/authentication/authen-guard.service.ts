import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenGuardService {

  constructor(private router: Router) { }

  canActivate(): boolean {
    const token = window.localStorage.getItem(
      `token@${environment.appName}`
    );

    if (token) {
      return true;
    } else {
      this.router.navigate(['auth/login']);
      return false;
    }
  }
}
