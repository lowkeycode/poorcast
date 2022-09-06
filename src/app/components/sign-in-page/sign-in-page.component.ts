import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent implements OnInit {
  hasAccount = true;

  constructor() { }

  ngOnInit(): void {
  }

  changeToSignUp(event: boolean) {
    this.hasAccount = event;
  }

  changeToSignIn(event: boolean) {
    this.hasAccount = event;
  }
}
