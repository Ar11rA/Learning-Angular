import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Login } from './login.model';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginDTO: Login;
  constructor(private authService: AuthService, private router: Router) {
    this.loginDTO = new Login('', '');
  }

  ngOnInit() {
  }

  loginUser() {
    this.authService.signInRegular(this.loginDTO.username, this.loginDTO.password)
      .then((res) => {
        if (this.authService.isUserLoggedIn()) {
          this.router.navigate(['dashboard']);
        }
      })
      .catch((err) => console.log('error: ' + err));
  }
}
