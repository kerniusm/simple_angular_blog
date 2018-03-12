import { Component, OnInit } from '@angular/core';

import { ReactiveFormsModule, FormGroup, FormBuilder, Validators} from '@angular/forms';

import { PostsService } from '../shared/posts.service';

import { NotifyService } from '../../../core/notify.service';

import { Post } from '../shared/post';
import { Router, ActivatedRoute } from '@angular/router';


import { Observable } from 'rxjs/Observable';

type PostFields =  'title' | 'description' | 'price' | 'quantity';
type PostErrors = { [u in PostFields ]: string};
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
