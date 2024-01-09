import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, of, take, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard  {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): Observable<boolean | UrlTree> {
    const signedInUser = this.authService.autoLogin();
    if(!!signedInUser) {
      this.authService.userState$.next(signedInUser);
    }

    return this.authService.user.pipe(
      map(user => {
        //! I think the store data for user and user accts should be here maybe sho on refresh we get all the state needed

        if (!!user) {
          return true;
        }
        return this.router.createUrlTree(['/signin']);
      })
    );
  }
}
