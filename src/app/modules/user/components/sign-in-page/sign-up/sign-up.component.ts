import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent implements OnInit {
  @Output() onHasAccount = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  hasAccount() {
    this.onHasAccount.emit(true);
  }

}
