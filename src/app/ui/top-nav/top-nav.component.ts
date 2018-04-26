import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import {CategoriesService } from '../../admin/categories/shared/categories.service';
@Component({
  selector: 'top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  isLoggedIn:boolean = false;
  categories = [];
  constructor(private auth: AuthService, private cS:CategoriesService) {
    auth.user$.subscribe(user => {
      if(user){
        this.isLoggedIn = true;
      }else{
        this.isLoggedIn = false;
      }
    })
  }

  ngOnInit() {
    let data = [];
    console.log(data);
    this.cS.getMainCategories().subscribe(categories =>
      {
        this.categories = categories
      }
    )
  }

  signOut(){
    this.auth.signOut();
  }

}
