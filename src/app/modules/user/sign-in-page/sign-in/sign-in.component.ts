import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
})
export class SignInComponent implements OnInit {
  @Output() onHasAccount = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  hasAccount() {
    this.onHasAccount.emit(false);
  }

}
