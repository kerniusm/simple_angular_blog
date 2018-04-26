import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';

import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { CollectionComponent } from './collection/collection.component';
import { SinglePostComponent } from './single-post/single-post.component';

import {PostsComponent} from './admin/posts/posts.component';
import {PostComponent} from './admin/posts/post/post.component';


import { CategoriesComponent } from './admin/categories/categories.component';
import { CategoryComponent } from './admin/categories/category/category.component';
import { AuthGuard } from './core/auth.guard';
import { AdminGuard } from './core/admin.guard';
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'collection/:category', component: CollectionComponent},
  {path: 'collection/:category/:subcategory', component: CollectionComponent},
  {path: 'post/:slug', component: SinglePostComponent},

  {path: 'admin', component: DashboardComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'admin/categories', component: CategoriesComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'admin/categories/new', component: CategoryComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'admin/categories/:id', component: CategoryComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'admin/posts', component: PostsComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'admin/posts/new', component: PostComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'admin/posts/:id', component: PostComponent, canActivate:[AuthGuard, AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
