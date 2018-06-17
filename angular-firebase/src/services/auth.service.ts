import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  @Output() isLoggedIn: EventEmitter<any> = new EventEmitter();
  
  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = _firebaseAuth.authState;

    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
        } else {
          this.userDetails = null;
        }
      }
    );
  }
  registerRegular(email, password) {
    const registerUser = firebase.auth().createUserWithEmailAndPassword(email, password);

    return registerUser;
  }

  signInRegular(email, password) {
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);

    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password)
  }

  isUserLoggedIn() {
    if (this.userDetails == null) {
      this.isLoggedIn.emit(false);
      return false;
    } else {
      this.isLoggedIn.emit(true);
      return true;
    }
  }

  logout() {
    this._firebaseAuth.auth.signOut()
      .then((res) => this.router.navigate(['/']));
  }

}