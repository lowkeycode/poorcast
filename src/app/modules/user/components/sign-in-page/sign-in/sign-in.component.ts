import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
})
export class SignInComponent implements OnInit {
  @Output() onHasAccount = new EventEmitter();

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  hasAccount() {
    this.onHasAccount.emit(false);
  }


}
