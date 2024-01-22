import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, of, take, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngrx/store';
import { UserAccount } from 'src/app/store/user-account/user-account.reducers';
import { loadUserAccount } from 'src/app/store/user-account/user-account.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard  {
  constructor(private authService: AuthService, private router: Router, private store: Store<UserAccount>) {}
  canActivate(): Observable<boolean | UrlTree> {
    const signedInUser = this.authService.autoLogin();
    
    if(!!signedInUser) {
      this.authService.userState$.next(signedInUser);
      this.store.dispatch(loadUserAccount());
    }

    return this.authService.user.pipe(
      map(user => {
        if (!!user) {
          return true;
        }
        return this.router.createUrlTree(['/signin']);
      })
    );
  }
}
