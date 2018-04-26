import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {FlexLayoutModule} from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
///FIREBASE
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
export const firebaseConfig = environment.firebase2;
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

//Material design
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule,MatSortModule} from '@angular/material';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';

import { TinyMceModule,tinymceDefaultSettings } from 'angular-tinymce';
import {  } from 'angular-tinymce';

//CORE
import {AuthGuard} from './core/auth.guard';
import {AuthService} from './core/auth.service';
import {ValidationService} from './core/validation.service';
import {AdminGuard} from './core/admin.guard';
import {NotifyService} from './core/notify.service';
import {CategoriesService} from './admin/categories/shared/categories.service';
import {PostsService} from './admin/posts/shared/posts.service';

import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './admin/posts/posts.component';
import { PostComponent } from './admin/posts/post/post.component';
import { NotifyComponent } from './ui/notify/notify.component';
import { LoginComponent } from './auth/login/login.component';
import { UserFormComponent } from './auth/login/user-form/user-form.component';
import { TopNavComponent } from './ui/top-nav/top-nav.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { SideBarComponent } from './ui/side-bar/side-bar.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { CategoryComponent } from './admin/categories/category/category.component';
import { SinglePostComponent } from './single-post/single-post.component';
import { CollectionComponent } from './collection/collection.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostsComponent,
    PostComponent,
    NotifyComponent,
    LoginComponent,
    UserFormComponent,
    TopNavComponent,
    DashboardComponent,
    SideBarComponent,
    CategoriesComponent,
    CategoryComponent,
    SinglePostComponent,
    CollectionComponent
  ],
  entryComponents:[
    NotifyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    MatSnackBarModule,
    MatCardModule,
    MatInputModule,
    MatTabsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    TinyMceModule.forRoot(tinymceDefaultSettings()),
    FlexLayoutModule,
    MatMenuModule
  ],
  providers: [
    AuthGuard,
    ValidationService,
    AdminGuard,
    AuthService,
    NotifyService,
    CategoriesService,
    PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
