import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from './security_services/token-storage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;

  isModalFormVisible = false;
  isLoginFormVisibleApp = false;
  isRegistrationFormVisibleApp = false;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit() {

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  openLoginForm() {
    this.toggleModalFormVisibility(true, 0);
  }

  openRegistrationForm() {
    this.toggleModalFormVisibility(true, 1);
  }

  private toggleModalFormVisibility(dir: boolean, logOrReg?: number) {
    this.isModalFormVisible = dir;
    if (dir) {
      if (logOrReg == 1) {
        this.isRegistrationFormVisibleApp = true;
      } else {
        this.isLoginFormVisibleApp = true;
      }
      window.setTimeout(() => {
        document.getElementById('auth01').style.display = 'block';
      }, 5);
      
    } else {
      this.isLoginFormVisibleApp = false;
      this.isRegistrationFormVisibleApp = false;
      this.isModalFormVisible = false;
      document.getElementById('auth01').style.display = 'none';
    }
  }

  toCloseModalForm(isClosed: any) {
    this.toggleModalFormVisibility(!isClosed);
  }
}