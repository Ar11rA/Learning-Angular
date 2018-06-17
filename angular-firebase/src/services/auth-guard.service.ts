import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  public isLoggedIn: boolean;
  constructor(private router: Router, private authService: AuthService) { 
    authService.isLoggedIn.subscribe(val => this.changeLoggedIn(val));
  }

  changeLoggedIn(val) {
    this.isLoggedIn = val;
  }

  canActivate() {
    console.log('can activate called')
    if  ( this.isLoggedIn ) {
     return true;
    }
    this.router.navigate(['/']);
    return false;
  }

}