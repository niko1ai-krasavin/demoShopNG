import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { TokenStorageService } from 'src/app/security_services/token-storage.service';
import { AuthService } from 'src/app/security_services/auth.service';
import { Message } from 'src/app/models/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  isLoggedIn = false;
  isLoginFailed = false;
  message: Message;
  roles: string[] = [];

  @Output() isTransition = new EventEmitter<boolean>();

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }

    this.message = new Message('danger', null)
  }

  onSubmit() {
    this.authService.login(this.form.value).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      errors => {
        console.log(errors);
        if (errors.error.status === 401) {
          this.showMessage('danger', "You are not logged in. Login or password entered incorrectly.");
          this.isLoginFailed = true;
        } else {
          this.showMessage('danger', errors.error.message);
          this.isLoginFailed = true;
        }
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }

  doTransitionToRegForm() {
    this.isTransition.emit(true);
  }

  showMessage(type: string, text: string) {
    this.message = new Message(type, text);
    if (!this.isLoggedIn) {
      window.setTimeout(
        () => {
          this.message.text = null;
        }, 3000)
    }
  }
}
