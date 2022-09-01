import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { AuthService } from 'src/app/modules/user/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  user: any;
  userName: any;
  email: any;
  profilePic: any;

  subs: Subscription = new Subscription();

  constructor(private pcAuth: AuthService ) { }

  ngOnInit(): void {

    const sub = this.pcAuth.user.pipe(map(user => {
      this.userName = user.user.displayName;
      this.email = user.user.email;
      this.profilePic = user.user.photoURL
    })).subscribe();

    this.subs.add(sub);
  }

  ngOnDestroy(): void {
      this.subs.unsubscribe();
  }

}
