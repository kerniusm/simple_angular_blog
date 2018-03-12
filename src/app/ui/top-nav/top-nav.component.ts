import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
@Component({
  selector: 'top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  isLoggedIn:boolean = false;
  constructor(private auth: AuthService) {
    auth.user$.subscribe(user => {
      if(user){
        this.isLoggedIn = true;
      }else{
        this.isLoggedIn = false;
      }
    })
  }

  ngOnInit() {
  }

  signOut(){
    this.auth.signOut();
  }

}
