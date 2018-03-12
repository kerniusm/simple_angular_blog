import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{

  constructor(
          public auth: AuthService,
          private router: Router) { }

  signInWithGoogle(){
    this.auth.googleLogin()
    .then(() => this.afterSignIn());
  }

  afterSignIn(){
    this.router.navigate(['/']);
  }


}
