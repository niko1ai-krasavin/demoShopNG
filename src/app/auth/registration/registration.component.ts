import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent {


  @Output() isNotTransition = new EventEmitter<boolean>();

  doTransitionToLogForm() {
    this.isNotTransition.emit(!true);
  }
}
