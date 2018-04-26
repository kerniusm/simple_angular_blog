import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriesService } from './shared/categories.service';
import { Category } from './shared/category';

import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import { Observable } from 'rxjs/Observable';

import { NotifyService } from '../../core/notify.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: Observable<Category[]>;
  displayedColumns = ['id', 'title', 'visible' , 'actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private cS: CategoriesService,
    private notify: NotifyService) { }

  ngOnInit() {
    this.cS.getCategoriesSnapshot().subscribe(
      (categories)=>{
        this.dataSource = new MatTableDataSource(categories);
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

  removeCategory(category: any){
    if(confirm("Warning!!! Delete")){
      this.cS.delete(category.id);
      this.notify.openSnackBar('Product successfully deleted!', 'success');

    }
  }

}
