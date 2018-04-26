import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { PostsService } from '../admin/posts/shared/posts.service';
import { Post } from '../admin/posts/shared/post';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {
  post:Post = new Post();
  constructor(private pS: PostsService,
     private router: Router,
    private aR: ActivatedRoute ) { }

  ngOnInit() {
    const slug = this.aR.snapshot.params.slug;
    if(!slug){return this.router.navigate(['/'])}
    this.pS.getPostBySlug(slug).subscribe(
      result => {
        if(result[0]){
        this.pS.getOnePost(result[0].id).valueChanges().subscribe(
            result => this.post = result
          );
        }
      }
    )
  }

}
