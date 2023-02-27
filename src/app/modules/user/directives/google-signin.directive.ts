import { Directive, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appGoogleSignin]'
})
export class GoogleSigninDirective {

  constructor(private pcAuth: AuthService, private router: Router) { }

  @HostListener('click')
  onClick() {
    this.pcAuth.signInGoogle().subscribe(user => {
      this.router.navigate(['app/overview']);
    });
  }

}
