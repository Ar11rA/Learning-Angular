import { Component, OnInit } from '@angular/core';
import { Login } from './login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginDTO: Login;
  constructor() { 
    this.loginDTO = new Login('', '');
  }

  ngOnInit() {
  }
  loginUser(){
    console.log(this.loginDTO.username);
    console.log(this.loginDTO.password);
  }
}
