import { Component, OnInit, ViewChild } from '@angular/core';
import { PostsService } from './shared/posts.service';
import { Post } from './shared/post';

import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import { Observable } from 'rxjs/Observable';

import { NotifyService } from '../../core/notify.service';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: Observable<Post[]>;
  displayedColumns = ['id', 'title', 'visible' , 'actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private pS: PostsService,
    private notify: NotifyService) { }

  ngOnInit() {
    this.pS.getPostsSnapshot().subscribe(
      (posts)=>{
        this.dataSource = new MatTableDataSource(posts);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    )
  }
  applyFilter(filterValue: string){
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  removeCategory(post: any){
    if(confirm("Warning!!! Delete")){
      this.pS.delete(post.id);
      this.notify.openSnackBar('Post successfully deleted!', 'success');

    }
  }

}
