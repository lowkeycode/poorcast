import { Directive, HostListener } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appGoogleSignin]'
})
export class GoogleSigninDirective {

  constructor(private pcAuth: AuthService) { }

  @HostListener('click')
  onClick() {
    this.pcAuth.signInGoogle();
  }

}
