import { Component, OnInit } from '@angular/core';
import { Register } from './register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerDTO : Register;

  constructor() { 
    this.registerDTO = new Register('', '', '', '', '');
  }

  ngOnInit() {
  }

  registerUser(){
    console.log(this.registerDTO.username);
    console.log(this.registerDTO.firstName);
    console.log(this.registerDTO.lastName);
    console.log(this.registerDTO.email);
    console.log(this.registerDTO.password);
  }
}
