import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  logoutIcon = faArrowRightFromBracket

  constructor(public authService:AuthService){}

  logoutHandler(){
    this.authService.logout()
  }
}
