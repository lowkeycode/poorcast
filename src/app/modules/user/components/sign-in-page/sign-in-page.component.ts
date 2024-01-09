import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss'],
})
export class SignInPageComponent implements OnInit{
  constructor(private authService: AuthService, private router: Router) {}


  ngOnInit(): void {
    const signedInUser = this.authService.autoLogin();
    if(!!signedInUser) {
      this.authService.userState$.next(signedInUser);
      this.router.navigateByUrl('app/overview');
    }
  }
}
