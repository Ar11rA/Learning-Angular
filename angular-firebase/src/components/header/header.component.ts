import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

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
