import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TokenService } from './Services/Token/token.service';
import { MatSidenav } from '@angular/material/sidenav';
import { UserService } from './Services/User/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('SideNav') SideNav!: MatSidenav;
  constructor(private userService : UserService , public tokenService : TokenService , private router : Router) { }

  logout(){
    this.userService.logout();
  }
  goToGym() {
    this.router.navigate(['/Gym']);
  }
  goToAnotacao() {
    this.router.navigate(['/Anotacoes']);  
  }
}
