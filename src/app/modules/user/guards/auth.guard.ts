import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, of, take, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard  {
  constructor(private pcAuth: AuthService, private router: Router) {}
  canActivate(): Observable<boolean | UrlTree> {
    return this.pcAuth.user.pipe(
      // take(1),
      map(user => {
        console.log('user', user);
        
        if (!!user) {
          return true;
        }
        return this.router.createUrlTree(['/signin']);
      })
    );
  }
}
