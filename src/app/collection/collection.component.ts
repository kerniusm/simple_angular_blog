import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute} from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { PostsService } from '../admin/posts/shared/posts.service';
import {CategoriesService} from '../admin/categories/shared/categories.service';

import { Post } from '../admin/posts/shared/post';
@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  data: Observable<any[]>;
  category:string;
  subcategory:string;

  constructor(private router: Router,
    private pS: PostsService,
    private aR: ActivatedRoute,
    private cS: CategoriesService) { }

  ngOnInit() {
    this.category = this.aR.snapshot.params.category;
    this.subcategory = this.aR.snapshot.params.subcategory;
    if(this.subcategory){
      console.log('hehe');
      this.cS.getCategoriesBySlug(this.subcategory).subscribe(result => {
        if(result.length === 1){
          this.data = this.pS.getPostsByCategoryID(result[0].id);
        }else{
          this.router.navigate(['/']);
        }
      });
    }else if(!this.subcategory && this.category){
      this.cS.getCategoriesBySlug(this.category).subscribe(result => {
        console.log(result);
        if(result.length === 1){
          this.data = this.cS.getChildCategories(result[0].id);
        }else{
          // this.router.navigate(['/']);
        }
      });
    }else{
      this.router.navigate(['/']);
    }

  }
}
