import { Component } from '@angular/core';
import { AuthService } from './core/auth.service';
import { User } from './core/user';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user: User;
  userRoles: any;
  constructor(private auth: AuthService){
    auth.user$.subscribe(user => {
      this.user = user
      }
    );
  }

  isAdmin(){
    return this.auth.isAdmin(this.user);
  }
}
