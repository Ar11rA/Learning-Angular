import { Component, OnInit } from '@angular/core';
import { Register } from './register.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerDTO : Register;

  constructor(private authService: AuthService, private router: Router) { 
    this.registerDTO = new Register('', '', '', '', '');
  }

  ngOnInit() {
  }

  registerUser(){
    this.authService.registerRegular(this.registerDTO.username, this.registerDTO.password)
    .then((res) => {
      console.log(res);
      this.router.navigate(['login']);
    })
    .catch((err) => console.log('error: ' + err));
  }
}
