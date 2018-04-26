import { Component, OnInit } from '@angular/core';


import { Observable } from 'rxjs/Observable';

import { PostsService } from '../admin/posts/shared/posts.service';
import { Post } from '../admin/posts/shared/post';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: Observable<Post[]>;
  constructor(private pS: PostsService) { }

  ngOnInit() {
    this.posts = this.pS.getPostsSnapshot(10);
  }



}
