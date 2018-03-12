import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';

import { DashboardComponent } from './admin/dashboard/dashboard.component';

import {PostsComponent} from './admin/posts/posts.component';
import {PostComponent} from './admin/posts/post/post.component';
import { AuthGuard } from './core/auth.guard';
import { AdminGuard } from './core/admin.guard';
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},

  {path: 'admin', component: DashboardComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'admin/posts', component: PostsComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'admin/posts/new', component: PostComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'admin/posts/:id', component: PostComponent, canActivate:[AuthGuard, AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
