import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  public isLoggedIn: boolean;
  
  constructor(private authService: AuthService) {
     
  }

  ngOnInit() {
    this.authService.isLoggedIn.subscribe(val => this.changeLoggedIn(val));
  }

  changeLoggedIn(val) {
    this.isLoggedIn = val;
  }
}
