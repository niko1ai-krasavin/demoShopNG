import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  @Input() isLoginFormVisibleAuth;
  @Input() isRegistrationFormVisibleAuth;
  @Output() isTheModalFormClosed = new EventEmitter<boolean>();

  toggleLoginFormVisible: boolean = false;
  toggleRegistrationFormVisible: boolean = false;

  ngOnInit(): void {
    this.readInput();
  }

  readInput() {
    if (this.isLoginFormVisibleAuth === 'true') {
      this.toggleLoginFormVisible = true;
    } else this.toggleLoginFormVisible = false;

    if (this.isRegistrationFormVisibleAuth === 'true') {
      this.toggleRegistrationFormVisible = true;
    } else this.toggleRegistrationFormVisible = false;
  }

  closeModalForm() {
    this.isTheModalFormClosed.emit(true);
  }

  doTransitionToAnotherForm(event: boolean) {
    if (event) {
      this.toggleLoginFormVisible = false;
      this.toggleRegistrationFormVisible = true;
    } else {
      this.toggleRegistrationFormVisible = false;
      this.toggleLoginFormVisible = true;
    }
  }
}