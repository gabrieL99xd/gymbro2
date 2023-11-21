import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/Services/Token/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() sidenavRef: MatSidenav | null = null;
  constructor(public router: Router , public tokenService : TokenService ){ }

  toggle(){
    if(this.sidenavRef !== null){
      this.sidenavRef.toggle();
    }
  }
}
