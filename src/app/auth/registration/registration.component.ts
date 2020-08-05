import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/security_services/auth.service';
import { Message } from 'src/app/models/message';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent {

  form: FormGroup;
  message: Message;
  isRegisterIn = false;
  isRegisterFailed = false;

  @Output() isNotTransition = new EventEmitter<boolean>();

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.message = new Message("", "");
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'username': new FormControl(null, [Validators.required]),
      'agree': new FormControl(false, [Validators.requiredTrue])
    });
  }

  doTransitionToLogForm() {
    this.isNotTransition.emit(!true);
  }

  onSubmit() {
    this.authService.register(this.form.value).subscribe(
      data => {
        this.isRegisterFailed = false;
        this.isRegisterIn = true;
        this.showMessage('success', data.message);
        window.setTimeout(
          () => {
            this.message.text = null;
            this.doTransitionToLogForm();
          }, 2000);
      },
      errors => {
        this.isRegisterFailed = true;
        this.isRegisterIn = false;
        if (errors.status === 400 && errors.statusText === "OK") {
          this.showMessage('danger', errors.error.message);
        }
      }
    );
  }

  showMessage(type: string, text: string) {
    this.message = new Message(type, text);
    if (!this.isRegisterIn) {
      window.setTimeout(
        () => {
          this.message.text = null;
        }, 3000)
    }
  }
}
